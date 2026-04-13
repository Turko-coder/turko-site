'use client'

import { useTranslations } from 'next-intl'

export default function Oppetoo() {
  const t = useTranslations('oppetoo')
  return (
    <div className="max-w-4xl mx-auto page-gutter-x py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{t('title')}</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">{t('intro')}</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">{t('methodsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">{t('lectures')}</h3>
            <p className="text-gray-600">{t('lecturesDesc')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">{t('practice')}</h3>
            <p className="text-gray-600">{t('practiceDesc')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">{t('groupWork')}</h3>
            <p className="text-gray-600">{t('groupWorkDesc')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">{t('selfStudy')}</h3>
            <p className="text-gray-600">{t('selfStudyDesc')}</p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">{t('materialsTitle')}</h2>
        <p className="text-gray-600 mb-4">{t('materialsIntro')}</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
          <li>{t('material1')}</li>
          <li>{t('material2')}</li>
          <li>{t('material3')}</li>
          <li>{t('material4')}</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">{t('assessmentTitle')}</h2>
        <p className="text-gray-600 mb-4">{t('assessmentDesc')}</p>
        <div className="bg-primary-50 p-6 rounded-lg mt-8">
          <p className="text-gray-700">{t('qualityNote')}</p>
        </div>
      </div>
    </div>
  )
}
