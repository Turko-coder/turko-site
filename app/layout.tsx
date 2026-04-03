import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

const manrope = Manrope({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Turvakoolitus - Turvakoolituse Keskus',
  description: 'Turvakoolituse keskus - kvaliteetsed turvakoolitused ja koolitused',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="et">
      <body className={`${inter.className} ${manrope.variable} antialiased`}>
        <Navigation />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
