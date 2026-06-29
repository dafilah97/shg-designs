import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('client_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const body = await request.json()

  const { name, email, phone, company, service, budget, timeline, message } = body

  if (!name?.trim() || !email?.trim() || !service?.trim()) {
    return NextResponse.json({ error: 'Name, email and service are required.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const { data, error } = await supabase.from('client_requests').insert([{
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    company: company?.trim() || null,
    service: service.trim(),
    budget: budget || null,
    timeline: timeline || null,
    message: message?.trim() || null,
    status: 'new',
  }]).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
