import { dinero, toFormat, haveSameCurrency } from 'dinero.js'
import { USD, ZAR } from '@dinero.js/currencies'

import type { Dinero } from 'dinero.js'
import { BOND, RTGS } from './convert.services'

export function format(dineroObject: Dinero<unknown>): string {
  if (haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: ZAR })])) {
    return toFormat(dineroObject, ({ amount, currency }) => `${currency.code} R${amount.toFixed(2)}`)
  }
  if (
    haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: BOND })]) ||
    haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: RTGS })])
  ) {
    return toFormat(dineroObject, ({ amount, currency }) => `${currency.code} $${amount.toFixed(2)}`)
  }
  if (haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: USD })])) {
    return toFormat(dineroObject, ({ amount, currency }) => `${currency.code} $${amount.toFixed(2)}`)
  }
}
