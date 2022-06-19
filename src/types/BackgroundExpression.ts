import { CallExpression, Identifier, NumericLiteral } from '@babel/types'
import ajv from './ajv'

interface BackgroundExpressionIdentifier extends Identifier {
  name: 'background'
}

interface BackgroundExpression extends CallExpression {
  callee: BackgroundExpressionIdentifier
  arguments: Array<NumericLiteral | Identifier>
}

const schema = {
  type: 'object',
  callExpression: true,
  properties: {
    callee: {
      type: 'object',
      identifier: true,
      properties: {
        name: { const: 'background' },
      },
      required: ['name'],
    },
    arguments: {
      type: 'array',
      items: {
        oneOf: [{ numericLiteral: true }, { identifier: true }],
      },
      minItems: 1,
      maxItems: 4,
    },
  },
  required: ['callee', 'arguments'],
}

const isBackgroundExpression = ajv.compile<BackgroundExpression>(schema)

export { BackgroundExpression, isBackgroundExpression }
