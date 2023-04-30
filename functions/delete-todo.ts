import { DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { getDbClient } from '../clients/dynamodb'

export const deleteTodo = async (id: string) => {
  console.log('delete id ', id)
  const dbClient = getDbClient()
  const { TODO_TABLE } = process.env

  const deleteParams = {
    TableName: TODO_TABLE as string,
    Key: marshall({ id })
  }
  return await dbClient.send(new DeleteItemCommand(deleteParams))
}
