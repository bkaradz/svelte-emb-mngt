import ContactsModel, { type ContactsDocument } from '$lib/models/contacts.model';
import omit from 'lodash/omit';
import logger from '$lib/utility/logger';
import aggregateQuery from '$lib/services/aggregateQuery.services';
import { postSuite } from '$lib/validation/server/contacts.validate';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import type { RequestHandler } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler}*/
export const get = async ({
	url,
	locals
}): Promise<{
	status: number;
	body: ContactsDocument | { error: string } | { message: string };
}> => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const queryParams = Object.fromEntries(url.searchParams);

		let { limit = 15, page = 1 } = queryParams;

		limit = parseInt(limit) < 1 ? 1 : parseInt(limit);
		page = parseInt(page);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		let previous = null;
		const next = null;
		const current = {
			page: page,
			limit
		};

		if (startIndex > 0) {
			previous = {
				page: page - 1,
				limit
			};
		}

		const endSearchParams = { limit, page, next, endIndex, current };
		/**
		 * TODO: Make sort to be dynamic
		 */

		const finalQuery = omit(queryParams, ['page', 'limit', 'sort']);

		const objectKeys = Object.keys(finalQuery);

		let newRegExQuery = {};

		objectKeys.forEach((name) => {
			if (name === 'isCorporate' || name === 'isUser' || name === 'isActive') {
				finalQuery[name] = finalQuery[name] === 'true' ? true : false;
				newRegExQuery = { ...newRegExQuery, [name]: finalQuery[name] };
			} else {
				newRegExQuery = { ...newRegExQuery, [name]: { $regex: finalQuery[name], $options: 'ig' } };
			}
		});

		const aggregateFilter = [
			{
				$lookup: {
					from: 'contacts',
					localField: 'organizationID',
					foreignField: '_id',
					as: 'organizationID'
				}
			},
			// {
			// 	$addFields: {
			// 		balanceDue: {
			// 			$toString: '$balanceDue'
			// 		},
			// 		totalReceipts: {
			// 			$toString: '$totalReceipts'
			// 		}
			// 	}
			// },
			{
				$match: newRegExQuery
			},
			{
				$sort: {
					name: 1
				}
			},

			{
				$facet: {
					metaData: [
						{
							$count: 'totalRecords'
						},
						{
							$addFields: {
								previous,
								current,
								limit
							}
						}
					],
					results: [
						{
							$skip: startIndex
						},
						{
							$limit: limit
						}
					]
				}
			},
			{
				$project: {
					results: {
						userRole: 0,
						password: 0,
						createdAt: 0,
						updatedAt: 0,
						__v: 0
					}
				}
			}
		];

		let contacts = await aggregateQuery(
			queryParams,
			ContactsModel,
			aggregateFilter,
			endSearchParams
		);
		console.log('🚀 ~ file: index.json.ts ~ line 143 ~ contacts', contacts);

		contacts = { ...contacts, ...contacts.metaData[0] };
		delete contacts.metaData;

		return {
			status: 200,
			body: contacts
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

/** @type {import('@sveltejs/kit').RequestHandler}*/
export const post: RequestHandler = async ({
	request,
	locals
}): Promise<{
	status: number;
	body: ContactsDocument | { error: string } | { message: string };
}> => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const userId = locals.user._id;

		let reqContact = await request.json();

		// password only allowed in signUp endpoint
		reqContact = omit(reqContact, 'password');

		reqContact.isActive = true;

		const result = postSuite(reqContact);

		if (result.hasErrors()) {
			logger.error(result.getErrors());
			return {
				status: 400,
				body: {
					message: `${result.getErrors()}`
				}
			};
		}

		const contactFiltered = pickBy(reqContact, identity);

		const contacts = new ContactsModel(contactFiltered);

		contacts.isUser = false;
		contacts.userID = userId;

		await contacts.save();

		return {
			status: 200,
			body: contacts
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

/** @type {import('@sveltejs/kit').RequestHandler}*/
export const put: RequestHandler = async ({
	request,
	locals
}): Promise<{
	status: number;
	body: ContactsDocument | { error: string } | { message: string };
}> => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const reqContact = await request.json();

		const res = await ContactsModel.findByIdAndUpdate(reqContact._id, reqContact);

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

export async function del({ request }) {
	return;
}
