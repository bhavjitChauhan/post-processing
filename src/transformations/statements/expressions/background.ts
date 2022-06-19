import { NodePath } from '@babel/traverse'
import { ExpressionStatement } from '@babel/types'
import createClearStatement from '../../../snippets/clear'
import { isBackgroundExpression, isClearStatement } from '../../../types'

const backgroundTransform = (path: NodePath<ExpressionStatement>) => {
  if (!isBackgroundExpression(path.node.expression)) return
  if (isClearStatement(path?.getPrevSibling()?.node)) return

  const expression = path.node.expression
  const args = expression.arguments

  if (args.length == 2 || args.length == 4) {
    path.insertBefore(createClearStatement())
  }
}

export default backgroundTransform
