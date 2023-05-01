import { headers } from '../helpers/headers'
import { deleteTodo } from '../functions'

export const deleteTodoById = async (event) => {
  try {
    const { id } = event.pathParameters
    if (!id) {
      return {
        statusCode: 500,
        headers,
        body: 'Missing id in query'
      }
    }
    await deleteTodo(id)

    return {
      statusCode: 200,
      headers,
      body: 'Item deleted'
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: 'Something goes wrong with deleting data'
    }
  }
}
