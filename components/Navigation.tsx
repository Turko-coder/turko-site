'use client'

import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()

  const [kursusedOpen, setKursusedOpen] = useState(false)
  const [mobileKursusedOpen, setMobileKursusedOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const scrollLockYRef = useRef(0)

  const kursusedRef = useRef<HTMLDivElement>(null)
  const pathnameRaw = usePathname() ?? ''
  const pathname = useMemo(() => {
    if (!pathnameRaw) return ''
    return pathnameRaw.length > 1 && pathnameRaw.endsWith('/')
      ? pathnameRaw.slice(0, -1)
      : pathnameRaw
  }, [pathnameRaw])

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
      if (
        kursusedRef.current &&
        !kursusedRef.current.contains(event.target as Node)
      ) {
        setKursusedOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setKursusedOpen(false)
    setMobileKursusedOpen(false)
    // After route change, do not restore scroll from the previous page (menu lock ref).
    scrollLockYRef.current = 0
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) setMobileKursusedOpen(false)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return
    if (pathname === '/kursused' || pathname.startsWith('/kursused/')) {
      setMobileKursusedOpen(true)
    }
  }, [mobileMenuOpen, pathname])

  useEffect(() => {
    if (!mobileMenuOpen) {
      const y = scrollLockYRef.current
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      window.scrollTo(0, y)
      return
    }

    scrollLockYRef.current = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.touchAction = 'none'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollLockYRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    return () => {
      const y = scrollLockYRef.current
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      window.scrollTo(0, y)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        mobileMenuOpen ? 'z-[10060]' : 'z-50'
      } ${
        mobileMenuOpen
          ? 'max-[869px]:bg-white max-[869px]:shadow-none max-[869px]:backdrop-blur-none ' +
            (scrolled
              ? 'min-[870px]:bg-white/95 min-[870px]:backdrop-blur-md min-[870px]:shadow-md'
              : 'min-[870px]:bg-white/80 min-[870px]:backdrop-blur-sm')
          : scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto page-gutter-x relative">
        <div
          className={`flex justify-between items-center h-20 relative bg-inherit ${
            mobileMenuOpen ? 'z-[70] max-[869px]:bg-white' : ''
          }`}
        >
          <Link 
            href="/" 
            className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-primary-600 max-[869px]:hover:text-gray-900"
            style={{ fontFamily: 'var(--font-manrope), sans-serif', letterSpacing: '0.06em' }}
          >
            turko
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden min-[870px]:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {/* Kursused Dropdown */}
            <div 
              ref={kursusedRef}
              className="relative inline-block"
              onMouseEnter={() => setKursusedOpen(true)}
              onMouseLeave={() => setKursusedOpen(false)}
            >
              <span
                className={`inline-block cursor-default rounded-lg px-5 py-2.5 font-medium transition-colors duration-200 ${
                  isActivePrefix('/kursused')
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : kursusedOpen
                      ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                }`}
              >
                {t('courses')}
              </span>
              <div className={`absolute top-full left-0 mt-2 w-max max-w-[min(100vw-2rem,24rem)] bg-white rounded-xl shadow-xl p-1.5 space-y-0.5 z-50 border border-gray-100 transition-all duration-300 ${
                kursusedOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}>
                <Link
                  href="/kursused/valvetootaja"
                  className={`group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-colors duration-200 ${
                    isActive('/kursused/valvetootaja')
                      ? 'bg-course-guard-50 text-course-guard-700 font-medium hover:bg-course-guard-100'
                      : 'text-gray-700 hover:bg-course-guard-50 hover:text-course-guard-700'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 shrink-0 text-course-guard-600"
                    aria-hidden
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t('guard')}
                </Link>
                <Link
                  href="/kursused/turvatootaja"
                  className={`group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-colors duration-200 ${
                    isActive('/kursused/turvatootaja')
                      ? 'bg-course-security-50 text-course-security-800 font-medium hover:bg-course-security-100'
                      : 'text-gray-700 hover:bg-course-security-50 hover:text-course-security-800'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 shrink-0 text-course-security-600"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t('security')}
                </Link>
                <Link
                  href="/kursused/turvajuht"
                  className={`group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-colors duration-200 ${
                    isActive('/kursused/turvajuht')
                      ? 'bg-course-lead-50 text-course-lead-700 font-medium hover:bg-course-lead-100'
                      : 'text-gray-700 hover:bg-course-lead-50 hover:text-course-lead-700'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 shrink-0 text-course-lead-600"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t('securityLead')}
                </Link>
                <Link
                  href="/kursused/taiendope"
                  className={`block rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-colors duration-200 ${
                    isActive('/kursused/taiendope')
                      ? 'bg-primary-50 text-primary-700 font-medium hover:bg-primary-100/80'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {t('refresher')}
                </Link>
                <Link
                  href="/kursused/koolitus"
                  className={`block rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-colors duration-200 ${
                    isActive('/kursused/koolitus')
                      ? 'bg-primary-50 text-primary-700 font-medium hover:bg-primary-100/80'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {t('training')}
                </Link>
              </div>
            </div>

            {/* Koolituskalender Button */}
            <Link 
              href="/koolituskalender" 
              className={`inline-block rounded-lg px-5 py-2.5 font-medium transition-colors duration-200 ${
                isActive('/koolituskalender')
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
              }`}
            >
              {t('calendar')}
            </Link>

            <Link
              href="/keskusest"
              className={`inline-block rounded-lg px-5 py-2.5 font-medium transition-colors duration-200 ${
                isActive('/keskusest')
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
              } ${locale === 'ru' ? 'whitespace-nowrap' : ''}`}
            >
              {t('about')}
            </Link>

            <Link
              href="/kontaktid"
              className={`inline-block rounded-lg px-5 py-2.5 font-medium transition-colors duration-200 ${
                isActive('/kontaktid')
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
              }`}
            >
              {t('contacts')}
            </Link>

            {/* Registreerimine — same shape as nav pills; blue only on hover */}
            <Link
              href="/registreerimine"
              className={`inline-block cursor-pointer rounded-lg px-5 py-2.5 font-medium transition-colors duration-200 ${
                isActive('/registreerimine')
                  ? 'bg-gray-100 text-gray-700 hover:bg-primary-600 hover:text-white'
                  : 'text-gray-700 hover:bg-primary-600 hover:text-white'
              }`}
            >
              {t('register')}
            </Link>

          </div>

          {/* Desktop language switcher on right edge */}
          <div className="hidden min-[870px]:flex items-center gap-1.5 absolute right-0 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={() => router.replace(pathname ?? '/', { locale: 'et' })}
              className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                locale === 'et' ? 'text-primary-600' : 'text-primary-600/50 hover:text-primary-600/70'
              }`}
              aria-pressed={locale === 'et'}
              aria-label="Eesti keel"
            >
              EST
            </button>
            <span className="text-primary-600 font-semibold select-none" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => router.replace(pathname ?? '/', { locale: 'ru' })}
              className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                locale === 'ru' ? 'text-primary-600' : 'text-primary-600/50 hover:text-primary-600/70'
              }`}
              aria-pressed={locale === 'ru'}
              aria-label="Vene keel"
            >
              RUS
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex min-[870px]:hidden items-center justify-center p-2 text-gray-700 transition-colors"
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
      </div>
    </nav>

      {/* Portal to body: avoids Chrome Android stacking/compositing bugs inside fixed+backdrop-blur nav */}
      {mounted &&
        createPortal(
          <div
            className={`min-[870px]:hidden ${mobileMenuOpen ? '' : 'pointer-events-none'}`}
            aria-hidden={!mobileMenuOpen}
          >
            <button
              type="button"
              className={`fixed inset-x-0 top-20 bottom-0 z-[10040] touch-none overscroll-none bg-black/30 transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Close menu overlay"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="mobile-navigation"
              className={`fixed inset-x-0 top-20 bottom-0 z-[10050] flex min-h-0 flex-col overflow-hidden bg-white transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                mobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-4 opacity-0'
              }`}
            >
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain pt-2">
              <button
                type="button"
                data-mobile-courses-trigger
                className={`flex w-full items-center justify-between px-6 py-4 text-left text-2xl font-medium transition-colors !text-gray-900`}
                aria-expanded={mobileKursusedOpen}
                aria-controls="mobile-courses-panel"
                onClick={() => setMobileKursusedOpen((open) => !open)}
              >
                <span
                  className={
                    !mobileKursusedOpen && isActivePrefix('/kursused') ? '!text-primary-600' : undefined
                  }
                >
                  {t('courses')}
                </span>
                <span
                  className={`text-3xl font-light leading-none transition-colors ${
                    mobileKursusedOpen
                      ? '!text-gray-900'
                      : isActivePrefix('/kursused')
                        ? '!text-primary-600'
                        : '!text-gray-900'
                  }`}
                  aria-hidden
                >
                  {mobileKursusedOpen ? '−' : '+'}
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  mobileKursusedOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div id="mobile-courses-panel" className="min-h-0 overflow-hidden">
                  <div className="flex flex-col px-6 pb-2 pl-14 pt-0">
                    <Link
                      href="/kursused/valvetootaja"
                      className={`flex items-center gap-3 py-4 text-2xl font-medium transition-colors ${
                        isActive('/kursused/valvetootaja')
                          ? '!text-course-guard-600'
                          : '!text-gray-900'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 shrink-0 !text-course-guard-600"
                        aria-hidden
                      >
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t('guard')}
                    </Link>
                    <Link
                      href="/kursused/turvatootaja"
                      className={`flex items-center gap-3 py-4 text-2xl font-medium transition-colors ${
                        isActive('/kursused/turvatootaja')
                          ? '!text-course-security-600'
                          : '!text-gray-900'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 shrink-0 !text-course-security-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t('security')}
                    </Link>
                    <Link
                      href="/kursused/turvajuht"
                      className={`flex items-center gap-3 py-4 text-2xl font-medium transition-colors ${
                        isActive('/kursused/turvajuht') ? '!text-course-lead-600' : '!text-gray-900'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 shrink-0 !text-course-lead-600"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t('securityLead')}
                    </Link>
                    <Link
                      href="/kursused/taiendope"
                      className={`block py-4 text-2xl font-medium transition-colors ${
                        isActive('/kursused/taiendope') ? '!text-primary-600' : '!text-gray-900'
                      }`}
                    >
                      {t('refresher')}
                    </Link>
                    <Link
                      href="/kursused/koolitus"
                      className={`block py-4 text-2xl font-medium transition-colors ${
                        isActive('/kursused/koolitus') ? '!text-primary-600' : '!text-gray-900'
                      }`}
                    >
                      {t('training')}
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/koolituskalender"
                className={`px-6 py-4 text-2xl font-medium transition-colors ${
                  isActive('/koolituskalender') ? 'text-primary-600' : 'text-gray-900'
                }`}
              >
                {t('calendar')}
              </Link>
              <Link
                href="/keskusest"
                className={`px-6 py-4 text-2xl font-medium transition-colors ${
                  isActive('/keskusest') ? 'text-primary-600' : 'text-gray-900'
                } ${locale === 'ru' ? 'whitespace-nowrap' : ''}`}
              >
                {t('about')}
              </Link>
              <Link
                href="/kontaktid"
                className={`px-6 py-4 text-2xl font-medium transition-colors ${
                  isActive('/kontaktid') ? 'text-primary-600' : 'text-gray-900'
                }`}
              >
                {t('contacts')}
              </Link>
            </div>

            <div className="relative z-10 shrink-0 bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
              <div className="space-y-5">
                <Link
                  href="/registreerimine"
                  className="btn-press flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3.5 text-center text-base font-semibold text-white shadow-sm"
                >
                  {t('register')}
                </Link>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => router.replace(pathname ?? '/', { locale: 'et' })}
                    className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                      locale === 'et' ? 'text-primary-600' : 'text-primary-600/50'
                    }`}
                    aria-pressed={locale === 'et'}
                    aria-label="Eesti keel"
                  >
                    EST
                  </button>
                  <span className="text-primary-600 font-semibold select-none" aria-hidden="true">
                    |
                  </span>
                  <button
                    type="button"
                    onClick={() => router.replace(pathname ?? '/', { locale: 'ru' })}
                    className={`px-1 py-0 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 ${
                      locale === 'ru' ? 'text-primary-600' : 'text-primary-600/50'
                    }`}
                    aria-pressed={locale === 'ru'}
                    aria-label="Vene keel"
                  >
                    RUS
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>,
          document.body
        )}
    </>
  )
}
