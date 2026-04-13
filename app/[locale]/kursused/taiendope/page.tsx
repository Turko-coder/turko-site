'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

const LEGAL_PDF_HREF = '/documents/Turvategevuse-eeskiri.pdf'

const legalDocLinkClass =
  'font-medium text-primary-600 underline decoration-primary-600/40 underline-offset-2 transition-colors hover:text-primary-700 hover:decoration-primary-700'

export default function Taiendope() {
  const t = useTranslations('courses')
  const tNav = useTranslations('nav')

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[44rem] page-gutter-x py-16">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{t('refresher.title')}</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">{t('refresher.subtitle')}</p>
        </div>

        <section className="mb-9 md:mb-12" aria-labelledby="refresher-includes-heading">
          <h2 id="refresher-includes-heading" className="mb-4 text-2xl font-bold text-gray-900">
            {t('refresher.includesTitle')}
          </h2>
          <div className="space-y-4 leading-relaxed text-gray-600">
            <p>{t('refresher.pIncludes1')}</p>
            <p>
              {t('refresher.pIncludes2Before')}
              <a
                href={LEGAL_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={legalDocLinkClass}
                aria-label={t('refresher.legalDocLinkAria')}
              >
                {t('refresher.legalDocLinkText')}
              </a>
              {t('refresher.pIncludes2After')}
            </p>
          </div>
        </section>

        <section className="mb-4 md:mb-6" aria-labelledby="refresher-registration-heading">
          <h2 id="refresher-registration-heading" className="mb-4 text-2xl font-bold text-gray-900">
            {t('refresher.registrationTitle')}
          </h2>
          <p className="mb-8 leading-relaxed text-gray-600">{t('refresher.pRegistration')}</p>

          <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white shadow-lg md:p-10">
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="max-w-md text-primary-100 leading-relaxed">{t('refresher.ctaText')}</p>
              <Link
                href="/kontaktid"
                className="btn-press inline-flex items-center justify-center rounded-lg border-2 border-white bg-white px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-gray-100"
              >
                {tNav('contacts')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
