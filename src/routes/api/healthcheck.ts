export async function get({ url, request }) {
	try {
		console.log('url', url);
		console.log('request', request);

		return {
			status: 200,
			body: {}
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
