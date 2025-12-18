import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Channel from './Pages/Channel'
import Settings from './Pages/Settings'
import AccountSettings from './Pages/AccountSettings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/server/server-1/channel/ch-4" replace />} />
        <Route path="/server/:serverId/channel/:channelId" element={<Channel />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/account" element={<AccountSettings />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}