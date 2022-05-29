import { NodePath } from '@babel/traverse'
import { Identifier } from '@babel/types'

const isParameterNodePath = (path: NodePath<Identifier>) =>
  (path.scope.bindings[path.node.name]?.kind as string) == 'param'

export default isParameterNodePath
