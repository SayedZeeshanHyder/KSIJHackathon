import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Rotate3d, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Compass, 
  Sparkles,
  AlertCircle,
  Eye,
  Navigation,
  Move
} from 'lucide-react';

interface PhotosphereViewerProps {
  src: string;
  title?: string;
  venueName?: string;
  className?: string;
  height?: string;
  autoRotate?: boolean;
}

export const PhotosphereViewer: React.FC<PhotosphereViewerProps> = ({
  src,
  title = '360° Photosphere Virtual Tour',
  venueName,
  className = '',
  height = '480px',
  autoRotate: initialAutoRotate = false // Default to false: stationary, calm, stable, pointing North
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(initialAutoRotate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelpHint, setShowHelpHint] = useState(true);
  const [compassHeading, setCompassHeading] = useState(0);
  const [renderEngine, setRenderEngine] = useState<'webgl' | 'canvas2d'>('webgl');

  // Viewing angles in radians
  // yaw = 0 points North (center of panorama)
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const fovRef = useRef(Math.PI / 3); // 60 degrees standard FOV

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const lastHeadingRef = useRef(0);

  // WebGL context & state refs
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const loadedImageRef = useRef<HTMLImageElement | null>(null);

  // Hide initial hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHelpHint(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Helper to normalize radians to [0, 2*PI)
  const normalizeRad = (r: number) => {
    const twoPi = Math.PI * 2;
    return ((r % twoPi) + twoPi) % twoPi;
  };

  // Cardinal direction label
  const getCardinalLabel = (deg: number) => {
    if (deg >= 338 || deg < 23) return 'N (North)';
    if (deg >= 23 && deg < 68) return 'NE (North-East)';
    if (deg >= 68 && deg < 113) return 'E (East)';
    if (deg >= 113 && deg < 158) return 'SE (South-East)';
    if (deg >= 158 && deg < 203) return 'S (South)';
    if (deg >= 203 && deg < 248) return 'SW (South-West)';
    if (deg >= 248 && deg < 293) return 'W (West)';
    return 'NW (North-West)';
  };

  // Set view directly to a cardinal direction
  const snapToDirection = (targetDeg: number) => {
    setIsAutoRotating(false);
    yawRef.current = (targetDeg / 360) * Math.PI * 2;
    setCompassHeading(targetDeg);
    lastHeadingRef.current = targetDeg;
  };

  // Helper to safely prepare an image (downscale if larger than max texture size)
  const prepareImage = (img: HTMLImageElement, maxDim: number): HTMLCanvasElement | HTMLImageElement => {
    if (img.width <= maxDim && img.height <= maxDim) {
      return img;
    }
    const ratio = Math.min(maxDim / img.width, maxDim / img.height);
    const targetW = Math.round(img.width * ratio);
    const targetH = Math.round(img.height * ratio);
    const offCanvas = document.createElement('canvas');
    offCanvas.width = targetW;
    offCanvas.height = targetH;
    const ctx = offCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, targetW, targetH);
      return offCanvas;
    }
    return img;
  };

  // -------------------------------------------------------------
  // WebGL Shader Setup
  // -------------------------------------------------------------
  const initWebGL = useCallback((imageSource: HTMLImageElement | HTMLCanvasElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    // Try WebGL2 first, then WebGL1, then experimental-webgl
    const gl = (
      canvas.getContext('webgl2', { antialias: true, alpha: false, preserveDrawingBuffer: false }) ||
      canvas.getContext('webgl', { antialias: true, alpha: false, preserveDrawingBuffer: false }) ||
      canvas.getContext('experimental-webgl', { antialias: true, alpha: false, preserveDrawingBuffer: false })
    ) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('WebGL not supported, using Canvas 2D fallback');
      return false;
    }
    glRef.current = gl;

    // Check maximum texture size supported by GPU
    const maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
    const finalSource = (imageSource instanceof HTMLImageElement) 
      ? prepareImage(imageSource, maxTexSize) 
      : imageSource;

    // Vertex Shader: Fullscreen quad
    const vsSource = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Equirectangular 360 projection with seamless fract wrap
    const fsSource = `
      precision highp float;
      uniform sampler2D u_image;
      uniform vec2 u_resolution;
      uniform float u_yaw;
      uniform float u_pitch;
      uniform float u_fov;
      #define PI 3.14159265358979323846

      void main() {
        vec2 res = max(u_resolution, vec2(1.0, 1.0));
        vec2 st = (gl_FragCoord.xy - 0.5 * res) / res.y;
        float focalLength = 1.0 / tan(max(u_fov * 0.5, 0.05));
        vec3 ray = normalize(vec3(st.x, st.y, focalLength));

        // Pitch rotation around X axis (tilt ceiling / floor)
        float cp = cos(u_pitch);
        float sp = sin(u_pitch);
        ray = vec3(ray.x, ray.y * cp - ray.z * sp, ray.y * sp + ray.z * cp);

        // Yaw rotation around Y axis (look left / right)
        float cy = cos(u_yaw);
        float sy = sin(u_yaw);
        ray = vec3(ray.x * cy + ray.z * sy, ray.y, -ray.x * sy + ray.z * cy);

        // Spherical longitude & latitude
        float lon = atan(ray.x, ray.z); // [-PI, PI]
        float lat = asin(clamp(ray.y, -1.0, 1.0)); // [-PI/2, PI/2]

        // Map to equirectangular UV [0, 1]
        // fract ensures clean 360 wrap around edges
        float u = fract((lon / (2.0 * PI)) + 0.5);
        float v = clamp(0.5 + (lat / PI), 0.001, 0.999);

        gl_FragColor = texture2D(u_image, vec2(u, v));
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Shader compile failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return false;

    const program = gl.createProgram();
    if (!program) return false;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link failed:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return false;
    }
    programRef.current = program;

    // Fullscreen quad buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Create and upload photosphere texture
    // CRITICAL: In WebGL 1, NPOT images MUST use CLAMP_TO_EDGE and LINEAR filter!
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, finalSource);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    textureRef.current = texture;

    setRenderEngine('webgl');
    return true;
  }, []);

  // -------------------------------------------------------------
  // 2D Canvas Fallback Renderer (if WebGL is unavailable)
  // -------------------------------------------------------------
  const renderCanvas2DFrame = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#0A0C0E';
    ctx.fillRect(0, 0, w, h);

    // Calculate source rect based on yaw and pitch
    const normYaw = normalizeRad(yawRef.current);
    const uCenter = normYaw / (Math.PI * 2);
    const fovH = fovRef.current / (Math.PI * 2);
    
    const sx = (uCenter - fovH / 2) * img.width;
    const sw = fovH * img.width;
    const sy = Math.max(0, (0.5 - pitchRef.current / Math.PI - 0.25) * img.height);
    const sh = Math.min(img.height, 0.5 * img.height);

    if (sx < 0) {
      const part1Width = -sx;
      const part2Width = sw - part1Width;
      ctx.drawImage(img, img.width - part1Width, sy, part1Width, sh, 0, 0, (part1Width / sw) * w, h);
      ctx.drawImage(img, 0, sy, part2Width, sh, (part1Width / sw) * w, 0, (part2Width / sw) * w, h);
    } else if (sx + sw > img.width) {
      const part1Width = img.width - sx;
      const part2Width = sw - part1Width;
      ctx.drawImage(img, sx, sy, part1Width, sh, 0, 0, (part1Width / sw) * w, h);
      ctx.drawImage(img, 0, sy, part2Width, sh, (part1Width / sw) * w, 0, (part2Width / sw) * w, h);
    } else {
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }
  }, []);

  // -------------------------------------------------------------
  // Render Loop
  // -------------------------------------------------------------
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle auto-rotation gently when active
    if (isAutoRotating && !isDraggingRef.current) {
      yawRef.current = normalizeRad(yawRef.current + 0.0012);
      const deg = Math.round((normalizeRad(yawRef.current) / (Math.PI * 2)) * 360) % 360;
      if (Math.abs(deg - lastHeadingRef.current) >= 1) {
        lastHeadingRef.current = deg;
        setCompassHeading(deg);
      }
    }

    // Dynamic canvas sizing
    const targetW = canvas.clientWidth || canvas.parentElement?.clientWidth || 800;
    const targetH = canvas.clientHeight || canvas.parentElement?.clientHeight || 480;
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const gl = glRef.current;
    const program = programRef.current;

    if (gl && program) {
      // WebGL Render Path
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      const uResolution = gl.getUniformLocation(program, 'u_resolution');
      const uYaw = gl.getUniformLocation(program, 'u_yaw');
      const uPitch = gl.getUniformLocation(program, 'u_pitch');
      const uFov = gl.getUniformLocation(program, 'u_fov');

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uYaw, yawRef.current);
      gl.uniform1f(uPitch, pitchRef.current);
      gl.uniform1f(uFov, fovRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } else if (loadedImageRef.current) {
      // Canvas 2D Fallback Path
      const ctx = canvas.getContext('2d');
      if (ctx) {
        renderCanvas2DFrame(ctx, loadedImageRef.current);
      }
    }

    animFrameIdRef.current = requestAnimationFrame(renderFrame);
  }, [isAutoRotating, renderCanvas2DFrame]);

  // -------------------------------------------------------------
  // Load Photosphere Image
  // -------------------------------------------------------------
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    if (!src) {
      setHasError(true);
      return;
    }

    const img = new Image();
    // Only set crossOrigin for external http(s) URLs; avoid on data:, blob:, or relative URLs
    const isExternalHttp = src.startsWith('http://') || src.startsWith('https://');
    if (isExternalHttp && typeof window !== 'undefined' && !src.startsWith(window.location.origin)) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      loadedImageRef.current = img;
      const ok = initWebGL(img);
      if (ok) {
        setRenderEngine('webgl');
      } else {
        setRenderEngine('canvas2d');
      }
      setIsLoaded(true);

      // Start render loop
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = requestAnimationFrame(renderFrame);
    };

    img.onerror = (e) => {
      console.warn('Failed to load photosphere JPG image:', src, e);
      // Try fallback if relative url had issues
      if (src.startsWith('/src/assets/images/')) {
        const altSrc = src.replace('/src/assets/images/', '/images/');
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          loadedImageRef.current = fallbackImg;
          initWebGL(fallbackImg);
          setIsLoaded(true);
          if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
          animFrameIdRef.current = requestAnimationFrame(renderFrame);
        };
        fallbackImg.onerror = () => setHasError(true);
        fallbackImg.src = altSrc;
        return;
      }
      setHasError(true);
    };

    img.src = src;

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (glRef.current && textureRef.current) {
        try {
          glRef.current.deleteTexture(textureRef.current);
        } catch (_) {}
      }
    };
  }, [src, initWebGL, renderFrame]);

  // -------------------------------------------------------------
  // Mouse & Touch Interaction Handlers
  // -------------------------------------------------------------
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - prevMousePosRef.current.x;
    const dy = e.clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.0035;
    // Dragging right rotates view to the right
    yawRef.current = normalizeRad(yawRef.current - dx * sensitivity);
    // Dragging down tilts pitch down, dragging up tilts pitch up
    pitchRef.current = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, pitchRef.current - dy * sensitivity));

    const deg = Math.round((normalizeRad(yawRef.current) / (Math.PI * 2)) * 360) % 360;
    if (Math.abs(deg - lastHeadingRef.current) >= 1) {
      lastHeadingRef.current = deg;
      setCompassHeading(deg);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMousePosRef.current.x;
    const dy = e.touches[0].clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    const sensitivity = 0.0045;
    yawRef.current = normalizeRad(yawRef.current - dx * sensitivity);
    pitchRef.current = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, pitchRef.current - dy * sensitivity));

    const deg = Math.round((normalizeRad(yawRef.current) / (Math.PI * 2)) * 360) % 360;
    if (Math.abs(deg - lastHeadingRef.current) >= 1) {
      lastHeadingRef.current = deg;
      setCompassHeading(deg);
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomStep = 0.04;
    if (e.deltaY > 0) {
      fovRef.current = Math.min(Math.PI * 0.58, fovRef.current + zoomStep);
    } else {
      fovRef.current = Math.max(Math.PI * 0.18, fovRef.current - zoomStep);
    }
  };

  const zoomIn = () => {
    fovRef.current = Math.max(Math.PI * 0.18, fovRef.current - 0.12);
  };

  const zoomOut = () => {
    fovRef.current = Math.min(Math.PI * 0.58, fovRef.current + 0.12);
  };

  const resetView = () => {
    yawRef.current = 0;
    pitchRef.current = 0;
    fovRef.current = Math.PI / 3;
    setCompassHeading(0);
    lastHeadingRef.current = 0;
    setIsAutoRotating(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-[#0A0C0E] select-none border border-neutral-800 ${className}`}
      style={{ height: isFullscreen ? '100vh' : height, minHeight: '360px' }}
    >
      {/* 360 Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/90 backdrop-blur-sm text-white gap-3 z-10">
          <Rotate3d className="w-9 h-9 text-[#E8913C] animate-spin" />
          <p className="font-mono text-xs text-neutral-300 uppercase tracking-widest font-semibold">
            Initializing 360° Photosphere Panorama...
          </p>
          <span className="text-[11px] text-neutral-500 font-mono">
            Optimizing equirectangular projection & GPU shaders
          </span>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-white p-6 text-center gap-3 z-10">
          <AlertCircle className="w-10 h-10 text-amber-500" />
          <p className="font-display font-bold text-base">Photosphere Panorama Unavailable</p>
          <p className="text-xs text-neutral-400 max-w-sm">
            Could not render the requested 360° image. Please verify the image URL or upload a valid JPG equirectangular panorama.
          </p>
        </div>
      )}

      {/* Top Overlay Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
            <Rotate3d className="w-3.5 h-3.5 text-[#E8913C]" />
            <span>360° PHOTOSPHERE</span>
          </div>
          {venueName && (
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-neutral-200 text-xs font-sans border border-white/10 shadow">
              {venueName}
            </span>
          )}
        </div>

        {/* Compass & Angle Indicator */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-neutral-200 font-mono text-xs flex items-center gap-2 shadow-lg">
            <Compass className={`w-4 h-4 text-[#E8913C] transition-transform duration-200`} style={{ transform: `rotate(${-compassHeading}deg)` }} />
            <span className="font-bold text-white min-w-[70px]">
              {compassHeading}° {getCardinalLabel(compassHeading).split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Direction Selector Buttons (North, East, South, West) */}
      <div className="absolute top-16 left-4 flex items-center gap-1.5 z-20 pointer-events-auto">
        <div className="flex items-center p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono shadow-xl gap-1">
          <span className="text-neutral-400 px-1 text-[10px] uppercase font-bold flex items-center gap-1">
            <Navigation className="w-3 h-3 text-[#E8913C]" /> Face:
          </span>
          <button
            type="button"
            onClick={() => snapToDirection(0)}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              compassHeading >= 340 || compassHeading <= 20
                ? 'bg-[#E8913C] text-neutral-950 font-bold'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            title="Face North (0°)"
          >
            N
          </button>
          <button
            type="button"
            onClick={() => snapToDirection(90)}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              compassHeading >= 70 && compassHeading <= 110
                ? 'bg-[#E8913C] text-neutral-950 font-bold'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            title="Face East (90°)"
          >
            E
          </button>
          <button
            type="button"
            onClick={() => snapToDirection(180)}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              compassHeading >= 160 && compassHeading <= 200
                ? 'bg-[#E8913C] text-neutral-950 font-bold'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            title="Face South (180°)"
          >
            S
          </button>
          <button
            type="button"
            onClick={() => snapToDirection(270)}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              compassHeading >= 250 && compassHeading <= 290
                ? 'bg-[#E8913C] text-neutral-950 font-bold'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
            title="Face West (270°)"
          >
            W
          </button>
        </div>
      </div>

      {/* Drag Instruction Banner */}
      {showHelpHint && isLoaded && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-amber-500/40 text-amber-200 font-sans text-xs flex items-center gap-2 shadow-2xl z-20 animate-in fade-in">
          <Move className="w-3.5 h-3.5 text-[#E8913C]" />
          <span>Click & drag horizontally/vertically to look around · Scroll to zoom</span>
          <button 
            onClick={() => setShowHelpHint(false)} 
            className="ml-2 text-white/60 hover:text-white cursor-pointer font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Bottom Control Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl z-20">
        {/* Auto Rotate Toggle (Starts Paused by default so directions don't spin endlessly) */}
        <button
          type="button"
          onClick={() => setIsAutoRotating(prev => !prev)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
            isAutoRotating 
              ? 'bg-[#E8913C] text-neutral-950 shadow-md' 
              : 'hover:bg-white/10 text-white'
          }`}
          title={isAutoRotating ? 'Pause 360 Pan' : 'Start 360 Auto-Pan'}
        >
          {isAutoRotating ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Panning</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Auto Pan</span>
            </>
          )}
        </button>

        <div className="w-[1px] h-5 bg-white/20" />

        {/* Zoom In */}
        <button
          type="button"
          onClick={zoomIn}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={zoomOut}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-white/20" />

        {/* Reset View */}
        <button
          type="button"
          onClick={resetView}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          title="Reset to Center North (0°)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
