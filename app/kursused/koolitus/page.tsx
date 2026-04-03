'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ValvetootajaIllustration } from '@/components/illustrations/ValvetootajaIllustration'
import { TurvatootajaIllustration } from '@/components/illustrations/TurvatootajaIllustration'
import { TurvajuhtIllustration } from '@/components/illustrations/TurvajuhtIllustration'

const OPPEKLASSID_IMAGES = [
  '/Õppeklassid/11.jpg',
  '/Õppeklassid/22.jpg',
  '/Õppeklassid/33.jpg',
  '/Õppeklassid/3931-1024x768.jpg',
]

export default function Koolitus() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const totalSlides = OPPEKLASSID_IMAGES.length

  const scrollToSlide = (index: number) => {
    const container = carouselRef.current
    if (!container) return
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth',
    })
    setCarouselIndex(index)
  }
  return (
  <div className="min-h-screen bg-white" lang="et">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 1. Вводный блок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Koolitus</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Antud lehel on lühidalt kirjeldatud turvakutsete tasemed, õppe käik ning õppekeskkond ja -vorm.
          </p>
        </div>

        {/* 2. Õppeastmed */}
        <section className="p-8 mb-8" aria-labelledby="oppeastmed-heading">
          <div className="mb-8">
            <h2 id="oppeastmed-heading" className="text-2xl font-bold mb-4 text-gray-900">Õppeastmed</h2>
            <p className="text-gray-600 leading-relaxed mb-0">
              Selleks, et töötada Eestis turvavaldkonnas seaduslikult, tuleb omandada vastav kutsekvalifikatsioon. Turvatöötajate ettevalmistus on jagatud kolme tasemesse: Valvetöötaja, Turvatöötaja ja Turvajuht.
            </p>
          </div>

          {/* Valvetöötaja */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex flex-col min-[800px]:flex-row gap-6 min-[800px]:gap-8 items-stretch min-[800px]:items-center">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 text-primary-600" style={{ color: 'rgb(47, 107, 222)' }} aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Valvetöötaja</h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-4 last:mb-0">
                    See on turvavaldkonna esimene kutsetase. Valvetöötaja peamine ülesanne on objekti jälgimine ja korra hoidmine. Sageli töötab valvetöötaja statsionaarsel postil, näiteks ettevõtte sissepääsu juures, kaubanduskeskuses, laos või büroohoones.
                  </p>
                  <div className="my-6 flex justify-center min-[800px]:hidden">
                    <ValvetootajaIllustration />
                  </div>
                  <p className="mb-0">
                    See on turvasüsteemi algtaseme ametikoht, kus töötaja tegutseb tavaliselt kindlate juhiste järgi ning töötab kogenuma turvatöötaja või turvajuhi juhendamisel. See tase sobib hästi inimestele, kes soovivad alustada tööd turvavaldkonnas ja eelistavad rahulikumat, selgete ülesannetega tööd.
                  </p>
                </div>
                <Link
                  href="/kursused/valvetootaja"
                  className="mt-4 inline-flex w-full min-[800px]:w-fit items-center justify-center px-6 py-3 rounded-xl border border-primary-200 bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors cursor-pointer text-center"
                >
                  Loe lähemalt
                </Link>
              </div>
              <div className="hidden min-[800px]:block shrink-0">
                <ValvetootajaIllustration />
              </div>
            </div>
          </div>

          {/* Turvatöötaja */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex flex-col min-[800px]:flex-row gap-6 min-[800px]:gap-8 items-stretch min-[800px]:items-center">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10" style={{ color: 'rgb(47, 107, 222)' }} aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Turvatöötaja</h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-4 last:mb-0">
                    Sellel tasemel töötab spetsialist juba iseseisvamalt ning vastutab mitte ainult jälgimise, vaid ka objekti aktiivse turvalisuse tagamise eest. Turvatöötaja ülesannete hulka võivad kuuluda erinevatele olukordadele reageerimine, korra tagamine üritustel, turvasüsteemide kasutamine ning suhtlemine külastajate või töötajatega.
                  </p>
                  <div className="my-6 flex justify-center min-[800px]:hidden">
                    <TurvatootajaIllustration />
                  </div>
                  <p className="mb-0">
                    Sellised töötajad võivad tegutseda näiteks patrull- või reageerimisgruppides, suurtes objektides, massiüritustel või kaubanduskeskustes. Turvaorganisatsiooni struktuuris on see täisväärtuslik turvatöötaja, kes tegutseb iseseisvalt, kuid allub vahetuse juhile või turvajuhile. See tase sobib inimestele, kes on valmis tegutsema iseseisvamalt ja võtma suuremat vastutust objekti turvalisuse eest.
                  </p>
                </div>
                <Link
                  href="/kursused/turvatootaja"
                  className="mt-4 inline-flex w-full min-[800px]:w-fit items-center justify-center px-6 py-3 rounded-xl border border-primary-200 bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors cursor-pointer text-center"
                >
                  Loe lähemalt
                </Link>
              </div>
              <div className="hidden min-[800px]:block shrink-0">
                <TurvatootajaIllustration />
              </div>
            </div>
          </div>

          {/* Turvajuht */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col min-[800px]:flex-row gap-6 min-[800px]:gap-8 items-stretch min-[800px]:items-center">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10" style={{ color: 'rgb(47, 107, 222)' }} aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Turvajuht</h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-4 last:mb-0">
                    Selle taseme spetsialisti peamine ülesanne on turvateenistuse töö korraldamine ja selle tõhususe tagamine. Turvajuht planeerib töötajate tööd, jaotab ülesandeid, jälgib turvanõuete täitmist ning analüüsib võimalikke riske.
                  </p>
                  <div className="my-6 flex justify-center min-[800px]:hidden">
                    <TurvajuhtIllustration />
                  </div>
                  <p className="mb-0">
                    Turvajuht võib töötada näiteks vahetuse juhina, turvateenistuse juhina või ettevõtte turvalisuse eest vastutava spetsialistina. See on juhtimistaseme ametikoht, kus inimene teeb otsuseid ja vastutab kogu meeskonna töö eest. See tase sobib neile, kes soovivad juhtida turvatöötajate tööd ja arendada oma karjääri turvavaldkonnas juhtival tasemel.
                  </p>
                </div>
                <Link
                  href="/kursused/turvajuht"
                  className="mt-4 inline-flex w-full min-[800px]:w-fit items-center justify-center px-6 py-3 rounded-xl border border-primary-200 bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors cursor-pointer text-center"
                >
                  Loe lähemalt
                </Link>
              </div>
              <div className="hidden min-[800px]:block shrink-0">
                <TurvajuhtIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Kuidas õpe toimub */}
        <section className="px-8 mb-8" aria-labelledby="kuidas-ope-heading">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-8 pt-10 pb-8">
            <div className="max-w-full min-[670px]:max-w-[70%] mx-auto">
              <h2 id="kuidas-ope-heading" className="text-2xl font-bold mb-8 text-gray-900 text-center">Kuidas õpe toimub</h2>
              <div className="relative">
                {/* Dotted line behind the numbers, from first to last */}
                <div className="absolute left-4 top-4 bottom-4 w-0 border-l-2 border-dotted border-gray-300 z-0" aria-hidden="true" />
                <ul className="space-y-0 relative z-10">
                  {[
                    {
                      title: 'Avalduse esitamine',
                      description: 'Pärast koolitusele avalduse esitamist võtab teiega ühendust õppekeskuse esindaja, et teha esmased kokkulepped ja täpsustada detaile.',
                    },
                    {
                      title: 'Personaalne konsultatsioon',
                      description: 'Konsultatsiooni käigus arutame teie eesmärke, varasemat kogemust, võimalusi ja eelistatud õppegraafikut. Selle põhjal koostame personaalse õppeplaani, mis sobib just teile.',
                    },
                    {
                      title: 'Õpe',
                      description: 'Õpe hõlmab teoreetilist ja praktilist ettevalmistust: loengud, olukordade analüüs, rollimängud ja praktilised harjutused vastavalt valitud kursusele.',
                    },
                    {
                      title: 'Ettevalmistus eksamiks',
                      description: 'Enne eksamit korratakse olulisemaid teemasid, selgitatakse eksaminõudeid ja antakse soovitusi edukaks soorituseks.',
                    },
                    {
                      title: 'Eksami sooritamine',
                      description: 'Te sooritate kvalifikatsioonieksami. Vajaduse korral on võimalik eksamit uuesti sooritada.',
                    },
                    {
                      title: 'Tunnistuse saamine ja töö alustamine',
                      description: 'Pärast edukat eksami sooritamist väljastatakse teile ametlik tunnistus, mis kinnitab teie kvalifikatsiooni. Saadud tunnistuse alusel saate alustada tööd või jätkata professionaalset tegevust turvavaldkonnas.',
                    },
                  ].map((step, index) => (
                    <li
                      key={index}
                      className={`relative flex gap-4 pb-8 last:pb-0 ${index === 2 || index === 4 ? 'pt-8' : ''}`}
                    >
                      <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="text-lg font-bold text-gray-900 mb-1.5">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Õppekeskkond ja vorm */}
        <section className="p-8 mb-8" aria-labelledby="oppekeskkond-heading">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 id="oppekeskkond-heading" className="text-2xl font-bold mb-6 text-gray-900">Õppekeskkond ja vorm</h2>
            <p className="text-gray-600 leading-relaxed mb-12">
              Õpperuumid on avarad, valgusküllased ja hea ventilatsiooniga ning varustatud vajaliku tehnikaga. Praktilisteks treeninguteks kasutatakse täiendavaid ruume, lasketiiru ja spetsiaalset harjutuspolügooni.
            </p>
            {/* Õppeklassid karussell */}
            <div className="max-w-[70%] mx-auto">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onScroll={(event) => {
                  const container = event.currentTarget
                  const slideWidth = container.clientWidth
                  if (!slideWidth) return
                  const index = Math.round(container.scrollLeft / slideWidth)
                  if (index !== carouselIndex) setCarouselIndex(index)
                }}
                aria-label="Õppeklasside galerii"
              >
                {OPPEKLASSID_IMAGES.map((imageSrc, index) => (
                  <div key={imageSrc} className="w-full shrink-0 snap-center">
                    <div className="w-full h-[280px] sm:h-[340px] md:h-[420px] flex items-center justify-center overflow-hidden rounded-lg bg-white">
                      <img
                        src={imageSrc}
                        alt={`Õppeklass ${index + 1}`}
                        className="max-w-full max-h-full w-auto h-auto rounded-xl"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Õppeklasside pildid">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollToSlide(index)}
                    aria-label={`Mine fotole ${index + 1}`}
                    aria-current={carouselIndex === index}
                    className={`h-2.5 rounded-full transition-all ${
                      carouselIndex === index
                        ? 'w-7 bg-primary-600'
                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mt-12">
              Õpe toimub eesti või vene keeles vastavalt õppija eelistusele, peamiselt individuaalses vormis koos koolitajaga, kuid sõltuvalt ajakavast on võimalikud ka üksikud tunnid väikestes rühmades koos teiste õpilastega. Lisaks on sõltuvalt loengust võimalik õppida ka veebipõhiselt. Mõned loengud toimuvad siiski ainult kohapeal – selle saab koolitajaga eraldi läbi arutada.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
