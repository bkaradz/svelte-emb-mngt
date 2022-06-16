// import { dinero, toFormat, haveSameCurrency } from 'dinero.js'
// import { USD, ZAR } from '@dinero.js/currencies'

// import type { Dinero } from 'dinero.js'
// import { BOND, RTGS } from './convert.services'

// export function format(dineroObject: Dinero<unknown>): string {
//   if (haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: ZAR })])) {
//     return toFormat(dineroObject, ({ amount, currency }) => `${currency.code} R${amount.toFixed(2)}`)
//   }
//   if (
//     haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: BOND })]) ||
//     haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: RTGS })])
//   ) {
//     return toFormat(dineroObject, ({ amount, currency }) => `${currency.code} $${amount.toFixed(2)}`)
//   }
//   if (haveSameCurrency([dineroObject, dinero({ amount: 2000, currency: USD })])) {
//     return toFormat(dineroObject, ({ amount, currency }) => `${currency.code} $${amount.toFixed(2)}`)
//   }
// }

import {
	dinero,
	haveSameCurrency,
	toFormat,
	toSnapshot,
	type Dinero,
	type DineroOptions
} from 'dinero.js';
import { BOND, RTGS } from './convert.services';
import type { dineroSnapshot } from './monetary.services';

function intlFormat(locale: string, options = {}) {
	return function formatter(dineroObject: Dinero<unknown>) {
		function transformer({ amount, currency }) {
			return amount.toLocaleString(locale, {
				...options,
				style: 'currency',
				currency: currency.code
			});
		}
		return toFormat(dineroObject, transformer);
	};
}

function formatDefault(dineroObject: Dinero<unknown>) {
	if (
		haveSameCurrency([dineroObject, dinero({ amount: 100, currency: BOND })]) ||
		haveSameCurrency([dineroObject, dinero({ amount: 100, currency: RTGS })])
	) {
		return toFormat(
			dineroObject,
			({ amount, currency }) => `${currency.code} $${amount.toFixed(2)}`
		);
	}
}

const formatters = {
	USD: intlFormat('en-US'),
	ZAR: intlFormat('en-ZA'),
	BWP: intlFormat('en_BW'),
	EUR: intlFormat('fr-FR')
};

export function format(dineroObject: DineroOptions<number>) {
	const dineroValue = dinero(dineroObject);
	const { currency } = toSnapshot(dineroValue) as dineroSnapshot;
	const formatFn = formatters[currency.code] || formatDefault;

	return formatFn(dineroValue);
}
