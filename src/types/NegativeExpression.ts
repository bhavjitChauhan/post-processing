import { NumericLiteral, UnaryExpression } from '@babel/types'
import ajv from './ajv'

interface NegativeExpression extends UnaryExpression {
  argument: NumericLiteral
}

const schema = {
  type: 'object',
  unaryExpression: true,
  properties: {
    operator: { const: '-' },
    argument: { numericLiteral: true },
  },
  required: ['operator', 'argument'],
}

const isNegativeExpression = ajv.compile<NegativeExpression>(schema)

ajv.addKeyword({
  keyword: 'negativeExpression',
  schema: false,
  validate: (data: unknown) => isNegativeExpression(data),
  errors: false,
})

export { NegativeExpression, isNegativeExpression }
