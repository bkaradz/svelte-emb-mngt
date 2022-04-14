import type { ContactsDocument } from '$lib/models/contacts.model';
import logger from '$lib/utility/logger';

const query = async (searchQuery, model) => {
	console.log('🚀 ~ file: query.services.ts ~ line 5 ~ query ~ searchQuery', searchQuery);
	try {
		interface paginationNavInterface {
			page: number;
			limit: number;
		}
		interface resultsInterface {
			error: boolean;
			totalRecords: number;
			totalPages: number;
			limit: number;
			previous: paginationNavInterface | null;
			next: paginationNavInterface;
			current: paginationNavInterface | null;
			results: Array<ContactsDocument>;
		}

		const results: resultsInterface = {
			error: false,
			totalRecords: 0,
			totalPages: 0,
			limit: 12,
			previous: undefined,
			next: undefined,
			current: undefined,
			results: []
		};

		let { limit = 15, page = 1 } = searchQuery;

		const { sort = 'name', query = '{}' } = searchQuery;

		const finalQuery = JSON.parse(query);

		const objectKeys = Object.keys(finalQuery);

		let newRegExQuery = {};

		objectKeys.forEach((name) => {
			const regexValue = new RegExp(finalQuery[name], 'ig');
			newRegExQuery = { ...newRegExQuery, [name]: regexValue };
		});
		console.log('🚀 ~ file: query.services.ts ~ line 39 ~ query ~ newRegExQuery', newRegExQuery);

		limit = parseInt(limit) < 1 ? 1 : parseInt(limit);
		page = parseInt(page);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const totalRecords = await model.countDocuments(newRegExQuery).exec();

		results.totalRecords = totalRecords;
		results.totalPages = Math.ceil(totalRecords / limit);
		results.limit = limit;

		results.previous = null;
		results.next = null;

		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit
			};
		}

		results.current = {
			page: page,
			limit
		};

		if (endIndex < totalRecords) {
			results.next = {
				page: page + 1,
				limit
			};
		}

		results.results = await model
			.find(newRegExQuery)
			.select('-password')
			.limit(limit)
			.skip(startIndex)
			.sort(sort)
			.exec();

		return results;
	} catch (err) {
		logger.error(err);
		return { error: true, message: err.message };
	}
};

export default query;
