import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  if (!slug) {
    return NextResponse.json({ message: 'Missing slug parameter' }, { status: 400 })
  }

  // Enable Draft Mode
  const response = NextResponse.redirect(new URL(`/${slug}`, request.url))
  response.cookies.set('__prerender_bypass', process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET)
  response.cookies.set('__next_preview_data', process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET)

  return response
}