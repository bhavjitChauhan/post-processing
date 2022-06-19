import { NodePath } from '@babel/traverse'
import {
  ExpressionStatement,
  Identifier,
  Program,
  VariableDeclaration,
} from '@babel/types'
import createSetupDeclaration from './snippets/setup'
import * as declarations from './transformations/declarations'
import * as identifiers from './transformations/identifiers'
import topLevelSymbolsTransform from './transformations/identifiers/top-level-symbols'
import * as statements from './transformations/statements'

const transformer = () => ({
  visitor: {
    Program: {
      enter(path: NodePath<Program>) {
        path.unshiftContainer('body', createSetupDeclaration())
        path.traverse({
          Identifier: topLevelSymbolsTransform,
        })
      },
      exit(path: NodePath<Program>) {
        path.stop()
      },
    },
    ExpressionStatement: (path: NodePath<ExpressionStatement>) => {
      const transformations = Object.values(statements.expressions)
      for (const transform of transformations) transform(path)
    },
    Identifier: (path: NodePath<Identifier>) => {
      for (const transform of Object.values(identifiers)) transform(path)
    },
    VariableDeclaration: (path: NodePath<VariableDeclaration>) => {
      const transformations = Object.values(declarations.variables)
      for (const transform of transformations) transform(path)
    },
  },
})

export default transformer
