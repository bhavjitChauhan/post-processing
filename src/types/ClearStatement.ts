import {
  CallExpression,
  ExpressionStatement,
  Identifier,
  NumericLiteral,
} from '@babel/types'
import ajv from './ajv'

interface ClearIdentifier extends Identifier {
  name: 'clear'
}

interface ClearExpression extends CallExpression {
  callee: ClearIdentifier
  arguments: Array<NumericLiteral | Identifier>
}

interface ClearStatement extends ExpressionStatement {
  expression: ClearExpression
}

const schema = {
  type: 'object',
  expressionStatement: true,
  properties: {
    expression: {
      type: 'object',
      callExpression: true,
      properties: {
        callee: {
          type: 'object',
          identifier: true,
          properties: {
            name: { const: 'clear' },
          },
          required: ['name'],
        },
        arguments: {
          type: 'array',
          items: {
            oneOf: [{ numericLiteral: true }, { identifier: true }],
          },
          minItems: 0,
          maxItems: 4,
        },
      },
      required: ['callee', 'arguments'],
    },
  },
  required: ['expression'],
}

const isClearStatement = ajv.compile<ClearStatement>(schema)

export { ClearStatement, isClearStatement }
