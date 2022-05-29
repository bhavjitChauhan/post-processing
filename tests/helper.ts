import generate from '@babel/generator'
import { parse } from '@babel/parser'
import traverse, { NodePath } from '@babel/traverse'
import createSetupDeclaration from '../src/snippets/setup'
import { isSetupDeclaration, SetupDeclaration } from '../src/types'

const transform = <T>(
  node: string,
  transformer: (path: NodePath<T>) => void,
  code: string,
  setup = false
) => {
  const ast = parse(code)
  if (setup) ast.program.body.unshift(createSetupDeclaration())
  traverse(ast, {
    [node]: (path: NodePath<T>) => transformer(path),
  })
  const { code: output } = generate(ast)
  return output
}

const expectTransformations = <T>(
  node: string,
  transformer: (path: NodePath<T>) => void,
  transformations: Array<[string, string | ((code: string) => boolean)]>,
  setup = false
) => {
  for (const [input, expected] of transformations) {
    if (typeof expected == 'string') {
      expect(transform<T>(node, transformer, input, setup)).toBe(expected)
    } else if (typeof expected == 'function') {
      expect(expected(transform<T>(node, transformer, input, setup))).toBe(true)
    }
  }
}

const extractSetupDeclaration = (code: string) => {
  const ast = parse(code)
  const setup = ast.program.body.find((node) =>
    isSetupDeclaration(node)
  ) as SetupDeclaration
  return setup
}

const removeSetupDeclaration = (code: string) => {
  const ast = parse(code)
  traverse(ast, {
    FunctionDeclaration: (path) => {
      isSetupDeclaration(path.node) && path.remove()
    },
  })
  const { code: output } = generate(ast)
  return output
}

export {
  expectTransformations,
  transform,
  extractSetupDeclaration,
  removeSetupDeclaration,
}
