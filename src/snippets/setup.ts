import {
  blockStatement,
  callExpression,
  expressionStatement,
  functionDeclaration,
  identifier,
  numericLiteral,
} from '@babel/types'
import { SetupDeclaration } from '../utils/types'

// prettier-ignore
const createSetupDeclaration = () => functionDeclaration(
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
) as SetupDeclaration

export default createSetupDeclaration
