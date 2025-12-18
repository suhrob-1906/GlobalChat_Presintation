import React from 'react';

function StatusIndicator({ status, size = 'md' }) {
  const colors = {
    online: 'bg-[#23a559]',
    idle: 'bg-[#f0b232]',
    dnd: 'bg-[#f23f43]',
    offline: 'bg-[#80848e]',
  };

  const sizeClasses = {
    sm: 'w-2.5 h-2.5 border-2',
    md: 'w-3.5 h-3.5 border-[3px]',
  };

  return (
    <div className={`absolute -bottom-0.5 -right-0.5 rounded-full ${colors[status] || colors.offline} ${sizeClasses[size]} border-[#2b2d31]`} />
  );
}

function MemberAvatar({ member }) {
  const colors = ['#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245'];
  const colorIndex = member.username.charCodeAt(0) % colors.length;
  const isOffline = member.status === 'offline';

  return (
    <div className="relative">
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${isOffline ? 'opacity-30' : ''}`}
        style={{ backgroundColor: colors[colorIndex] }}
      >
        {member.username[0].toUpperCase()}
      </div>
      <StatusIndicator status={member.status} size="sm" />
    </div>
  );
}

function MemberItem({ member }) {
  const isOffline = member.status === 'offline';
  
  return (
    <button className={`w-full flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#35373c] transition-colors ${isOffline ? 'opacity-30' : ''}`}>
      <MemberAvatar member={member} />
      <div className="flex-1 text-left min-w-0">
        <div className={`text-sm font-medium truncate ${isOffline ? 'text-[#949ba4]' : 'text-[#f2f3f5]'}`}>
          {member.username}
        </div>
        {member.activity && (
          <div className="text-xs text-[#949ba4] truncate">{member.activity}</div>
        )}
      </div>
    </button>
  );
}

function RoleGroup({ role, members }) {
  const onlineMembers = members.filter(m => m.status !== 'offline');
  const offlineMembers = members.filter(m => m.status === 'offline');
  const sortedMembers = [...onlineMembers, ...offlineMembers];

  if (sortedMembers.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="px-2 mb-1 text-xs font-semibold uppercase text-[#949ba4]">
        {role} — {onlineMembers.length}
      </h3>
      <div className="space-y-0.5">
        {sortedMembers.map(member => (
          <MemberItem key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default function MembersList({ members = [] }) {
  const groupedMembers = members.reduce((acc, member) => {
    const role = member.role || 'Member';
    if (!acc[role]) acc[role] = [];
    acc[role].push(member);
    return acc;
  }, {});

  const roleOrder = ['Admin', 'Moderator', 'Member'];
  const sortedRoles = Object.keys(groupedMembers).sort((a, b) => {
    const aIndex = roleOrder.indexOf(a);
    const bIndex = roleOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <aside className="w-60 bg-[#2b2d31] border-l border-[#1f2023] overflow-y-auto flex-shrink-0 p-3 pt-4 scrollbar-thin">
      {sortedRoles.map(role => (
        <RoleGroup 
          key={role} 
          role={role} 
          members={groupedMembers[role]} 
        />
      ))}
    </aside>
  );
}
