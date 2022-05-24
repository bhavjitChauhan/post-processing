import generate from '@babel/generator'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as expressions from './expressions'
import setup from './snippets/setup'

const code = `
function draw() {
  rect(0, 0, 100, 100)
}
`

const ast = parse(code)

ast.program.body.unshift(setup)

traverse(ast, {
  ExpressionStatement: (path) => {
    const statements = Object.values(expressions.statements)
    for (const statement of statements) statement(path)
  },
})

const { code: output } = generate(ast)
console.log(output)
