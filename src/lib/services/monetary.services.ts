export function getMonetaryValue(value: number) {
	if (typeof value !== 'undefined') {
		return parseFloat(value.toString());
	}
	return value;
}
