import ContactsModel from '$lib/models/contacts.model';
import logger from '$lib/utility/logger';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	try {
		const contact = await ContactsModel.findOne(
			{ _id: params.id },
			{ password: 0, createdAt: 0, updatedAt: 0, __v: 0, userRole: 0 }
		)
			.populate('organizationID')
			.exec();

		console.log('🚀 ~ file: [id].json.ts ~ line 11 ~ get ~ contact', contact);
		return {
			status: 200,
			body: contact
		};
	} catch (err) {
		logger.error(err.message);
		throw new Error(`Error ${err.message}`);
	}
}
