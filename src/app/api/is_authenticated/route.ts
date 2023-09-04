import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const response = await fetch(`${process.env.API_BASE_URL}/is_authenticated`, {
    cache: 'no-cache',
    headers: {
      Token: request.headers.get('Token') || '',
    },
  })

  return NextResponse.json({}, { status: response.status })
}
