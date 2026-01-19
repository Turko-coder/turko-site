import Link from 'next/link'

export default function Taiendope() {
  const trainings = [
    {
      title: 'Relvakasutus',
      description: 'Täiendõpe relvakasutuse valdkonnas, sh relvade hooldus ja kasutamine.',
      duration: '16h',
    },
    {
      title: 'Kaitsesõit',
      description: 'Spetsiaalne koolitus kaitsesõidu tehnikate ja taktikate kohta.',
      duration: '24h',
    },
    {
      title: 'Lähiheide',
      description: 'Praktiline koolitus lähiheite tehnikate ja taktikate valdkonnas.',
      duration: '20h',
    },
    {
      title: 'Kriisijuhtimine',
      description: 'Täiendõpe kriisiolukordade haldamise ja lahendamise valdkonnas.',
      duration: '16h',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Täiendõpe</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kogenud turvatöötajatele mõeldud täiendkoolitused erinevates valdkondades
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 mb-2">300€</div>
              <div className="text-sm text-gray-600">Hind</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 mb-2">16-24h</div>
              <div className="text-sm text-gray-600">Kestus (sõltub valdkonnast)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {trainings.map((training, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{training.title}</h3>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  {training.duration}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">{training.description}</p>
            </div>
          ))}
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
              href="/meiest/paring?type=training&name=Täiendõpe&price=300€&duration=16-24h"
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
