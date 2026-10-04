export interface VinylRelease {
  code: string;
  artist: string;
  title: string;
  format: string;
  year: string;
  edition: string;
  tracksCount: number;
  duration: string;
  speed: string;
  image: string;
  accent: 'amber' | 'teal';
  description: string;
  tracklist: {
    side: string;
    position: string;
    title: string;
    duration: string;
  }[];
}

export interface RosterArtist {
  code: string;
  genre: string;
  name: string;
  releasesCount: number;
  origin: string;
}

export interface TourDate {
  date: string;
  venue: string;
  city: string;
  performance: string;
  status: 'RESERVE' | 'LIMITED' | 'SOLD OUT';
}

export const RELEASES: VinylRelease[] = [
  {
    code: 'SNR-004',
    artist: 'KORINTH ARCHIVE',
    title: 'DRIFT MATRICES',
    format: '2x12" 180G HEAVYWEIGHT VINYL',
    year: '2026',
    edition: 'EDITION OF 500 HAND-NUMBERED',
    tracksCount: 6,
    duration: '44:18',
    speed: '33 ⅓ RPM',
    image: '/src/assets/images/record_label_sleeve_one_1791098225130.jpg',
    accent: 'amber',
    description: 'Long-form modular drone recorded direct to two-track Studer A80 mastering tape. Pressed on virgin unbleached vinyl.',
    tracklist: [
      { side: 'A', position: '01', title: 'Sub-Harmonic Continuum', duration: '11:42' },
      { side: 'A', position: '02', title: 'Perimeter Oscillations', duration: '08:14' },
      { side: 'B', position: '03', title: 'Static Displacement', duration: '14:02' },
      { side: 'B', position: '04', title: 'Run-Out Decay', duration: '10:20' }
    ]
  },
  {
    code: 'SNR-003',
    artist: 'ELENA VORONINA',
    title: 'TAPE HYSTERESIS',
    format: '12" 180G VINYL + 24-BIT MASTER',
    year: '2026',
    edition: 'EDITION OF 400',
    tracksCount: 5,
    duration: '38:52',
    speed: '45 RPM',
    image: '/src/assets/images/record_label_sleeve_two_1791098241889.jpg',
    accent: 'teal',
    description: 'Saturating magnetic tape loops processed through custom discrete passive EQ circuits. Cut at half-speed in Berlin.',
    tracklist: [
      { side: 'A', position: '01', title: 'Flux Density 320nWb', duration: '09:20' },
      { side: 'A', position: '02', title: 'Azimuth Misalignment', duration: '07:44' },
      { side: 'B', position: '03', title: 'Hysteresis Loop IV', duration: '12:18' },
      { side: 'B', position: '04', title: 'Demagnetization', duration: '09:30' }
    ]
  },
  {
    code: 'SNR-002',
    artist: 'NULL MATRIX',
    title: 'PHASE CANCELLATION',
    format: '12" 180G AUDIOPHILE VINYL',
    year: '2025',
    edition: 'EDITION OF 350',
    tracksCount: 4,
    duration: '36:10',
    speed: '33 ⅓ RPM',
    image: '/src/assets/images/record_label_sleeve_three_1791098255066.jpg',
    accent: 'amber',
    description: 'Micro-tonal acoustic reflections captured inside decommissioned subterranean reservoir architectures.',
    tracklist: [
      { side: 'A', position: '01', title: 'Phase Inversion (Dry)', duration: '08:50' },
      { side: 'A', position: '02', title: 'Comb Filtering', duration: '09:12' },
      { side: 'B', position: '03', title: 'Interference Pattern', duration: '11:08' },
      { side: 'B', position: '04', title: 'Standing Wave Matrix', duration: '07:00' }
    ]
  },
  {
    code: 'SNR-001',
    artist: 'CYAN ARCHIVES',
    title: 'FREQUENCY HORIZON',
    format: '12" DEBOSSED GATEFOLD VINYL',
    year: '2025',
    edition: 'EDITION OF 600',
    tracksCount: 5,
    duration: '41:04',
    speed: '33 ⅓ RPM',
    image: '/src/assets/images/record_label_sleeve_one_1791098225130.jpg',
    accent: 'teal',
    description: 'The foundation catalogue release. Bukla and Serge modular synthesis captured in a single continuous dawn take.',
    tracklist: [
      { side: 'A', position: '01', title: 'Low Frequency Anchor', duration: '12:30' },
      { side: 'A', position: '02', title: 'Variable Bandpass', duration: '06:40' },
      { side: 'B', position: '03', title: 'Resonance Cascade', duration: '13:54' },
      { side: 'B', position: '04', title: 'Zero Crossing', duration: '08:00' }
    ]
  }
];

export const ROSTER: RosterArtist[] = [
  {
    code: 'SNR-RES-01',
    genre: 'MODULAR SYNTHESIS / DRONE',
    name: 'KORINTH ARCHIVE',
    releasesCount: 6,
    origin: 'BERLIN'
  },
  {
    code: 'SNR-RES-02',
    genre: 'ANALOG TAPE / ELECTRO-ACOUSTIC',
    name: 'ELENA VORONINA',
    releasesCount: 4,
    origin: 'STOCKHOLM'
  },
  {
    code: 'SNR-RES-03',
    genre: 'ACOUSTIC ARCHITECTURES',
    name: 'NULL MATRIX',
    releasesCount: 3,
    origin: 'LONDON'
  },
  {
    code: 'SNR-RES-04',
    genre: 'MINIMAL FREQUENCY OSCILLATION',
    name: 'CYAN ARCHIVES',
    releasesCount: 5,
    origin: 'TOKYO'
  }
];

export const TOUR_DATES: TourDate[] = [
  {
    date: '14 OCT 2026',
    venue: 'FUNKHAUS NALEPALAAN (SAAL 1)',
    city: 'BERLIN',
    performance: 'QUADRAPHONIC TAPE RECITAL',
    status: 'LIMITED'
  },
  {
    date: '28 OCT 2026',
    venue: 'CAFE OTO',
    city: 'LONDON',
    performance: 'ANALOG SYNTHESIS IMPROVISATION',
    status: 'RESERVE'
  },
  {
    date: '11 NOV 2026',
    venue: 'UNIT / SALOON',
    city: 'TOKYO',
    performance: 'FREQUENCY HORIZON IN FULL',
    status: 'SOLD OUT'
  },
  {
    date: '02 DEC 2026',
    venue: 'PALAIS DE TOKYO',
    city: 'PARIS',
    performance: 'SUBTERRANEAN ACOUSTICS (LIVE)',
    status: 'RESERVE'
  }
];
