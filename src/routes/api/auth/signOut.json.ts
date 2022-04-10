import type { RequestHandler } from '@sveltejs/kit';
import { deleteSessionCookies, deleteSessions } from '$lib/services/session.services';
import logger from '$lib/utility/logger';

export const get: RequestHandler = async ({ locals }) => {
	try {
		const sessionId = locals?.user?.sessionId;

		const headers = deleteSessionCookies();

		if (!sessionId) {
			return {
				status: 404,
				headers,
				body: {
					message: 'Session not Found'
				}
			};
		}
		deleteSessions(sessionId);

		locals.user = {};

		return {
			status: 200,
			headers,
			body: {
				message: 'You have successfully singed out'
			}
		};
	} catch (err) {
		logger.error(err.message);
		return {
			status: 500,
			body: {
				message: `Error Occurred ${err.message}`
			}
		};
	}
};
