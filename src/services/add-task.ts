export default async function AddTask(task: { title: string }) {
  const response = await fetch('/api/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  return await response.json()
}
