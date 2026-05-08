export async function GET() {
  try {
    const res = await fetch('http://178.105.58.20:3001/api/load', { cache: 'no-store' })
    const data = await res.json()
    return Response.json(data)
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 })
  }
}
