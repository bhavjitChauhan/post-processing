import {
  expectExpressionStatements,
} from './helper'

import rect from '../src/expressions/statements/rect'

test('transforms squares', () => {
  expectExpressionStatements(rect, [
    ['rect(10, 20, 30, 30);', 'square(10, 20, 30);'],
    ['rect(10, 20, -30, -30);', 'square(10, 20, -30);'],
  ])
})

test('sets negative rounded corner arguments to 0', () => {
  expectExpressionStatements(rect, [
    ['rect(10, 20, 30, 40, -1);', 'rect(10, 20, 30, 40, 0);'],
    [
      'rect(10, 20, 30, 40, -1, -1, -1, 1);',
      'rect(10, 20, 30, 40, 0, 0, 0, 1);',
    ],
    ['rect(10, 20, 30, 40, -1, -1, -1, -1);', 'rect(10, 20, 30, 40, 0);'],
    ['rect(10, 20, 30, 30, -1);', 'square(10, 20, 30, 0);'],
    ['rect(10, 20, 30, 30, -1, -1, -1, -1);', 'square(10, 20, 30, 0);'],
  ])
})

test('transforms rectangles with rounded corners', () => {
  expectExpressionStatements(rect, [
    ['rect(10, 20, 30, 40, 1, 1, 1, 1);', 'rect(10, 20, 30, 40, 1);'],
    ['rect(10, 20, 30, 40, 2, 1, 1, 1);', 'rect(10, 20, 30, 40, 2, 1);'],
    ['rect(10, 20, 30, 40, 1, 2, 1, 1);', 'rect(10, 20, 30, 40, 1, 2, 1);'],
    ['rect(10, 20, 30, 40, 1, 1, 2, 1);', 'rect(10, 20, 30, 40, 1, 1, 2, 1);'],
  ])
})

test('transforms squares with rounded corners', () => {
  expectExpressionStatements(rect, [
    ['rect(10, 20, 30, 30, 1, 1, 1, 1);', 'square(10, 20, 30, 1);'],
    ['rect(10, 20, 30, 30, 2, 1, 1, 1);', 'square(10, 20, 30, 2, 1);'],
    ['rect(10, 20, 30, 30, 2, 2, 1, 1);', 'square(10, 20, 30, 2, 2, 1);'],
    ['rect(10, 20, 30, 30, 1, 1, 2, 1);', 'square(10, 20, 30, 1, 1, 2, 1);'],
  ])
})

test('removes unneccesary rounded corner arguments', () => {
  expectExpressionStatements(rect, [
    ['rect(10, 20, 30, 40, 1, 2, 3);', 'rect(10, 20, 30, 40, 1);'],
    ['rect(10, 20, 30, 40, 1, 2);', 'rect(10, 20, 30, 40, 1);'],
    ['rect(10, 20, 30, 30, 1, 2, 3);', 'square(10, 20, 30, 1);'],
    ['rect(10, 20, 30, 30, 1, 2);', 'square(10, 20, 30, 1);'],
  ])
})
