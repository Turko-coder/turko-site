import Link from 'next/link'

interface Partner {
  name: string
  image: string
  description: string
  url?: string
}

export default function Partnerid() {
  const partners: Partner[] = [
    {
      name: 'Eesti Politsei- ja Päästeamet',
      image: '/partners/politsei.png',
      description: 'Meie koolitused on tunnustatud Eesti Politsei- ja Päästeameti poolt. Kõik meie õppekavad vastavad ametlikele nõuetele ja kvaliteedistandarditele.',
      // url: 'https://www.politsei.ee',
    },
    {
      name: 'Päästeamet',
      image: '/partners/paasteamet.png',
      description: 'Koostöö Päästeametiga tagab, et meie koolitused on ajakohased ja vastavad kõigile turvanõuetele.',
      // url: 'https://example.com',
    },
    {
      name: 'Tallinn',
      image: '/partners/tallinn.png',
      description: 'Tallinna linna toetus võimaldab meil pakkuda kvaliteetseid koolitusi pealinnas ja ümbruskonnas.',
      // url: 'https://www.tallinn.ee',
    },
    {
      name: 'TPSC',
      image: '/partners/tpsc.png',
      description: 'TPSC on meie strateegiline partner turvateenuste ja koolituste valdkonnas.',
      // url: 'https://example.com',
    },
    {
      name: 'Taifu',
      image: '/partners/taifu.png',
      description: 'Koostöö Taifuga aitab meil arendada innovaatilisi koolituslahendusi.',
      // url: 'https://example.com',
    },
    {
      name: 'Autosoit',
      image: '/partners/autosoit.png',
      description: 'Autosoit on meie partner sõidukite ja transpordi turvalisuse koolituste valdkonnas.',
      // url: 'https://example.com',
    },
    {
      name: 'Etel',
      image: '/partners/etel.png',
      description: 'Etel on meie usaldusväärne partner, kes toetab meie koolitusprogramme.',
      // url: 'https://example.com',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Partnerid</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meie koolituskeskus koostöötab mitmete tunnustatud organisatsioonidega
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => {
            const content = (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 p-6 group cursor-pointer h-full flex flex-col">
                <div className="mb-4 h-24 flex items-center justify-center bg-gray-50 rounded-lg p-4 group-hover:bg-primary-50 transition-colors">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {partner.description}
                </p>
                {partner.url && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-primary-600 text-sm font-medium group-hover:text-primary-700">
                      Külasta veebilehte →
                    </span>
                  </div>
                )}
              </div>
            )

            if (partner.url) {
              return (
                <Link
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {content}
                </Link>
              )
            }

            return (
              <div key={index}>
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
