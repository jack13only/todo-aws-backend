import { v4 as uuidv4 } from 'uuid'
import { RawTodo, Todo } from '../types/todo'

export const createTodo = (rawItem: RawTodo): Todo => {
  if (!rawItem.title) throw new Error('Incorrect todo')

  return {
    id: rawItem.id || uuidv4(),
    title: rawItem.title,
    description: rawItem.description || '',
    done: rawItem.done || false
  }
}
