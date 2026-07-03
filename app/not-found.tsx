import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="et">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(6rem, 20vw, 10rem)',
              fontWeight: 700,
              color: '#2563eb',
              lineHeight: 1,
              margin: '0 0 1.5rem',
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: '0 0 0.75rem' }}>
            Lehekülge ei leitud
          </h1>
          <p style={{ color: '#6b7280', margin: '0 0 2.5rem' }}>
            Kahjuks sellist lehekülge ei eksisteeri.
          </p>
          <Link
            href="/et"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: '#fff',
              borderRadius: '0.5rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Tagasi avalehele
          </Link>
        </div>
      </body>
    </html>
  )
}
