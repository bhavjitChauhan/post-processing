import generate from '@babel/generator'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as declarations from './declarations'
import * as identifiers from './identifiers'
import createSetupDeclaration from './snippets/setup'
import * as statements from './statements'
import { SetupDeclaration } from './types'

const code = `
function fn(angleMode) {}
var fnB = function(angleMode) {}
`

const ast = parse(code)

ast.program.body.unshift(createSetupDeclaration())
const setupDeclaration = ast.program.body[0] as SetupDeclaration

traverse(ast, {
  ExpressionStatement: (path) => {
    const transformations = Object.values(statements.expressions)
    for (const transform of transformations) transform(path)
  },
  Identifier: (path) => {
    for (const transform of Object.values(identifiers))
      transform(path, setupDeclaration)
  },
  VariableDeclaration: (path) => {
    const transformations = Object.values(declarations.variables)
    for (const transform of transformations) transform(path)
  },
})

const { code: output } = generate(ast)
console.log(output)
