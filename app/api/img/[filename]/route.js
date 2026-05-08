export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const { filename } = await params
    const res = await fetch(`http://178.105.58.20:3001/uploads/${filename}`, { cache: 'no-store' })
    if (!res.ok) return new Response('Not found', { status: 404 })
    const buf = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/png'
    return new Response(buf, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 })
  }
}
