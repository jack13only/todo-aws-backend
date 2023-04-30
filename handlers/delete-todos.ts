import { deleteTodo } from '../functions'
import { headers } from '../helpers/headers'

export const deleteTodos = async (event) => {
  try {
    const { TODO_TABLE } = process.env
    if (!TODO_TABLE) throw new Error('TODO_TABLE is not defined')

    const idsArray: string[] = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    console.log('deleteTodos ', idsArray)
    if (!Array.isArray(idsArray)) throw new Error('Array of ids is expected')

    const deletePromisses = idsArray.map(async (id) => await deleteTodo(id))
    const result = await Promise.allSettled(deletePromisses)

    return {
      statusCode: 200,
      headers,
      body: `${result.filter((item) => item.status === 'fulfilled').length} of ${idsArray.length} items deleted`
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: 'Something goes wrong with getting data'
    }
  }
}
