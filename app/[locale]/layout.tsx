import { Inter, Manrope } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import '../globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const BASE_URL = 'https://www.turvakoolitus.eu'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? `/${locale}`

  const otherLocale = locale === 'et' ? 'ru' : 'et'
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return {
    alternates: {
      canonical: `${BASE_URL}${pathname}`,
      languages: {
        'et': `${BASE_URL}${pathname.replace(`/${locale}`, '/et')}`,
        'ru': `${BASE_URL}${pathname.replace(`/${locale}`, '/ru')}`,
        'x-default': `${BASE_URL}${pathname.replace(`/${locale}`, '/et')}`,
      },
    },
  }
}

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
