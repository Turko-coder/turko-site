import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.turvakoolitus.eu'),
  title: 'Turvakoolitus - Turvakoolituse Keskus',
  description: 'Turvakoolituse keskus - kvaliteetsed turvakoolitused ja koolitused',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
