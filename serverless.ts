import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'aws-todo-backend',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-bundle'],
  custom: {
    stage: "${opt:stage, 'test'}",
    TODO_TABLE: 'todo-table--${self:custom.stage}'
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    stage: 'dev',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TODO_TABLE: '${self:custom.TODO_TABLE}',
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
        Resource: { 'Fn::GetAtt': ['TodoTable', 'Arn'] }
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
            path: 'todo'
          }
        }
      ]
    },
    getTodoById: {
      handler: 'handler.getTodoById',
      events: [
        {
          http: {
            method: 'get',
            path: 'todo/{id}'
          }
        }
      ]
    },
    addUpdateTodo: {
      handler: 'handler.addUpdateTodo',
      events: [
        {
          http: {
            method: 'post',
            path: 'todo'
          }
        }
      ]
    },
    deleteTodos: {
      handler: 'handler.deleteTodos',
      events: [
        {
          http: {
            method: 'post',
            path: 'todo/delete'
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      TodoTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.TODO_TABLE}',
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
