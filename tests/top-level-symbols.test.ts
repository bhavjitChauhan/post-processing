import topLevelSymbolsTransform from '../src/identifiers/top-level-symbols'
import {
  expectTransformations,
  extractSetupDeclaration,
  removeSetupDeclaration,
} from './helper'

test('relocates top level symbols', () => {
  const transformations: [string, (code: string) => boolean][] = [
    [
      'angleMode = "degrees";',
      (code: string) => {
        const setupDeclaration = extractSetupDeclaration(code)
        for (let i = 0; i < transformations.length; i++) {
          expect(setupDeclaration.body.body.at(-i)).not.toBeNull()
        }
        return removeSetupDeclaration(code) == ''
      },
    ],
  ]
  expectTransformations(
    'Identifier',
    topLevelSymbolsTransform,
    transformations,
    true
  )
})
