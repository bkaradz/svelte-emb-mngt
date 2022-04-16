// import type { RequestHandler } from '@sveltejs/kit'
import ContactsModel from '$lib/models/contacts.model';
import omit from 'lodash/omit';
import logger from '$lib/utility/logger';
// import query from '$lib/services/query.services';
import aggregateQuery from '$lib/services/aggregateQuery.services';

export const get = async ({ url }) => {
	try {
		const queryParams = Object.fromEntries(url.searchParams);

		let contacts = await aggregateQuery(queryParams, ContactsModel);

		contacts = { ...contacts, ...contacts.metaData[0] };

		return {
			status: 200,
			body: { ...contacts }
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
		let reqContact = await request.json();

		// password only allowed in signUp endpoint
		reqContact = omit(reqContact, 'password');

		const contacts = new ContactsModel(reqContact);

		contacts.isUser = false;

		await contacts.save();

		return {
			status: 200,
			body: {
				message: contacts
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
		const reqTodo = await request.json();

		const todo = await ContactsModel.findByIdAndUpdate(reqTodo._id, reqTodo);

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
