'use client'

import Link from 'next/link'
import { ProgrammTeemad } from '../ProgrammTeemad'
import { programmValvetJaTurvatootajaGrupid } from '../programmSisu'

export default function ValvetootajaTase3() {
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
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Valvetöötaja</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Algajatele turvatöötajatele mõeldud põhikoolitus
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
              <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-0 max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left" style={{ color: '#177AE5' }}>84h</div>
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
              <div className="text-3xl text-primary-600 font-number mb-3 max-[550px]:mb-0 max-[550px]:order-2 max-[550px]:w-full max-[550px]:text-left" style={{ color: '#177AE5' }}>3</div>
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
          <ProgrammTeemad grupid={programmValvetJaTurvatootajaGrupid} />
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
                <span className="ml-2 inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-semibold">
                  18+
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <span className="text-gray-900 font-medium">Eesti keel</span>
                <span className="ml-2 inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-semibold">
                  A2
                </span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ),
                title: 'Turvaobjekti jälgimine ja läbipääsu kontroll',
                description: 'Turvaobjekti ja selle ümbruse jälgimine, objektile sisenemise õiguse kontrollimine ning loata ligipääsu tõkestamine.',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
                title: 'Korra tagamine ja töö turvaplaani järgi',
                description: 'Sisekorraeeskirjade täitmise jälgimine ning tegutsemine kehtestatud turvaplaani ja juhendite alusel.',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                ),
                title: 'Tegutsemine ohu- ja eriolukordades',
                description: 'Ohtlike olukordade varajane märkamine, vastavalt juhenditele reageerimine ning vajaduse korral abi kutsumine.',
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
              href="/Õppekavad/Valvetöötaja_tase_3_õppekava.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="Valvetöötaja_tase_3_õppekava.pdf"
              className="flex min-w-0 flex-1 items-center gap-3 px-5 py-3 rounded-lg border border-primary-200 bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 shrink-0 text-primary-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="min-w-0 truncate">Valvetöötaja_tase_3_õppekava.pdf</span>
            </a>
          </div>
        </div>

        {/* Pärast kursust – eemaldatud, info ühendatud blokki "Töö sisu ja vastutus" */}

        {/* Unified CTA - All Screen Sizes */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 md:p-10 text-center text-white max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Valvetöötaja</h3>
          <p className="text-primary-100 mb-6 text-sm md:text-base">
            <span className="font-number">2480€</span> • <span className="font-number">84h</span> • Tase <span className="font-number">3</span>
          </p>
          <p className="mb-6 text-primary-100">
            Vaata täpsemaid kuupäevi meie koolituskalendrist või registreeru kohe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/koolituskalender?course=${encodeURIComponent('Valvetöötaja, tase 3')}`}
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Vaata kalendrit
            </Link>
            <Link
                href={`/registreerimine?type=course&name=${encodeURIComponent('Valvetöötaja, tase 3')}&level=Tase 3&price=2480€&duration=84h`}
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
