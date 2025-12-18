import React from 'react'
import Servers from '../Components/Servers'

export default function Settings() {
  return (
    <div className="app-container">
      <Servers />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>
        <div className="text-sm text-[#94a3b8]">Static design-only settings page.</div>
      </div>
    </div>
  )
}
