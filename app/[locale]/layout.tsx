import { Inter, Manrope } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-manrope',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'et' | 'ru')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${inter.className} ${manrope.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="relative z-0 min-h-screen pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
