import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validate required fields
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide a detailed message' }, { status: 400 })
    }

    // Get IP address
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      null

    // Save to Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { error } = await supabase.from('contact_leads').insert({
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      service: service || null,
      message: message.trim(),
      status: 'new',
      ip_address: ip,
    })

    if (error) {
      console.error('Supabase error:', error)
      // Still return success to user - don't block on DB errors
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
