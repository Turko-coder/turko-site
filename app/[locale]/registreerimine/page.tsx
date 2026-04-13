'use client'

import { Suspense } from 'react'
import { ParingForm } from '../paring/ParingForm'

export default function Registreerimine() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Laadimine...</div>
        </div>
      }
    >
      <ParingForm courseSelectStyled />
    </Suspense>
  )
}
