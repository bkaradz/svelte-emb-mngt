import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	try {
		return {
			status: 200,
			body: { status: 'ok' }
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

export const post: RequestHandler = async (event) => {
	try {
		// console.log('event', event.request.headers.get('user-agent'));
	} catch (err) {
		return {
			status: 500,
			body: {
				error: event
			}
		};
	}
};