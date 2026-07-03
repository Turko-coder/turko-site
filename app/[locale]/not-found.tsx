import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-8 py-16">
      <p
        className="font-bold text-primary-600 leading-none mb-6 select-none"
        style={{
          fontSize: 'clamp(6rem, 20vw, 10rem)',
          fontFamily: 'var(--font-manrope), Manrope, sans-serif',
        }}
      >
        404
      </p>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {t('title')}
      </h1>
      <p className="text-gray-500 mb-10 max-w-sm">{t('message')}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
        {t('backHome')}
      </Link>
    </div>
  )
}
