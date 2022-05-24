import angleModeTransform from '../src/expressions/statements/angleMode'
import { expectExpressionStatements } from './helper'

test('transforms angle mode assignments', () => {
  expectExpressionStatements(angleModeTransform, [
    ['angleMode = "degrees";', 'angleMode(DEGREES);'],
    ['angleMode = "radians";', 'angleMode(RADIANS);'],
    ['angleMode = "";', 'angleMode(RADIANS);'],
  ])
})
