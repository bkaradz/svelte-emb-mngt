import type { RequestHandler } from '@sveltejs/kit';
import ContactsModel from '$lib/models/contacts.model';
import { omit } from 'lodash';
import { postSuite } from '$lib/validation/server/register.validate';
import logger from '$lib/utility/logger';

// import type { ContactsDocument } from '$lib/models/contacts.model';

export const get: RequestHandler = async () => {
	try {
		// const completed = url.searchParams.get('completed') === 'true' ? true : false;

		const contacts = await ContactsModel.find({ isUser: true, isActive: true }).select('-password');
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

export const post: RequestHandler = async ({ request }) => {
	try {
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

		const userExist = await ContactsModel.findOne({ email: reqUser.email });

		if (userExist) {
			return {
				status: 409,
				body: {
					message: 'User with that email already exist'
				}
			};
		}

		const contacts = new ContactsModel(reqUser);

		const allUsers = await ContactsModel.find({
			isUser: true,
			isActive: true,
			userRole: 'admin'
		}).select('-password');

		/**
		 * If the database has no admin create one,
		 * other users are activated by the first admin
		 */
		if (allUsers.length === 0) {
			contacts.userRole = 'admin';
			contacts.isActive = true;
		}

		contacts.isUser = true;

		await contacts.save();

		return {
			status: 200,
			body: {
				message: omit(contacts.toJSON(), 'password')
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

export const put: RequestHandler = async ({ request }) => {
	try {
		// const reqTodo = await request.json();

		// const todo = await ContactsModel.findByIdAndUpdate(reqTodo._id, reqTodo);

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

export const del: RequestHandler = async ({ request }) => {
	return;
};
