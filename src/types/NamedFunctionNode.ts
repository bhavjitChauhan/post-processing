import {
  BlockStatement,
  Expression,
  FunctionDeclaration,
  Identifier,
  VariableDeclaration,
  VariableDeclarator,
} from '@babel/types'
import ajv from './ajv'

// function expression statements aren't supported by KA without disabling JSHint

// interface NamedFunctionAssignmentExpression extends AssignmentExpression {
//   operator: '='
//   left: Identifier
//   right: Expression | Identifier
// }

// interface NamedFunctionExpressionStatement extends ExpressionStatement {
//   expression: NamedFunctionAssignmentExpression
// }

interface NamedFunctionDeclaration extends FunctionDeclaration {
  id: Identifier
  body: BlockStatement
}

interface NamedFunctionVariableDeclarator extends VariableDeclarator {
  id: Identifier
  init: Expression | Identifier
}

interface NamedFunctionVariableDeclaration extends VariableDeclaration {
  declarations: [NamedFunctionVariableDeclarator]
}

declare type NamedFunctionNode =
  // | NamedFunctionExpressionStatement
  NamedFunctionDeclaration | NamedFunctionVariableDeclaration

const schema = {
  type: 'object',
  oneOf: [
    // {
    //   type: 'object',
    //   expressionStatement: true,
    //   properties: {
    //     expression: {
    //       type: 'object',
    //       assignmentExpression: true,
    //       properties: {
    //         operator: { const: '=' },
    //         left: {
    //           type: 'object',
    //           identifier: true,
    //           properties: {
    //             name: { type: 'string' },
    //           },
    //           required: ['name'],
    //         },
    //         right: {
    //           oneOf: [{ expression: true }, { identifier: true }],
    //         },
    //       },
    //       required: ['operator', 'left', 'right'],
    //     },
    //   },
    //   required: ['expression'],
    // },
    {
      type: 'object',
      functionDeclaration: true,
      properties: {
        id: {
          type: 'object',
          identifier: true,
          properties: {
            name: { type: 'string' },
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
          items: [
            {
              type: 'object',
              variableDeclarator: true,
              properties: {
                id: {
                  type: 'object',
                  identifier: true,
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
                init: {
                  oneOf: [{ expression: true }, { identifier: true }],
                },
              },
              required: ['id', 'init'],
            },
          ],
          minItems: 1,
          maxItems: 1,
        },
      },
      required: ['declarations'],
    },
  ],
}

const isNamedFunctionNode = ajv.compile<NamedFunctionNode>(schema)

export { NamedFunctionNode, isNamedFunctionNode }
