import omit from 'lodash/omit';

const query = async (query, model) => {
	try {
		const results = {};
		let { limit, page, sort } = query;

		limit = parseInt(limit) < 1 ? 1 : parseInt(limit);
		page = parseInt(page);

		const newQuery = omit(query, ['limit', 'page', 'sort']);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const totalRecords = await await model.countDocuments({ ...newQuery }).exec();

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
			.find({ ...newQuery })
			.select('-password')
			.limit(limit)
			.skip(startIndex)
			.sort(sort)
			.exec();

		// console.log('🚀 ~ file: query.services.ts ~ line 51 ~ query ~ results', results);

		return results;
	} catch (err) {
		return err.message;
	}
};

export default query;
