import ContactsModel from '$lib/models/contacts.model';
import { omit } from 'lodash';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	// `params.id` comes from [id].js
	// console.log('params', params);
	let contact = await ContactsModel.findOne({ _id: params.id });

	// console.log('contact backend', contact);
	contact = omit(contact.toJSON(), 'password');

	if (!contact) {
		return {
			status: 404,
			body: {
				message: 'Customer not found'
			}
		};
	}

	return {
		status: 200,
		body: {
			contact
		}
	};
}
