import { dinero, toSnapshot, toUnit } from 'dinero.js'
import { USD } from '@dinero.js/currencies'

import type { Dinero } from 'dinero.js'

export type currencyInterface = { code: string; base: number; exponent: number }

export type dineroSnapshot = {
  amount: number
  currency: currencyInterface
  scale: number
}

export function toDineroObject(amount: number) {
  return dinero({ amount, currency: USD })
}

export function toObject(dineroObject: Dinero<number>): dineroSnapshot {
  return toSnapshot(dineroObject)
}

export function getAmount(dineroObject: Dinero<unknown>): number {
  return toUnit(dineroObject)
}
