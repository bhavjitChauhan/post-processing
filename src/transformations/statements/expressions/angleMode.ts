import { NodePath } from '@babel/traverse'
import { callExpression, ExpressionStatement, identifier } from '@babel/types'
import { isAngleModeExpression } from '../../../types'

const angleModeTransform = (path: NodePath<ExpressionStatement>) => {
  if (!isAngleModeExpression(path.node.expression)) return
  const expression = path.node.expression

  const callee = identifier('angleMode')
  // emulate behavior of Processing.js
  const arg = identifier(
    expression.right.value == 'degrees' ? 'DEGREES' : 'RADIANS'
  )

  path.replaceWith(callExpression(callee, [arg]))
}

export default angleModeTransform
