import { parse } from '@babel/parser'
import traverse, { NodePath } from '@babel/traverse'
import generate from '@babel/generator'
import { ExpressionStatement } from '@babel/types'

const transformExpressionStatement = (transformer: Function, code: string) => {
  const ast = parse(code)
  traverse(ast, {
    ExpressionStatement: (path) => {
      transformer(path.node.expression)
      // if (transformer(path.node.expression)) path.remove()
    },
  })
  const { code: output } = generate(ast)
  return output
}

const expectExpressionStatements = (
  transformer: Function,
  transformations: Array<[string, string]>
) => {
  for (const [input, output] of transformations)
    expect(transformExpressionStatement(transformer, input)).toBe(output)
}

export { expectExpressionStatements, transformExpressionStatement }
