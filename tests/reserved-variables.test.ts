import reservedVariablesTransform from '../src/transformations//declarations/variables/reserved-variables'
import { expectTransformations } from './helper'

test('renames reserved symbols in variable declarations', () => {
  expectTransformations('VariableDeclaration', reservedVariablesTransform, [
    ['var square = 1;', 'var _square = 1;'],
    ['var angleMode = "degrees";', 'var angleMode = "degrees";'],
  ])
})
