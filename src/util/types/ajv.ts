import Ajv from 'ajv'
import {
  isNumericLiteral,
  isCallExpression,
  isUnaryExpression,
  isIdentifier,
} from '@babel/types'

const ajv = new Ajv()

const keywords = {
  callExpression: isCallExpression,
  identifier: isIdentifier,
  numericLiteral: isNumericLiteral,
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
