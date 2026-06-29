'use client'

import { useState, useEffect, useCallback } from 'react'
import { Save, Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { createClient } from '@/lib/supabase'

type ContentEntry = { key: string; label: string; value: string; multiline?: boolean }

const CONTENT_SCHEMA: { section: string; fields: { key: string; label: string; multiline?: boolean }[] }[] = [
  {
    section: 'Hero Section',
    fields: [
      { key: 'hero_headline', label: 'Headline' },
      { key: 'hero_subtext', label: 'Subtext', multiline: true },
      { key: 'hero_cta_label', label: 'CTA Button Label' },
    ],
  },
  {
    section: 'About Section',
    fields: [
      { key: 'about_tagline', label: 'Tagline' },
      { key: 'about_body', label: 'Body Text', multiline: true },
    ],
  },
  {
    section: 'Contact Information',
    fields: [
      { key: 'contact_email', label: 'Email Address' },
      { key: 'contact_phone', label: 'Phone Number' },
      { key: 'contact_address', label: 'Physical Address' },
      { key: 'whatsapp_number', label: 'WhatsApp Number (with country code, no +)' },
    ],
  },
  {
    section: 'Service Pricing',
    fields: [
      { key: 'price_website', label: 'Website Design (starting from)' },
      { key: 'price_domain', label: 'Domain Management (per year)' },
      { key: 'price_email', label: 'Business Email (per mailbox/month)' },
      { key: 'price_payment', label: 'Payment Gateway Integration (once-off)' },
      { key: 'price_cms', label: 'Custom CMS (starting from)' },
    ],
  },
  {
    section: 'Social Media',
    fields: [
      { key: 'social_instagram', label: 'Instagram URL' },
      { key: 'social_facebook', label: 'Facebook URL' },
      { key: 'social_linkedin', label: 'LinkedIn URL' },
      { key: 'social_twitter', label: 'X / Twitter URL' },
    ],
  },
]

export default function ContentAdmin() {
  const [entries, setEntries] = useState<Record<string, string>>({})
  const [original, setOriginal] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchContent = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('site_content').select('key, value')
    const map: Record<string, string> = {}
    data?.forEach((row: { key: string; value: string }) => { map[row.key] = row.value })
    setEntries(map)
    setOriginal(map)
    setLoading(false)
  }, [])

  useEffect(() => { fetchContent() }, [fetchContent])

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const changed = Object.entries(entries).filter(([k, v]) => v !== original[k])
    if (changed.length === 0) { showToast('No changes to save.', 'error'); setSaving(false); return }
    const upserts = changed.map(([key, value]) => ({ key, value }))
    const { error } = await supabase.from('site_content').upsert(upserts, { onConflict: 'key' })
    setSaving(false)
    if (error) showToast('Save failed: ' + error.message, 'error')
    else { showToast(`Saved ${changed.length} update${changed.length > 1 ? 's' : ''} successfully!`, 'success'); setOriginal({ ...entries }) }
  }

  const hasChanges = Object.entries(entries).some(([k, v]) => v !== original[k])

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Site Content</h1>
          <p className="text-charcoal-400 mt-1">Update text across your website — no code required.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchContent} className="p-2.5 border border-charcoal-700 text-charcoal-400 hover:text-white rounded-xl transition-all duration-200">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-glow-amber"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="flex items-center gap-2 px-4 py-3 bg-amber-600/10 border border-amber-600/30 rounded-xl text-amber-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          You have unsaved changes. Click "Save All Changes" to publish them.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-amber-500 animate-spin" /></div>
      ) : (
        <div className="space-y-8">
          {CONTENT_SCHEMA.map(({ section, fields }) => (
            <div key={section} className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-5">
              <h2 className="font-display font-semibold text-white text-lg border-b border-charcoal-800 pb-3">{section}</h2>
              {fields.map(({ key, label, multiline }) => {
                const changed = entries[key] !== original[key] && original[key] !== undefined
                return (
                  <div key={key}>
                    <label className="flex items-center justify-between text-charcoal-300 text-sm font-medium mb-1.5">
                      {label}
                      {changed && <span className="text-amber-500 text-xs font-medium">Modified</span>}
                    </label>
                    {multiline ? (
                      <textarea
                        className={`input-field resize-none h-24 ${changed ? 'border-amber-600/60' : ''}`}
                        value={entries[key] ?? ''}
                        onChange={(e) => setEntries((prev) => ({ ...prev, [key]: e.target.value }))}
                        placeholder={`Enter ${label.toLowerCase()}…`}
                      />
                    ) : (
                      <input
                        className={`input-field ${changed ? 'border-amber-600/60' : ''}`}
                        value={entries[key] ?? ''}
                        onChange={(e) => setEntries((prev) => ({ ...prev, [key]: e.target.value }))}
                        placeholder={`Enter ${label.toLowerCase()}…`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
