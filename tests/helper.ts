import generate from '@babel/generator'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

const transformExpressionStatement = (transformer: Function, code: string) => {
  const ast = parse(code)
  traverse(ast, {
    ExpressionStatement: (path) => transformer(path),
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
