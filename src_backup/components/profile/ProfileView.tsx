import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Upload, 
  Plus, 
  X, 
  Check, 
  Download,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileViewProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [headline, setHeadline] = useState(user.headline);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [newSkill, setNewSkill] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!user.skills.includes(newSkill.trim())) {
      setUser(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setUser(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      headline,
      bio,
      location
    }));
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-neutral-800">
          <div className="flex items-start gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500/40"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-white">{user.name}</h1>
                <span title="Verified Community Member">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-medium">{user.headline}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  {user.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">About Me</h2>
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Bio Summary</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {user.bio}
            </p>
          )}

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Profile details updated successfully!</span>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Core Skills & Technologies
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-neutral-500 hover:text-rose-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill input */}
          <form onSubmit={handleAddSkill} className="flex gap-2 max-w-sm pt-1">
            <input
              type="text"
              placeholder="Add skill (e.g., Docker, Python)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200"
            >
              Add
            </button>
          </form>
        </div>

        {/* CV / Resume Section */}
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Verified Resume Document
          </h2>
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <p className="font-semibold text-white">{user.resumeFileName}</p>
                <p className="text-[10px] text-neutral-500">PDF Document · Synced with Job Matching Engine</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Downloaded ${user.resumeFileName}`)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Academic & Islamic Education
          </h2>
          <div className="space-y-3 text-xs">
            {user.education.map((edu, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{edu.degree}</h3>
                  <span className="font-mono text-[10px] text-neutral-500">{edu.year}</span>
                </div>
                <p className="text-neutral-400">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Professional Experience
          </h2>
          <div className="space-y-3 text-xs">
            {user.experience.map((exp, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{exp.role}</h3>
                  <span className="font-mono text-[10px] text-neutral-500">{exp.duration}</span>
                </div>
                <p className="text-amber-400 font-medium">{exp.company}</p>
                <p className="text-neutral-400 mt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
