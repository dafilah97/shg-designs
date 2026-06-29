'use client'

import { Shield, Zap, TrendingUp, Users } from 'lucide-react'

const pillars = [
  {
    icon: Zap,
    title: 'Speed-First Engineering',
    description:
      'Every solution we deploy is architected for performance, optimized bundles, edge delivery, and sub-second load times across every device.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description:
      'From SSL provisioning to secure payment gateways, your business and your customers remain protected at every layer of the stack.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    description:
      'Our infrastructure grows with your ambition. Whether you are a startup or an established enterprise, SHG Designs architects for scale.',
  },
  {
    icon: Users,
    title: 'White-Glove Support',
    description:
      'We do not hand you off after launch. Our team remains a partner through your entire digital growth journey.',
  },
]

const stats = [
  { value: '5+', label: 'Projects Deployed' },
  { value: '20+', label: 'Active Clients' },
  { value: '99.9%', label: 'Uptime Record' },
  { value: '5★', label: 'Client Rating' },
]

export default function About() {
  return (
    <section id="about" className="section-pad bg-cream-100 relative overflow-hidden">
      {/* Decorative hex */}
      <div className="absolute -right-24 -top-24 w-64 h-64 border border-amber-400/10 rounded-full" />
      <div className="absolute -left-16 -bottom-16 w-48 h-48 border border-amber-400/10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="inline-block text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3">
              Who We Are
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight mb-6">
              Empowering Businesses Through{' '}
              <span className="text-gradient">Seamless Digital Transformation</span>
            </h2>
            <p className="text-charcoal-600 text-lg leading-relaxed mb-6">
              SHG Designs is the digital infrastructure division of Sesigo Hive Group, a collective of
              builders, designers, and strategists obsessed with helping African businesses own their
              digital presence fully.
            </p>
            <p className="text-charcoal-600 leading-relaxed">
              From the domain name to the payment confirmation screen, we engineer every touch-point of
              your online business with precision, care, and a relentless focus on results.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 border border-cream-300 card-hover shadow-card text-center"
              >
                <div className="font-display text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-charcoal-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div className="section-divider mb-16" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-6 border border-cream-300 card-hover shadow-card"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:border-amber-600 transition-all duration-300">
                <Icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-charcoal-900 text-lg mb-2">{title}</h3>
              <p className="text-charcoal-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
