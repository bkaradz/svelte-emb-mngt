import mongoose from 'mongoose'

export function getMonetaryValue(value: number) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString())
  }
  return value
}

export function setMonetaryValue(value: number) {
  if (typeof value !== 'undefined') {
    return mongoose.Types.Decimal128.fromString((+value).toFixed(4))
  }
  return 0
}
