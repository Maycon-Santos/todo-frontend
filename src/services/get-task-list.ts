import Cookies from 'js-cookie'

export default async function GetTaskList() {
  const response = await fetch('/api/list', {
    headers: {
      'Content-Type': 'application/json',
      Token: Cookies.get('token') || '',
    },
  })

  const { data } = await response.json()

  return data.results
}
