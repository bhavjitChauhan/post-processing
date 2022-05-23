import { isNumericLiteral, isUnaryExpression } from '@babel/types'
import { NegativeExpression } from '.'

const isNegativeExpression = (
  node: object | null | undefined,
  opts?: object | null
): node is NegativeExpression =>
  isUnaryExpression(node, opts) &&
  node.operator == '-' &&
  isNumericLiteral(node.argument)

export default isNegativeExpression
