import reservedVariablessTransform from '../src/declarations/variables/reserved-variables'
import { expectTransformations } from './helper'

test('renames reserved symbols in variable declarations', () => {
  expectTransformations('VariableDeclaration', reservedVariablessTransform, [
    ['var square = 1;', 'var _square = 1;'],
    ['var angleMode = "degrees";', 'var angleMode = "degrees";'],
  ])
})
