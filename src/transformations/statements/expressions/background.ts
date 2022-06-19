import { NodePath } from '@babel/traverse'
import {
  ExpressionStatement,
  Identifier,
  isIdentifier,
  isNumericLiteral,
  NumericLiteral,
} from '@babel/types'
import createClearStatement from '../../../snippets/clear'
import { isBackgroundExpression, isClearStatement } from '../../../types'

const backgroundTransform = (path: NodePath<ExpressionStatement>) => {
  if (!isBackgroundExpression(path.node.expression)) return

  const expression = path.node.expression
  const args = expression.arguments

  // collect like arguments
  if (
    // already simplified
    args.length >= 3 &&
    // handle all numeric literals or identifiers
    ((args.slice(0, -1).every(arg => isNumericLiteral(arg)) &&
      (args as Array<NumericLiteral>)
        .slice(1, -1)
        .every(arg => arg.value == (args[0] as NumericLiteral).value)) ||
      (args.slice(0, -1).every(arg => isIdentifier(arg)) &&
        (args as Array<Identifier>)
          .slice(1, -1)
          .every(arg => arg.name == (args[0] as Identifier).name)))
  )
    args.splice(0, 2)

  // prepend clear statement iff not already present and has alpha arguments
  if (
    isClearStatement(path?.getPrevSibling()?.node) ||
    args.length == 1 ||
    args.length == 3
  )
    return

  path.insertBefore(createClearStatement())
}

export default backgroundTransform
