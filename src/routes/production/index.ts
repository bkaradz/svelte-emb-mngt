import type { RequestHandler } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	console.log('🚀 ~ file: index.ts ~ line 6 ~ post ~ data', data);

	const file = data.get('file');

	console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file);
	console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', JSON.stringify(file));
	console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.size);
	console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.valueOf());
	console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.toString());
	try {
		return {
			status: 200,
			body: { message: 'res' }
		};
	} catch (err) {
		// logger.error(err);
		return {
			status: 500,
			body: {
				error: `A server error occurred ${err}`
			}
		};
	}
};
