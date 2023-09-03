'use client'

import { useState } from 'react'
import TaskItem from '../task-item/task-item'
import { useApi } from '../api-provider/api-provider'
import Loader from '../loader/loader'
import styles from './task-list.module.css'

const TaskList: React.FC = () => {
  const [taskItemOpenedId, setTaskItemOpenedId] = useState<string>()
  const { taskList, loading, deleteTask, editTask } = useApi()

  if (loading && !taskList) {
    return <Loader />
  }

  if (!taskList) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoList}>
        <span className={styles.infoItem}>
          <span className={styles.createdTasks}>Tarefas criadas</span>
          <span className={styles.infoValue}>{taskList.length}</span>
        </span>
        <span className={styles.infoItem}>
          <span className={styles.completedTasks}>Concluídas</span>
          <span className={styles.infoValue}>
            {taskList.filter(({ done }) => done).length}
          </span>
        </span>
      </div>
      <div className={styles.taskList}>
        {taskList?.map((task) => {
          const { id, done, title, checklist, description } = task

          return (
            <div className={styles.taskItem} key={id}>
              <TaskItem
                title={title}
                description={description}
                checkList={checklist}
                isDone={done}
                onOpen={() => setTaskItemOpenedId(id)}
                isOpen={taskItemOpenedId === id}
                onEdit={(key, value) => {
                  editTask({
                    ...task,
                    [key]: value,
                  })
                }}
                onDelete={() => deleteTask(id)}
                onBlur={() => setTaskItemOpenedId('')}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
