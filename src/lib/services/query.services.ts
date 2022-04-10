import type { ContactsDocument } from '$lib/models/contacts.model';
import omit from 'lodash/omit';

const query = async (query, model) => {
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

		const { sort, name } = query;
		let regexName = /./i;
		if (name) {
			regexName = new RegExp(name, 'ig');
		}
		let { limit, page } = query;

		limit = parseInt(limit) < 1 ? 1 : parseInt(limit);
		page = parseInt(page);

		const newQuery = omit(query, ['limit', 'page', 'sort', 'name']);

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
