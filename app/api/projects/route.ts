import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, description, thumbnail_url, live_url, case_study_url, technologies, category, featured } = body

  if (!title || !description || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase.from('projects').insert([{
    title: title.trim(),
    description: description.trim(),
    thumbnail_url: thumbnail_url || null,
    live_url: live_url || null,
    case_study_url: case_study_url || null,
    technologies: Array.isArray(technologies) ? technologies : [],
    category,
    featured: !!featured,
  }]).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
