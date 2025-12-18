import React from 'react'
import Servers from '../Components/Servers'
import Sidebar from '../Components/Sidebar'
import ChatPanel from '../Components/ChatPanel'
import ChannelHeader from '../Components/ChannelHeader'
import Composer from '../Components/Composer'

export default function Home() {
  return (
    <div className="app-container">
      <Servers />
      <Sidebar />
      <div className="flex flex-col flex-1">
        <ChannelHeader title="welcome" />
        <ChatPanel />
        <Composer />
      </div>
    </div>
  )
}
