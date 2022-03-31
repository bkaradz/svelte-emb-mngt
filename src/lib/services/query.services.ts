import omit from 'lodash/omit';

const query = async (query, model) => {
	try {
		const results = {};
		let { limit, page } = query;

		limit = parseInt(limit);
		page = parseInt(page);

		const newQuery = omit(query, ['limit', 'page']);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit
			};
		}
		if (endIndex < (await await model.countDocuments({ ...newQuery }).exec())) {
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
			.exec();

		return {
			status: 200,
			body: {
				message: results
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				message: err.message
			}
		};
	}
};

export default query;
