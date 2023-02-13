import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { GetItemCommand } from '@aws-sdk/client-dynamodb'
import { headers } from '../helpers/headers'
import { getDbClient } from '../clients/dynamodb'

export const getTodoById = async (event) => {
  try {
    const dbClient = getDbClient()

    const { TODO_TABLE } = process.env

    if (!TODO_TABLE) throw new Error('TODO_TABLE is not defined')

    const { id } = event.pathParameters
    if (!id) {
      return {
        statusCode: 500,
        headers,
        body: 'Missing id in query'
      }
    }

    const getParams = {
      TableName: TODO_TABLE,
      Key: marshall({ id })
    }

    const response = await dbClient.send(new GetItemCommand(getParams))

    if (!response.Item) {
      return {
        statusCode: 404,
        headers,
        body: 'No item found'
      }
    }
    const item = unmarshall(response.Item)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(item)
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: 'Something goes wrong with getting data'
    }
  }
}
