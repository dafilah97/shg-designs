import { Hexagon, Mail, Phone, MapPin } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Get a Quote', href: '#request' },
]

const services = [
  'Website Design', 'Domain Management', 'Business Emails',
  'Payment Gateways', 'Custom CMS', 'Brand Identity',
]

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#hero" className="flex items-center gap-2.5 mb-4">
              <div className="relative">
                <Hexagon className="w-9 h-9 text-amber-500 fill-amber-600/20" strokeWidth={1.5} />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-300 font-display tracking-tighter">
                  SHG
                </span>
              </div>
              <div className="leading-none">
                <span className="block text-lg font-bold text-white font-display tracking-tight">
                  SHG <span className="text-gradient">Designs</span>
                </span>
                <span className="block text-[10px] text-charcoal-500 tracking-widest uppercase">
                  Sesigo Hive Group
                </span>
              </div>
            </a>
            <p className="text-charcoal-400 text-sm leading-relaxed mb-6">
              Premium digital infrastructure for modern businesses across Africa and beyond.
            </p>
            <div className="space-y-2 text-sm text-charcoal-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600" />
                <a href="mailto:hello@shgdesigns.co.bw" className="hover:text-amber-400 transition-colors">
                  info.sesigohive@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <a href="tel:+26777338635" className="hover:text-amber-400 transition-colors">
                  +267 77 338 635
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Gaborone, Botswana</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-charcoal-400 hover:text-amber-400 text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-charcoal-400 hover:text-amber-400 text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="glass-amber rounded-2xl p-6">
            <h4 className="font-display font-bold text-white text-lg mb-2">Ready to build?</h4>
            <p className="text-charcoal-300 text-sm leading-relaxed mb-4">
              Let us engineer your next digital breakthrough. No fluff, just results.
            </p>
            <a
              href="#request"
              className="block text-center px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all duration-200"
            >
              Request a Quote
            </a>
            <p className="text-center text-charcoal-500 text-xs mt-3">
              Or chat on{' '}
              <a
                href="https://wa.me/26777338635"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>

        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-charcoal-500 text-xs">
          <p>© {new Date().getFullYear()} SHG Designs. A Sesigo Hive Group Brand. All rights reserved.</p>
          <p>Crafted with precision in Gaborone, Botswana 🇧🇼</p>
        </div>
      </div>
    </footer>
  )
}
