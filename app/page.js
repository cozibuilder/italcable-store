'use client'
import { useState, useEffect } from 'react'

const sansFont = "'Helvetica Neue', Helvetica, Arial, sans-serif"

export default function PublicStore() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    fetch('/api/load')
      .then(r => r.json())
      .then(d => { setData(d.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{ fontFamily: sansFont, background: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 11, letterSpacing: '0.15em' }}>
        LOADING
      </div>
    )
  }

  if (!data) {
    return (
      <div style={{ fontFamily: sansFont, background: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 11, letterSpacing: '0.15em' }}>
        STORE COMING SOON
      </div>
    )
  }

  const { products = [], logo } = data
  const visible = products.filter(p => p.imgs && p.imgs.length > 0)

  return (
    <div style={{ fontFamily: sansFont, background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 32px',
        borderBottom: '1px solid #eee',
      }}>
        {logo ? (
          <img src={logo} alt="logo" style={{ height: 32, objectFit: 'contain' }} />
        ) : (
          <div style={{
            fontSize: 14,
            letterSpacing: '0.2em',
            color: '#333',
            fontWeight: 500,
          }}>
            ITALCABLE
          </div>
        )}
      </div>

      {/* Product Grid */}
      {visible.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 32px', color: '#999', fontSize: 11, letterSpacing: '0.15em' }}>
          NEW COLLECTION COMING SOON
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(4, visible.length)}, 1fr)`,
          gap: 0,
        }}>
          {visible.map(p => (
            <div
              key={p.id}
              style={{ cursor: 'pointer', position: 'relative' }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                background: `url(${(hovered === p.id && p.imgs[1]) ? p.imgs[1] : p.imgs[0]}) center/cover`,
                transition: 'background 0.3s ease',
              }} />
              <div style={{ padding: '12px 12px 20px' }}>
                <div style={{
                  fontSize: 12,
                  color: '#333',
                  letterSpacing: '0.03em',
                  marginBottom: 4,
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#999',
                  letterSpacing: '0.03em',
                }}>
                  {p.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
