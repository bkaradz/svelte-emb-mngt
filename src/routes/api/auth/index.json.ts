import ContactsModel from '$lib/models/contacts.model';
import { omit } from 'lodash';
import logger from '$lib/utility/logger';
import { postSuite } from '$lib/validation/server/signUp.validate';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }): Promise<unknown> => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const res = await ContactsModel.find(
			{ isUser: true },
			{
				password: 0,
				createdAt: 0,
				updatedAt: 0,
				__v: 0,
				isCorporate: 0,
				balanceDue: 0,
				totalReceipts: 0
			}
		).lean();

		return {
			status: 200,
			body: res
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

export const post: RequestHandler = async ({ request }): Promise<unknown> => {
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
			userRole: 'ADMIN'
		}).select('-password');

		/**
		 * If the database has no ADMIN create one,
		 * other users are activated by the first ADMIN
		 */
		if (allUsers.length === 0) {
			contacts.userRole = 'ADMIN';
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

export const put: RequestHandler = async ({ request, locals }): Promise<unknown> => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const userUpdate = await request.json();
		const userUpdated = await ContactsModel.findByIdAndUpdate({ _id: userUpdate._id }, userUpdate)
			.select('-password -createdAt -updatedAt -__v -isCorporate -balanceDue -totalReceipts')
			.lean();
		console.log('🚀 ~ file: index.json.ts ~ line 121 ~ put ~ userUpdated', userUpdated);

		return {
			status: 200,
			body: {
				...userUpdated
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

export const del: RequestHandler = async ({ locals, request }): Promise<unknown> => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const userDelete = await request.json();
		// const queryParams = Object.fromEntries(url.searchParams)
		// const userUpdate = await request.json();
		const userUpdated = await ContactsModel.findByIdAndUpdate(
			{ _id: userDelete._id },
			{ isActive: false },
			{
				new: true
			}
		)
			.select('-password -createdAt -updatedAt -__v -isCorporate -balanceDue -totalReceipts')
			.lean();

		return {
			status: 200,
			body: userUpdated
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
