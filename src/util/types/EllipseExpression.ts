import ajv from './ajv'

import { NegativeExpression } from '.'
import { CallExpression, Identifier, NumericLiteral } from '@babel/types'

interface EllipseExpression extends CallExpression {
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
      properties: { name: { const: 'ellipse' } },
      required: ['name'],
    },
    arguments: {
      type: 'array',
      minItems: 4,
      maxItems: 4,
      items: {
        oneOf: [{ numericLiteral: true }, { negativeExpression: true }],
      },
    },
  },
  required: ['arguments', 'callee'],
}

const isEllipseExpression = ajv.compile<EllipseExpression>(schema)

export { EllipseExpression, isEllipseExpression }
