import React, { useState } from 'react';

function Divider() {
  return <div className="w-px h-6 bg-[#3f4147] mx-3" />;
}

function IconButton({ children, onClick, active, title }) {
  return (
    <button 
      onClick={onClick}
      title={title}
      className={`w-6 h-6 flex items-center justify-center transition-colors ${
        active ? 'text-white' : 'text-[#b5bac1] hover:text-[#dbdee1]'
      }`}
    >
      {children}
    </button>
  );
}

export default function ChannelHeader({ channel, onToggleMembers, showMembers }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-12 min-h-[48px] flex items-center px-4 border-b border-[#1f2023] bg-[#313338] shadow-sm">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <svg className="w-6 h-6 text-[#80848e] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"/>
        </svg>
        <h1 className="font-semibold text-white truncate">{channel?.name || 'general'}</h1>
        
        {channel?.description && (
          <>
            <Divider />
            <p className="text-sm text-[#949ba4] truncate">{channel.description}</p>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <IconButton title="Threads">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.43 21a7.5 7.5 0 0 1 4.42-9.75 1 1 0 0 0 .15.04v.01a7.1 7.1 0 0 0 1.52 2.54A5.5 5.5 0 1 0 18.5 8a5.5 5.5 0 0 0-5.26 3.92 5.17 5.17 0 0 1-1.53-2.46A5.5 5.5 0 1 0 2.5 12a5.5 5.5 0 0 0 2.93 4.85A5.5 5.5 0 0 0 8.5 21h-3z"/>
          </svg>
        </IconButton>
        
        <IconButton title="Notification Settings">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM11.9999 21C10.5239 21 9.24793 20.19 8.55493 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21Z"/>
          </svg>
        </IconButton>
        
        <IconButton title="Pinned Messages">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"/>
          </svg>
        </IconButton>
        
        <IconButton 
          title="Show Member List" 
          active={showMembers}
          onClick={onToggleMembers}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006ZM20 20.006H22V19.006C22 16.4433 20.2912 14.4415 17.5 13.4971C19.0626 14.9675 20 16.8404 20 19.006V20.006Z"/>
            <path d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598Z"/>
            <path d="M18 8.00598C18 9.10698 17.102 10.006 16 10.006C15.448 10.006 14.95 9.77698 14.586 9.41698C14.849 8.98998 15.048 8.51898 15.169 8.01398C15.449 7.71898 15.704 7.00598 16 7.00598C17.103 7.00598 18 7.90498 18 8.00598Z"/>
          </svg>
        </IconButton>
        
        <div className="relative">
          <input 
            type="text"
            placeholder="Search"
            className={`bg-[#1e1f22] text-sm text-[#dbdee1] placeholder-[#949ba4] rounded px-2 py-1 outline-none transition-all ${
              searchOpen ? 'w-60' : 'w-36'
            }`}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>
        
        <IconButton title="Inbox">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5C3.896 3 3 3.896 3 5V19C3 20.104 3.896 21 5 21H19C20.104 21 21 20.104 21 19V5C21 3.896 20.104 3 19 3ZM19 19H5V5H19V19ZM7 17H17V15H7V17ZM7 13H17V11H7V13ZM7 9H17V7H7V9Z"/>
          </svg>
        </IconButton>
        
        <IconButton title="Help">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"/>
          </svg>
        </IconButton>
      </div>
    </header>
  );
}
