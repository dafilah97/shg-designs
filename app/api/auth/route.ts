import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return NextResponse.json({ authenticated: false }, { status: 401 })
  return NextResponse.json({ authenticated: true, email: user.email })
}

export async function DELETE() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return NextResponse.json({ success: true })
}
