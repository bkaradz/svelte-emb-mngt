export async function get({ url, request }) {
	try {
		return {
			status: 200,
			body: { status: 'ok' }
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
