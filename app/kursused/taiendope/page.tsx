'use client'

import Link from 'next/link'

export default function Taiendope() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Täiendõpe</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turvateenistuja igaaastane täienduskoolitus kutsenõuetele vastavuse säilitamiseks
          </p>
        </div>

        {/* Key Info: one card, three columns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-6 px-[12px] mb-12 max-[550px]:py-0 max-[550px]:px-0">
          <div className="flex items-stretch max-[550px]:flex-col">
            {/* Hind */}
            <div className="flex-1 flex flex-col items-center justify-end text-center max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:items-center max-[550px]:gap-x-4 max-[550px]:justify-center max-[550px]:p-6">
              <div className="max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left">
                <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-1" style={{ color: '#177AE5' }}>—</div>
                <p className="text-xs font-medium text-primary-600 -mt-2 mb-3 max-[550px]:mt-0 max-[550px]:mb-0">kokkuleppeline</p>
              </div>
              <div className="w-[7.5rem] flex justify-center max-[550px]:order-1 max-[550px]:w-full max-[550px]:min-w-0 max-[550px]:justify-end">
                <span
                  className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg text-sm font-semibold max-[550px]:w-[6.25rem] max-[550px]:shrink-0"
                  style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.902 7.098a3.75 3.75 0 0 1 3.903-.884.75.75 0 1 0 .498-1.415A5.25 5.25 0 0 0 8.005 9.75H7.5a.75.75 0 0 0 0 1.5h.054a5.281 5.281 0 0 0 0 1.5H7.5a.75.75 0 0 0 0 1.5h.505a5.25 5.25 0 0 0 6.494 2.701.75.75 0 1 0-.498-1.415 3.75 3.75 0 0 1-4.252-1.286h3.001a.75.75 0 0 0 0-1.5H9.075a3.77 3.77 0 0 1 0-1.5h3.675a.75.75 0 0 0 0-1.5h-3c.105-.14.221-.274.348-.402Z" clipRule="evenodd" />
                  </svg>
                  <span>Hind</span>
                </span>
              </div>
            </div>
            <div className="w-px bg-gray-200 flex-shrink-0 self-stretch max-[550px]:self-center max-[550px]:w-[80%] max-[550px]:h-px max-[550px]:shrink-0" aria-hidden />
            {/* Kestus */}
            <div className="flex-1 flex flex-col items-center justify-end text-center max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:items-center max-[550px]:gap-x-4 max-[550px]:justify-center max-[550px]:p-6">
              <div className="max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left">
                <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-1" style={{ color: '#177AE5' }}>16h</div>
                <p className="text-xs font-medium text-primary-600 -mt-2 mb-3 max-[550px]:mt-0 max-[550px]:mb-0">minimaalselt</p>
              </div>
              <div className="w-[7.5rem] flex justify-center max-[550px]:order-1 max-[550px]:w-full max-[550px]:min-w-0 max-[550px]:justify-end">
                <span
                  className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg text-sm font-semibold max-[550px]:w-[6.25rem] max-[550px]:shrink-0"
                  style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden>
                    <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0v4.38c0 .298.177.568.45.687l3.5 1.556a.75.75 0 1 0 .6-1.374l-3.05-1.357Z" clipRule="evenodd" />
                  </svg>
                  <span>Kestus</span>
                </span>
              </div>
            </div>
            <div className="w-px bg-gray-200 flex-shrink-0 self-stretch max-[550px]:self-center max-[550px]:w-[80%] max-[550px]:h-px max-[550px]:shrink-0" aria-hidden />
            {/* Sagedus */}
            <div className="flex-1 flex flex-col items-center justify-end text-center max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:items-center max-[550px]:gap-x-4 max-[550px]:p-6">
              <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-0 max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left max-[550px]:text-2xl max-[550px]:leading-snug" style={{ color: '#177AE5' }}>iga aasta</div>
              <div className="w-[7.5rem] flex justify-center max-[550px]:order-1 max-[550px]:w-full max-[550px]:min-w-0 max-[550px]:justify-end">
                <span
                  className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg text-sm font-semibold max-[550px]:w-[6.25rem] max-[550px]:shrink-0"
                  style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4 shrink-0" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>Sagedus</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Programm — sama sektsiooni struktuur kui teistel kursustel */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Programm</h2>
          <ul className="list-outside list-disc space-y-3 pl-5 marker:text-gray-900">
            <li className="font-medium leading-relaxed text-gray-900">—</li>
            <li className="font-medium leading-relaxed text-gray-900">—</li>
            <li className="font-medium leading-relaxed text-gray-900">—</li>
          </ul>
        </section>

        {/* Kellele see kursus sobib? — eemaldatud, layout kooskõlas teiste kursustega */}

        {/* Nõuded */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Nõuded</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Kehtiv turvateenistuja kutse</span>
                <span className="text-gray-600"> (Valvetöötaja, Turvatöötaja või Turvajuhi tase)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pärast kursust — üks kaart ridadega, ikoonid outline (stroke) jäävad */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8" aria-labelledby="parast-kursust-heading">
          <h2 id="parast-kursust-heading" className="text-2xl font-bold mb-8 text-gray-900">Pärast kursust</h2>
          <div className="divide-y divide-gray-200">
            <article className="flex items-center py-6 first:pt-0 last:pb-0" style={{ gap: '1.5rem' }}>
              <div className="flex-shrink-0 w-16 h-16 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">Kutsenõuetele vastavuse säilitamine</h3>
                <p className="text-gray-600 text-base leading-relaxed">Täienduskoolituse läbimine võimaldab säilitada vastavuse turvateenistuja kutsenõuetele vastavalt kehtivale korrale.</p>
              </div>
            </article>
            <article className="flex items-center py-6 first:pt-0 last:pb-0" style={{ gap: '1.5rem' }}>
              <div className="flex-shrink-0 w-16 h-16 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">Praktiliste oskuste uuendamine</h3>
                <p className="text-gray-600 text-base leading-relaxed">Värskendatud teadmised ja praktilised oskused füüsilise jõu, relva ja erivahendi kasutamisel vastavalt nõuetele.</p>
              </div>
            </article>
            <article className="flex items-center py-6 first:pt-0 last:pb-0" style={{ gap: '1.5rem' }}>
              <div className="flex-shrink-0 w-16 h-16 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">Valmidus erialasteks tööülesanneteks</h3>
                <p className="text-gray-600 text-base leading-relaxed">Valmisolek täita tööülesandeid, mis eeldavad täiendavat väljaõpet, teadmisi ja hoiakuid.</p>
              </div>
            </article>
          </div>
        </section>

        {/* Unified CTA - All Screen Sizes */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 md:p-10 text-center text-white max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Täiendõpe</h3>
          <p className="mb-6 text-primary-100">
            Koolituse hind, maht ja ajad lepitakse kokku personaalselt. Võta meiega ühendust, et saada sobiv pakkumine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontaktid"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white cursor-pointer"
            >
              Võta ühendust
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
