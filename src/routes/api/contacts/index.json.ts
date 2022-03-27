import type { RequestHandler } from '@sveltejs/kit';
import ContactsModel from '$lib/models/contacts.model';
import { omit } from 'lodash';
import logger from '$lib/utility/logger';

export const get: RequestHandler = async () => {
	try {
		// const completed = url.searchParams.get('completed') === 'true' ? true : false;

		const contacts = await ContactsModel.find({}).select('-password').limit(15);

		return {
			status: 200,
			body: {
				contacts
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

export const post = async ({ request }) => {
	try {
		let reqContact = await request.json();

		// password only allowed in register endpoint
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

		// console.log(todo);

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
