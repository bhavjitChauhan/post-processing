import {
  blockStatement,
  callExpression,
  expressionStatement,
  functionDeclaration,
  identifier,
  numericLiteral,
} from '@babel/types'

// prettier-ignore
const setup = functionDeclaration(
  identifier('setup'),
  [],
  blockStatement([
    expressionStatement(callExpression(
      identifier('createCanvas'), [numericLiteral(400), numericLiteral(400)]
    )),
    expressionStatement(callExpression(
      identifier('angleMode'), [identifier('DEGREES')]
    )),
    expressionStatement(callExpression(
      identifier('noSmooth'), []
    )),
  ])
)

export default setup
