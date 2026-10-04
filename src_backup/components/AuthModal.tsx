import React, { useState } from 'react';
import { MapPin, Navigation, ShieldCheck, UserCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { 
    name: string; 
    email: string;
    role?: 'END_USER' | 'VENUE_OWNER' | 'EVENT_ORGANIZER' | 'JOB_POSTER' | 'ADMIN';
    qualification?: string;
    educationField?: string;
    city?: string;
    skills?: string[];
  }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('mohdjawad622@gmail.com');
  const [name, setName] = useState('Mohd Jawad');
  const [password, setPassword] = useState('••••••••••••');

  // Enriched Registration fields
  const [age, setAge] = useState<string>('24');
  const [gender, setGender] = useState<string>('Male');
  const [city, setCity] = useState<string>('Mumbai');
  const [localAddress, setLocalAddress] = useState<string>('Dongri / South Mumbai');
  const [qualification, setQualification] = useState<string>('Graduate (B.Tech / B.Sc)');
  const [currentField, setCurrentField] = useState<string>('Computer Science & Engineering');
  const [skills, setSkills] = useState<string>('React, TypeScript, Node.js, SQL, System Architecture');
  const [selectedRole, setSelectedRole] = useState<'END_USER' | 'VENUE_OWNER' | 'EVENT_ORGANIZER' | 'JOB_POSTER' | 'ADMIN'>('END_USER');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingLocation(false);
        setLocalAddress(`Lat ${position.coords.latitude.toFixed(2)}, Lng ${position.coords.longitude.toFixed(2)} (Detected)`);
      },
      () => {
        setIsDetectingLocation(false);
        setLocalAddress('Mumbai Central, Maharashtra');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name.trim() || 'Community Member',
      email: email.trim() || 'member@onecommunity.org',
      role: selectedRole,
      qualification,
      educationField: currentField,
      city,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean)
    });
    onClose();
  };

  const handleQuickDemoSignIn = () => {
    onSuccess({
      name: 'Mohd Jawad',
      email: 'mohdjawad622@gmail.com',
      role: 'END_USER',
      qualification: 'Graduate (B.Tech / B.Sc)',
      educationField: 'Computer Science & Engineering',
      city: 'Mumbai',
      skills: ['React', 'TypeScript', 'Node.js', 'System Architecture']
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0C0E]/75 backdrop-blur-[10px] animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="w-full max-w-lg bg-white border border-[rgba(10,12,14,0.18)] p-6 sm:p-8 space-y-6 text-[#0A0C0E] shadow-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(10,12,14,0.1)]">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-sm tracking-tight text-[#0A0C0E]">
                ONE COMMUNITY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            </div>
            <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] mt-0.5">
              {mode === 'signin' ? 'MEMBER AUTHENTICATION' : 'CREATE ENRICHED COMMUNITY PROFILE'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs text-[#78828A] hover:text-[#0A0C0E] px-2 py-1 border border-[rgba(10,12,14,0.15)] cursor-pointer"
          >
            [ESC]
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 bg-[#F5F6F8] border border-[rgba(10,12,14,0.08)] text-[10.5px] font-sans uppercase tracking-[0.14em]">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2 text-center transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white text-[#0A0C0E] font-semibold shadow-xs'
                : 'text-[#78828A] hover:text-[#0A0C0E]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 text-center transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#0A0C0E] font-semibold shadow-xs'
                : 'text-[#78828A] hover:text-[#0A0C0E]'
            }`}
          >
            Register Profile
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans max-h-[60vh] overflow-y-auto pr-1">
          {mode === 'register' && (
            <>
              <div>
                <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohd Jawad"
                  className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                    Gender (Optional)
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Primary Community Role */}
              <div>
                <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                  Primary Community Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e: any) => setSelectedRole(e.target.value)}
                  className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                >
                  <option value="END_USER">Community Member / Jobseeker / Student</option>
                  <option value="VENUE_OWNER">Venue Owner / Mosque Trustee</option>
                  <option value="EVENT_ORGANIZER">Event Organizer / Anjuman Volunteer</option>
                  <option value="JOB_POSTER">Job Poster / Alumni Sponsor</option>
                  <option value="ADMIN">Community Admin / Moderator</option>
                </select>
              </div>

              {/* Location & GPS */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A]">
                    City & Local Address *
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    className="text-[10px] text-[#E8913C] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{isDetectingLocation ? 'Detecting...' : 'Detect GPS'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={localAddress}
                  onChange={(e) => setLocalAddress(e.target.value)}
                  placeholder="e.g. Dongri, South Mumbai"
                  className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                />
              </div>

              {/* Education & Field */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                    Highest Qualification
                  </label>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  >
                    <option value="School (10th/12th)">School (10th/12th)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduate (B.Tech / B.Sc)">Graduate (B.Tech / B.Sc)</option>
                    <option value="Commerce (B.Com / CA)">Commerce (B.Com / CA)</option>
                    <option value="Medical (MBBS / BDS)">Medical (MBBS / BDS)</option>
                    <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                    <option value="PhD / Research">PhD / Research</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                    Current Field
                  </label>
                  <input
                    type="text"
                    value={currentField}
                    onChange={(e) => setCurrentField(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
                  Skills & Technical Keywords
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, Python, Accounting, Video Editing"
                  className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2.5 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
            />
          </div>

          <div>
            <label className="text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] block mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white border border-[rgba(10,12,14,0.22)] px-3 py-2.5 text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
            />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full rounded-full border border-[#0A0C0E] bg-[#0A0C0E] text-white py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] font-medium hover:bg-[#E8913C] hover:border-[#E8913C] transition-all cursor-pointer"
            >
              {mode === 'signin' ? 'Sign In to Account' : 'Complete Registration'}
            </button>

            <button
              type="button"
              onClick={handleQuickDemoSignIn}
              className="w-full rounded-full border border-[rgba(10,12,14,0.22)] py-2.5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] hover:text-[#0A0C0E] hover:border-[rgba(10,12,14,0.4)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Instant Sign In as Mohd Jawad</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center text-[#78828A] font-mono border-t border-[rgba(10,12,14,0.08)] pt-4">
          ONE COMMUNITY PASSPORT · ROLE-BASED ACCESS CONTROL
        </p>
      </div>
    </div>
  );
};
