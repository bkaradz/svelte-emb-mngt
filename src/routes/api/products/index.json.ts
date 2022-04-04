import type { RequestHandler } from '@sveltejs/kit';
import omit from 'lodash/omit';
import logger from '$lib/utility/logger';
import query from '$lib/services/query.services';

export const get: RequestHandler = async ({}) => {
	try {
		return {
			status: 200,
			body: {}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: `A server error occurred ${err}`
			}
		};
	}
};

export const post = async ({ request }) => {
	try {
		return {
			status: 200,
			body: {
				message: {}
			}
		};
	} catch (err) {
		logger.error(err.message);
		return {
			status: 500,
			body: {
				error: `A server error occurred ${err}`
			}
		};
	}
};

export const put = async ({ request }) => {
	try {
		return {
			status: 200,
			body: {
				message: 'Success'
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: `A server error occurred ${err}`
			}
		};
	}
};

export async function del({ request }) {
	return;
}
