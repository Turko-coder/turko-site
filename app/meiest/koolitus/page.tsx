import Link from 'next/link'

export default function Koolitus() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Koolitus</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Laia valiku turvakoolitusi erinevatel tasemetel
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Koolituse tasemed</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/kursused/valvetootaja-tase-3"
              className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">Tase 3</div>
              <div className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Valvetöötaja
              </div>
              <p className="text-sm text-gray-600">Algajatele turvatöötajatele</p>
            </Link>
            <Link
              href="/kursused/turvatootaja-tase-4"
              className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">Tase 4</div>
              <div className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Turvatöötaja
              </div>
              <p className="text-sm text-gray-600">Kogenud turvatöötajatele</p>
            </Link>
            <Link
              href="/kursused/turvajuht-tase-5"
              className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">Tase 5</div>
              <div className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Turvajuht
              </div>
              <p className="text-sm text-gray-600">Juhtimise koolitus</p>
            </Link>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-900">Koolituse sisu</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            Kõik meie koolitused sisaldavad nii teoreetilist kui ka praktilist osa. 
            Koolitused toimuvad meie koolituskeskuses või teie ettevõttes vastavalt kokkuleppele.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 mt-8">Koolituse kohad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Tallinn', 'Narva', 'Tartu'].map((city) => (
              <div key={city} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
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
          <h3 className="text-2xl font-bold mb-4">Vaata koolituskalendrit</h3>
          <p className="mb-6 text-primary-100">
            Leia endale sobiv koolitus ja registreeru kohe
          </p>
          <Link
            href="/kursused/koolituskalender"
            className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Vaata kalendrit
          </Link>
        </div>
      </div>
    </div>
  )
}
