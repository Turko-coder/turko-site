import Link from 'next/link'
import { ProgrammTeemad } from '../ProgrammTeemad'
import { programmTurvajuhtGrupid } from '../programmSisu'

export default function TurvajuhtTase5() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[100px]"
              style={{ color: '#177AE5' }}
            >
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Turvajuht</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turvategevuse juhtimisele ja korraldamisele suunatud kutseõpe
          </p>
        </div>

        {/* Key Info: one card, three columns, badges like Hero Valvetöötaja */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-6 px-[12px] mb-12 max-[550px]:py-0 max-[550px]:px-0">
          <div className="flex items-stretch max-[550px]:flex-col">
            {/* Hind */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:items-center max-[550px]:gap-x-4 max-[550px]:p-6">
              <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-0 max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left" style={{ color: '#177AE5' }}>2480€</div>
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
            <div className="flex-1 flex flex-col items-center justify-center text-center max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:items-center max-[550px]:gap-x-4 max-[550px]:p-6">
              <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-0 max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left" style={{ color: '#177AE5' }}>106h</div>
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
            {/* Tase */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:items-center max-[550px]:gap-x-4 max-[550px]:p-6">
              <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-0 max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left" style={{ color: '#177AE5' }}>5</div>
              <div className="w-[7.5rem] flex justify-center max-[550px]:order-1 max-[550px]:w-full max-[550px]:min-w-0 max-[550px]:justify-end">
                <span
                  className="w-full inline-flex items-center justify-center gap-[0.2rem] py-1.5 pl-3 pr-4 rounded-lg text-sm font-semibold max-[550px]:w-[6.25rem] max-[550px]:shrink-0"
                  style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0" aria-hidden>
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                  </svg>
                  <span>Tase</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Programm: õppekava pt 7 põhiteemad, grupeeritud */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Programm</h2>
          <ProgrammTeemad grupid={programmTurvajuhtGrupid} />
        </section>

        {/* Nõuded - Checklist with Badge */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Nõuded</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Vanus</span>
                <span className="ml-2 inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-semibold">18+</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Eesti keel</span>
                <span className="ml-2 inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-semibold">B2</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Põhiharidus</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Eesti kodakondsus või kehtiv elamisõigus Eestis</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Puuduvad karistusregistri andmed</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Terviseseisund võimaldab täita tööülesandeid</span>
              </div>
            </div>
          </div>
        </div>

        {/* Töö sisu ja vastutus — ajutiselt peidetud */}
        <section className="hidden bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8" aria-labelledby="too-sisu-vastutus-heading">
          <h2 id="too-sisu-vastutus-heading" className="text-2xl font-bold mb-8 text-gray-900">Töö sisu ja vastutus</h2>
          <div className="divide-y divide-gray-200">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                  </svg>
                ),
                title: 'Turvateenistuse töö planeerimine ja korraldamine',
                description: 'Turvatöötajate tööaja ja ülesannete planeerimine, ressursside jaotamine ning igapäevase turvateenistuse töö tõhususe tagamine.',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
                title: 'Turvanõuete täitmise jälgimine ja standardite hoidmine',
                description: 'Turvanõuete ja sisekorraeeskirjade täitmise kontrollimine, tööprotsesside ühtlustamine ning kvaliteedistandardite hoidmine kogu meeskonna töös.',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                ),
                title: 'Riskide analüüs ja otsuste tegemine turvalisuse tagamiseks',
                description: 'Võimalike ohtude ja riskide kaardistamine, ennetavate meetmete kavandamine ning olukordadele reageerimise põhimõtete otsustamine vastavalt ettevõtte turvapoliitikale.',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                ),
                title: 'Meeskonna juhtimine ja koostöö partneritega',
                description: 'Turvatöötajate töö juhendamine ja tagasisidestamine, koostöö ettevõtte juhtkonna ja väliste partneritega ning vastutus meeskonna tulemuste ja turvalisuse üldise taseme eest.',
              },
            ].map((item) => (
              <article key={item.title} className="flex items-center py-6 first:pt-0 last:pb-0" style={{ gap: '1.5rem' }}>
                <div className="flex-shrink-0 w-[3rem] h-[3rem] text-primary-600">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Õppekava */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6 min-w-0">
          <div className="flex flex-row items-center justify-start gap-4 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 shrink-0">Õppekava</h2>
            <a
              href="/Õppekavad/Turvajuht_tase_5_õppekava.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="Turvajuht_tase_5_õppekava.pdf"
              className="flex min-w-0 flex-1 items-center gap-3 px-5 py-3 rounded-lg border border-primary-200 bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 shrink-0 text-primary-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="min-w-0 truncate">Turvajuht_tase_5_õppekava.pdf</span>
            </a>
          </div>
        </div>

        {/* Pärast kursust – info ühendatud blokki "Töö sisu ja vastutus" */}

        {/* Unified CTA - All Screen Sizes */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 md:p-10 text-center text-white max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Turvajuht</h3>
          <p className="text-primary-100 mb-6 text-sm md:text-base">
            <span className="font-number">2480€</span> • <span className="font-number">80h</span> • Tase <span className="font-number">5</span>
          </p>
          <p className="mb-6 text-primary-100">
            Vaata täpsemaid kuupäevi meie koolituskalendrist või registreeru kohe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/koolituskalender?course=${encodeURIComponent('Turvajuht, tase 5')}`}
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Vaata kalendrit
            </Link>
            <Link
              href={`/registreerimine?type=course&name=${encodeURIComponent('Turvajuht, tase 5')}&level=Tase 5&price=2480€&duration=80h`}
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors border-2 border-white cursor-pointer"
            >
              Registreeru koolitusele
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
