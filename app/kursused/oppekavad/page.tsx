export default function Oppekavad() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Õppekavad</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          Meie koolituskeskus pakub struktureeritud õppekavasid, mis vastavad 
          kõigile Eesti seadustele ja kvaliteedinõuetele.
        </p>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-700">
              Valvetöötaja õppekava (Tase 3)
            </h2>
            <p className="text-gray-600 mb-4">
              Õppekava kestus: 40 tundi
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Teoreetiline osa: 24 tundi</li>
              <li>Praktiline osa: 16 tundi</li>
              <li>Eksam: teoreetiline ja praktiline</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-700">
              Turvatöötaja õppekava (Tase 4)
            </h2>
            <p className="text-gray-600 mb-4">
              Õppekava kestus: 60 tundi
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Teoreetiline osa: 36 tundi</li>
              <li>Praktiline osa: 24 tundi</li>
              <li>Eksam: teoreetiline ja praktiline</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary-700">
              Turvajuht õppekava (Tase 5)
            </h2>
            <p className="text-gray-600 mb-4">
              Õppekava kestus: 80 tundi
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Teoreetiline osa: 48 tundi</li>
              <li>Praktiline osa: 32 tundi</li>
              <li>Eksam: teoreetiline ja praktiline</li>
            </ul>
          </div>
        </div>
        <div className="bg-primary-50 p-6 rounded-lg mt-8">
          <p className="text-gray-700">
            Kõik meie õppekavad on tunnustatud Eesti Politsei- ja Päästeameti poolt 
            ja vastavad kõigile kvaliteedinõuetele.
          </p>
        </div>
      </div>
    </div>
  )
}
