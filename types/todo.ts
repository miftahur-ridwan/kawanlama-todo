export type StatusTodo = 'Unmarked' | 'Done' | 'Canceled'

export interface Todo {
  id?: number
  activitiesNo?: string
  subject: string
  description: string
  status: StatusTodo
  createdAt?: string
  updatedAt?: string
}
