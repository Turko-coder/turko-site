import Link from 'next/link'
import PartnersSlider from './PartnersSlider'

export default function Footer() {
  return (
    <>
      <PartnersSlider />
      <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Kontaktid</h3>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Peterburi tee 47<br />Tallinn 11415</span>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+3725290528" className="hover:text-primary-400 transition-colors">
                  +372 5 290 528
                </a>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@turvakoolitus.eu" className="hover:text-primary-400 transition-colors">
                  info@turvakoolitus.eu
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Kiired lingid</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/meiest/kontaktid" className="hover:text-primary-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Kontaktid
                </Link>
              </li>
              <li>
                <Link href="/meiest/paring" className="hover:text-primary-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Päring
                </Link>
              </li>
              <li>
                <Link href="/kursused/koolituskalender" className="hover:text-primary-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Koolituskalender
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Partnerid</h3>
            <div className="space-y-3 text-gray-400">
              <p className="hover:text-primary-400 transition-colors cursor-default">Eesti Politsei- ja Päästeamet</p>
              <p className="hover:text-primary-400 transition-colors cursor-default">Turvaamet</p>
              <p className="hover:text-primary-400 transition-colors cursor-default">Turvaliidud</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Turvakoolituse Keskus. Kõik õigused kaitstud.
            </p>
            <div className="flex gap-6">
              <Link href="/meiest" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Meiest
              </Link>
              <Link href="/kursused" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Kursused
              </Link>
              <Link href="/treeningud" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Treeningud
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
