'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer
      className="px-8 py-8"
      style={{ backgroundColor: 'hsl(215 100% 97%)' }}
    >
      {/* Main footer card */}
      <div className="max-w-[44rem] mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Main layout — responsive: stacked on small, row on >=670px */}
        <div className="flex flex-col min-[670px]:flex-row items-center justify-between px-8 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10 min-w-0 gap-6">
          {/* Logo: below on small screens, left on large */}
          <div className="flex items-center justify-center shrink-0 min-[670px]:mr-4 order-2 min-[670px]:order-1 w-full min-[670px]:w-auto">
            <Link
              href="/"
              className="font-bold text-gray-900 hover:text-primary-600 transition-colors block leading-none"
              style={{
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: 'clamp(2.75rem, 4vw + 0.75rem, 3.75rem)',
                marginLeft: 'clamp(8px, 2vw, 20px)',
                marginRight: 'clamp(8px, 2vw, 20px)',
              }}
            >
              turko
            </Link>
          </div>

          {/* Pages + contacts: above on small screens, right on large */}
          <div className="min-w-0 flex-1 flex flex-row justify-evenly items-center order-1 min-[670px]:order-2 w-full">
            <div className="hidden min-[430px]:block w-auto shrink min-w-0">
              <ul className="space-y-2.5">
                <li><Link href="/kursused/koolitus" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">{t('training')}</Link></li>
                <li><Link href="/koolituskalender" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">{t('calendar')}</Link></li>
                <li><Link href="/keskusest" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">{t('about')}</Link></li>
                <li><Link href="/kontaktid" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">{t('contacts')}</Link></li>
                <li><Link href="/registreerimine" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">{t('registration')}</Link></li>
              </ul>
            </div>

            <div className="w-auto shrink min-w-0 self-stretch">
              <ul className="h-full flex flex-col justify-between gap-4 items-center min-[430px]:items-start text-center min-[430px]:text-left">
                <li>
                  <p className="text-xs text-gray-500">{t('phone')}</p>
                  <p className="text-sm text-gray-600 mt-1">+3725290528</p>
                </li>
                <li>
                  <p className="text-xs text-gray-500 font-normal">{t('email')}</p>
                  <p className="text-sm text-gray-600 mt-1">turko@hot.ee</p>
                </li>
                <li>
                  <p className="text-xs text-gray-500">{t('address')}</p>
                  <Link href="/kontaktid" className="text-sm text-gray-600 mt-1 block hover:text-primary-600 transition-colors break-words">
                    {t('addressLine1')}<br />
                    {t('addressLine2')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom strip — outside the card */}
      <div className="flex flex-auto max-w-[44rem] mx-auto mt-4 flex-row-reverse flex-wrap justify-center min-[600px]:justify-between items-center gap-x-6 gap-y-2 text-sm text-gray-500">
        <div className="flex flex-col min-[430px]:flex-row items-center gap-2 min-[430px]:gap-6 shrink-0">
          <Link href="/privaatsuspoliitika" className="hover:text-primary-600 transition-colors">
            {t('privacy')}
          </Link>
          <Link href="/kasutustingimused" className="hover:text-primary-600 transition-colors">
            {t('terms')}
          </Link>
        </div>
        <p>{t('copyright')}</p>
      </div>
    </footer>
  )
}
