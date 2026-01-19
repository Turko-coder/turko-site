'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Navigation() {
  const [meiestOpen, setMeiestOpen] = useState(false)
  const [kursusedOpen, setKursusedOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const meiestRef = useRef<HTMLDivElement>(null)
  const kursusedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (meiestRef.current && !meiestRef.current.contains(event.target as Node)) {
        setMeiestOpen(false)
      }
      if (kursusedRef.current && !kursusedRef.current.contains(event.target as Node)) {
        setKursusedOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors duration-300"
          >
            Turvakoolitus
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Meiest Dropdown */}
            <div 
              ref={meiestRef}
              className="relative"
              onMouseEnter={() => setMeiestOpen(true)}
              onMouseLeave={() => setMeiestOpen(false)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
                Meiest
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                  meiestOpen ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 transition-all duration-300 ${
                meiestOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}>
                <Link 
                  href="/meiest" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Meiest
                </Link>
                <Link 
                  href="/meiest/partnerid" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Partnerid
                </Link>
                <Link 
                  href="/meiest/koolitus" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Koolitus
                </Link>
                <Link 
                  href="/meiest/kontaktid" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Kontaktid
                </Link>
                <Link 
                  href="/meiest/paring" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Päring
                </Link>
              </div>
            </div>

            {/* Kursused Dropdown */}
            <div 
              ref={kursusedRef}
              className="relative"
              onMouseEnter={() => setKursusedOpen(true)}
              onMouseLeave={() => setKursusedOpen(false)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group">
                Kursused
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                  kursusedOpen ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
              <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 transition-all duration-300 ${
                kursusedOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}>
                <Link 
                  href="/kursused/koolituskalender" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Koolituskalender
                </Link>
                <Link 
                  href="/kursused/valvetootaja-tase-3" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Valvetöötaja, tase 3
                </Link>
                <Link 
                  href="/kursused/turvatootaja-tase-4" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Turvatöötaja, tase 4
                </Link>
                <Link 
                  href="/kursused/turvajuht-tase-5" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Turvajuht, tase 5
                </Link>
                <Link 
                  href="/kursused/taiendope" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Täiendõpe
                </Link>
                <Link 
                  href="/kursused/oppekavad" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Õppekavad
                </Link>
                <Link 
                  href="/kursused/oppetoo" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Õppetöö
                </Link>
              </div>
            </div>

            {/* Treeningud */}
            <Link 
              href="/treeningud" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              Treeningud
              <span className="absolute bottom-0 left-0 h-0.5 bg-primary-600 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className={`h-6 w-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-200 mt-2">
            <div className="px-2">
              <button 
                className="w-full text-left px-4 py-2 text-gray-700 font-medium"
                onClick={() => setMeiestOpen(!meiestOpen)}
              >
                Meiest
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                meiestOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-4 space-y-1">
                  <Link href="/meiest" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Meiest</Link>
                  <Link href="/meiest/partnerid" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Partnerid</Link>
                  <Link href="/meiest/koolitus" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Koolitus</Link>
                  <Link href="/meiest/kontaktid" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Kontaktid</Link>
                  <Link href="/meiest/paring" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Päring</Link>
                </div>
              </div>
            </div>
            <div className="px-2">
              <button 
                className="w-full text-left px-4 py-2 text-gray-700 font-medium"
                onClick={() => setKursusedOpen(!kursusedOpen)}
              >
                Kursused
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                kursusedOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-4 space-y-1">
                  <Link href="/kursused/koolituskalender" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Koolituskalender</Link>
                  <Link href="/kursused/valvetootaja-tase-3" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Valvetöötaja, tase 3</Link>
                  <Link href="/kursused/turvatootaja-tase-4" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Turvatöötaja, tase 4</Link>
                  <Link href="/kursused/turvajuht-tase-5" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Turvajuht, tase 5</Link>
                  <Link href="/kursused/taiendope" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Täiendõpe</Link>
                  <Link href="/kursused/oppekavad-oppetoo" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600">Õppekavad ja õppetöö</Link>
                </div>
              </div>
            </div>
            <Link href="/treeningud" className="block px-4 py-2 text-gray-700 font-medium">Treeningud</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
