import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  const requestBody = await request.json()

  await fetch(`${process.env.API_BASE_URL}/delete`, {
    method: 'DELETE',
    headers: {
      Token: request.headers.get('Token') || '',
    },
    body: JSON.stringify(requestBody),
  })

  return NextResponse.json({})
}
