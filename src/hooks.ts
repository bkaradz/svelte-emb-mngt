import { connectDB } from '$lib/database/mongooseDB';
import { setContext } from 'svelte';
// import { get } from 'lodash';
import * as cookie from 'cookie';
import { verifyJwt } from '$lib/utility/jwt.utils';
import type { GetSession, Handle } from '@sveltejs/kit';

// import type { Handle, GetSession} from '@sveltejs/kit';

connectDB();

export const handle: Handle = async ({ event, resolve }) => {
	// console.log('response', event.url.pathname);

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const accessToken = cookies.accessToken;

	if (!accessToken) {
		return await resolve(event);
	}

	// console.log('cookies', cookies);
	// console.log('accessToken', accessToken);

	const { decoded, expired } = verifyJwt(accessToken);

	// console.log('decoded', decoded);

	if (decoded && !(event.url.pathname === '/api/logout.json')) {
		// console.log('enter decoded', decoded);
		event.locals.user = decoded;
		event.locals.user.authenticated = true;
	} else {
		event.locals.user = {};
		event.locals.user.authenticated = false;
	}

	const response = await resolve(event);
	if (event.url.pathname === '/api/logout.json') {
		// console.log('insude');
		response.headers.delete('set-cookie');
	}
	// console.log('response', response.headers);
	return response;
};

export const getSession: GetSession = async ({ locals }) => {
	let user = await locals.user;
	// console.log('user', user);
	// console.log('request locals', locals);
	if (!user) {
		user = { authenticated: false };
	}
	return {
		user
	};
};
