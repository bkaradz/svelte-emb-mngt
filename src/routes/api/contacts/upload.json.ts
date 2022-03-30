import parseCSV from '$lib/services/csvParse.services';
import { postSuite } from '$lib/validation/server/contacts.validate';
import ContactsModel from '$lib/models/contacts.model';

import { pickBy, identity } from 'lodash';

import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	try {
		const jsonFile = await parseCSV(request);

		/**
		 * name
		 * phone
		 * isActive: true
		 */
		// const finalContact = [];

		interface contactInterface {
			Name: string;
			Email: string;
			Phone: string;
			Organization: string;
			isActive: string;
		}
		jsonFile.forEach(async (element) => {
			const { Name, Email, Phone }: contactInterface = element;

			const name = Name.replace(/Emb$/gm, '').trim();
			const email = Email.trim();
			const phone = Phone.split(',')[0].trim().replace(/ /g, '');

			const contact = { name, email, phone, isActive: true, isUser: false };

			const contactFiltered = pickBy(contact, identity);

			const result = postSuite(contactFiltered);

			if (result.hasErrors()) {
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
				message: 'ok'
			}
		};
	} catch (err) {
		console.error('Error', err.message);
		return {
			status: 500,
			body: {
				message: 'Error has ocurred'
			}
		};
	}
};