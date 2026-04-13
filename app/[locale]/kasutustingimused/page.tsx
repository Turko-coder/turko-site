'use client'

import { useTranslations } from 'next-intl'

export default function KasutustingimusedPage() {
  const t = useTranslations('terms')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[48rem] mx-auto page-gutter-x py-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{t('title')}</h1>
        <p className="text-sm text-gray-500">{t('effectiveDate')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s1Title')}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{t('s1p1')}</p>
        <p className="text-gray-600 leading-relaxed">{t('s1p2')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s2Title')}</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <p className="text-gray-700">{t('s2company')}</p>
          <p className="text-gray-600 mt-1">{t('s2address')}</p>
          <p className="text-gray-600 mt-1">{t('s2email')}</p>
          <p className="text-gray-600 mt-1">{t('s2phone')}</p>
        </div>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s3Title')}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{t('s3p1')}</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>{t('s3li1')}</li>
          <li>{t('s3li2')}</li>
          <li>{t('s3li3')}</li>
        </ul>
        <p className="text-gray-600 mt-4 leading-relaxed">{t('s3p2')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s4Title')}</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>{t('s4li1')}</li>
          <li>{t('s4li2')}</li>
          <li>{t('s4li3')}</li>
          <li>{t('s4li4')}</li>
        </ul>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s5Title')}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{t('s5p1')}</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>{t('s5li1')}</li>
          <li>{t('s5li2')}</li>
          <li>{t('s5li3')}</li>
        </ul>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s6Title')}</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>{t('s6li1')}</li>
          <li>{t('s6li2')}</li>
          <li>{t('s6li3')}</li>
          <li>{t('s6li4')}</li>
        </ul>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s7Title')}</h2>
        <p className="text-gray-600 leading-relaxed">{t('s7p1')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s8Title')}</h2>
        <p className="text-gray-600 leading-relaxed">{t('s8p1')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s9Title')}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{t('s9p1')}</p>
        <p className="text-gray-600 leading-relaxed">{t('s9p2')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s10Title')}</h2>
        <p className="text-gray-600 leading-relaxed">{t('s10p1')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s11Title')}</h2>
        <p className="text-gray-600 leading-relaxed">{t('s11p1')}</p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('s12Title')}</h2>
        <p className="text-gray-600 leading-relaxed">{t('s12p1')}</p>
      </div>
    </div>
  )
}
