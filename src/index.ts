import generate from '@babel/generator'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as expressions from './expressions'

const code = `
angleMode = 'degrees'
`

const ast = parse(code)

traverse(ast, {
  ExpressionStatement: (path) => {
    const statements = Object.values(expressions.statements)
    for (const statement of statements) statement(path)
  },
})

const { code: output } = generate(ast)
console.log(output)
