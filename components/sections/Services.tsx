'use client'

import { Globe, Server, Mail, CreditCard, Code2, Palette, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Website Design & Development',
    tagline: 'Pixel-perfect. Performance-driven.',
    description:
      'From sleek landing pages to full-scale e-commerce platforms, we build responsive, fast-loading websites that convert visitors into loyal customers.',
    features: ['Custom UI/UX Design', 'Mobile-first responsive', 'SEO Optimized', 'Performance Analytics'],
    color: 'from-amber-600/20 to-amber-800/5',
    accent: 'text-amber-500',
    border: 'border-amber-600/20 hover:border-amber-500',
  },
  {
    icon: Server,
    title: 'Domain Management',
    tagline: 'Your identity on the web.',
    description:
      'We handle domain registration, DNS configuration, and renewal management so your brand always stays live and secure.',
    features: ['Domain Registration', 'DNS Management', 'Auto-Renewal', 'WHOIS Privacy'],
    color: 'from-orange-600/20 to-orange-800/5',
    accent: 'text-orange-500',
    border: 'border-orange-600/20 hover:border-orange-500',
  },
  {
    icon: Mail,
    title: 'Business Email Provisioning',
    tagline: 'Look professional from day one.',
    description:
      'Custom branded email accounts (you@yourcompany.com) configured on reliable infrastructure, with spam protection and full device sync.',
    features: ['Custom Domain Email', 'Spam Filtering', 'Multi-device Sync', 'Shared Team Inboxes'],
    color: 'from-yellow-600/20 to-yellow-800/5',
    accent: 'text-yellow-500',
    border: 'border-yellow-600/20 hover:border-yellow-500',
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway Integration',
    tagline: 'Get paid. Seamlessly.',
    description:
      'We integrate market-leading payment processors into your platform, enabling card payments, mobile money, and real-time transaction dashboards.',
    features: ['Card Payments', 'Mobile Money', 'Transaction Dashboard', 'PCI Compliant'],
    color: 'from-amber-700/20 to-amber-900/5',
    accent: 'text-amber-400',
    border: 'border-amber-700/20 hover:border-amber-400',
  },
  {
    icon: Code2,
    title: 'Custom CMS Solutions',
    tagline: 'Your content. Your control.',
    description:
      'Admin dashboards and headless CMS architectures that put the power of content management directly in your hands, no coding required.',
    features: ['Admin Dashboard', 'Media Management', 'Role-based Access', 'Real-time Updates'],
    color: 'from-orange-700/20 to-orange-900/5',
    accent: 'text-orange-400',
    border: 'border-orange-700/20 hover:border-orange-400',
  },
  {
    icon: Palette,
    title: 'Brand Identity Design',
    tagline: 'Stand out in every pixel.',
    description:
      'Logo creation, brand guidelines, and visual identity systems designed to make your business instantly recognizable and unforgettably professional.',
    features: ['Logo Design', 'Brand Guidelines', 'Color Systems', 'Typography Kits'],
    color: 'from-yellow-700/20 to-yellow-900/5',
    accent: 'text-yellow-400',
    border: 'border-yellow-700/20 hover:border-yellow-400',
  },
]

export default function Services() {
  return (
    <section id="services" className="section-pad bg-charcoal-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Complete Digital{' '}
            <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="max-w-2xl mx-auto text-charcoal-300 text-lg">
            Everything your business needs to thrive online, delivered as a cohesive suite, not a collection of disconnected tools.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, tagline, description, features, color, accent, border }) => (
            <div
              key={title}
              className={`group relative bg-gradient-to-br ${color} rounded-2xl p-6 border ${border} transition-all duration-300 card-hover cursor-default`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-5">
                <Icon className={`w-6 h-6 ${accent}`} />
              </div>

              <div className={`text-xs font-semibold tracking-widest uppercase ${accent} mb-1`}>
                {tagline}
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-3">{title}</h3>
              <p className="text-charcoal-300 text-sm leading-relaxed mb-5">{description}</p>

              {/* Features */}
              <ul className="space-y-1.5 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-charcoal-300">
                    <CheckCircle2 className={`w-4 h-4 ${accent} flex-shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#request"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accent} group-hover:gap-2.5 transition-all duration-200`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
