import { NodePath } from '@babel/traverse'
import { ExpressionStatement, isNumericLiteral } from '@babel/types'
import { isEllipseExpression, isNegativeExpression } from '../../../types'
import parseNegativeExpression from '../../../utils/parseNegativeExpression'

const ellipseTransform = (path: NodePath<ExpressionStatement>) => {
  if (!isEllipseExpression(path.node.expression)) return
  const expression = path.node.expression
  const args = expression.arguments

  // remove if negative width and height
  if (isNegativeExpression(args[2]) && isNegativeExpression(args[3]))
    return path.remove()

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
