import angleModeTransform from '../src/transformations/statements/expressions/angleMode'
import { expectTransformations } from './helper'

test('transforms angle mode assignments', () => {
  expectTransformations('ExpressionStatement', angleModeTransform, [
    ['angleMode = "degrees";', 'angleMode(DEGREES);'],
    ['angleMode = "radians";', 'angleMode(RADIANS);'],
    ['angleMode = "";', 'angleMode(RADIANS);'],
  ])
})
