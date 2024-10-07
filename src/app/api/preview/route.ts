import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const global = searchParams.get('global')

  if (secret !== process.env.PAYLOAD_PUBLIC_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  if (!slug && !global) {
    return new Response('No slug or global in the request', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the fetched post
  if (global === 'landing-page') {
    redirect('/')
  } else {
    redirect(`/${slug}`)
  }
}