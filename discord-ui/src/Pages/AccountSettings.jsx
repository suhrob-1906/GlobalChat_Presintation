import React, { useState } from 'react'
import Servers from '../Components/Servers'

export default function AccountSettings() {
  const [username, setUsername] = useState('You')
  const [email, setEmail] = useState('you@example.com')
  const [password, setPassword] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleAvatar = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // design-only: just noop
    alert('Settings saved (design-only)')
  }

  return (
    <div className="app-container">
      <Servers />
      <main className="flex-1 p-6 bg-[#0f1722]">
        <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>

        <form onSubmit={handleSave} className="max-w-3xl bg-[#111217] p-6 rounded-lg shadow">
          <section className="mb-6 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-[#26282c] flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl text-white">Y</span>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm text-[#94a3b8] mb-1">Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleAvatar} className="text-sm text-[#b5bac1]" />
              <p className="text-xs text-[#6d6f78] mt-2">PNG, JPG or GIF. Max 2 MB.</p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0b0c0e] px-3 py-2 rounded text-white" />
            </div>

            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0b0c0e] px-3 py-2 rounded text-white" />
            </div>

            <div>
              <label className="block text-sm text-[#94a3b8] mb-1">Change Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full bg-[#0b0c0e] px-3 py-2 rounded text-white" />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button type="submit" className="px-4 py-2 bg-[#5865F2] rounded text-white">Save Changes</button>
              <button type="button" className="px-4 py-2 bg-[#2b2d31] rounded text-[#b5bac1]">Cancel</button>
            </div>
          </section>
        </form>
      </main>
    </div>
  )
}
