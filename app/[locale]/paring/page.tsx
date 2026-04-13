'use client'

import { Suspense } from 'react'
import { ParingForm } from './ParingForm'

export default function Paring() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Laadimine...</div>
        </div>
      }
    >
      <ParingForm />
    </Suspense>
  )
}
