import { NodePath } from '@babel/traverse'
import { Identifier, isProgram, isStatement } from '@babel/types'
import { isDrawNode, isSetupDeclaration } from '../types'
import findSetupDeclaration from '../utils/findSetupDeclaration'
import { symbols } from '../utils/p5-symbols'

const topLevelSymbolsTransform = (path: NodePath<Identifier>) => {
  if (!symbols.includes(path.node.name)) return

  const found = path.find((path) => {
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

  const node = found.node
  found.remove()

  // insert node into setup
  const setupDeclaration = findSetupDeclaration(found)
  if (!setupDeclaration) return
  setupDeclaration.body.body.push(node)
}

export default topLevelSymbolsTransform
