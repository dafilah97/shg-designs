import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase.from('site_content').select('key, value')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const map: Record<string, string> = {}
  data?.forEach((row: { key: string; value: string }) => { map[row.key] = row.value })
  return NextResponse.json(map)
}

export async function PUT(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const entries = Object.entries(body).map(([key, value]) => ({ key, value: String(value) }))

  if (entries.length === 0) return NextResponse.json({ error: 'No entries provided' }, { status: 400 })

  const { error } = await supabase.from('site_content').upsert(entries, { onConflict: 'key' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ updated: entries.length })
}
