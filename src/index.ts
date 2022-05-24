import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'

import * as expressions from './expressions'

const code = `
rect(10, 20, '-30', -30)
`

const ast = parse(code)

traverse(ast, {
  ExpressionStatement: (path) => {
    const expression = path.node.expression
    const statements = Object.values(expressions.statements)
    for (const statement of statements) {
      statement(expression)
      // if (statement(expression)) path.remove()
    }
  },
})

const { code: output } = generate(ast)
console.log(output)
