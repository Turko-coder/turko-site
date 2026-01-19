import Link from 'next/link'

export default function TurvajuhtTase5() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Tase 5
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Turvajuht</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Juhtimise koolitus kogenud turvatöötajatele
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">650€</div>
            <div className="text-sm text-gray-600">Hind</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">80h</div>
            <div className="text-sm text-gray-600">Kestus</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">5</div>
            <div className="text-sm text-gray-600">Tase</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Koolituse sisu</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            Turvajuht tase 5 koolitus on mõeldud kogenud turvatöötajatele, 
            kes soovivad juhtida turvateenuste osakonda või ettevõtet.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Koolituse temaatika:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              'Turvateenuste juhtimine',
              'Personalijuhtimine',
              'Strateegiline planeerimine',
              'Eelarve ja majandus',
              'Koostöö partneritega',
              'Kvaliteedikontroll',
            ].map((topic) => (
              <div key={topic} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{topic}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Eeldused</h4>
            <p className="text-gray-700">
              Koolitusele registreerumiseks on vaja omada turvatöötaja tase 4 kvalifikatsiooni 
              ja vähemalt 2 aastat kogemust turvateenuste valdkonnas.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">Koolituse kohad</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Tallinn', 'Narva', 'Tartu'].map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-gray-700">{city}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Valmis alustama?</h3>
          <p className="mb-6 text-primary-100">
            Vaata täpsemaid kuupäevi meie koolituskalendrist või registreeru kohe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kursused/koolituskalender"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Vaata kalendrit
            </Link>
            <Link
              href="/meiest/paring?type=course&name=Turvajuht&level=Tase 5&price=650€&duration=80h"
              className="px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition-colors border-2 border-white cursor-pointer"
            >
              Registreeru koolitusele
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
