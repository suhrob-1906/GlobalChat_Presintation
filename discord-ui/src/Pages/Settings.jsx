import React from 'react'
import { Link } from 'react-router-dom'
import Servers from '../Components/Servers'

export default function Settings() {
  return (
    <div className="app-container">
      <Servers />
      <div className="flex-1 p-6 bg-[#0f1722]">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <div className="grid grid-cols-2 gap-4">
          <Link to="/settings/account" className="block p-4 bg-[#111217] rounded-lg hover:bg-[#161618] transition">
            <h2 className="font-semibold text-white">Account</h2>
            <p className="text-sm text-[#94a3b8] mt-1">Change username, email, avatar and password.</p>
          </Link>

          <div className="p-4 bg-[#111217] rounded-lg">
            <h2 className="font-semibold text-white">Appearance</h2>
            <p className="text-sm text-[#94a3b8] mt-1">Theme, message display and accessibility options.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
