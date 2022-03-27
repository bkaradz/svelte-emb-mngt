import parseCSV from '$lib/services/csvParse.services';
import { postSuite } from '$lib/validation/server/contacts.validate';
import ContactsModel from '$lib/models/contacts.model';

import { omitBy } from 'lodash';

import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
	const jsonFile = await parseCSV(request);

	/**
	 * name
	 * phone
	 * isActive: true
	 */
	const finalContact = [];

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

		const contact = { name, email, phone, isActive: true };

		const contactFiltered = omitBy(contact, (v) => v === '');
		// finalContact.push(contactFiltered);

		const result = postSuite(contactFiltered);

		if (result.hasErrors()) {
			// console.log('Entered Errors', result.getErrors());
			return {
				status: 400,
				body: {
					message: result.getErrors()
				}
			};
		}

		const newContacts = new ContactsModel(contactFiltered);

		// console.log('newContacts', newContacts);

		await newContacts.save();
	});

	return {
		status: 200,
		body: {
			message: 'ok'
		}
	};
};
