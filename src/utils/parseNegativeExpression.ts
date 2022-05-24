import { NegativeExpression } from './types'

const parseNegativeExpression = (expression: NegativeExpression) => {
  const { argument } = expression
  const { value } = argument
  return -value
}

export default parseNegativeExpression
