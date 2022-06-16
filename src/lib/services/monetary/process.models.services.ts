import type { Dinero } from 'dinero.js';
import { toDineroObject, toObject } from './convert.services';

// export function getMonetaryValue(value: string) {
//   console.log('get', 'test')
//   if (typeof value !== 'undefined') {
//     return parseFloat(value.toString())
//   }
//   return value
// }

export function getMonetaryValue(value: string) {
	if (typeof value !== 'undefined') {
		return toDineroObject(JSON.parse(value));
	}
	return value;
}

export function setMonetaryValue(value: number | string | Dinero<number>): string {
	if (typeof value === 'number' || typeof value === 'string') {
		const dineroObject = toDineroObject(value);
		return JSON.stringify(dineroObject.toJSON());
	}
	if (typeof value === 'object') {
		return JSON.stringify(toObject(value));
	}
	// const dineroObject = toDineroObject(0)
	// return JSON.stringify(toDineroObject(0).toJSON())
}

export function defaultMonetaryValue(): string {
	return JSON.stringify(toDineroObject(0).toJSON());
}
