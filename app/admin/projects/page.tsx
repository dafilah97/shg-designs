'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2, Loader2, X, Upload, CheckCircle, AlertCircle, Tag, Star, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import type { Project } from '@/lib/types'

const CATEGORIES = ['Website', 'E-Commerce', 'CMS', 'Branding', 'Domain & Email']
const EMPTY_FORM = {
  title: '', description: '', thumbnail_url: '', live_url: '', case_study_url: '',
  technologies: '', category: 'Website', featured: false,
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    setProjects(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const openNew = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true) }
  const openEdit = (p: Project) => {
    setEditing(p)
    setForm({
      title: p.title, description: p.description, thumbnail_url: p.thumbnail_url ?? '',
      live_url: p.live_url ?? '', case_study_url: p.case_study_url ?? '',
      technologies: p.technologies.join(', '), category: p.category, featured: p.featured,
    })
    setShowForm(true)
  }
  const closeForm = () => { setShowForm(false); setEditing(null) }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImg(true)
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()
      const path = `projects/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('shg-assets').upload(path, file)
      if (error) throw error
      const { data } = supabase.storage.from('shg-assets').getPublicUrl(path)
      setForm((f) => ({ ...f, thumbnail_url: data.publicUrl }))
      showToast('Image uploaded successfully', 'success')
    } catch {
      showToast('Image upload failed', 'error')
    } finally {
      setUploadingImg(false)
    }
  }

  const handleSave = async () => {
    if (!form.title || !form.description || !form.category) {
      showToast('Title, description and category are required.', 'error'); return
    }
    setSaving(true)
    const supabase = createClient()
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      thumbnail_url: form.thumbnail_url || null,
      live_url: form.live_url || null,
      case_study_url: form.case_study_url || null,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      category: form.category,
      featured: form.featured,
    }
    let err: any = null
    if (editing) {
      const res = await supabase.from('projects').update(payload).eq('id', editing.id)
      err = res.error
    } else {
      const res = await supabase.from('projects').insert([payload])
      err = res.error
    }
    setSaving(false)
    if (err) { showToast('Save failed: ' + err.message, 'error'); return }
    showToast(editing ? 'Project updated!' : 'Project added!', 'success')
    closeForm(); fetchProjects()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this project?')) return
    setDeleting(id)
    const supabase = createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    setDeleting(null)
    if (error) showToast('Delete failed', 'error')
    else { showToast('Project deleted', 'success'); fetchProjects() }
  }

  return (
    <div className="space-y-6">
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
          <h1 className="font-display text-3xl font-bold text-white">Projects</h1>
          <p className="text-charcoal-400 mt-1">Manage your portfolio — {projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-glow-amber">
          <Plus className="w-5 h-5" /> Add Project
        </button>
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-amber-500 animate-spin" /></div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-16 text-center">
          <p className="text-charcoal-400 mb-4">No projects yet. Add your first one.</p>
          <button onClick={openNew} className="btn-primary">Add First Project</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.id} className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-40 bg-charcoal-800">
                {p.thumbnail_url ? (
                  <Image src={p.thumbnail_url} alt={p.title} fill className="object-cover" sizes="400px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-charcoal-600 text-4xl font-display font-bold">{p.title[0]}</div>
                )}
                {p.featured && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-600 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3" /> Featured
                  </span>
                )}
                <span className="absolute top-2 right-2 px-2 py-0.5 glass-dark text-charcoal-300 text-xs rounded-lg">{p.category}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-display font-semibold text-white text-lg mb-1">{p.title}</h3>
                <p className="text-charcoal-400 text-sm leading-relaxed mb-3 flex-1 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-600/10 border border-amber-600/20 text-amber-400 text-xs rounded-lg">
                      <Tag className="w-3 h-3" />{t}
                    </span>
                  ))}
                  {p.technologies.length > 3 && (
                    <span className="text-charcoal-500 text-xs px-2 py-0.5">+{p.technologies.length - 3}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 hover:text-white text-sm rounded-xl transition-all duration-200">
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-800/30 text-red-400 text-sm rounded-xl transition-all duration-200 disabled:opacity-50">
                    {deleting === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative w-full max-w-2xl bg-charcoal-900 border border-charcoal-700 rounded-2xl shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800">
              <h2 className="font-display font-bold text-white text-xl">{editing ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={closeForm} className="p-1.5 text-charcoal-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* Image upload */}
              <div>
                <label className="block text-charcoal-300 text-sm font-medium mb-2">Project Thumbnail</label>
                {form.thumbnail_url && (
                  <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-charcoal-800">
                    <Image src={form.thumbnail_url} alt="preview" fill className="object-cover" sizes="600px" />
                    <button onClick={() => setForm((f) => ({ ...f, thumbnail_url: '' }))} className="absolute top-2 right-2 p-1.5 bg-red-600 rounded-lg text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-charcoal-700 hover:border-amber-600 rounded-xl text-charcoal-400 hover:text-amber-400 text-sm cursor-pointer transition-all duration-200 ${uploadingImg ? 'opacity-60' : ''}`}>
                  {uploadingImg ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingImg ? 'Uploading…' : 'Upload Image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImg} />
                </label>
                <p className="text-charcoal-500 text-xs mt-1.5">Or paste a URL below</p>
                <input className="input-field mt-2" placeholder="https://..." value={form.thumbnail_url} onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))} />
              </div>

              {/* Title */}
              <div>
                <label className="block text-charcoal-300 text-sm font-medium mb-1.5">Project Title <span className="text-amber-500">*</span></label>
                <input className="input-field" placeholder="My Awesome Project" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>

              {/* Description */}
              <div>
                <label className="block text-charcoal-300 text-sm font-medium mb-1.5">Description <span className="text-amber-500">*</span></label>
                <textarea className="input-field resize-none h-28" placeholder="Brief description of the project…" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>

              {/* Category */}
              <div>
                <label className="block text-charcoal-300 text-sm font-medium mb-2">Category <span className="text-amber-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c} type="button" onClick={() => setForm((f) => ({ ...f, category: c }))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${form.category === c ? 'bg-amber-600 text-white' : 'bg-charcoal-800 border border-charcoal-700 text-charcoal-400 hover:border-amber-600/50'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-charcoal-300 text-sm font-medium mb-1.5">
                  Technologies <span className="text-charcoal-500 font-normal">(comma-separated)</span>
                </label>
                <input className="input-field" placeholder="Next.js, Supabase, Tailwind CSS" value={form.technologies} onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))} />
              </div>

              {/* URLs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-1.5">
                    <ExternalLink className="inline w-3.5 h-3.5 mr-1" />Live URL
                  </label>
                  <input className="input-field" placeholder="https://yoursite.com" value={form.live_url} onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-1.5">Case Study URL</label>
                  <input className="input-field" placeholder="https://..." value={form.case_study_url} onChange={(e) => setForm((f) => ({ ...f, case_study_url: e.target.value }))} />
                </div>
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form.featured ? 'bg-amber-600' : 'bg-charcoal-700'}`} onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.featured ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
                <span className="text-charcoal-300 text-sm font-medium">Mark as Featured</span>
                <Star className={`w-4 h-4 ${form.featured ? 'text-amber-500' : 'text-charcoal-600'}`} />
              </label>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-charcoal-800">
              <button onClick={closeForm} className="px-5 py-2.5 border border-charcoal-700 text-charcoal-300 hover:text-white rounded-xl text-sm font-medium transition-all duration-200">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-all duration-200">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
