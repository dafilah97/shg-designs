'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Send, CheckCircle2, Loader2, User, Mail, Phone, Building2, Briefcase, DollarSign, Clock, MessageSquare } from 'lucide-react'

const SERVICES = ['Website Design', 'Domain Management', 'Business Email', 'Payment Gateway', 'Custom CMS', 'Brand Identity', 'Full Digital Suite', 'Other']
const BUDGETS = ['Under $500', '$500 – $1,500', '$1,500 – $5,000', '$5,000 – $15,000', '$15,000+', 'To be discussed']
const TIMELINES = ['ASAP (< 2 weeks)', '1 Month', '2–3 Months', '3–6 Months', 'Flexible']

type FormData = {
  name: string; email: string; phone: string; company: string
  service: string; budget: string; timeline: string; message: string
}

const EMPTY: FormData = { name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' }

const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Project Details', icon: Briefcase },
  { id: 3, label: 'Message', icon: MessageSquare },
]

export default function RequestForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.email.trim()
    if (step === 2) return form.service
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try WhatsApp instead.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="request" className="section-pad bg-charcoal-950">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-600/20 border border-amber-600/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="font-display text-3xl font-bold text-white mb-3">Request Received!</h3>
          <p className="text-charcoal-300 leading-relaxed mb-8">
            Thank you, <strong className="text-amber-400">{form.name}</strong>. Our team will review your request and reach out within 24 hours. Keep an eye on <strong className="text-amber-400">{form.email}</strong>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm(EMPTY); setStep(1) }}
            className="btn-outline"
          >
            Submit Another Request
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="request" className="section-pad bg-charcoal-950 relative overflow-hidden">
      <div className="absolute inset-0 hex-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">Get Started</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Request a <span className="text-gradient">Quote</span>
          </h2>
          <p className="text-charcoal-300 text-lg">Tell us about your project and we will build you something extraordinary.</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => {
            const Icon = s.icon
            const active = step === s.id
            const done = step > s.id
            return (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active ? 'bg-amber-600 text-white' : done ? 'bg-amber-600/20 text-amber-400' : 'glass text-charcoal-400'
                }`}>
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.id}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px mx-1 transition-colors duration-300 ${step > s.id ? 'bg-amber-600' : 'bg-charcoal-700'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Form card */}
        <div className="glass-dark rounded-2xl p-8 shadow-glass">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-display font-semibold text-white text-xl mb-6">Your Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-1.5">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-charcoal-500" />
                    <input
                      className="input-field pl-10"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-1.5">
                    Email Address <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-charcoal-500" />
                    <input
                      className="input-field pl-10"
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-charcoal-500" />
                    <input
                      className="input-field pl-10"
                      placeholder="+267 71 234 567"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-1.5">Company / Business</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-charcoal-500" />
                    <input
                      className="input-field pl-10"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-white text-xl mb-6">Project Specifics</h3>
              <div>
                <label className="block text-charcoal-300 text-sm font-medium mb-3">
                  Service Required <span className="text-amber-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set('service', s)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 ${
                        form.service === s
                          ? 'bg-amber-600 text-white border border-amber-500'
                          : 'bg-charcoal-800 border border-charcoal-700 text-charcoal-300 hover:border-amber-600/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-2">
                    <DollarSign className="inline w-4 h-4 mr-1" />Budget Range
                  </label>
                  <select
                    className="input-field"
                    value={form.budget}
                    onChange={(e) => set('budget', e.target.value)}
                  >
                    <option value="">Select budget</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-charcoal-300 text-sm font-medium mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />Timeline
                  </label>
                  <select
                    className="input-field"
                    value={form.timeline}
                    onChange={(e) => set('timeline', e.target.value)}
                  >
                    <option value="">Select timeline</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="font-display font-semibold text-white text-xl mb-6">Tell Us More</h3>
              <div>
                <label className="block text-charcoal-300 text-sm font-medium mb-1.5">
                  Project Description
                </label>
                <textarea
                  className="input-field resize-none h-40"
                  placeholder="Describe your project, goals, and any specific requirements…"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                />
              </div>
              {/* Summary */}
              <div className="glass-amber rounded-xl p-4 text-sm">
                <p className="text-charcoal-300 mb-2 font-medium text-amber-400">Request Summary</p>
                <div className="space-y-1 text-charcoal-300">
                  <p><span className="text-charcoal-400">Name:</span> {form.name}</p>
                  <p><span className="text-charcoal-400">Email:</span> {form.email}</p>
                  <p><span className="text-charcoal-400">Service:</span> {form.service}</p>
                  {form.budget && <p><span className="text-charcoal-400">Budget:</span> {form.budget}</p>}
                  {form.timeline && <p><span className="text-charcoal-400">Timeline:</span> {form.timeline}</p>}
                </div>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-charcoal-700">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 px-5 py-2.5 border border-charcoal-600 text-charcoal-300 hover:text-white hover:border-charcoal-400 rounded-xl font-medium transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-glow-amber"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {submitting ? 'Sending…' : 'Submit Request'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
