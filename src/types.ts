export type CheckItem = {
  id: string
  label: string
  done: boolean
}

export type Task = {
  id: string
  done: boolean
  title: string
  description: string
  checklist: CheckItem[]
}
