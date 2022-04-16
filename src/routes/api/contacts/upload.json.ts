import parseCSV from '$lib/services/csvParse.services';
import { postSuite } from '$lib/validation/server/contacts.validate';
import ContactsModel from '$lib/models/contacts.model';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import logger from '$lib/utility/logger';

import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request, locals }) => {
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

		const jsonFile = await parseCSV(request);

		interface contactInterface {
			Name: string;
			Email: string;
			Phone: string;
			Organization: string;
			isActive: string;
		}
		jsonFile.forEach(async (element) => {
			const {
				Name,
				Email,
				Phone,
				balanceDue,
				totalReceipts,
				notes,
				address,
				vatOrBpNo
			}: contactInterface = element;

			const name = Name.replace(/Emb$/gm, '').trim();
			const email = Email.trim();
			const phone = Phone.split(',')[0].trim().replace(/ /g, '');

			const contact = {
				name,
				email,
				phone,
				isActive: true,
				isUser: false,
				userID: userId,
				totalReceipts,
				balanceDue,
				notes,
				address,
				vatOrBpNo
			};

			const contactFiltered = pickBy(contact, identity);

			const result = postSuite(contactFiltered);

			if (result.hasErrors()) {
				logger.error(result.getErrors());
				return {
					status: 400,
					body: {
						message: result.getErrors()
					}
				};
			}

			const newContacts = new ContactsModel(contactFiltered);

			await newContacts.save();
		});

		return {
			status: 200,
			body: {
				message: 'Contacts Uploaded'
			}
		};
	} catch (err) {
		logger.error('Error', err.message);
		return {
			status: 500,
			body: {
				message: 'Error has ocurred'
			}
		};
	}
};
