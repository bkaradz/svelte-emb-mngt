import type { RequestHandler } from '@sveltejs/kit';
import csv from 'csvtojson';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	const file = data.get('file');
	console.log('🚀 ~ file: index.json.ts ~ line 6 ~ constget:RequestHandler= ~ body', file.size);
	console.log('🚀 ~ file: index.json.ts ~ line 6 ~ constget:RequestHandler= ~ body', file.type);
	console.log('🚀 ~ file: index.json.ts ~ line 6 ~ constget:RequestHandler= ~ body', file.name);

	const csvString = await file.text();
	// console.log('🚀 ~ file: index.ts ~ line 20 ~ constpost:RequestHandler= ~ csvString', csvString);

	const jsonArray = await csv().fromString(csvString);
	// console.log('🚀 ~ file: index.ts ~ line 23 ~ constpost:RequestHandler= ~ jsonArray', jsonArray);

	// const res = Object.fromEntries(file);
	// console.log('🚀 ~ file: index.json.ts ~ line 10 ~ constget:RequestHandler= ~ res', res);

	return {
		body: { message: 'success' }
	};
};
