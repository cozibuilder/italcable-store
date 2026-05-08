export const dynamic = 'force-dynamic'
export const revalidate = 0

function rewriteImageUrl(url) {
  if (!url || typeof url !== 'string') return url
  // Convert http://178.105.58.20:3001/uploads/X.png -> /api/img/X.png
  const match = url.match(/^https?:\/\/[^/]+\/uploads\/(.+)$/)
  if (match) return `/api/img/${match[1]}`
  return url
}

export async function GET() {
  try {
    const res = await fetch('http://178.105.58.20:3001/api/load', { cache: 'no-store' })
    const data = await res.json()
    if (data.data) {
      // Rewrite all image URLs to use the proxy
      if (data.data.products) {
        data.data.products = data.data.products.map(p => ({
          ...p,
          imgs: (p.imgs || []).map(rewriteImageUrl)
        }))
      }
      data.data.logo = rewriteImageUrl(data.data.logo)
      data.data.heroBanner = rewriteImageUrl(data.data.heroBanner)
    }
    return Response.json(data)
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 })
  }
}
