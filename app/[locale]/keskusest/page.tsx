'use client'

import { useLocale, useTranslations } from 'next-intl'

const PARTNER_ENTRIES = [
  { id: 'police' as const, image: '/partners/politsei.png', url: 'https://www.politsei.ee' },
  { id: 'rescue' as const, image: '/partners/paasteamet.png', url: 'https://www.rescue.ee/et' },
  { id: 'etel' as const, image: '/partners/etel.png', url: 'https://www.etel.ee/' },
  { id: 'shi' as const, image: '/partners/shi.png', url: 'https://shi.ee/' },
  { id: 'tpsc' as const, image: '/partners/tpsc.png', url: 'http://www.shooting.ee/' },
  { id: 'taifu' as const, image: '/partners/taifu.png', url: 'https://taifu.ee/' },
] as const

type PartnerRaw = Partial<{
  name: string
  lines: string[]
  shortDescription: string
  mobileHint: string
}>

type PartnerCopy = { name: string; lines: string[]; shortDescription: string }

const ET_DOCUMENTS = [
  { href: '/documents/Isikuandmete kaitse.pdf', label: 'Isikuandmete kaitse.pdf' },
  { href: '/documents/Kvaliteedi tagamise juhend.pdf', label: 'Kvaliteedi tagamise juhend.pdf' },
  { href: '/documents/Õppekorralduse alused.pdf', label: 'Õppekorralduse alused.pdf' },
]

const RU_DOCUMENTS = [
  { href: '/documents/RUS/Защита персональных данных.pdf', label: 'Защита персональных данных.pdf' },
  { href: '/documents/RUS/Руководство по обеспечению качества.pdf', label: 'Руководство по обеспечению качества.pdf' },
  { href: '/documents/RUS/Основы организации обучения.pdf', label: 'Основы организации обучения.pdf' },
]

export default function Keskusest() {
  const t = useTranslations('about')
  const locale = useLocale()
  const documents = locale === 'ru' ? RU_DOCUMENTS : ET_DOCUMENTS
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[48rem] mx-auto page-gutter-x py-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{t('title')}</h1>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('historyTitle')}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {t('historyP1')}
        </p>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {t('historyP2')}
        </p>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {t('historyP3')}
        </p>
        <p className="text-gray-600 leading-relaxed">
          {t('historyP4')}
        </p>

        <h2 id="partnerid" className="scroll-mt-24 text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">
          {t('partnersTitle')}
        </h2>
        <div className="grid grid-cols-1 min-[670px]:grid-cols-2 min-[870px]:grid-cols-3 gap-4">
          {PARTNER_ENTRIES.map((partner) => {
            const raw = t.raw(`partners.${partner.id}`) as PartnerRaw | undefined
            const shortFromRaw =
              typeof raw?.shortDescription === 'string' ? raw.shortDescription.trim() : ''
            const hintFromRaw = typeof raw?.mobileHint === 'string' ? raw.mobileHint.trim() : ''
            const copy: PartnerCopy = {
              name: typeof raw?.name === 'string' ? raw.name : partner.id,
              lines: Array.isArray(raw?.lines) ? raw.lines : [],
              shortDescription: shortFromRaw || hintFromRaw,
            }
            const lines = copy.lines
            const nameOnMobileWideLinesOnDesktop =
              partner.id === 'shi' || partner.id === 'police'
            return (
              <div key={partner.id} className="min-[870px]:transition-transform min-[870px]:duration-300">
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-start gap-4 min-h-[8rem] p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer min-[870px]:relative min-[870px]:justify-center min-[870px]:h-36 min-[870px]:px-4 min-[870px]:py-4 min-[870px]:shadow-md min-[870px]:transition-all min-[870px]:duration-300 min-[870px]:hover:shadow-xl min-[870px]:hover:border-primary-300 min-[870px]:hover:-translate-y-1 min-[870px]:overflow-hidden"
                >
                  <img
                    src={partner.image}
                    alt={copy.name}
                    className="w-24 h-24 shrink-0 object-contain min-[870px]:w-24 min-[870px]:h-24 min-[870px]:transition-all min-[870px]:duration-300 min-[870px]:scale-[1.3] min-[870px]:group-hover:scale-100 min-[870px]:group-hover:blur-[4px] min-[870px]:group-hover:saturate-[0.8]"
                  />
                  <div className="min-w-0 text-left min-[870px]:absolute min-[870px]:inset-x-0 min-[870px]:bottom-0 min-[870px]:pt-2 min-[870px]:pb-4 min-[870px]:pl-[1.33rem] min-[870px]:pr-2 min-[870px]:transition-transform min-[870px]:duration-300 min-[870px]:translate-y-full min-[870px]:group-hover:translate-y-0">
                    <p
                      className={`text-base min-[870px]:text-xl text-gray-900 leading-tight font-bold ${lines.length > 3 ? 'line-clamp-4' : 'line-clamp-3'}`}
                      style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
                    >
                      {lines.length > 0 ? (
                        nameOnMobileWideLinesOnDesktop ? (
                          <>
                            <span className="min-[870px]:hidden">{copy.name}</span>
                            <span className="hidden min-[870px]:inline">
                              {lines.map((line, i) => (
                                <span key={i}>
                                  {i > 0 && <br />}
                                  {line}
                                </span>
                              ))}
                            </span>
                          </>
                        ) : (
                          lines.map((line, i) => (
                            <span key={i}>
                              {i > 0 && <br />}
                              {line}
                            </span>
                          ))
                        )
                      ) : (
                        copy.name
                      )}
                    </p>
                    {copy.shortDescription ? (
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{copy.shortDescription}</p>
                    ) : null}
                  </div>
                </a>
              </div>
            )
          })}
        </div>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('licenseTitle')}</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-0.5">{t('licenseLabel')}</p>
              <p className="text-gray-900 text-xl font-bold" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                {t('licenseNumber')}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clipRule="evenodd" />
                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-0.5">{t('noticeLabel')}</p>
              <p className="text-gray-900 text-xl font-bold" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                {t('noticeNumber')}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">{t('documentsTitle')}</h2>
        <div className="flex flex-col gap-3">
          {documents.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="flex min-w-0 items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 shrink-0 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="min-w-0 truncate">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
