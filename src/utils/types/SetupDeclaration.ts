import {
  BlockStatement,
  FunctionDeclaration,
  Identifier,
  Statement,
} from '@babel/types'
import ajv from './ajv'

interface SetupIdentifier extends Identifier {
  name: 'setup'
}

interface SetupBody extends BlockStatement {
  body: Statement[]
}

interface SetupDeclaration extends FunctionDeclaration {
  id: SetupIdentifier
  body: SetupBody
}

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'object',
      identifier: true,
      properties: {
        name: { const: 'setup' },
      },
      required: ['name'],
    },
    body: {
      type: 'object',
      blockStatement: true,
      properties: {
        body: {
          type: 'array',
          items: {
            type: 'object',
            statement: true,
          },
        },
      },
      required: ['body'],
    },
  },
  required: ['id', 'body'],
}

const isSetupDeclaration = ajv.compile<SetupDeclaration>(schema)

export { SetupDeclaration, isSetupDeclaration }
