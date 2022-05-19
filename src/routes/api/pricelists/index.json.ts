import PricelistsModel from '$lib/models/pricelists.model';
import { postSuite } from '$lib/validation/server/pricelists.validate';
import logger from '$lib/utility/logger';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async ({ locals }) => {
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

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async ({ request, locals }) => {
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
