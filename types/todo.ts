export type Todo = {
  id: string,
  title: string,
  description: string,
  done: boolean
}

export type RawTodo = {
  id?: string,
  title: string,
  description?: string,
  done?: boolean
}
