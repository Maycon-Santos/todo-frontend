import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(`${process.env.API_BASE_URL}/list`, {
    cache: 'no-cache',
  })

  const data = await response.json()

  return NextResponse.json({ data })
}
