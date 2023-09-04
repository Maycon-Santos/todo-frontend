import { redirect } from 'next/navigation'
import Header from '@/components/header/header'
import Spacing from '@/components/spacing/spacing'
import Container from '@/components/container/container'
import ApiProvider from '@/components/api-provider/api-provider'
import RegisterForm from '@/components/register-form/register-form'
import IsAuthenticated from '@/services/is-authenticated'

export default async function Home() {
  const { isAuthenticated } = await IsAuthenticated()

  if (isAuthenticated) {
    redirect('/task-list')
  }

  return (
    <ApiProvider>
      <Header />
      <Spacing vertical={8} />
      <Container component="main">
        <RegisterForm />
      </Container>
    </ApiProvider>
  )
}
