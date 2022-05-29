import { NodePath } from '@babel/traverse'
import {
  isIdentifier,
  isVariableDeclarator,
  VariableDeclaration,
} from '@babel/types'
import { methods } from '../../utils/p5-symbols'

const blacklist = ['angleMode']

const reservedVariablessTransform = (path: NodePath<VariableDeclaration>) => {
  const declarator = path.get('declarations')[0]
  if (!isVariableDeclarator(declarator)) return
  if (!isIdentifier(declarator.node.id)) return

  if (
    !methods.includes(declarator.node.id.name) ||
    blacklist.includes(declarator.node.id.name)
  )
    return

  declarator.parentPath.scope.rename(declarator.node.id.name)
}

export default reservedVariablessTransform
