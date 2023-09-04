import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const response = await fetch(`${process.env.API_BASE_URL}/list`, {
    cache: 'no-cache',
    headers: {
      Token: request.headers.get('Token') || '',
    },
  })

  const data = await response.json()

  return NextResponse.json({ data })
}
