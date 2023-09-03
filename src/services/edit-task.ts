import { Task } from '@/types'

export default async function EditTask(task: Task) {
  const response = await fetch('/api/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  return await response.json()
}
