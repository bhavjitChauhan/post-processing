import { callExpression, expressionStatement, identifier } from '@babel/types'

const createClearStatement = () =>
  expressionStatement(callExpression(identifier('clear'), []))

export default createClearStatement
