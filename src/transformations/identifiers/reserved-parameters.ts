import { NodePath } from '@babel/traverse'
import { Identifier } from '@babel/types'
import isParameterNodePath from '../../utils/isParameterNodePath'
import { symbols } from '../../utils/p5-symbols'

const reservedParametersTransform = (path: NodePath<Identifier>) => {
  if (!symbols.includes(path.node.name) || !isParameterNodePath(path)) return

  path.parentPath.scope.rename(path.node.name)
}

export default reservedParametersTransform
