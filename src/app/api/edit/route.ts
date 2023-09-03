import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestBody = await request.json()

  const response = await fetch(`${process.env.API_BASE_URL}/edit`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  })

  const data = await response.json()

  return NextResponse.json({ data })
}
