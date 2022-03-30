import type { FilterQuery } from 'mongoose';
import type { RequestHandler } from '@sveltejs/kit';
import SessionsModel from '$lib/models/sessions.model';
import type { SessionsDocument } from '$lib/models/sessions.model';
import { get as lodashGet } from 'lodash';
import { signJwt } from '$lib/utility/jwt.utils';
import config from 'config';
import logger from '$lib/utility/logger';
import { postSuite } from '$lib/validation/server/session.validate';
import {
	setSessionCookies,
	deleteSessionCookies,
	createSession,
	findSessions,
	validateSessionPassword
} from '$lib/services/session.services';

export const post: RequestHandler = async ({ request }) => {
	try {
		// validate the user's password
		const reqUser = await request.json();

		const result = postSuite(reqUser);

		if (result.hasErrors()) {
			return {
				status: 400,
				body: {
					message: result.getErrors()
				}
			};
		}

		const user = await validateSessionPassword(reqUser);

		// console.log('user', user);

		if (!user) {
			return {
				status: 401,
				headers: { 'Set-Cookie': '' },
				body: {
					message: 'Invalid email or password'
				}
			};
		}

		// create a session
		const session = await createSession(user._id, request.headers.get('user-agent') || '');

		// create an access token
		const accessToken = signJwt(
			{ ...user, session: session._id },
			{ expiresIn: config.get('accessTokenTtl') }
		);

		// create a refresh token
		const refreshToken = signJwt(
			{ ...user, session: session._id },
			{ expiresIn: config.get('refreshTokenTtl') }
		);

		const headers = setSessionCookies(accessToken, refreshToken);

		// return access & refresh tokens
		return {
			status: 200,
			headers,
			body: {
				accessToken,
				refreshToken
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

export const get: RequestHandler = async ({ locals }) => {
	try {
		const userId = lodashGet(locals.user, '_id', null);

		if (!userId) {
			return {
				status: 403,
				body: {
					message: `Sessions User not Found`
				}
			};
		}

		const sessionsFound = await findSessions({ user: userId, valid: true });

		if (!sessionsFound) {
			return {
				status: 403,
				body: {
					message: `Sessions not Found`
				}
			};
		}

		// console.log('sessionsFound', sessionsFound);

		return {
			status: 200,
			body: {
				message: sessionsFound
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

export const del: RequestHandler = async ({ request, locals }) => {
	const sessionId = locals.user.session;

	if (sessionId) {
		deleteSessions(sessionId);
	}

	locals.user = {};

	const headers = deleteSessionCookies();

	return {
		status: 200,
		headers,
		body: {
			ok: true
		}
	};
};

async function deleteSessions(query: FilterQuery<SessionsDocument>) {
	return await SessionsModel.findByIdAndDelete(query);
}