import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useServers } from '../hooks/useChat';

function ServerIcon({ server, isActive }) {
  const baseClasses = "w-12 h-12 flex items-center justify-center transition-all duration-200 cursor-pointer";
  const activeClasses = isActive ? "rounded-2xl" : "rounded-3xl hover:rounded-2xl";
  
  if (server.isHome) {
    return (
      <div className={`${baseClasses} ${activeClasses} bg-[#313338] hover:bg-[#5865F2] group`}>
        <svg className="w-7 h-7 fill-[#dbdee1] group-hover:fill-white" viewBox="0 0 24 24">
          <path d="M19.73 4.87l-15.46 0c-0.96 0-1.73 0.77-1.73 1.73l0 10.8c0 0.96 0.77 1.73 1.73 1.73l5.54 0l2.19 2.92l2.19-2.92l5.54 0c0.96 0 1.73-0.77 1.73-1.73l0-10.8c0-0.96-0.77-1.73-1.73-1.73zm-11.73 9.13l-2 0l0-6l2 0l0 6zm4 0l-2 0l0-4l2 0l0 4zm4 0l-2 0l0-2l2 0l0 2z"/>
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`${baseClasses} ${activeClasses} text-white font-semibold text-sm`}
      style={{ backgroundColor: server.color || '#5865F2' }}
    >
      {server.icon || server.name[0]}
    </div>
  );
}

function Separator() {
  return <div className="w-8 h-0.5 bg-[#35363c] rounded-full mx-auto" />;
}

function Indicator({ isActive, hasNotification }) {
  if (!isActive && !hasNotification) return <div className="w-1 h-0" />;
  
  return (
    <div className="absolute left-0 flex items-center justify-center w-1">
      <div 
        className={`bg-white rounded-r-full transition-all duration-200 ${
          isActive ? 'h-10' : 'h-2'
        }`}
      />
    </div>
  );
}

export default function Servers() {
  const { servers } = useServers();
  const { serverId } = useParams();

  return (
    <nav className="servers flex flex-col items-center py-3 gap-2 overflow-y-auto scrollbar-hide">
      {servers.map((server, index) => (
        <React.Fragment key={server.id}>
          {index === 1 && <Separator />}
          <div className="relative flex items-center group">
            <Indicator 
              isActive={serverId === server.id} 
              hasNotification={false}
            />
            <Link 
              to={server.isHome ? '/channels/@me' : `/server/${server.id}/channel/ch-4`}
              className="block"
            >
              <ServerIcon server={server} isActive={serverId === server.id} />
            </Link>
            <div className="absolute left-full ml-4 px-3 py-2 bg-[#111214] text-white text-sm font-semibold rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100 whitespace-nowrap z-50 pointer-events-none">
              {server.name}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#111214] rotate-45" />
            </div>
          </div>
        </React.Fragment>
      ))}
      
      <Separator />
      
      <div className="relative flex items-center group">
        <button className="w-12 h-12 rounded-3xl hover:rounded-2xl bg-[#313338] hover:bg-[#23a559] flex items-center justify-center transition-all duration-200">
          <svg className="w-6 h-6 fill-[#23a559] group-hover:fill-white" viewBox="0 0 24 24">
            <path d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z" />
          </svg>
        </button>
        <div className="absolute left-full ml-4 px-3 py-2 bg-[#111214] text-[#23a559] text-sm font-semibold rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100 whitespace-nowrap z-50 pointer-events-none">
          Add a Server
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#111214] rotate-45" />
        </div>
      </div>
      
      <div className="relative flex items-center group">
        <button className="w-12 h-12 rounded-3xl hover:rounded-2xl bg-[#313338] hover:bg-[#23a559] flex items-center justify-center transition-all duration-200">
          <svg className="w-6 h-6 fill-[#23a559] group-hover:fill-white" viewBox="0 0 24 24">
            <path d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z" />
          </svg>
        </button>
        <div className="absolute left-full ml-4 px-3 py-2 bg-[#111214] text-[#23a559] text-sm font-semibold rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100 whitespace-nowrap z-50 pointer-events-none">
          Explore Servers
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#111214] rotate-45" />
        </div>
      </div>
    </nav>
  );
}
