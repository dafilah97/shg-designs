'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Loader2, Mail, Phone, Building2, DollarSign, Clock,
  CheckCircle, AlertCircle, Archive, RefreshCw, ChevronDown, Search, Eye,
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { ClientRequest } from '@/lib/types'

const STATUS_STYLES: Record<ClientRequest['status'], string> = {
  new: 'bg-amber-600/20 border-amber-600/30 text-amber-400',
  in_progress: 'bg-blue-600/20 border-blue-600/30 text-blue-400',
  completed: 'bg-green-600/20 border-green-600/30 text-green-400',
  archived: 'bg-charcoal-700/40 border-charcoal-600/30 text-charcoal-500',
}

const STATUS_LABELS: Record<ClientRequest['status'], string> = {
  new: 'New', in_progress: 'In Progress', completed: 'Completed', archived: 'Archived',
}

export default function RequestsAdmin() {
  const [requests, setRequests] = useState<ClientRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<ClientRequest['status'] | 'all'>('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('client_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setRequests(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchRequests() }, [fetchRequests])

  const updateStatus = async (id: string, status: ClientRequest['status']) => {
    setUpdating(id)
    const supabase = createClient()
    await supabase.from('client_requests').update({ status }).eq('id', id)
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r))
    setUpdating(null)
  }

  const filtered = requests.filter((r) => {
    const matchesFilter = filter === 'all' || r.status === filter
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.service.toLowerCase().includes(q) ||
      (r.company ?? '').toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  const counts = {
    all: requests.length,
    new: requests.filter((r) => r.status === 'new').length,
    in_progress: requests.filter((r) => r.status === 'in_progress').length,
    completed: requests.filter((r) => r.status === 'completed').length,
    archived: requests.filter((r) => r.status === 'archived').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Client Requests</h1>
          <p className="text-charcoal-400 mt-1">{requests.length} total enquiries received</p>
        </div>
        <button onClick={fetchRequests} className="p-2.5 border border-charcoal-700 text-charcoal-400 hover:text-white rounded-xl transition-all duration-200">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-charcoal-500" />
          <input
            className="input-field pl-10"
            placeholder="Search by name, email, service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status filters */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'new', 'in_progress', 'completed', 'archived'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === s ? 'bg-amber-600 text-white' : 'bg-charcoal-900 border border-charcoal-800 text-charcoal-400 hover:border-amber-600/30 hover:text-charcoal-200'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_LABELS[s]} <span className="ml-1 opacity-70">({counts[s]})</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-amber-500 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-16 text-center text-charcoal-400">
          No requests match your current filter.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden">
              {/* Row */}
              <div
                className="flex items-start sm:items-center justify-between gap-4 p-4 cursor-pointer hover:bg-charcoal-800/50 transition-colors"
                onClick={() => setExpanded(expanded === req.id ? null : req.id)}
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className={`hidden sm:flex w-9 h-9 rounded-xl items-center justify-center border text-xs font-bold flex-shrink-0 ${STATUS_STYLES[req.status]}`}>
                    {req.status === 'new' ? <AlertCircle className="w-4 h-4" /> : req.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-white font-semibold">{req.name}</span>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${STATUS_STYLES[req.status]}`}>
                        {STATUS_LABELS[req.status]}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-charcoal-400 text-xs">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{req.email}</span>
                      <span className="font-medium text-amber-500">{req.service}</span>
                      <span>{new Date(req.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-charcoal-500 flex-shrink-0 transition-transform duration-200 ${expanded === req.id ? 'rotate-180' : ''}`} />
              </div>

              {/* Expanded detail */}
              {expanded === req.id && (
                <div className="border-t border-charcoal-800 p-5 space-y-5">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    {req.phone && (
                      <div className="flex items-center gap-2 text-charcoal-300">
                        <Phone className="w-4 h-4 text-amber-500" />
                        <span>{req.phone}</span>
                      </div>
                    )}
                    {req.company && (
                      <div className="flex items-center gap-2 text-charcoal-300">
                        <Building2 className="w-4 h-4 text-amber-500" />
                        <span>{req.company}</span>
                      </div>
                    )}
                    {req.budget && (
                      <div className="flex items-center gap-2 text-charcoal-300">
                        <DollarSign className="w-4 h-4 text-amber-500" />
                        <span>{req.budget}</span>
                      </div>
                    )}
                    {req.timeline && (
                      <div className="flex items-center gap-2 text-charcoal-300">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>{req.timeline}</span>
                      </div>
                    )}
                  </div>

                  {req.message && (
                    <div className="bg-charcoal-800 rounded-xl p-4">
                      <p className="text-charcoal-400 text-xs font-medium mb-2 uppercase tracking-widest">Message</p>
                      <p className="text-charcoal-200 text-sm leading-relaxed">{req.message}</p>
                    </div>
                  )}

                  {/* Status update */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-charcoal-800">
                    <span className="text-charcoal-400 text-sm">Update status:</span>
                    {(['new', 'in_progress', 'completed', 'archived'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(req.id, s)}
                        disabled={req.status === s || updating === req.id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 disabled:opacity-40 ${
                          req.status === s ? STATUS_STYLES[s] : 'bg-charcoal-800 border-charcoal-700 text-charcoal-400 hover:border-amber-600/30'
                        }`}
                      >
                        {updating === req.id ? <Loader2 className="w-3 h-3 animate-spin inline" /> : STATUS_LABELS[s]}
                      </button>
                    ))}
                    <a
                      href={`mailto:${req.email}?subject=Re: Your SHG Designs Request`}
                      className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-all duration-200"
                    >
                      <Mail className="w-3.5 h-3.5" /> Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
