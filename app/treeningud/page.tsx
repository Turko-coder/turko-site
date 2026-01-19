import Link from 'next/link'

export default function Treeningud() {
  const trainings = [
    {
      title: 'Relvakasutus',
      description: 'Praktiline koolitus relvade kasutamise, hoolduse ja turvalisuse valdkonnas.',
      duration: '16h',
      price: '300€',
    },
    {
      title: 'Kaitsesõit',
      description: 'Spetsiaalne koolitus kaitsesõidu tehnikate ja taktikate kohta.',
      duration: '24h',
      price: '400€',
    },
    {
      title: 'Lähiheide',
      description: 'Praktiline koolitus lähiheite tehnikate ja taktikate valdkonnas.',
      duration: '20h',
      price: '350€',
    },
    {
      title: 'Kriisijuhtimine',
      description: 'Täiendõpe kriisiolukordade haldamise ja lahendamise valdkonnas.',
      duration: '16h',
      price: '300€',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Treeningud</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meie praktilised treeningud on mõeldud kogenud turvatöötajatele, kes soovivad 
            täiendada oma praktilisi oskusi erinevates valdkondades.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainings.map((training, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-4 text-primary-700">
                {training.title}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                {training.description}
              </p>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-600">Kestus</p>
                  <p className="text-lg font-semibold text-gray-900">{training.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hind</p>
                  <p className="text-lg font-semibold text-primary-600">{training.price}</p>
                </div>
              </div>
              <Link 
                href={`/meiest/paring?type=training&name=${encodeURIComponent(training.title)}&price=${encodeURIComponent(training.price)}&duration=${encodeURIComponent(training.duration)}`}
                className="block w-full text-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition cursor-pointer mt-auto"
              >
                Registreeru treeningule
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Treeningute kohad</h2>
          <p className="text-gray-600 mb-4">
            Treeninguid korraldame meie koolituskeskuses Tallinnas, aga võimalik on 
            korraldada treeninguid ka teistes linnades vastavalt kokkuleppele.
          </p>
          <p className="text-gray-600">
            Vaata täpsemaid kuupäevi meie{' '}
            <Link href="/kursused/koolituskalender" className="text-primary-600 hover:text-primary-800 font-semibold cursor-pointer">
              koolituskalendrist
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
