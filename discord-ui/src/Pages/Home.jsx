import React, { useState, useEffect } from 'react'
import Servers from '../Components/Servers'
import Sidebar from '../Components/Sidebar'
import ChatPanel from '../Components/ChatPanel'
import ChannelHeader from '../Components/ChannelHeader'
import Composer from '../Components/Composer'
import MembersList from '../Components/MembersList'
import { useChat } from '../hooks/useChat'
import Test from '../Components/Test'

export default function Home() {
  const defaultServer = 'server-1'
  const defaultChannel = 'ch-4'
  const [showMembers, setShowMembers] = useState(true)

  const {
    server,
    channel,
    categories,
    members,
    messages,
    currentUser,
    sendMessage,
    addReaction,
    loadMessages,
  } = useChat(defaultServer, defaultChannel)

  const get = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY2MTQxNDA5LCJpYXQiOjE3NjYxMzc4MDksImp0aSI6IjA0MTllNWM1MWE2ZjQ3MTBiN2QzM2NmODg0ZGJkNDRkIiwidXNlcl9pZCI6IjMifQ.zxaXarRwSsou7me2rOcH_Cc-iXq5Kf5goEChG4ZPx_s';

      // store token for frontend API calls (for testing/dev)
      localStorage.setItem('token', token);

      const req = await fetch('https://globalchat-presintation.onrender.com/api/auth/me/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await req.json();
      console.log(data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get();
  }, []); 

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  return (
    <div className="app-container">
      <Servers />
      <Sidebar server={server} categories={categories} currentUser={currentUser} />

      <div className="flex flex-col flex-1 min-w-0 bg-[#313338]">
        <ChannelHeader channel={channel} showMembers={showMembers} onToggleMembers={() => setShowMembers(!showMembers)} />
        <div className="flex flex-1 min-h-0">
          <div className="flex flex-col flex-1 min-w-0">
            <ChatPanel messages={messages} channel={channel} onReact={addReaction} />
            <Composer channelName={channel?.name || 'general'} onSend={sendMessage} />
          </div>
          {showMembers && <MembersList members={members} />}
        </div>
      </div>

    </div>
  )
}
