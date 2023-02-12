import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'aws-todo-backend',
  frameworkVersion: '3',
  plugins: ['serverless-bundle'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    stage: 'dev',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TODO_TABLE: 'todotable',
      REGION: 'eu-west-1'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: { 'Fn::GetAtt': ['todotable', 'Arn'] }
      }
    ]
  },
  functions: {
    getTodos: {
      handler: 'handler.getTodos',
      events: [
        {
          http: {
            method: 'get',
            path: 'get-todo'
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      todotable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'todotable',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  },
  package: { individually: true }
}

module.exports = serverlessConfiguration
