export default function PrivaatsuspoliitikaPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[48rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Privaatsuspoliitika</h1>
        <p className="text-sm text-gray-500">Jõustub alates: 30.03.2026</p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Käesolev privaatsuspoliitika selgitab, kuidas Turko Õppekeskus OÜ töötleb isikuandmeid
          veebilehel turko.ee. Töötleme andmeid kooskõlas EL isikuandmete kaitse üldmäärusega
          (GDPR) ja Eesti Vabariigi õigusaktidega.
        </p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">1. Vastutav töötleja</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-700">Turko Õppekeskus OÜ</p>
          <p className="text-gray-600 mt-1">Aadress: Väike-Paala tn 2, 11415 Tallinn, Eesti</p>
          <p className="text-gray-600 mt-1">E-post: info@turko.ee</p>
          <p className="text-gray-600 mt-1">Telefon: +3725290528</p>
        </div>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">2. Milliseid andmeid me kogume</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Registreerimis- ja päringuvormi kaudu võime töödelda järgmisi andmeid:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>nimi;</li>
          <li>e-posti aadress;</li>
          <li>telefoninumber;</li>
          <li>linn, koolitus, kursuse kuu ja alguskuupäev;</li>
          <li>õppekeel ja õppeviis;</li>
          <li>kasutaja sisestatud sõnum.</li>
        </ul>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Lisaks võivad tehnilisel tasemel töödelda serveri toimimiseks vajalikud logiandmed
          (nt IP-aadress ja brauseri tehnilised andmed).
        </p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">3. Töötlemise eesmärgid ja õiguslik alus</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-3">
          <li>
            päringule vastamine, koolitusele registreerimise korraldamine ja suhtlus enne lepingu
            sõlmimist (GDPR art 6 lg 1 p b);
          </li>
          <li>
            koolituse läbiviimisega seotud halduslik suhtlus (GDPR art 6 lg 1 p b);
          </li>
          <li>seadusest tulenevate kohustuste täitmine (GDPR art 6 lg 1 p c);</li>
          <li>
            õigustatud huvi alusel turvalisuse tagamine ja võimalike vaidluste lahendamine
            (GDPR art 6 lg 1 p f).
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">4. Andmete edastamine ja volitatud töötlejad</h2>
        <p className="text-gray-600 leading-relaxed">
          Me ei müü isikuandmeid. Registreerimisvormi päringute edastamiseks kasutame e-posti
          teenusepakkujat Resend, kelle kaudu saadetakse sisestatud andmed meie kontaktmeilile.
          Andmeid edastatakse ainult ulatuses, mis on vajalik päringule vastamiseks ja teenuse
          osutamiseks.
        </p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">5. Säilitamistähtajad</h2>
        <p className="text-gray-600 leading-relaxed">
          Säilitame isikuandmeid ainult nii kaua, kui see on vajalik töötlemise eesmärkide
          saavutamiseks või õigusaktidest tulenevate kohustuste täitmiseks. Üldjuhul säilitame
          päringute andmeid kuni 24 kuud alates viimasest kontaktist, välja arvatud juhul, kui
          seadus nõuab pikemat säilitamist.
        </p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">6. Küpsised (cookies)</h2>
        <p className="text-gray-600 leading-relaxed">
          Veebileht võib kasutada tehniliselt vajalikke küpsiseid, mis on vajalikud saidi korrektseks
          toimimiseks. Turunduslikku profileerimist või reklaamipiksleid me käesoleva poliitika
          avaldamise hetkel ei kasuta.
        </p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">7. Teie õigused</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Teil on GDPR-ist tulenevalt õigus:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>saada teavet oma isikuandmete töötlemise kohta;</li>
          <li>nõuda ebaõigete andmete parandamist;</li>
          <li>nõuda andmete kustutamist või töötlemise piiramist seaduses ettenähtud juhtudel;</li>
          <li>esitada vastuväiteid õigustatud huvi alusel toimuvale töötlemisele;</li>
          <li>esitada kaebus Andmekaitse Inspektsioonile.</li>
        </ul>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Õiguste kasutamiseks võtke meiega ühendust: info@turko.ee.
        </p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">8. Turvameetmed</h2>
        <p className="text-gray-600 leading-relaxed">
          Rakendame mõistlikke tehnilisi ja korralduslikke turvameetmeid, et kaitsta isikuandmeid
          loata juurdepääsu, muutmise, avaldamise või hävitamise eest.
        </p>

        <h2 className="text-2xl font-bold mt-[3.25rem] mb-4 text-gray-900">9. Privaatsuspoliitika muudatused</h2>
        <p className="text-gray-600 leading-relaxed">
          Võime käesolevat privaatsuspoliitikat aeg-ajalt uuendada. Aktuaalne versioon on alati
          kättesaadav sellel lehel.
        </p>
      </div>
    </div>
  )
}
