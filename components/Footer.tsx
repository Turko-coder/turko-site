'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="px-8 py-8"
      style={{ backgroundColor: 'hsl(215deg 100% 97.18%)' }}
    >
      {/* Main footer card */}
      <div className="max-w-[44rem] mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Main layout — responsive: stacked on small, row on >=670px */}
        <div className="flex flex-col min-[670px]:flex-row items-center justify-between px-10 pb-10 pt-10 min-w-0 gap-6">
          {/* Logo: below on small screens, left on large */}
          <div className="flex items-center justify-center shrink-0 min-[670px]:mr-4 order-2 min-[670px]:order-1 w-full min-[670px]:w-auto">
            <Link
              href="/"
              className="font-bold text-gray-900 hover:text-primary-600 transition-colors block leading-none"
              style={{
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: 'clamp(2.75rem, 4vw + 0.75rem, 3.75rem)',
                marginLeft: 'clamp(8px, 2vw, 20px)',
                marginRight: 'clamp(8px, 2vw, 20px)',
              }}
            >
              turko
            </Link>
          </div>

          {/* Pages + contacts: above on small screens, right on large */}
          <div className="min-w-0 flex-1 flex flex-row justify-evenly items-center order-1 min-[670px]:order-2 w-full">
            <div className="hidden min-[430px]:block w-auto shrink min-w-0">
              <ul className="space-y-2.5">
                <li><Link href="/kursused/koolitus" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">Koolitus</Link></li>
                <li><Link href="/koolituskalender" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">Kalender</Link></li>
                <li><Link href="/keskusest" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">Keskusest</Link></li>
                <li><Link href="/kontaktid" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">Kontaktid</Link></li>
                <li><Link href="/registreerimine" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">Registreerimine</Link></li>
              </ul>
            </div>

            <div className="w-auto shrink min-w-0 self-stretch">
              <ul className="h-full flex flex-col justify-between gap-4 items-center min-[430px]:items-start text-center min-[430px]:text-left">
                <li>
                  <p className="text-xs text-gray-500">Telefon</p>
                  <p className="text-sm text-gray-600 mt-1">+3725290528</p>
                </li>
                <li>
                  <p className="text-xs text-gray-500 font-normal">E-post</p>
                  <p className="text-sm text-gray-600 mt-1">info@turko.ee</p>
                </li>
                <li>
                  <p className="text-xs text-gray-500">Aadress</p>
                  <Link href="/kontaktid" className="text-sm text-gray-600 mt-1 block hover:text-primary-600 transition-colors break-words">
                    Väike-Paala tn 2,<br />
                    11415 Tallinn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom strip — outside the card */}
      <div className="flex flex-auto max-w-[44rem] mx-auto mt-4 flex-row-reverse flex-wrap justify-center min-[600px]:justify-between items-center gap-x-6 gap-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/privaatsuspoliitika" className="hover:text-primary-600 transition-colors">
            Privaatsuspoliitika
          </Link>
          <Link href="/kasutustingimused" className="hover:text-primary-600 transition-colors">
            Kasutustingimused
          </Link>
        </div>
        <p>©2026 Turko Õppekeskus OÜ.</p>
      </div>
    </footer>
  )
}
