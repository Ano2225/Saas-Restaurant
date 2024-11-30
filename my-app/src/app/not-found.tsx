'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 text-center">
        <h1 className="text-9xl font-bold text-yellow-700">404</h1>
        
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page non trouvée
          </h2>
          
          <p className="text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="flex items-center gap-2 px-6 py-3 text-white  bg-[#fbaf03] rounded-lg hover:bg-[#e59f02] transition-colors"
            >
              <Home size={20} />
              Accueil
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}