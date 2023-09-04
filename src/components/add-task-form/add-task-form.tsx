'use client'

import { useState } from 'react'
import { useApi } from '../api-provider/api-provider'
import Button from '../button/button'
import Input from '../input/input'
import Spacing from '../spacing/spacing'
import styles from './add-task-form.module.css'

const AddTaskForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const { addTask } = useApi()

  return (
    <form
      className={styles.wrapper}
      onSubmit={async (e) => {
        e.preventDefault()

        if (taskTitle !== '') {
          setLoading(true)
          await addTask(taskTitle)
          setLoading(false)
          setTaskTitle('')
        }
      }}
    >
      <div className={styles.inputContainer}>
        <Input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
        />
      </div>
      <Spacing horizontal={3} />
      <div className={styles.buttonWrapper}>
        <Button color="primary" type="submit" disabled={loading}>
          Criar
        </Button>
      </div>
    </form>
  )
}

export default AddTaskForm
