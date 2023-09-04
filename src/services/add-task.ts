import Cookies from 'js-cookie'

export default async function AddTask(task: { title: string }) {
  const response = await fetch('/api/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: Cookies.get('token') || '',
    },
    body: JSON.stringify(task),
  })

  return await response.json()
}
