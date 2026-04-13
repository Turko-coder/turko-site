'use client'

import { useTranslations } from 'next-intl'

export default function TegevuseAlus() {
  const t = useTranslations('tegevuseAlus')
  return (
    <div className="max-w-4xl mx-auto page-gutter-x py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{t('title')}</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-4">{t('intro')}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">{t('legalTitle')}</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
          <li>{t('law1')}</li>
          <li>{t('law2')}</li>
          <li>{t('law3')}</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">{t('licensesTitle')}</h2>
        <p className="text-gray-600 mb-4">{t('licensesDesc')}</p>
      </div>
    </div>
  )
}
