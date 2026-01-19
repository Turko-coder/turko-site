export default function Oppetoo() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Õppetöö</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          Meie õppetöö põhineb praktilistel meetoditel ja reaalsete olukordade simuleerimisel.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Õppemeetodid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Loengud</h3>
            <p className="text-gray-600">
              Interaktiivsed loengud, kus käsitletakse teoreetilisi aspekte ja 
              analüüsitakse reaalseid juhtumeid.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Praktilised harjutused</h3>
            <p className="text-gray-600">
              Reaalsete olukordade simuleerimine ja praktiliste oskuste arendamine.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Grupitöö</h3>
            <p className="text-gray-600">
              Koostööprojektid ja grupiarutelud, mis aitavad süvendada teadmisi.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary-700">Iseseisev töö</h3>
            <p className="text-gray-600">
              Materjalide läbitöötamine ja kodutööd, mis kinnistavad õpitu.
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Õppematerjalid</h2>
        <p className="text-gray-600 mb-4">
          Kõik õppijad saavad:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
          <li>Õppematerjalid elektroonilisel kujul</li>
          <li>Juurdepääs veebipõhisele õppekeskkonnale</li>
          <li>Kontaktõpetajaga konsultatsioonidele</li>
          <li>Praktiliste harjutuste materjalid</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Hindamine</h2>
        <p className="text-gray-600 mb-4">
          Õppetöö lõpus läbivad kõik õppijad nii teoreetilise kui ka praktilise eksami. 
          Eduka eksami läbimise järel saavad õppijad tunnistuse.
        </p>
        <div className="bg-primary-50 p-6 rounded-lg mt-8">
          <p className="text-gray-700">
            Kõik meie õpetajad on kogenud spetsialistid oma valdkonnas ja 
            omavad vajalikke kvalifikatsioone.
          </p>
        </div>
      </div>
    </div>
  )
}
