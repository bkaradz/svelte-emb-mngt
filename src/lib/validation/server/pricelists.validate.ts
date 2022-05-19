import { create, test, enforce, each } from 'vest';

export function postSuite(data) {
	return create(() => {
		test('name', 'name is required', () => {
			enforce(data.name).isNotBlank();
		});
		test('name', 'name must be a string', () => {
			enforce(data.name).isString();
		});
		test('isActive', 'isActive is required', () => {
			enforce(data.isActive).isNotBlank();
		});
		test('isActive', 'isActive must be boolean', () => {
			enforce(data.isActive).isBoolean();
		});
		test('isDefault', 'isDefault is required', () => {
			enforce(data.isDefault).isNotBlank();
		});
		test('isDefault', 'isDefault must be boolean', () => {
			enforce(data.isDefault).isBoolean();
		});

		each(
			data.pricelists,
			(field: {
				minimumPrice: number;
				pricePerThousandStitches: number;
				maximumQuantity: number;
				embroideryType: string;
			}) => {
				console.log('🚀 ~ file: pricelists.validate.ts ~ line 26 ~ each ~ field', field);
				test('minimumPrice', 'minimumPrice is required', () => {
					enforce(field.minimumPrice).isNotBlank();
				});
				test('minimumPrice', 'minimumPrice must be a number', () => {
					enforce(field.minimumPrice).isNumeric();
				});
				test('pricePerThousandStitches', 'pricePerThousandStitches is required', () => {
					enforce(field.pricePerThousandStitches).isNotBlank();
				});
				test('pricePerThousandStitches', 'pricePerThousandStitches must be a number', () => {
					enforce(field.pricePerThousandStitches).isNumeric();
				});
				test('maximumQuantity', 'maximumQuantity is required', () => {
					enforce(field.maximumQuantity).isNotBlank();
				});
				test('maximumQuantity', 'maximumQuantity must be a number', () => {
					enforce(field.maximumQuantity).isNumeric();
				});
				test('embroideryType', 'embroideryType is required', () => {
					enforce(field.embroideryType).isNotBlank();
				});
				test('embroideryType', 'embroideryType must be a string', () => {
					enforce(field.embroideryType).isString();
				});
			}
		);
	})();
	// Note that we're immediately invoking our suite
	// so what we return is actually the suite result
}
