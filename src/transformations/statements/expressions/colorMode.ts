import { NodePath } from '@babel/traverse'
import {
  ExpressionStatement,
  NumericLiteral,
  numericLiteral,
} from '@babel/types'
import { isColorModeExpression } from '../../../types'

const colorModeTransform = (path: NodePath<ExpressionStatement>) => {
  if (!isColorModeExpression(path.node.expression)) return
  const expression = path.node.expression
  const args = expression.arguments

  if (args.length == 1 && args[0].name == 'HSB') {
    args.push(numericLiteral(255))
    return
  }

  if (args.length < 4) return

  if (
    (args.slice(2) as NumericLiteral[]).every(arg => arg.value == args[1].value)
  )
    args.splice(2, 3)
}

export default colorModeTransform
