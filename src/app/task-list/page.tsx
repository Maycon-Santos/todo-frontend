import { redirect } from 'next/navigation'
import Header from '@/components/header/header'
import Spacing from '@/components/spacing/spacing'
import AddTaskForm from '@/components/add-task-form/add-task-form'
import TaskList from '@/components/task-list/task-list'
import ApiProvider from '@/components/api-provider/api-provider'
import Container from '@/components/container/container'
import IsAuthenticated from '@/services/is-authenticated'

export default async function Home() {
  const { isAuthenticated } = await IsAuthenticated()

  if (!isAuthenticated) {
    redirect('/')
  }

  return (
    <ApiProvider>
      <Header />
      <Spacing vertical={8} />
      <Container component="main">
        <AddTaskForm />
        <Spacing vertical={5} />
        <TaskList />
      </Container>
    </ApiProvider>
  )
}
