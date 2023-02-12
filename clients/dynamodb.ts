import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const { REGION } = process.env

if (!REGION) throw new Error('No REGION defined')

let client: null | DynamoDBClient = null

const options = {
  region: REGION
}

export const getDbClient = (): DynamoDBClient => {
  if (client) {
    return client
  }
  client = new DynamoDBClient(options)
  return client
}
