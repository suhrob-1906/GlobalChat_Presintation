import React from 'react';
import ChannelList from './ChannelList';
import UserPanel from './UserPanel';

function ServerHeader({ serverName }) {
  return (
    <button className="h-12 px-4 flex items-center justify-between w-full border-b border-[#1f2023] hover:bg-[#35373c] transition-colors shadow-sm">
      <h2 className="font-semibold text-[#f2f3f5] truncate">{serverName}</h2>
      <svg className="w-4 h-4 fill-[#b5bac1]" viewBox="0 0 24 24">
        <path d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"/>
      </svg>
    </button>
  );
}

function BoostStatus() {
  return (
    <div className="px-4 py-2 flex items-center gap-2 text-xs text-[#949ba4] border-b border-[#1f2023]">
      <svg className="w-4 h-4 fill-[#ff73fa]" viewBox="0 0 24 24">
        <path d="M8.52 2.71c-.53-.35-1.26.02-1.26.64v17.3c0 .62.73.99 1.26.64l12.56-8.65a.75.75 0 0 0 0-1.28L8.52 2.71Z"/>
      </svg>
      <span>Server Boost Level 2</span>
    </div>
  );
}

export default function Sidebar({ server, categories, currentUser }) {
  return (
    <aside className="sidebar flex flex-col bg-[#2b2d31]">
      <ServerHeader serverName={server?.name || 'Server'} />
      <ChannelList categories={categories} />
      <UserPanel user={currentUser} />
    </aside>
  );
}
