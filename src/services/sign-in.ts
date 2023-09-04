export default async function SignIn(task: {
  username: string
  password: string
}) {
  const response = await fetch('/api/sign_in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  return await response.json()
}
