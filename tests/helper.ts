import generate from '@babel/generator'
import { parse } from '@babel/parser'
import traverse, { NodePath } from '@babel/traverse'

const transform = (
  node: string,
  transformer: Function,
  code: string,
  ...args: Array<any>
) => {
  const ast = parse(code)
  traverse(ast, {
    [node]: (path: NodePath) => transformer(path, ...args),
  })
  const { code: output } = generate(ast)
  return output
}

const expectTransformations = (
  node: string,
  transformer: Function,
  transformations: Array<[string, string]>,
  ...args: Array<any>
) => {
  for (const [input, output] of transformations)
    expect(transform(node, transformer, input, ...args)).toBe(output)
}

export { expectTransformations, transform }
