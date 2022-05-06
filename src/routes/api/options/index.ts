import OptionsModel from '$lib/models/options.models';
import { postSuite } from '$lib/validation/server/options.validate';
import type { OptionsDocument } from '$lib/models/options.models';
import logger from '$lib/utility/logger';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async ({ request, locals }): Promise<{ body: OptionsDocument | string }> => {
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

		const newOption = new OptionsModel(result);

		const res = await newOption.save();

		if (res.ok) {
			return {
				body: res
			};
		}
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
