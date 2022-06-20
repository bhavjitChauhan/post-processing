import { CallExpression, Identifier, NumericLiteral } from '@babel/types'
import ajv from './ajv'

interface ColorModeExpressionIdentifier extends Identifier {
  name: 'colorMode'
}

interface ColorModeExpression extends CallExpression {
  callee: ColorModeExpressionIdentifier
  arguments: [Identifier, ...Array<NumericLiteral>]
}

const schema = {
  type: 'object',
  callExpression: true,
  properties: {
    callee: {
      type: 'object',
      identifier: true,
      properties: { name: { const: 'colorMode' } },
      required: ['name'],
    },
    arguments: {
      type: 'array',
      prefixItems: [{ identifier: true }],
      items: { numericLiteral: true },
      oneOf: [
        {
          minItems: 1,
          maxItems: 2,
        },
        {
          minItems: 4,
          maxItems: 5,
        },
      ],
    },
  },
  required: ['callee', 'arguments'],
}

const isColorModeExpression = ajv.compile<ColorModeExpression>(schema)

export { ColorModeExpression, isColorModeExpression }
