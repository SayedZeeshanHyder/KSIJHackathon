import React, { useState } from 'react';
import { Bell, CheckCheck, X, BookOpen, Briefcase, Calendar, Info } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'learning' | 'career' | 'events'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => {
    if (activeTab === 'all') return true;
    return n.category === activeTab;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'learning':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      case 'career':
        return <Briefcase className="w-3.5 h-3.5 text-amber-400" />;
      case 'events':
        return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Info className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden mt-12 animate-in slide-in-from-right-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-neutral-100">Notifications</h3>
            <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-500/20">
              {notifications.filter(n => !n.isRead).length} unread
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-neutral-400 hover:text-emerald-400 p-1 flex items-center gap-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-neutral-800/60 bg-neutral-950/40 text-xs">
          {(['all', 'learning', 'career', 'events'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-neutral-800 text-neutral-100 font-medium'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-neutral-800/60">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => { onSelectNotification(item); onClose(); }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer hover:bg-neutral-800/50 transition-colors ${
                  !item.isRead ? 'bg-emerald-950/20' : ''
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-neutral-800 border border-neutral-700/60">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`text-xs ${!item.isRead ? 'font-semibold text-white' : 'font-medium text-neutral-300'}`}>
                      {item.title}
                    </p>
                    <span className="text-[10px] text-neutral-400 shrink-0 font-mono">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    {item.message}
                  </p>
                </div>
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                )}
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-neutral-400 text-xs">
              No notifications in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
