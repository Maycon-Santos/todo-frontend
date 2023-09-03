import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  const requestBody = await request.json()

  await fetch(`${process.env.API_BASE_URL}/delete`, {
    method: 'DELETE',
    body: JSON.stringify(requestBody),
  })

  return NextResponse.json({})
}
