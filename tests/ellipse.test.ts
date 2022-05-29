import ellipseTransform from '../src/statements/expressions/ellipse'
import { expectTransformations } from './helper'

test('transforms circles', () => {
  expectTransformations('ExpressionStatement', ellipseTransform, [
    ['ellipse(10, 20, 30, 30);', 'circle(10, 20, 30);'],
    // ['ellipse(10, 20, -30, -30);', ''],
  ])
})
