import {
  CallExpression,
  Expression,
  Identifier,
  isCallExpression,
  isIdentifier,
  isNumericLiteral,
  Node,
  NumericLiteral,
} from '@babel/types'
import parseNegativeExpression from '../../util/parseNegativeExpression'
import { isNegativeExpression, NegativeExpression } from '../../util/types'

const isValid = (expression: Expression) =>
  isCallExpression(expression) &&
  isIdentifier(expression.callee) &&
  expression.callee.name == 'ellipse' &&
  expression.arguments.length == 4

const ellipseTransform = (expression: Expression) => {
  if (!isValid(expression)) return

  // workaround TypeScript issues
  expression = <CallExpression>expression
  expression.callee = <Identifier>expression.callee

  if (!expression.arguments.every((arg: Node) => isNegativeExpression(arg) || isNumericLiteral(arg))) return
  const args = <NegativeExpression[] | NumericLiteral[]>expression.arguments

  // remove if negative width and height
  // if (isNegativeExpression(args[2]) && isNegativeExpression(args[3])) return true

  // transform to circle if equal radius
  const width: number = isNumericLiteral(args[2])
    ? args[2].value
    : parseNegativeExpression(args[2])
  const height: number = isNumericLiteral(args[3])
    ? args[3].value
    : parseNegativeExpression(args[3])
  if (width == height) {
    expression.callee.name = 'circle'
    args.splice(3, 1)
  }
}

export default ellipseTransform
