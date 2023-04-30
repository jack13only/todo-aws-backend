import { marshall } from '@aws-sdk/util-dynamodb'
import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { headers } from '../helpers/headers'
import { getDbClient } from '../clients/dynamodb'
import { createTodo } from '../functions'
import { Todo } from '../types/todo'

export const addUpdateTodo = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    console.log('addUpdateTodo ', body)

    const todo: Todo = createTodo(body)

    const dbClient = getDbClient()

    const { TODO_TABLE } = process.env

    if (!TODO_TABLE) throw new Error('TODO_TABLE is not defined')

    const putParams = {
      TableName: TODO_TABLE,
      Item: marshall(todo)
    }

    await dbClient.send(new PutItemCommand(putParams))
    return {
      statusCode: 200,
      headers,
      body: 'Ok'
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: err.message || 'Something goes wrong with adding data'
    }
  }
}
