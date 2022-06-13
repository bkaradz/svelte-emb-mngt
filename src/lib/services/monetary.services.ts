import { dinero, toFormat, convert, toSnapshot, toUnit, haveSameCurrency } from 'dinero.js';
import { USD, ZAR } from '@dinero.js/currencies';

import type { Currency, Dinero } from 'dinero.js';
import mongoose from 'mongoose';

// const ZAR: Currency<number> = {
// 	code: 'ZAR',
// 	base: 10,
// 	exponent: 2
// };

const BOND: Currency<number> = {
	code: 'BOND',
	base: 10,
	exponent: 2
};

const RTGS: Currency<number> = {
	code: 'RTGS',
	base: 10,
	exponent: 2
};

export function converter(dineroObject, newCurrency = USD) {
	if (newCurrency === ZAR) {
		return convert(dineroObject, newCurrency, { ZAR: { amount: 1600, scale: 2 } });
	}
	if (newCurrency === BOND) {
		return convert(dineroObject, newCurrency, { BOND: { amount: 40000, scale: 2 } });
	}
	if (newCurrency === RTGS) {
		return convert(dineroObject, newCurrency, { RTGS: { amount: 51000, scale: 2 } });
	}
	if (newCurrency === USD) {
		return convert(dineroObject, newCurrency, { USD: { amount: 100, scale: 2 } });
	}
}

export function format(dineroObject: Dinero<unknown>): string {
	if (haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: ZAR })])) {
		return toFormat(
			dineroObject,
			({ amount, currency }) => `${currency.code} R${amount.toFixed(2)}`
		);
	}
	if (
		haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: BOND })]) ||
		haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: RTGS })])
	) {
		return toFormat(
			dineroObject,
			({ amount, currency }) => `${currency.code} $${amount.toFixed(2)}`
		);
	}
	if (haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: USD })])) {
		return toFormat(
			dineroObject,
			({ amount, currency }) => `${currency.code} $${amount.toFixed(2)}`
		);
	}
}

export function toDineroObject(amount: number) {
	return dinero({ amount, currency: USD });
}

export function toObject(dineroObject: Dinero<number>): {
	amount: number;
	currency: { code: string; base: number; exponent: number };
	scale: number;
} {
	return toSnapshot(dineroObject);
}

export function getAmount(dineroObject: Dinero<unknown>): number {
	return toUnit(dineroObject);
}

export function getMonetaryValue(value: number) {
	console.log('dinero', dinero({ amount: 500, currency: USD }));
	console.log('typeof', typeof dinero({ amount: 500, currency: USD }));
	console.log('format', format(dinero({ amount: 500, currency: USD })));
	console.log('tojson', dinero({ amount: 500, currency: USD }).toJSON());
	if (typeof value !== 'undefined') {
		return parseFloat(value.toString());
	}
	return value;
}

export function setMonetaryValue(value: number) {
	if (typeof value !== 'undefined') {
		return mongoose.Types.Decimal128.fromString((+value).toFixed(4));
	}
	return 0;
}
