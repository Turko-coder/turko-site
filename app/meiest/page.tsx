import Link from 'next/link'

export default function Meiest() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Meiest</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eesti juhtiv turvakoolituse keskus
          </p>
        </div>

        {/* Ajalugu Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ajalugu</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              Turvakoolituse keskus on tegutsenud juba üle 15 aasta, pakkudes kvaliteetseid 
              koolitusi turvatöötajatele kogu Eestis.
            </p>
            <p>
              Meie missioon on tagada, et kõik turvatöötajad omaksid vajalikud teadmised ja 
              oskused oma töö kvaliteetseks tegemiseks.
            </p>
            <p>
              Aastate jooksul oleme koolitanud sadu turvatöötajaid ja saanud tunnustust 
              nii Eesti Politsei- ja Päästeameti kui ka turvaliitude poolt.
            </p>
          </div>
        </div>

        {/* Tegevuse alus Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Tegevuse alus</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            Meie koolituskeskus tegutseb Eesti seaduste alusel ja järgib kõiki 
            turvakoolituse nõudeid.
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Õiguslik alus</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">Turvateenuste seadus</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">Koolituse seadus</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-semibold text-gray-900 mb-1">Eesti Politsei- ja Päästeameti määrused</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Litsentsid ja tunnustused</h3>
            <p className="text-gray-700">
              Meil on kõik vajalikud litsentsid ja tunnustused turvakoolituste 
              läbiviimiseks. Oleme tunnustatud koolituskeskus, mis vastab kõigile 
              kvaliteedinõuetele.
            </p>
          </div>
        </div>

        {/* Nõustamine Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Nõustamine</h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            Pakume professionaalset nõustamist turvateenuste ja koolituste valdkonnas.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">Nõustamise valdkonnad</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              'Turvateenuste planeerimine',
              'Koolitusprogrammide väljatöötamine',
              'Personalikoolitused',
              'Turvanõuded ja seadused',
            ].map((area) => (
              <div key={area} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{area}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <p className="text-gray-700">
              <strong className="text-gray-900">Kontakt:</strong> Võtke meiega ühendust, et arutada oma vajadusi ja leida parim lahendus.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:info@turvakoolitus.eu" 
                className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
              >
                info@turvakoolitus.eu
              </a>
              <a 
                href="tel:+3725290528" 
                className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
              >
                +372 5 290 528
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/meiest/partnerid"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all duration-300 cursor-pointer group"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
              Partnerid
            </h3>
            <p className="text-gray-600">
              Vaata meie partnerite nimekirja
            </p>
          </Link>
          <Link
            href="/meiest/kontaktid"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all duration-300 cursor-pointer group"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
              Kontaktid
            </h3>
            <p className="text-gray-600">
              Võta meiega ühendust
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
