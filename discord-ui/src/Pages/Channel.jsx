import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Servers from '../Components/Servers';
import Sidebar from '../Components/Sidebar';
import ChatPanel from '../Components/ChatPanel';
import ChannelHeader from '../Components/ChannelHeader';
import Composer from '../Components/Composer';
import MembersList from '../Components/MembersList';
import { useChat } from '../hooks/useChat';

export default function Channel() {
  const { serverId, channelId } = useParams();
  const [showMembers, setShowMembers] = useState(true);
  
  const { 
    server, 
    channel, 
    categories, 
    members, 
    messages, 
    currentUser,
    sendMessage,
    addReaction,
    loadMessages 
  } = useChat(serverId, channelId);

  useEffect(() => {
    loadMessages();
  }, [channelId, loadMessages]);

  return (
    <div className="app-container">
      <Servers />
      <Sidebar 
        server={server} 
        categories={categories} 
        currentUser={currentUser} 
      />
      <div className="flex flex-col flex-1 min-w-0 bg-[#313338]">
        <ChannelHeader 
          channel={channel} 
          showMembers={showMembers}
          onToggleMembers={() => setShowMembers(!showMembers)}
        />
        <div className="flex flex-1 min-h-0">
          <div className="flex flex-col flex-1 min-w-0">
            <ChatPanel 
              messages={messages} 
              channel={channel}
              onReact={addReaction}
            />
            <Composer 
              channelName={channel?.name || 'general'} 
              onSend={sendMessage}
            />
          </div>
          {showMembers && <MembersList members={members} />}
        </div>
      </div>
    </div>
  );
}
