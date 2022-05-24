import ellipseTransform from '../src/expressions/statements/ellipse'
import { expectExpressionStatements } from './helper'

test('transforms circles', () => {
  expectExpressionStatements(ellipseTransform, [
    ['ellipse(10, 20, 30, 30);', 'circle(10, 20, 30);'],
    // ['ellipse(10, 20, -30, -30);', ''],
  ])
})
