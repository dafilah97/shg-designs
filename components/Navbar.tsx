'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Hexagon } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#request' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark shadow-glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Hexagon
                className="w-9 h-9 text-amber-500 fill-amber-600/20 group-hover:fill-amber-600/40 transition-all duration-300"
                strokeWidth={1.5}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-300 font-display tracking-tighter">
                SHG
              </span>
            </div>
            <div className="leading-none">
              <span className="block text-lg font-bold text-white font-display tracking-tight">
                SHG <span className="text-gradient">Designs</span>
              </span>
              <span className="block text-[10px] text-charcoal-400 tracking-widest uppercase">
                Sesigo Hive Group
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-charcoal-200 hover:text-amber-400 rounded-lg hover:bg-amber-600/10 transition-all duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#request"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-glow-amber hover:shadow-glow-amber-lg"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-charcoal-200 hover:text-amber-400 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-dark border-t border-amber-600/10 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-charcoal-200 hover:text-amber-400 hover:bg-amber-600/10 rounded-lg transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#request"
            onClick={() => setOpen(false)}
            className="block mt-3 px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl text-center transition-all duration-200"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  )
}
