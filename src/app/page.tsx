'use client'

import styles from './page.module.css'
import Header from '../components/header/header'
import Spacing from '../components/spacing/spacing'
import AddTaskForm from '../components/add-task-form/add-task-form'
import TaskList from '../components/task-list/task-list'
import ApiProvider from '../components/api-provider/api-provider'

export default function Home() {
  return (
    <>
      <Header />
      <Spacing vertical={8} />
      <main className={styles.main}>
        <ApiProvider>
          <AddTaskForm />
          <Spacing vertical={5} />
          <TaskList />
        </ApiProvider>
      </main>
    </>
  )
}
