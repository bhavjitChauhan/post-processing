import { NumericLiteral, UnaryExpression } from '@babel/types'

import isNegativeExpression from './isNegativeExpression'

interface NegativeExpression extends UnaryExpression {
  argument: NumericLiteral
}

export { NegativeExpression, isNegativeExpression }
