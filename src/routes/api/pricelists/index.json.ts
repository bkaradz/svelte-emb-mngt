import PricelistsModel, { getQuantityPricelist } from '$lib/models/pricelists.model';
import { postSuite } from '$lib/validation/server/pricelists.validate';
import logger from '$lib/utility/logger';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const pricelists = await PricelistsModel.find();

		console.log(
			await getQuantityPricelist({
				id: '62a4e9794ef67e77e35e7e02',
				embroideryType: 'flat',
				quantity: 100
			})
		);

		return {
			status: 200,
			body: pricelists
		};
	} catch (err) {
		logger.error(err);
		return {
			status: 500,
			body: {
				error: `A server error occurred ${err}`
			}
		};
	}
};

export const post: RequestHandler = async ({ request, locals }) => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const userId = locals.user._id;

		const reqPricelists = await request.json();

		reqPricelists.userID = userId;

		const result = postSuite(reqPricelists);

		if (result.hasErrors()) {
			logger.error(result.getErrors());
			return {
				status: 400,
				body: {
					message: result.getErrors()
				}
			};
		}

		const newPricelists = new PricelistsModel(reqPricelists);

		const res = await newPricelists.save();

		return {
			status: 200,
			body: res
		};
	} catch (err) {
		logger.error(err);
		return {
			status: 500,
			body: {
				error: `A server error occurred ${err}`
			}
		};
	}
};

export const put: RequestHandler = async ({ request, locals }) => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const userId = locals.user._id;

		const reqPricelists = await request.json();

		reqPricelists.userID = userId;

		const result = postSuite(reqPricelists);

		if (result.hasErrors()) {
			logger.error(result.getErrors());
			return {
				status: 400,
				body: {
					message: result.getErrors()
				}
			};
		}

		const newPricelists = await PricelistsModel.findByIdAndUpdate(
			{ _id: reqPricelists._id },
			reqPricelists
		);

		return {
			status: 200,
			body: newPricelists
		};
	} catch (err) {
		logger.error(err.message);
		throw new Error(`Error ${err.message}`);
	}
};
