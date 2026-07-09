import { Mail, Globe, MessageSquare, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-charcoal-400 mt-1">SHG Designs admin panel.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Site Status', value: 'Live', icon: Globe, color: 'text-green-400', bg: 'bg-green-600/10 border-green-600/20' },
          { label: 'Quote Requests', value: 'Via Email', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-600/10 border-amber-600/20' },
          { label: 'Inbox', value: 'info.sesigohive', icon: Mail, color: 'text-yellow-400', bg: 'bg-yellow-600/10 border-yellow-600/20' },
          { label: 'Uptime', value: '99.9%', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-600/10 border-blue-600/20' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-charcoal-400 text-sm font-medium">{label}</span>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className={`font-display text-2xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-8">
        <h2 className="font-display font-semibold text-white text-lg mb-2">Quote Requests</h2>
        <p className="text-charcoal-400 text-sm leading-relaxed">
          All quote requests submitted through the website are delivered directly to{' '}
          <span className="text-amber-400 font-medium">info.sesigohive@gmail.com</span>.
          Check your inbox to view and respond to new enquiries.
        </p>
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all duration-200"
        >
          <Mail className="w-4 h-4" />
          Open Gmail
        </a>
      </div>

      <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-8">
        <h2 className="font-display font-semibold text-white text-lg mb-2">Quick Links</h2>
        <div className="space-y-2 mt-4">
          {[
            { label: 'View Website', href: '/' },
            { label: 'Netlify Dashboard', href: 'https://app.netlify.com/projects/shg-designs' },
            { label: 'GitHub Repository', href: 'https://github.com/dafilah97/shg-designs' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-charcoal-800 border border-charcoal-700 text-charcoal-300 hover:text-amber-400 hover:border-amber-600/30 text-sm font-medium transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
