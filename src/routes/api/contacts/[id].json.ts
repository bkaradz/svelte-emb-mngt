import ContactsModel from '$lib/models/contacts.model';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	const contact = await ContactsModel.findOne(
		{ _id: params.id },
		{ password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
	)
		.populate('organizationID')
		.exec();

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
