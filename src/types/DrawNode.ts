import {
  AssignmentExpression,
  BlockStatement,
  Expression,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  VariableDeclaration,
  VariableDeclarator,
} from '@babel/types'
import ajv from './ajv'

interface DrawIdentifier extends Identifier {
  name: 'draw'
}

interface DrawExpressionStatementExpression extends AssignmentExpression {
  operator: '='
  left: DrawIdentifier
  right: Expression | Identifier
}

interface DrawExpressionStatement extends ExpressionStatement {
  expression: DrawExpressionStatementExpression
}

interface DrawFunctionDeclaration extends FunctionDeclaration {
  id: DrawIdentifier
  body: BlockStatement
}

interface DrawVariableDeclarator extends VariableDeclarator {
  id: DrawIdentifier
  init: Expression | Identifier
}

interface DrawVariableDeclaration extends VariableDeclaration {
  declarations: [DrawVariableDeclarator]
}

declare type DrawNode =
  | DrawExpressionStatement
  | DrawFunctionDeclaration
  | DrawVariableDeclaration

const schema = {
  type: 'object',
  oneOf: [
    {
      type: 'object',
      expressionStatement: true,
      properties: {
        expression: {
          type: 'object',
          assignmentExpression: true,
          properties: {
            operator: { const: '=' },
            left: {
              type: 'object',
              identifier: true,
              properties: {
                name: { const: 'draw' },
              },
              required: ['name'],
            },
            right: {
              oneOf: [{ expression: true }, { identifier: true }],
            },
          },
          required: ['operator', 'left', 'right'],
        },
      },
      required: ['expression'],
    },
    {
      type: 'object',
      functionDeclaration: true,
      properties: {
        id: {
          type: 'object',
          identifier: true,
          properties: {
            name: { const: 'draw' },
          },
          required: ['name'],
        },
        body: {
          blockStatement: true,
        },
      },
      required: ['id', 'body'],
    },
    {
      type: 'object',
      variableDeclaration: true,
      properties: {
        declarations: {
          type: 'array',
          items: {
            type: 'object',
            variableDeclarator: true,
            properties: {
              id: {
                type: 'object',
                identifier: true,
                properties: {
                  name: { const: 'draw' },
                },
                required: ['name'],
              },
              init: {
                oneOf: [{ expression: true }, { identifier: true }],
              },
            },
            required: ['id', 'init'],
          },
          minItems: 1,
          maxItems: 1,
        },
      },
      required: ['declarations'],
    },
  ],
}

const isDrawNode = ajv.compile<DrawNode>(schema)

export { DrawNode, isDrawNode }
