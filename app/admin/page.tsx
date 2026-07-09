import { createClient } from '@/lib/supabase-server'
import { FolderKanban, MessageSquare, Globe, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

async function getStats() {
  try {
    const supabase = createClient()
    const [projectsRes, requestsRes] = await Promise.all([
      supabase.from('projects').select('id, featured', { count: 'exact' }),
      supabase.from('client_requests').select('id, status, created_at', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
    ])
    return {
      totalProjects: projectsRes.count ?? 0,
      featuredProjects: projectsRes.data?.filter((p) => p.featured).length ?? 0,
      totalRequests: requestsRes.count ?? 0,
      recentRequests: requestsRes.data ?? [],
    }
  } catch {
    return { totalProjects: 0, featuredProjects: 0, totalRequests: 0, recentRequests: [] }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderKanban, color: 'text-amber-500', bg: 'bg-amber-600/10 border-amber-600/20' },
    { label: 'Featured Projects', value: stats.featuredProjects, icon: Globe, color: 'text-orange-400', bg: 'bg-orange-600/10 border-orange-600/20' },
    { label: 'Total Requests', value: stats.totalRequests, icon: MessageSquare, color: 'text-yellow-400', bg: 'bg-yellow-600/10 border-yellow-600/20' },
    { label: 'Site Uptime', value: '99.9%', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-600/10 border-green-600/20' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-charcoal-400 mt-1">Welcome back. Here is a snapshot of your site.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-charcoal-400 text-sm font-medium">{label}</span>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className={`font-display text-4xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Quick actions + recent requests */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display font-semibold text-white text-lg">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { href: '/admin/projects', label: 'Add New Project', desc: 'Upload and publish a new portfolio item', icon: FolderKanban },
              { href: '/admin/content', label: 'Update Site Content', desc: 'Edit homepage text, pricing, or contact info', icon: Globe },
              { href: '/admin/requests', label: 'View Client Requests', desc: 'Review and respond to incoming enquiries', icon: MessageSquare },
            ].map((action) => {
              const Icon = action.icon
              return (
                <a
                  key={action.href}
                  href={action.href}
                  className="flex items-start gap-4 p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 hover:border-amber-600/30 hover:bg-charcoal-800 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600/20">
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{action.label}</div>
                    <div className="text-charcoal-400 text-xs mt-0.5">{action.desc}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Recent requests */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white text-lg">Recent Requests</h2>
            <a href="/admin/requests" className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors">
              View all →
            </a>
          </div>
          {stats.recentRequests.length === 0 ? (
            <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-8 text-center text-charcoal-500">
              No requests yet. They will appear here once clients submit the form.
            </div>
          ) : (
            <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden divide-y divide-charcoal-800">
              {stats.recentRequests.map((req: any) => (
                <div key={req.id} className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    {req.status === 'new' ? (
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                    <div>
                      <div className="text-white text-sm font-medium">{req.name ?? 'Client'}</div>
                      <div className="text-charcoal-500 text-xs">{req.service ?? 'General enquiry'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(req.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
