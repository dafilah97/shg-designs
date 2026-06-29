'use client'

import { useEffect, useRef } from 'react'
import { Globe, Mail, CreditCard, Server, Code2, ArrowRight, Sparkles } from 'lucide-react'

const services = [
  { icon: Globe, label: 'Websites' },
  { icon: Server, label: 'Domains' },
  { icon: Mail, label: 'Business Emails' },
  { icon: CreditCard, label: 'Payment Gateways' },
  { icon: Code2, label: 'Custom CMS' },
]

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 3 + 1
      const delay = Math.random() * 8
      const duration = Math.random() * 10 + 8
      const x = Math.random() * 100
      p.style.cssText = `
        position:absolute; width:${size}px; height:${size}px;
        background:rgba(217,119,6,${Math.random() * 0.4 + 0.1});
        border-radius:50%; left:${x}%; top:${Math.random() * 100}%;
        animation:float ${duration}s ease-in-out ${delay}s infinite;
        pointer-events:none;
      `
      container.appendChild(p)
    }
    return () => { if (container) container.innerHTML = '' }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-950"
    >
      {/* Layered background */}
      <div className="absolute inset-0 hex-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-radial from-amber-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-800/10 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-amber px-4 py-2 rounded-full mb-8 text-amber-400 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>A Sesigo Hive Group Brand</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
          Build Your
          <span className="block text-gradient">Digital Empire</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-charcoal-300 leading-relaxed mb-10">
          SHG Designs delivers the complete digital infrastructure your business needs, from blazing-fast
          websites to seamless payment systems, all under one roof.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#request"
            className="group flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-glow-amber hover:shadow-glow-amber-lg"
          >
            Request a Quote
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="flex items-center gap-2 px-8 py-4 border border-charcoal-600 hover:border-amber-600 text-charcoal-200 hover:text-amber-400 font-semibold text-lg rounded-2xl transition-all duration-300"
          >
            View Our Work
          </a>
        </div>

        {/* Services strip */}
        <div className="flex flex-wrap justify-center gap-3">
          {services.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="glass flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-charcoal-200 text-sm font-medium hover:border-amber-600/30 hover:text-amber-400 transition-all duration-200 cursor-default"
            >
              <Icon className="w-4 h-4 text-amber-500" />
              {label}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-charcoal-400 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-amber-500 to-transparent" />
        </div>
      </div>
    </section>
  )
}
