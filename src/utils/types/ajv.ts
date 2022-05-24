import {
  isAssignmentExpression,
  isCallExpression,
  isIdentifier,
  isNumericLiteral,
  isStringLiteral,
  isUnaryExpression,
} from '@babel/types'
import Ajv from 'ajv'

const ajv = new Ajv()

const keywords = {
  assignmentExpression: isAssignmentExpression,
  callExpression: isCallExpression,
  identifier: isIdentifier,
  numericLiteral: isNumericLiteral,
  stringLiteral: isStringLiteral,
  unaryExpression: isUnaryExpression,
}

for (const [keyword, fn] of Object.entries(keywords)) {
  ajv.addKeyword({
    keyword,
    schema: false,
    validate: (data: any) => fn(data),
    errors: false,
  })
}

export default ajv
