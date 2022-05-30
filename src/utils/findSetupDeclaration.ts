import { NodePath } from '@babel/traverse'
import { Program } from '@babel/types'
import { isSetupDeclaration, SetupDeclaration } from '../types'

const findSetupDeclaration = (path: NodePath) => {
  const found = path.findParent(path =>
    path.isProgram()
  ) as NodePath<Program> | null
  if (!found) return null
  if (!isSetupDeclaration(found.node.body[0])) return null
  return found.node.body[0] as SetupDeclaration
}

export default findSetupDeclaration
