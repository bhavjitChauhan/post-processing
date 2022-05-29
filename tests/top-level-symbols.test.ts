import topLevelSymbolsTransform from '../src/identifiers/top-level-symbols'
import createSetupDeclaration from '../src/snippets/setup'
import { expectTransformations } from './helper'

test('relocates top level symbols', () => {
  const setup = createSetupDeclaration(),
    length = setup.body.body.length
  const transformations: [string, string][] = [
    ['angleMode = "degrees";', ''],
    ['noSmooth();', ''],
  ]
  expectTransformations(
    'Identifier',
    topLevelSymbolsTransform,
    transformations,
    setup
  )
  expect(setup.body.body.length).toBe(length + transformations.length)
  for (let i = 0; i < transformations.length; i++) {
    expect(setup.body.body.at(-i)).not.toBeNull()
  }
})
