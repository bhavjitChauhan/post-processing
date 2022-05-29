import { AssignmentExpression, Identifier, StringLiteral } from '@babel/types'
import ajv from './ajv'

interface AngleModeIdentifier extends Identifier {
  name: 'angleMode'
}

interface AngleModeExpression extends AssignmentExpression {
  operator: '='
  left: AngleModeIdentifier
  right: StringLiteral
}

const schema = {
  type: 'object',
  assignmentExpression: true,
  properties: {
    operator: { const: '=' },
    left: {
      type: 'object',
      identifier: true,
      properties: { name: { const: 'angleMode' } },
      required: ['name'],
    },
    right: {
      type: 'object',
      stringLiteral: true,
      properties: {
        value: { type: 'string' },
      },
      required: ['value'],
    },
  },
  required: ['operator', 'left', 'right'],
}

const isAngleModeExpression = ajv.compile<AngleModeExpression>(schema)

export { AngleModeExpression, isAngleModeExpression }
