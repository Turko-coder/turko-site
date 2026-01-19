'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface CourseInfo {
  type: string
  name: string
  level?: string
  price?: string
  duration?: string
}

function ParingForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null)

  useEffect(() => {
    // Get course/training info from URL parameters
    const type = searchParams.get('type') || ''
    const name = searchParams.get('name') || ''
    const level = searchParams.get('level') || ''
    const price = searchParams.get('price') || ''
    const duration = searchParams.get('duration') || ''
    const location = searchParams.get('location') || ''
    const date = searchParams.get('date') || ''

    if (type && name) {
      setCourseInfo({
        type,
        name,
        level: level || undefined,
        price: price || undefined,
        duration: duration || undefined,
      })

      // Pre-fill message based on course/training info
      let messageText = `Soovin registreeruda: ${name}`
      
      if (level) {
        messageText += ` (${level})`
      }
      
      if (date) {
        messageText += `\nKuupäev: ${date}`
      }
      
      if (location) {
        messageText += `\nAsukoht: ${location}`
      }
      
      if (price) {
        messageText += `\nHind: ${price}`
      }
      
      if (duration) {
        messageText += `\nKestus: ${duration}`
      }
      
      messageText += '\n\nPalun võtke minuga ühendust, et arutada registreerimise üksikasju.'

      setFormData(prev => ({
        ...prev,
        message: messageText,
      }))
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData, courseInfo)
    alert('Täname päringu eest! Võtame teiega ühendust lähiajal.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Päring</h1>
          
          {courseInfo && (
            <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Registreerumine:</p>
              <p className="font-semibold text-gray-900">{courseInfo.name}</p>
              {courseInfo.level && (
                <p className="text-sm text-gray-600 mt-1">{courseInfo.level}</p>
              )}
            </div>
          )}

          <p className="text-gray-600 mb-8">
            Täitke allolev vorm ja me võtame teiega ühendust lähiajal.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nimi *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-post *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Sõnum *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition cursor-pointer"
            >
              Saada päring
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function Paring() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-gray-600">Laadimine...</div>
      </div>
    }>
      <ParingForm />
    </Suspense>
  )
}
