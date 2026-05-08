'use client'
import { useState, useEffect } from 'react'

const sansFont = "'Helvetica Neue', Helvetica, Arial, sans-serif"

export default function PublicStore() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)
  const [viewProduct, setViewProduct] = useState(null)
  const [activeThumb, setActiveThumb] = useState(0)

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

  // ─── PRODUCT DETAIL VIEW ───
  if (viewProduct) {
    const p = visible.find(x => x.id === viewProduct.id) || viewProduct
    const mainImg = p.imgs[activeThumb] || p.imgs[0]

    return (
      <div style={{ fontFamily: sansFont, background: '#fff', minHeight: '100vh' }}>
        <div
          style={{
            padding: '20px 32px',
            borderBottom: '1px solid #eee',
            cursor: 'pointer',
            fontSize: 13,
            letterSpacing: '0.1em',
            color: '#888',
          }}
          onClick={() => { setViewProduct(null); setActiveThumb(0) }}
        >
          ← BACK TO STORE
        </div>

        <div style={{
          display: 'flex',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '40px 32px',
          gap: 48,
          flexWrap: 'wrap',
        }}>
          {/* Left: Images */}
          <div style={{ flex: '1 1 500px', minWidth: 300 }}>
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              background: `url(${mainImg}) center/cover`,
              borderRadius: 2,
              marginBottom: 12,
            }} />

            {/* Thumbnails */}
            {p.imgs.length > 1 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {p.imgs.map((thumb, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      aspectRatio: '1',
                      background: `url(${thumb}) center/cover`,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: activeThumb === i ? '2px solid #222' : '2px solid transparent',
                    }}
                    onClick={() => setActiveThumb(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div style={{ flex: '1 1 400px', minWidth: 280 }}>
            <h1 style={{
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: '0.05em',
              margin: '0 0 8px',
              color: '#222',
            }}>
              {p.name}
            </h1>
            <div style={{
              fontSize: 18,
              color: '#555',
              marginBottom: 32,
              fontWeight: 300,
            }}>
              {p.price}
            </div>
            <div style={{
              fontSize: 12,
              color: '#999',
              lineHeight: 1.8,
              letterSpacing: '0.03em',
              borderTop: '1px solid #eee',
              paddingTop: 24,
            }}>
              100% viscose reverse jacquard. Vine and diamond trellis pattern.
              <br />
              Relaxed fit. Made in Portugal.
            </div>
            <button
              onClick={() => alert('Coming soon — checkout integration')}
              style={{
                marginTop: 32,
                width: '100%',
                padding: '16px 0',
                background: '#222',
                color: '#fff',
                border: 'none',
                fontSize: 12,
                letterSpacing: '0.2em',
                cursor: 'pointer',
              }}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── GRID VIEW ───
  return (
    <div style={{ fontFamily: sansFont, background: '#fff', minHeight: '100vh' }}>
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
              onClick={() => { setViewProduct(p); setActiveThumb(0) }}
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
