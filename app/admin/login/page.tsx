'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hexagon, Lock, LogIn, Loader2, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 hex-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="relative">
              <Hexagon className="w-10 h-10 text-amber-500 fill-amber-600/20" strokeWidth={1.5} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-300 font-display">SHG</span>
            </div>
            <div className="leading-none text-left">
              <span className="block text-xl font-bold text-white font-display tracking-tight">
                SHG <span className="text-gradient">Designs</span>
              </span>
              <span className="block text-[10px] text-charcoal-500 tracking-widest uppercase">Admin Panel</span>
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-charcoal-400 text-sm mt-1">Enter your admin password to continue</p>
        </div>

        <div className="glass-dark rounded-2xl p-8 shadow-glass">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-charcoal-300 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-charcoal-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-3.5 text-charcoal-500 hover:text-charcoal-300"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-900/30 border border-red-700/40 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-glow-amber mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-charcoal-600 text-xs mt-6">
          Restricted access — SHG Designs Admin only
        </p>
      </div>
    </div>
  )
}
