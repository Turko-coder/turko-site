import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Turvakoolitus - Turvakoolituse Keskus',
  description: 'Turvakoolituse keskus - kvaliteetsed turvakoolitused ja koolitused',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
