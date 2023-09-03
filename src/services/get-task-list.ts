export default async function GetTaskList() {
  const response = await fetch('/api/list', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}
