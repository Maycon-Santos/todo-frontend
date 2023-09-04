import Cookies from 'js-cookie'

export type User = {
  username: string
}

export default async function GetUserData(): Promise<User | undefined> {
  const token = Cookies.get('token')

  if (token) {
    const response = await fetch('/api/user_data', {
      headers: {
        'Content-Type': 'application/json',
        Token: token,
      },
    })

    const { data } = await response.json()

    return data
  }
}
