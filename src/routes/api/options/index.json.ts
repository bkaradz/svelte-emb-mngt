import OptionsModel from '$lib/models/options.models';
import { postSuite } from '$lib/validation/server/options.validate';
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

		const options = await OptionsModel.find();

		return {
			status: 200,
			body: options
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

		const reqOptions = await request.json();

		reqOptions.userID = userId;

		const result = postSuite(reqOptions);

		const newOption = new OptionsModel(reqOptions);

		const res = await newOption.save();

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
