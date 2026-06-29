'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Hexagon, LayoutDashboard, FolderKanban, Settings,
  MessageSquare, LogOut, Menu, X, ExternalLink, ChevronRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/content', label: 'Site Content', icon: Settings },
  { href: '/admin/requests', label: 'Client Requests', icon: MessageSquare },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-charcoal-800">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Hexagon className="w-8 h-8 text-amber-500 fill-amber-600/20" strokeWidth={1.5} />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-amber-300 font-display">SHG</span>
          </div>
          <div className="leading-none">
            <span className="block text-base font-bold text-white font-display">SHG <span className="text-gradient">Designs</span></span>
            <span className="block text-[9px] text-charcoal-500 tracking-widest uppercase">Admin Panel</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-600/30'
                  : 'text-charcoal-400 hover:text-white hover:bg-charcoal-800'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-amber-500' : 'text-charcoal-500 group-hover:text-charcoal-300'}`} />
              {item.label}
              {active && <ChevronRight className="w-4 h-4 ml-auto text-amber-500" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-charcoal-800 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-charcoal-400 hover:text-white hover:bg-charcoal-800 transition-all duration-200"
        >
          <ExternalLink className="w-5 h-5 text-charcoal-500" />
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-charcoal-400 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal-900 border-r border-charcoal-800 h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-charcoal-900 border-b border-charcoal-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hexagon className="w-7 h-7 text-amber-500 fill-amber-600/20" strokeWidth={1.5} />
          <span className="font-display font-bold text-white text-base">SHG <span className="text-gradient">Admin</span></span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="p-1.5 text-charcoal-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-charcoal-900 h-full flex flex-col shadow-2xl">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1.5 text-charcoal-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <NavContent />
          </aside>
        </div>
      )}
    </>
  )
}
