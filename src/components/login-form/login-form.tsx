'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '../button/button'
import Input from '../input/input'
import Spacing from '../spacing/spacing'
import { useApi } from '../api-provider/api-provider'
import styles from './login-form.module.css'

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>()
  const [loading, isLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useApi()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        isLoading(true)
        const error = await login(username, password)

        setError(error)

        if (!error) {
          router.replace('/task-list')
        } else {
          isLoading(false)
        }
      }}
    >
      <h1 className={styles.title}>Login</h1>
      <Spacing vertical={8} />
      {error && (
        <>
          <span className={styles.errorMessage}>{error}</span>
          <Spacing vertical={3} />
        </>
      )}
      <Input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <Spacing vertical={3} />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Spacing vertical={3} />
      <Button color="primary" type="submit" disabled={loading}>
        Entrar
      </Button>
      <Spacing vertical={6} />
      <Link href="/register" className={styles.registerLink}>
        Criar contar
      </Link>
    </form>
  )
}

export default LoginForm
