import colorModeTransform from '../src/transformations/statements/expressions/colorMode'
import { expectTransformations } from './helper'

test('transforms HSB color mode calls with no range arguments', () => {
  expectTransformations('ExpressionStatement', colorModeTransform, [
    ['colorMode(HSB);', 'colorMode(HSB, 255);'],
    ['colorMode(HSB, 100);'],
  ])
})

test('collects like range arguments', () => {
  expectTransformations('ExpressionStatement', colorModeTransform, [
    ['colorMode(RGB, 1, 1, 1);', 'colorMode(RGB, 1);'],
    ['colorMode(RGB, 1, 1, 1, 1);', 'colorMode(RGB, 1);'],
    ['colorMode(RGB, 2, 1, 1);'],
    ['colorMode(RGB, 1, 2, 1);'],
    ['colorMode(RGB, 1, 1, 2);'],
    ['colorMode(RGB, 2, 1, 1, 1);'],
    ['colorMode(RGB, 1, 2, 1, 1);'],
    ['colorMode(RGB, 1, 1, 2, 1);'],
    ['colorMode(RGB, 1, 1, 1, 2);'],
  ])
})

test('ignores color mode calls with 2 range arguments', () => {
  expectTransformations('ExpressionStatement', colorModeTransform, [
    ['colorMode(RGB, 1, 1);'],
  ])
})
