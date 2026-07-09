import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone, company, service, budget, timeline, message } = body

  if (!name?.trim() || !email?.trim() || !service?.trim()) {
    return NextResponse.json({ error: 'Name, email and service are required.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'SHG Designs <noreply@sesigohivegroup.co.bw>',
    to: 'info.sesigohive@gmail.com',
    replyTo: email,
    subject: `New Quote Request — ${service} from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e5e5e5;border-radius:12px;">
        <h2 style="color:#d97706;margin-bottom:4px;">New Quote Request</h2>
        <p style="color:#737373;margin-top:0;">Submitted via sesigohivegroup.co.bw</p>
        <hr style="border:none;border-top:1px solid #262626;margin:20px 0;" />
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#737373;width:140px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#737373;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#d97706;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:#737373;">Phone</td><td style="padding:8px 0;color:#e5e5e5;">${phone}</td></tr>` : ''}
          ${company ? `<tr><td style="padding:8px 0;color:#737373;">Company</td><td style="padding:8px 0;color:#e5e5e5;">${company}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#737373;">Service</td><td style="padding:8px 0;color:#d97706;font-weight:600;">${service}</td></tr>
          ${budget ? `<tr><td style="padding:8px 0;color:#737373;">Budget</td><td style="padding:8px 0;color:#e5e5e5;">${budget}</td></tr>` : ''}
          ${timeline ? `<tr><td style="padding:8px 0;color:#737373;">Timeline</td><td style="padding:8px 0;color:#e5e5e5;">${timeline}</td></tr>` : ''}
        </table>
        ${message ? `
        <hr style="border:none;border-top:1px solid #262626;margin:20px 0;" />
        <p style="color:#737373;font-size:13px;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
        <p style="color:#e5e5e5;line-height:1.6;background:#141414;padding:16px;border-radius:8px;border-left:3px solid #d97706;">${message}</p>
        ` : ''}
        <hr style="border:none;border-top:1px solid #262626;margin:20px 0;" />
        <p style="color:#525252;font-size:12px;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  })

  if (error) return NextResponse.json({ error: 'Failed to send. Please try WhatsApp instead.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
