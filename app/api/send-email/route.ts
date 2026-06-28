import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type RegistrationPayload = {
  city?: string
  course?: string
  courseMonth?: string
  courseDate?: string
  learningLanguage?: '' | 'estonian' | 'russian'
  learningType?: '' | 'onplace' | 'online'
  name?: string
  email?: string
  phone?: string
  message?: string
  turnstileToken?: string
}

function formatLearningLanguage(lang?: string) {
  if (lang === 'estonian') return 'Eesti keel'
  if (lang === 'russian') return 'Vene keel'
  return '-'
}

function formatLearningType(type?: string) {
  if (type === 'onplace') return 'Kohapeal'
  if (type === 'online') return 'Online'
  return '-'
}

function buildEmailHtml(data: RegistrationPayload) {
  const rows = [
    ['Nimi', data.name],
    ['E-post', data.email],
    ['Telefon', data.phone],
    ['Linn', data.city],
    ['Koolitus', data.course],
    ['Algus (kuupäev)', data.courseDate],
    ['Õppekeel', formatLearningLanguage(data.learningLanguage)],
    ['Õppeviis', formatLearningType(data.learningType)],
    ['Sõnum', data.message],
  ]

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;white-space:nowrap">${label}</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #e5e7eb">${value || '-'}</td>
        </tr>`
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#2563eb;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="margin:0;font-size:20px">Uus registreerimise päring</h2>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse">
          ${tableRows}
        </table>
      </div>
      <p style="color:#6b7280;font-size:12px;margin-top:16px;text-align:center">
        Saadetud automaatselt Turko koolituse veebilehe kaudu
      </p>
    </div>
  `
}

function buildConfirmationHtml(data: RegistrationPayload) {
  const courseLine = data.course
    ? `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 8px">
        <strong>Koolitus:</strong> ${data.course}
      </p>`
    : ''

  const dateLine = data.courseDate
    ? `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 8px">
        <strong>Kuupäev:</strong> ${data.courseDate}
      </p>`
    : ''

  const cityLine = data.city
    ? `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 8px">
        <strong>Linn:</strong> ${data.city}
      </p>`
    : ''

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#2563eb;color:#fff;padding:24px 28px;border-radius:8px 8px 0 0">
        <h2 style="margin:0;font-size:22px">Täname teid registreerimise eest!</h2>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px 28px">
        <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px">
          Lugupeetud ${data.name || 'klient'},
        </p>
        <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px">
          Oleme teie registreerimise kätte saanud ja vaatame selle lähiajal üle.
          Võtame teiega ühendust esimesel võimalusel.
        </p>
        ${courseLine || dateLine || cityLine ? `
          <div style="background:#f9fafb;border-radius:8px;padding:16px 20px;margin:0 0 16px">
            <p style="color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px">Teie päringu andmed</p>
            ${courseLine}${cityLine}${dateLine}
          </div>
        ` : ''}
        <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 4px">
          Lugupidamisega,
        </p>
        <p style="color:#374151;font-size:15px;line-height:1.6;margin:0;font-weight:600">
          Turko Koolitus
        </p>
      </div>
      <p style="color:#9ca3af;font-size:11px;margin-top:16px;text-align:center">
        See on automaatne kinnitus. Palun ärge sellele kirjale vastake.
      </p>
    </div>
  `
}

function buildConfirmationPlainText(data: RegistrationPayload) {
  const lines = [
    `Lugupeetud ${data.name || 'klient'},`,
    '',
    'Täname teid registreerimise eest!',
    '',
    'Oleme teie registreerimise kätte saanud ja vaatame selle lähiajal üle.',
    'Võtame teiega ühendust esimesel võimalusel.',
  ]

  if (data.course) lines.push('', `Koolitus: ${data.course}`)
  if (data.city) lines.push(`Linn: ${data.city}`)
  if (data.courseDate) lines.push(`Kuupäev: ${data.courseDate}`)

  lines.push('', 'Lugupidamisega,', 'Turko Koolitus')
  return lines.join('\n')
}

function buildPlainText(data: RegistrationPayload) {
  return [
    'Uus registreerimise päring:',
    '',
    `Nimi: ${data.name || '-'}`,
    `E-post: ${data.email || '-'}`,
    `Telefon: ${data.phone || '-'}`,
    `Linn: ${data.city || '-'}`,
    `Koolitus: ${data.course || '-'}`,
    `Algus (kuupäev): ${data.courseDate || '-'}`,
    `Õppekeel: ${formatLearningLanguage(data.learningLanguage)}`,
    `Õppeviis: ${formatLearningType(data.learningType)}`,
    `Sõnum: ${data.message || '-'}`,
  ].join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrationPayload = await request.json()

    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Nimi, e-post ja telefon on kohustuslikud väljad.' },
        { status: 400 }
      )
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret) {
      const token = data.turnstileToken
      if (!token) {
        return NextResponse.json(
          { error: 'Turvakontroll ebaõnnestus. Palun laadige leht uuesti.' },
          { status: 400 }
        )
      }
      const verifyRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: turnstileSecret, response: token }),
        }
      )
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return NextResponse.json(
          { error: 'Turvakontroll ebaõnnestus. Palun proovige uuesti.' },
          { status: 400 }
        )
      }
    }

    const brevoUser = process.env.BREVO_USER
    const brevoKey = process.env.BREVO_SMTP_KEY

    if (!brevoUser || !brevoKey) {
      console.error('Missing BREVO_USER or BREVO_SMTP_KEY env variables')
      return NextResponse.json(
        { error: 'E-posti seadistus puudub serveris.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: brevoUser,
        pass: brevoKey,
      },
    })

    const subject = data.course
      ? `Registreerimine: ${data.course}`
      : 'Uus registreerimise päring'

    await Promise.all([
      transporter.sendMail({
        from: '"Turko Koolitus" <info@turvakoolitus.eu>',
        to: 'info@turvakoolitus.eu',
        replyTo: data.email,
        subject,
        text: buildPlainText(data),
        html: buildEmailHtml(data),
      }),
      transporter.sendMail({
        from: '"Turko Koolitus" <info@turvakoolitus.eu>',
        to: data.email,
        subject: 'Teie registreerimine on vastu võetud',
        text: buildConfirmationPlainText(data),
        html: buildConfirmationHtml(data),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json(
      { error: 'E-posti saatmine ebaõnnestus. Palun proovige hiljem uuesti.' },
      { status: 500 }
    )
  }
}
