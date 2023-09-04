import { cookies } from 'next/headers'

export default async function IsAuthenticated() {
  const cookieStore = cookies()
  const isServer = typeof window === 'undefined'
  const url = isServer
    ? `${process.env.API_BASE_URL}/is_authenticated`
    : `/api/is_authenticated`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Token: cookieStore.get('token')?.value || '',
    },
  })

  return {
    isAuthenticated: response.status === 200,
  }
}
