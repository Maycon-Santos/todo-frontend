import AddTask from '@/services/add-task'
import DeleteTask from '@/services/delete-task'
import EditTask from '@/services/edit-task'
import GetTaskList from '@/services/get-task-list'
import { Task } from '@/types'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type ApiContextValue = {
  loading: boolean
  taskList?: Task[]
  addTask: (title: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  editTask: (task: Task) => void
}

type ApiProviderProps = {}

const ApiContext = createContext<ApiContextValue>({
  loading: false,
  taskList: [],
  addTask: async () => {},
  deleteTask: async () => {},
  editTask: async () => {},
})

const ApiProvider: React.FC<PropsWithChildren<ApiProviderProps>> = (props) => {
  const { children } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<Task[] | undefined>()
  const debounceList = useRef<{
    [k: string]: ReturnType<typeof setTimeout>
  }>({})

  useEffect(() => {
    setLoading(true)

    GetTaskList().then(({ data }) => {
      setTaskList(data.results || [])
      setLoading(false)
    })
  }, [])

  const addTask = async (title: string) => {
    const { data } = await AddTask({ title })

    const newTaskList = [...(taskList || [])]

    newTaskList.unshift(data)

    setTaskList(newTaskList)
  }

  const deleteTask = async (id: string) => {
    await DeleteTask(id)

    const newTaskList = [...(taskList || [])].filter(
      ({ id: idToDelete }) => id !== idToDelete,
    )

    setTaskList(newTaskList)
  }

  const editTask = (task: Task) => {
    const newTaskList = taskList?.map((item) => {
      if (task.id === item.id) {
        return task
      }

      return item
    })

    setTaskList(newTaskList)

    clearTimeout(debounceList.current[task.id])

    debounceList.current[task.id] = setTimeout(async () => {
      await EditTask(task)
    }, 500)
  }

  return (
    <ApiContext.Provider
      value={{
        loading,
        taskList: taskList,
        addTask,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => useContext(ApiContext)

export default ApiProvider
