import backgroundTransform from '../src/transformations/statements/expressions/background'
import { expectTransformations } from './helper'

test('appends clear statement to background expressions with alpha arguments', () => {
  expectTransformations('ExpressionStatement', backgroundTransform, [
    ['background(1, 2, 3, 4);', 'clear();\nbackground(1, 2, 3, 4);'],
    ['background(1, 2);', 'clear();\nbackground(1, 2);'],
    ['background(1, 2, 3);', 'background(1, 2, 3);'],
    ['background(1);', 'background(1);'],
  ])
})

test('does not append clear statement if previous sibling is clear statement', () => {
  expectTransformations('ExpressionStatement', backgroundTransform, [
    ['clear();\nbackground(1, 2, 3, 4);', 'clear();\nbackground(1, 2, 3, 4);'],
    ['clear();\nbackground(1, 2);', 'clear();\nbackground(1, 2);'],
  ])
})

test('collects like arguments', () => {
  expectTransformations('ExpressionStatement', backgroundTransform, [
    ['background(1, 1, 1);', 'background(1);'],
    ['background(1, 1, 1, 2);', 'clear();\nbackground(1, 2);'],
    ['background(1, 1, 1, a);', 'clear();\nbackground(1, a);'],
    ['background(x, x, x);', 'background(x);'],
    ['background(x, x, x, a);', 'background(x, a);'],
    ['background(x, x, x, 1);', 'background(x, 1);'],
  ])
})
