import { NodePath } from '@babel/traverse'
import { Identifier, isProgram, isStatement } from '@babel/types'
import { methods, properties } from '../utils/p5-symbols'
import {
  isDrawNode,
  isSetupDeclaration,
  SetupDeclaration,
} from '../utils/types'

const topLevelSymbolsTransform = (
  path: NodePath<Identifier>,
  setupDeclaration: SetupDeclaration
) => {
  if (!properties.includes(path.node.name) && !methods.includes(path.node.name))
    return

  let found = path.find((path) => {
    const parentNode = path?.parentPath?.node
    return (
      isSetupDeclaration(parentNode) ||
      isDrawNode(parentNode) ||
      isProgram(parentNode)
    )
  })

  if (
    !found ||
    !found.node ||
    !isStatement(found.node) ||
    isSetupDeclaration(found.parent) ||
    isDrawNode(found.parent)
  )
    return

  // insert node into setup()
  setupDeclaration.body.body.push(found.node)

  // remove node
  found.remove()
}

export default topLevelSymbolsTransform
