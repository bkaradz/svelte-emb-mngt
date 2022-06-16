import { toSnapshot, type Dinero } from 'dinero.js'
import { toDineroObject, toObject } from './convert.services'

// export function getMonetaryValue(value: string) {
//   console.log('get', 'test')
//   if (typeof value !== 'undefined') {
//     return parseFloat(value.toString())
//   }
//   return value
// }

export function getMonetaryValue(value: string) {
  if (typeof value !== 'undefined') {
    return toDineroObject(JSON.parse(value))
  }
  return value
}

export function setMonetaryValue(value: number | string | Dinero<number>): string {
  // console.log('🚀 ~ file: process.models.services.ts ~ line 20 ~ setMonetaryValue ~ value', value)
  // console.log('🚀 ~ file: process.models.services.ts ~ line 20 ~ setMonetaryValue ~ value', typeof value)
  if (typeof value === 'number' || typeof value === 'string') {
    // console.log('Entered if')
    const dineroObject = toDineroObject(value)
    // console.log("🚀 ~ file: process.models.services.ts ~ line 25 ~ setMonetaryValue ~ dineroObject", dineroObject)
		const jsonObject = JSON.stringify(toSnapshot(dineroObject))
    console.log("🚀 ~ file: process.models.services.ts ~ line 27 ~ setMonetaryValue ~ jsonObject", jsonObject)
    console.log("🚀 ~ file: process.models.services.ts ~ line 27 ~ setMonetaryValue ~ jsonObject",  typeof jsonObject)
    return jsonObject
  }
  if (typeof value === 'object') {
    return JSON.stringify(toObject(value))
  }
  // const dineroObject = toDineroObject(0)
  // return JSON.stringify(toDineroObject(0).toJSON())
}

export function defaultMonetaryValue(): string {
  return JSON.stringify(toDineroObject(0).toJSON())
}
