'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Turvakoolituse Keskus
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Kvaliteetsed turvakoolitused ja koolitused kogu Eestis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/kursused/koolituskalender"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                Vaata koolituskalendrit
              </Link>
              <Link 
                href="/meiest/kontaktid"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-primary-600 hover:text-primary-600 transition-all duration-300 cursor-pointer"
              >
                Võta ühendust
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-sm md:text-base text-gray-600">Aastat kogemust</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-sm md:text-base text-gray-600">Lõpetanud koolitajad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">3</div>
              <div className="text-sm md:text-base text-gray-600">Koolituse linna</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">5</div>
              <div className="text-sm md:text-base text-gray-600">Koolituse taset</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Meie teenused
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professionaalsed lahendused turvakoolituse valdkonnas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              href="/kursused/koolituskalender"
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Kursused</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Valvetöötaja, Turvatöötaja ja Turvajuht koolitused erinevatel tasemetel.
              </p>
              <span className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center group-hover:gap-2 gap-1 transition-all duration-300">
                Vaata kursusi
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link 
              href="/treeningud"
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Treeningud</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Praktilised treeningud relvakasutuse, kaitsesõidu ja lähiheite valdkonnas.
              </p>
              <span className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center group-hover:gap-2 gap-1 transition-all duration-300">
                Vaata treeninguid
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link 
              href="/meiest"
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <svg className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Nõustamine</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Professionaalne nõustamine turvateenuste ja koolituste valdkonnas.
              </p>
              <span className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center group-hover:gap-2 gap-1 transition-all duration-300">
                Loe lähemalt
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Meie koolituskeskus</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Oleme Eesti juhtiv turvakoolituse keskus, mis pakub kvaliteetseid koolitusi 
                turvatöötajatele erinevatel tasemetel. Meie koolitused on tunnustatud 
                Eesti Politsei- ja Päästeameti poolt.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Pakume koolitusi Tallinnas, Narvas ja Tartus, tagades mugava ligipääsu 
                kõigile soovijatele.
              </p>
              <Link 
                href="/meiest"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold gap-2 group cursor-pointer"
              >
                Loe meie ajaloost
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
                <div className="text-gray-600 text-sm">Aastat kogemust</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
                <div className="text-gray-600 text-sm">Lõpetanud koolitajad</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200 hover:shadow-md transition-all duration-300 col-span-2">
                <div className="text-4xl font-bold text-primary-600 mb-2">3</div>
                <div className="text-gray-600 text-sm">Koolituse linna (Tallinn, Narva, Tartu)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
