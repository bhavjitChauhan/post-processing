import reservedParametersTransform from '../src/transformations//identifiers/reserved-parameters'
import { expectTransformations } from './helper'

test('renames reserved parameters in function declarations', () => {
  expectTransformations('Identifier', reservedParametersTransform, [
    ['function fn(square, rect) {}', 'function fn(_square, _rect) {}'],
    ['function fn(p1, p2) {}', 'function fn(p1, p2) {}'],
  ])
})

test('renames reserved parameters in function variable declarations', () => {
  expectTransformations('Identifier', reservedParametersTransform, [
    [
      'var fn = function (square, rect) {};',
      'var fn = function (_square, _rect) {};',
    ],
    ['var fn = function (p1, p2) {};', 'var fn = function (p1, p2) {};'],
  ])
})
