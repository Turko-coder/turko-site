'use client'

import { useTranslations } from 'next-intl'

export default function OppekavadOppetoo() {
  const t = useTranslations('oppekavad')
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto page-gutter-x py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t('title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Õppekavad Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('curriculaTitle')}</h2>
          <p className="text-gray-700 mb-8 leading-relaxed text-lg">
            {t('curriculaIntro')}
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('guardCurriculum')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-sm text-gray-600">{t('durationLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">40 tundi</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('theoryLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">24 tundi</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('practiceLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">16 tundi</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-primary-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('securityCurriculum')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-sm text-gray-600">{t('durationLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">60 tundi</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('theoryLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">36 tundi</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('practiceLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">24 tundi</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-primary-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('leadCurriculum')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="text-sm text-gray-600">{t('durationLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">80 tundi</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('theoryLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">48 tundi</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">{t('practiceLabel')}</span>
                  <span className="ml-2 font-semibold text-gray-900">32 tundi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6">
            <p className="text-gray-700">
              {t('accreditedNote')}
            </p>
          </div>
        </div>

        {/* Õppetöö Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('studyTitle')}</h2>
          <p className="text-gray-700 mb-8 leading-relaxed text-lg">
            {t('studyIntro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('lectures')}</h3>
              <p className="text-gray-600">
                {t('lecturesDesc')}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('practice')}</h3>
              <p className="text-gray-600">
                {t('practiceDesc')}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('groupWork')}</h3>
              <p className="text-gray-600">
                {t('groupWorkDesc')}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{t('selfStudy')}</h3>
              <p className="text-gray-600">
                {t('selfStudyDesc')}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('materialsTitle')}</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('material1')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('material2')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('material3')}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('material4')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
