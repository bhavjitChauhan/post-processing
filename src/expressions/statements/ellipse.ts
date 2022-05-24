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
import { isEllipseExpression } from '../../util/types'

const ellipseTransform = (expression: Expression) => {
  if (!isEllipseExpression(expression)) return

  const args = expression.arguments

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
