import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function HashIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"/>
    </svg>
  );
}

function VoiceIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00004H3C2.45 8.00004 2 8.45004 2 9.00004V15C2 15.55 2.45 16 3 16H6L10.293 20.704C10.579 20.99 11.009 21.075 11.383 20.921C11.757 20.767 12 20.404 12 20V4.00004C12 3.59604 11.757 3.23304 11.383 3.07904ZM14 9.00004V15C14.5 15 16 14 16 12C16 10 14.5 9.00004 14 9.00004ZM14 5.00004V7.00004C18 7.00004 20 10 20 12C20 14 18 17 14 17V19C19.5 19 22 15 22 12C22 9.00004 19.5 5.00004 14 5.00004Z"/>
    </svg>
  );
}

function ChevronIcon({ isOpen }) {
  return (
    <svg 
      className={`w-3 h-3 fill-[#949ba4] transition-transform duration-100 ${isOpen ? '' : '-rotate-90'}`}
      viewBox="0 0 24 24"
    >
      <path d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"/>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-4 h-4 fill-[#b5bac1] opacity-0 group-hover:opacity-100 hover:fill-[#dbdee1]" viewBox="0 0 24 24">
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>
  );
}

function AddChannelIcon() {
  return (
    <svg className="w-4 h-4 fill-[#b5bac1] opacity-0 group-hover:opacity-100 hover:fill-[#dbdee1]" viewBox="0 0 24 24">
      <path d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"/>
    </svg>
  );
}

function Category({ category, serverId, activeChannelId }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="pt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-0.5 px-0.5 mb-1 w-full group"
      >
        <ChevronIcon isOpen={isOpen} />
        <span className="text-xs font-semibold uppercase text-[#949ba4] tracking-wide hover:text-[#dbdee1] flex-1 text-left">
          {category.name}
        </span>
        <AddChannelIcon />
      </button>
      
      {isOpen && (
        <ul className="space-y-0.5">
          {category.channels.map(channel => (
            <ChannelItem 
              key={channel.id} 
              channel={channel} 
              serverId={serverId}
              isActive={channel.id === activeChannelId}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function ChannelItem({ channel, serverId, isActive }) {
  const Icon = channel.type === 'voice' ? VoiceIcon : HashIcon;
  
  return (
    <li>
      <Link
        to={`/server/${serverId}/channel/${channel.id}`}
        className={`flex items-center gap-1.5 px-2 py-1.5 mx-2 rounded group ${
          isActive 
            ? 'bg-[#404249] text-white' 
            : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]'
        }`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#dbdee1]' : 'text-[#80848e]'}`} />
        <span className="flex-1 truncate text-sm">{channel.name}</span>
        {channel.unread && !isActive && (
          <div className="w-2 h-2 bg-white rounded-full" />
        )}
        <SettingsIcon />
      </Link>
      
      {channel.type === 'voice' && channel.users?.length > 0 && (
        <div className="ml-8 mt-1 space-y-1">
          {channel.users.map(userId => (
            <div key={userId} className="flex items-center gap-2 px-2 py-1 text-sm text-[#949ba4]">
              <div className="w-6 h-6 rounded-full bg-[#5865F2] flex items-center justify-center text-xs text-white">
                U
              </div>
              <span>User</span>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

export default function ChannelList({ categories }) {
  const { serverId, channelId } = useParams();

  return (
    <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin">
      {categories.map(category => (
        <Category 
          key={category.id} 
          category={category} 
          serverId={serverId}
          activeChannelId={channelId}
        />
      ))}
    </div>
  );
}
