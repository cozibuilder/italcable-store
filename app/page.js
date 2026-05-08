'use client'
import { useState, useEffect } from 'react'

const API_URL = '/api'

export default function PublicStore() {
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/load`)
      .then(r => r.json())
      .then(d => {
        setState(d.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading store...</div></div>
  if (!state) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Store coming soon</div></div>

  const { products = [], logo, heroBanner } = state

  return (
    <div className="min-h-screen bg-gray-50">
      {heroBanner && (
        <div className="w-full h-64 bg-gray-200 relative">
          <img src={heroBanner} alt="Store banner" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4">
          {logo && <img src={logo} alt="Logo" className="h-12 w-auto" />}
          <h1 className="text-2xl font-bold text-gray-900">Italcable Store</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {p.imgs?.[0] && (
                <div className="aspect-square bg-gray-100 relative group">
                  <img 
                    src={p.imgs[0]} 
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  {p.imgs[1] && (
                    <img 
                      src={p.imgs[1]} 
                      alt={`${p.name} alternate`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h3>
                {p.price && <p className="text-xl font-bold text-gray-900">${p.price}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}