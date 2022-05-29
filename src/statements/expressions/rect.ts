import { NodePath } from '@babel/traverse'
import {
  ExpressionStatement,
  isNumericLiteral,
  isUnaryExpression,
  Node,
  NumericLiteral,
} from '@babel/types'
import { isRectangleExpression } from '../../types'
import parseNegativeExpression from '../../utils/parseNegativeExpression'

const rectTransform = (path: NodePath<ExpressionStatement>) => {
  if (!isRectangleExpression(path.node.expression)) return
  const expression = path.node.expression

  const args = expression.arguments

  // transform to square if equal sides
  let isSquare = false
  const width: number = isNumericLiteral(args[2])
    ? args[2].value
    : parseNegativeExpression(args[2])
  const height: number = isNumericLiteral(args[3])
    ? args[3].value
    : parseNegativeExpression(args[3])
  if (width == height) {
    expression.callee.name = 'square'
    args.splice(3, 1)
    isSquare = true
  }

  // set negative rounded corner arguments to 0
  args.slice(4 - +isSquare).forEach((arg: Node, i) => {
    if (!isUnaryExpression(arg)) return
    const { operator, argument } = arg
    if (operator != '-') return
    if (!isNumericLiteral(argument)) return

    argument.value = 0
    args[4 - +isSquare + i] = argument
  })

  // less than 4 rounded corner arguments do not change output
  if (args.length + +isSquare != 8) {
    while (args.length > 5 - +isSquare) args.pop()
    return
  }

  // remove duplicate rounded corner arguments
  let i = args.length - 1,
    arg = args[i] as NumericLiteral
  // ensure index is greater than position and dimension arguments
  while (
    i > 4 - +isSquare &&
    arg.value == (arg = args[--i] as NumericLiteral).value
  ) {
    args.pop()
  }
}

export default rectTransform
