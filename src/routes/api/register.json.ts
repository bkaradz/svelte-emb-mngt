import type { RequestHandler } from '@sveltejs/kit';
import ContactsModel from '$lib/models/contacts.model';
import { omit } from 'lodash';
// import type { ContactsDocument } from '$lib/models/contacts.model';

export const get: RequestHandler = async () => {
	try {
		// const completed = url.searchParams.get('completed') === 'true' ? true : false;

		const contacts = await ContactsModel.find({ isUser: true }).select('-password');
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
		const reqUser = await request.json();

		const contacts = new ContactsModel(reqUser);

		contacts.isUser = true;

		await contacts.save();

		// console.log('api contacts', contacts);

		return {
			status: 200,
			body: {
				status: omit(contacts.toJSON(), 'password')
			}
		};
	} catch (err) {
		console.log(err.message);
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
				status: 'Success'
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
