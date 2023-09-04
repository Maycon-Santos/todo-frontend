import Cookies from 'js-cookie'

export default async function DeleteTask(id: string) {
  const response = await fetch('/api/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Token: Cookies.get('token') || '',
    },
    body: JSON.stringify({ id }),
  })

  return await response.json()
}
