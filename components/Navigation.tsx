'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Navigation() {
  const [kursusedOpen, setKursusedOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<'est' | 'rus'>('est')
  
  const kursusedRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() ?? ''

  const isActive = (href: string) => pathname === href
  const isActivePrefix = (prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (kursusedRef.current && !kursusedRef.current.contains(event.target as Node)) {
        setKursusedOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setKursusedOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          <Link 
            href="/" 
            className="text-3xl font-bold text-gray-900 hover:text-primary-600 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', letterSpacing: '0.06em' }}
          >
            turko
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden min-[870px]:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {/* Kursused Dropdown */}
            <div 
              ref={kursusedRef}
              className="relative"
              onMouseEnter={() => setKursusedOpen(true)}
              onMouseLeave={() => setKursusedOpen(false)}
            >
              <span
                className={`px-4 py-2 font-medium transition-colors duration-200 cursor-default inline-block ${
                  kursusedOpen || isActivePrefix('/kursused') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Kursused
              </span>
              <div className={`absolute top-full left-0 mt-2 w-[14rem] bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 transition-all duration-300 ${
                kursusedOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}>
                <Link 
                  href="/kursused/koolitus" 
                  className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Koolitus
                </Link>
                <Link 
                  href="/kursused/valvetootaja" 
                  className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  <span>Valvetöötaja</span>
                  <span
                    className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>3</span>
                  </span>
                </Link>
                <Link 
                  href="/kursused/turvatootaja" 
                  className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  <span>Turvatöötaja</span>
                  <span
                    className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>4</span>
                  </span>
                </Link>
                <Link 
                  href="/kursused/turvajuht" 
                  className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  <span>Turvajuht</span>
                  <span
                    className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>5</span>
                  </span>
                </Link>
                <Link 
                  href="/kursused/taiendope" 
                  className="flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  <span>Täiendõpe</span>
                  <span
                    className="ml-3 inline-flex items-center justify-center gap-[0.2rem] pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                    style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', paddingTop: '5px', paddingBottom: '5px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26 29"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        d="M7.875 15.212c0-1.222.98-2.212 2.188-2.212h.874c1.21 0 2.188.99 2.188 2.211v11.27c0 1.22-.98 2.211-2.187 2.211h-.876c-.58 0-1.136-.233-1.546-.647a2.22 2.22 0 0 1-.641-1.564zM0 20.519c0-1.222.98-2.211 2.188-2.211h.874c1.21 0 2.188.99 2.188 2.211v5.962c0 1.22-.98 2.211-2.187 2.211h-.876c-.58 0-1.136-.233-1.546-.647A2.22 2.22 0 0 1 0 26.48z"
                      />
                      <path
                        d="M16.5 26.5V6.828l-2.086 2.086a2 2 0 1 1-2.828-2.828l5.5-5.5.151-.138a2 2 0 0 1 2.677.138l5.5 5.5a2 2 0 1 1-2.828 2.828L20.5 6.828V26.5a2 2 0 1 1-4 0"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Koolituskalender Button */}
            <Link 
              href="/koolituskalender" 
              className={`px-4 py-2 font-medium transition-colors duration-200 ${
                isActive('/koolituskalender') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Kalender
            </Link>

            <Link
              href="/keskusest"
              className={`px-4 py-2 font-medium transition-colors duration-200 ${
                isActive('/keskusest') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Keskusest
            </Link>

            <Link
              href="/kontaktid"
              className={`px-4 py-2 font-medium transition-colors duration-200 ${
                isActive('/kontaktid') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Kontaktid
            </Link>

            {/* Päring Button */}
            <Link 
              href="/registreerimine" 
              className="ml-4 px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold shadow-sm hover:bg-primary-700 transition-all duration-300 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: '#177AE5' }}
            >
              Registreeru
            </Link>

          </div>

          {/* Desktop language switcher on right edge */}
          <div className="hidden min-[870px]:flex items-center gap-1.5 absolute right-0 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={() => setLang('est')}
              className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                lang === 'est' ? 'text-primary-600' : 'text-primary-600/50 hover:text-primary-600/70'
              }`}
              aria-pressed={lang === 'est'}
              aria-label="Eesti keel"
            >
              EST
            </button>
            <span className="text-primary-600 font-semibold select-none" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setLang('rus')}
              className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                lang === 'rus' ? 'text-primary-600' : 'text-primary-600/50 hover:text-primary-600/70'
              }`}
              aria-pressed={lang === 'rus'}
              aria-label="Vene keel"
            >
              RUS
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex min-[870px]:hidden items-center justify-center p-2 text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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
        <div
          className={`min-[870px]:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <button
            type="button"
            className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Close menu overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-navigation"
            className={`relative z-50 flex flex-col border-t border-gray-200 py-4 bg-white shadow-xl transition-transform duration-300 ${
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
            }`}
          >
            <div className="px-6 py-2">
              <button 
                className="w-full text-left text-gray-700 font-medium hover:text-primary-600"
                onClick={() => setKursusedOpen(!kursusedOpen)}
              >
                Kursused {kursusedOpen ? '▲' : '▼'}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                kursusedOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6">
                  <Link href="/kursused/koolitus" className="block px-6 py-2 text-sm text-gray-600 hover:text-primary-600">Koolitus</Link>
                  <Link
                    href="/kursused/valvetootaja"
                    className="flex items-center justify-between px-6 py-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <span>Valvetöötaja</span>
                    <span
                      className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                      style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>3</span>
                    </span>
                  </Link>
                  <Link
                    href="/kursused/turvatootaja"
                    className="flex items-center justify-between px-6 py-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <span>Turvatöötaja</span>
                    <span
                      className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                      style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>4</span>
                    </span>
                  </Link>
                  <Link
                    href="/kursused/turvajuht"
                    className="flex items-center justify-between px-6 py-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <span>Turvajuht</span>
                    <span
                      className="ml-3 inline-flex items-center justify-center gap-[0.2rem] py-1 pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                      style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                    </svg>
                    <span>5</span>
                    </span>
                  </Link>
                  <Link href="/kursused/taiendope" className="flex items-center justify-between px-6 py-2 text-sm text-gray-600 hover:text-primary-600">
                    <span>Täiendõpe</span>
                    <span
                      className="ml-2 inline-flex items-center justify-center gap-[0.2rem] pl-2.5 pr-3 rounded-lg text-xs font-semibold w-[3rem]"
                      style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE', paddingTop: '5px', paddingBottom: '5px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      aria-hidden
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 26 29"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          d="M7.875 15.212c0-1.222.98-2.212 2.188-2.212h.874c1.21 0 2.188.99 2.188 2.211v11.27c0 1.22-.98 2.211-2.187 2.211h-.876c-.58 0-1.136-.233-1.546-.647a2.22 2.22 0 0 1-.641-1.564zM0 20.519c0-1.222.98-2.211 2.188-2.211h.874c1.21 0 2.188.99 2.188 2.211v5.962c0 1.22-.98 2.211-2.187 2.211h-.876c-.58 0-1.136-.233-1.546-.647A2.22 2.22 0 0 1 0 26.48z"
                        />
                        <path
                          d="M16.5 26.5V6.828l-2.086 2.086a2 2 0 1 1-2.828-2.828l5.5-5.5.151-.138a2 2 0 0 1 2.677.138l5.5 5.5a2 2 0 1 1-2.828 2.828L20.5 6.828V26.5a2 2 0 1 1-4 0"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/koolituskalender"
              className={`block px-6 py-2 font-medium ${
                isActive('/koolituskalender') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Kalender
            </Link>
            <Link
              href="/keskusest"
              className={`block px-6 py-2 font-medium ${
                isActive('/keskusest') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Keskusest
            </Link>
            <Link
              href="/kontaktid"
              className={`block px-6 py-2 font-medium ${
                isActive('/kontaktid') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Kontaktid
            </Link>
            <Link
              href="/registreerimine"
              className="ml-6 mt-2 mb-3 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold shadow-sm hover:bg-primary-700 transition-all duration-300 hover:shadow-lg text-center"
              style={{ backgroundColor: '#177AE5' }}
            >
              Registreeru
            </Link>
            <div className="flex items-center gap-1.5 px-6 py-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setLang('est')}
                className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                  lang === 'est' ? 'text-primary-600' : 'text-primary-600/50'
                }`}
                aria-pressed={lang === 'est'}
                aria-label="Eesti keel"
              >
                EST
              </button>
              <span className="text-primary-600 font-semibold select-none" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => setLang('rus')}
                className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                  lang === 'rus' ? 'text-primary-600' : 'text-primary-600/50'
                }`}
                aria-pressed={lang === 'rus'}
                aria-label="Vene keel"
              >
                RUS
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
