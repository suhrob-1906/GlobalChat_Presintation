import React, { useState } from 'react';

function StatusIndicator({ status }) {
  const colors = {
    online: 'bg-[#23a559]',
    idle: 'bg-[#f0b232]',
    dnd: 'bg-[#f23f43]',
    offline: 'bg-[#80848e]',
  };

  return (
    <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${colors[status] || colors.offline} border-[3px] border-[#232428]`} />
  );
}

function Avatar({ user, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full bg-[#5865F2] flex items-center justify-center text-white font-medium`}>
        {user.avatar ? (
          <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover" />
        ) : (
          user.username[0].toUpperCase()
        )}
      </div>
      <StatusIndicator status={user.status} />
    </div>
  );
}

function IconButton({ children, onClick, active }) {
  return (
    <button 
      onClick={onClick}
      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
        active ? 'bg-[#43444b] text-white' : 'text-[#b5bac1] hover:bg-[#3b3d44] hover:text-[#dbdee1]'
      }`}
    >
      {children}
    </button>
  );
}

export default function UserPanel({ user }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  if (!user) return null;

  return (
    <div className="h-[52px] px-2 flex items-center gap-2 bg-[#232428]">
      <button className="flex items-center gap-2 flex-1 rounded hover:bg-[#3b3d44] p-1 -ml-1 transition-colors">
        <Avatar user={user} size="md" />
        <div className="flex-1 text-left min-w-0">
          <div className="text-sm font-medium text-[#f2f3f5] truncate">{user.username}</div>
          <div className="text-xs text-[#b5bac1] truncate">#{user.discriminator}</div>
        </div>
      </button>
      
      <div className="flex items-center">
        <IconButton onClick={() => setIsMuted(!isMuted)} active={isMuted}>
          {isMuted ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.7 11H5c0 1.19.37 2.3 1 3.21l1.46-1.46c-.3-.58-.46-1.21-.46-1.75zM10 9.18V5c0-1.66-1.34-3-3-3S4 3.34 4 5v.18L10 11zM21.41 21.41l-18-18L2 4.83 9 11.83v.17c0 1.66 1.34 3 3 3 .17 0 .33-.02.49-.05l1.57 1.57c-.66.32-1.35.48-2.06.48-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c.57-.07 1.12-.22 1.63-.42l4.95 4.95 1.41-1.42z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          )}
        </IconButton>
        
        <IconButton onClick={() => setIsDeafened(!isDeafened)} active={isDeafened}>
          {isDeafened ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4C7.58 4 4 7.58 4 12v6c0 1.1.9 2 2 2h2v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-3v8h2c1.1 0 2-.9 2-2v-6c0-4.42-3.58-8-8-8z"/>
              <path d="M4.27 3L3 4.27l7.73 7.73V14H9v6h2v-4.27L21.73 26l1.27-1.27L4.27 3z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4C7.58 4 4 7.58 4 12v6c0 1.1.9 2 2 2h2v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-3v8h2c1.1 0 2-.9 2-2v-6c0-4.42-3.58-8-8-8z"/>
            </svg>
          )}
        </IconButton>
        
        <IconButton>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
