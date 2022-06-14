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

import { USD, ZAR } from '@dinero.js/currencies';
import { dinero, haveSameCurrency, toFormat, toSnapshot, type Dinero } from 'dinero.js';
import { BOND, RTGS } from './convert.services';
import type { dineroSnapshot } from './monetary.services';

function intlFormat(locale, options = {}) {
	return function formatter(dineroObject) {
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

const formatters = {
	USD: intlFormat('en-US'),
	EUR: intlFormat('fr-FR')
};

export function format(dineroObject: Dinero<unknown>) {
	const { currency } = toSnapshot(dineroObject) as dineroSnapshot;
	const formatFn = formatters[currency.code] || formatDefault;

	return formatFn(dineroObject);
}
