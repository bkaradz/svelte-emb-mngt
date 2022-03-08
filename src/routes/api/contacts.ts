import ContactsModel from '$lib/models/contacts.model';

export async function get({ url }) {
	try {
		const completed = url.searchParams.get('completed') === 'true' ? true : false;

		const contacts = await ContactsModel.find({ completed });

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
}

export async function post({ request }) {
	try {
		const reqTodo = await request.json();

		const contacts = new ContactsModel(reqTodo);

		await contacts.save();

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
}

export async function put({ request }) {
	try {
		const reqTodo = await request.json();

		const todo = await ContactsModel.findByIdAndUpdate(reqTodo._id, reqTodo);

		console.log(todo);

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
}

export async function del({ request }) {
	return;
}
