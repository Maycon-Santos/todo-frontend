import { cookies } from 'next/headers'

export default async function IsAuthenticated() {
  const cookieStore = cookies()

  const response = await fetch(`${process.env.HOST}/api/is_authenticated`, {
    headers: {
      'Content-Type': 'application/json',
      Token: cookieStore.get('token')?.value || '',
    },
  })

  return {
    isAuthenticated: response.status === 200,
  }
}
