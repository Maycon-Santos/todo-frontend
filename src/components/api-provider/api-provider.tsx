'use client'

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Cookies from 'js-cookie'

import AddTask from '@/services/add-task'
import DeleteTask from '@/services/delete-task'
import EditTask from '@/services/edit-task'
import GetTaskList from '@/services/get-task-list'
import SignIn from '@/services/sign-in'
import { Task } from '@/types'
import GetUserData, { User } from '@/services/get-user-data'
import SignUp from '@/services/sign-up'

type ApiContextValue = {
  taskList?: Task[]
  user?: User
  login: (username: string, password: string) => Promise<string | undefined>
  register: (username: string, password: string) => Promise<string | undefined>
  addTask: (title: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  editTask: (task: Task) => void
  fetchTaskList: () => Promise<void>
  fetchUserData: () => Promise<void>
}

const ApiContext = createContext<ApiContextValue>({
  taskList: [],
  addTask: async () => {},
  deleteTask: async () => {},
  editTask: async () => {},
  login: async () => undefined,
  register: async () => undefined,
  fetchTaskList: async () => {},
  fetchUserData: async () => {},
})

const ApiProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props
  const [userData, setUserData] = useState<User>()
  const [taskList, setTaskList] = useState<Task[] | undefined>()
  const debounceList = useRef<{
    [k: string]: ReturnType<typeof setTimeout>
  }>({})

  const fetchTaskList = async () => {
    setTaskList(await GetTaskList())
  }

  const fetchUserData = async () => {
    setUserData(await GetUserData())
  }

  const login = async (username: string, password: string) => {
    const { data } = await SignIn({
      username,
      password,
    })

    if (data.error) {
      return data.error
    }

    Cookies.set('token', data.token)
  }

  const register = async (username: string, password: string) => {
    const { data } = await SignUp({
      username,
      password,
    })

    if (data.error) {
      return data.error
    }

    Cookies.set('token', data.token)
  }

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
        taskList: taskList,
        fetchTaskList,
        login,
        register,
        user: userData,
        fetchUserData,
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
