import backgroundTransform from '../src/transformations/statements/expressions/background'
import { expectTransformations } from './helper'

test('appends clear statement to background expressions with alpha arguments', () => {
  expectTransformations('ExpressionStatement', backgroundTransform, [
    [
      'background(255, 255, 255, 255);',
      'clear();\nbackground(255, 255, 255, 255);',
    ],
    ['background(255, 255);', 'clear();\nbackground(255, 255);'],
    ['background(255, 255, 255);', 'background(255, 255, 255);'],
    ['background(255);', 'background(255);'],
  ])
})

test('does not append clear statement if previous sibling is clear statement', () => {
  expectTransformations('ExpressionStatement', backgroundTransform, [
    [
      'clear();\nbackground(255, 255, 255, 255);',
      'clear();\nbackground(255, 255, 255, 255);',
    ],
    ['clear();\nbackground(255, 255);', 'clear();\nbackground(255, 255);'],
  ])
})
