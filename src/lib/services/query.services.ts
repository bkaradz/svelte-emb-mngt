import type { ContactsDocument } from '$lib/models/contacts.model';
import omit from 'lodash/omit';

const query = async (searchQuery, model) => {
	console.log('🚀 ~ file: query.services.ts ~ line 5 ~ query ~ searchQuery', searchQuery);

	try {
		interface paginationNavInterface {
			page: number;
			limit: number;
		}
		interface resultsInterface {
			totalRecords: number;
			totalPages: number;
			limit: number;
			previous: paginationNavInterface | null;
			next: paginationNavInterface;
			current: paginationNavInterface | null;
			results: Array<ContactsDocument>;
		}

		const results: resultsInterface = {
			totalRecords: 0,
			totalPages: 0,
			limit: 12,
			previous: undefined,
			next: undefined,
			current: undefined,
			results: []
		};

		const { sort, name, query } = searchQuery;

		const finalQuery = JSON.parse(query);

		const objectKeys = Object.keys(finalQuery);
		console.log('🚀 ~ file: query.services.ts ~ line 37 ~ query ~ objectKeys', objectKeys);

		let newRegExQuery = {};

		objectKeys.forEach((name) => {
			const regexValue = new RegExp(finalQuery[name], 'ig');
			newRegExQuery = { ...newRegExQuery, [name]: regexValue };
		});

		console.log('🚀 ~ file: query.services.ts ~ line 40 ~ query ~ newRegExQuery', newRegExQuery);

		let regexName = /./i;
		if (name) {
			regexName = new RegExp(name, 'ig');
		}
		let { limit, page } = searchQuery;

		limit = parseInt(limit) < 1 ? 1 : parseInt(limit);
		page = parseInt(page);

		const newQuery = omit(searchQuery, ['limit', 'page', 'sort', 'name']);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const totalRecords = await model.countDocuments({ ...newQuery, name: regexName }).exec();

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
			.find({ ...newQuery, name: regexName })
			.select('-password')
			.limit(limit)
			.skip(startIndex)
			.sort(sort)
			.exec();

		return results;
	} catch (err) {
		return err.message;
	}
};

export default query;
