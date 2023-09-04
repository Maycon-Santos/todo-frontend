export default async function SignUp(task: {
  username: string
  password: string
}) {
  const response = await fetch('/api/sign_up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  return await response.json()
}
