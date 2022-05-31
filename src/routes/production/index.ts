import type { RequestHandler } from '@sveltejs/kit';
import csv from 'csvtojson';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	// console.log('🚀 ~ file: index.ts ~ line 6 ~ post ~ data', data);

	const file = data.get('file');

	// console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file);
	// console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', JSON.stringify(file));
	// console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.size);
	// console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.type);
	// console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.name);
	const csvString = await file.text();
	// console.log('🚀 ~ file: index.ts ~ line 20 ~ constpost:RequestHandler= ~ csvString', csvString);

	const jsonArray = await csv().fromString(csvString);
	// console.log('🚀 ~ file: index.ts ~ line 23 ~ constpost:RequestHandler= ~ jsonArray', jsonArray);
	// const text = await new Response(file).text()
	// console.log('🚀 ~ file: index.ts ~ line 21 ~ constpost:RequestHandler= ~ text', text)

	try {
		return {
			status: 200,
			body: { message: 'res was a success' }
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
