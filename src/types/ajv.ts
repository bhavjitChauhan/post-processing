import {
  isAssignmentExpression,
  isBlockStatement,
  isCallExpression,
  isExpression,
  isExpressionStatement,
  isFunctionDeclaration,
  isIdentifier,
  isNumericLiteral,
  isStatement,
  isStringLiteral,
  isUnaryExpression,
  isVariableDeclaration,
  isVariableDeclarator,
} from '@babel/types'
import Ajv from 'ajv'

const ajv = new Ajv()

const keywords = {
  assignmentExpression: isAssignmentExpression,
  blockStatement: isBlockStatement,
  callExpression: isCallExpression,
  expression: isExpression,
  expressionStatement: isExpressionStatement,
  functionDeclaration: isFunctionDeclaration,
  identifier: isIdentifier,
  numericLiteral: isNumericLiteral,
  statement: isStatement,
  stringLiteral: isStringLiteral,
  unaryExpression: isUnaryExpression,
  variableDeclaration: isVariableDeclaration,
  variableDeclarator: isVariableDeclarator,
}

for (const [keyword, fn] of Object.entries(keywords)) {
  ajv.addKeyword({
    keyword,
    schema: false,
    validate: (data: object | null | undefined) => fn(data),
    errors: false,
  })
}

export default ajv
