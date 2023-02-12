import { unmarshall } from '@aws-sdk/util-dynamodb'
import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { headers } from '../helpers/headers'
import { getDbClient } from '../clients/dynamodb'

export const getTodos = async () => {
  const dbClient = getDbClient()

  const { TODO_TABLE } = process.env

  if (!TODO_TABLE) throw new Error('No REGION defined')
  const getParams = {
    TableName: TODO_TABLE
  }

  const response = await dbClient.send(new ScanCommand(getParams))
  const items = response.Items?.map((item) => unmarshall(item))

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(items)
  }
}
