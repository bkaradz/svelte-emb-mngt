import logger from '$lib/utility/logger';
import ProductsModel from '$lib/models/products.models';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	try {
		const product = await ProductsModel.findOne(
			{ _id: params.id },
			{ createdAt: 0, updatedAt: 0, __v: 0 }
		);
		// .populate('organizationID')
		// .exec();

		return {
			status: 200,
			body: {
				product
			}
		};
	} catch (err) {
		logger.error(err.message);
		throw new Error(`Error ${err.message}`);
	}
}
