import PricelistsModel from '$lib/models/pricelists.model';
import logger from '$lib/utility/logger';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	try {
		const pricelist = await PricelistsModel.findOne(
			{ _id: params.id },
			{ createdAt: 0, updatedAt: 0, __v: 0 }
		);
		console.log('🚀 ~ file: [id].json.ts ~ line 11 ~ get ~ pricelist', pricelist);

		return {
			status: 200,
			body: pricelist
		};
	} catch (err) {
		logger.error(err.message);
		throw new Error(`Error ${err.message}`);
	}
}
