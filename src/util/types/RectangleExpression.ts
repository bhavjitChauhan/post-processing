import ajv from './ajv'

import { CallExpression, Identifier, NumericLiteral } from '@babel/types'
import { NegativeExpression } from '.'

interface RectangleExpression extends CallExpression {
  callee: Identifier
  arguments: (NumericLiteral | NegativeExpression)[]
}

const schema = {
  type: 'object',
  callExpression: true,
  properties: {
    callee: {
      type: 'object',
      identifier: true,
      properties: { name: { const: 'rect' } },
      required: ['name'],
    },
    arguments: {
      type: 'array',
      minItems: 4,
      maxItems: 8,
      items: {
        oneOf: [{ numericLiteral: true }, { negativeExpression: true }],
      },
    },
  },
  required: ['arguments', 'callee'],
}

const isRectangleExpression = ajv.compile<RectangleExpression>(schema)

export { RectangleExpression, isRectangleExpression }
