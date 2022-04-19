import logger from '$lib/utility/logger';
import { omit } from 'lodash';

const aggregateQuery = async (searchQuery, model) => {
	try {
		interface paginationNavInterface {
			page: number;
			limit: number;
		}

		interface metaDataInterface {
			error: boolean;
			totalRecords: number;
			totalPages: number;
			previous: paginationNavInterface;
			current: paginationNavInterface;
			next: paginationNavInterface;
		}

		interface aggregateQueryInterface {
			metaData: Array<metaDataInterface>;
			results: [];
		}

		let { limit = 15, page = 1 } = searchQuery;

		// const { sort = 'name' } = searchQuery;
		/**
		 * TODO: Make sort to be dynamic
		 */

		const finalQuery = omit(searchQuery, ['page', 'limit', 'sort']);

		const objectKeys = Object.keys(finalQuery);

		let newRegExQuery = {};

		objectKeys.forEach((name) => {
			if (name === 'isCorporate' || name === 'isUser' || name === 'isActive') {
				finalQuery[name] = finalQuery[name] === 'true' ? true : false;
				newRegExQuery = { ...newRegExQuery, [name]: finalQuery[name] };
			} else {
				newRegExQuery = { ...newRegExQuery, [name]: { $regex: finalQuery[name], $options: 'ig' } };
			}
		});

		limit = parseInt(limit) < 1 ? 1 : parseInt(limit);
		page = parseInt(page);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		let previous = null;
		let next = null;
		const current = {
			page: page,
			limit
		};

		if (startIndex > 0) {
			previous = {
				page: page - 1,
				limit
			};
		}

		const aggregateFilter = [
			{
				$lookup: {
					from: 'contacts',
					localField: 'organizationID',
					foreignField: '_id',
					as: 'organization'
				}
			},
			{
				$addFields: {
					balanceDue: {
						$toString: '$balanceDue'
					},
					totalReceipts: {
						$toString: '$totalReceipts'
					}
				}
			},
			{
				$match: newRegExQuery
			},
			{
				$sort: {
					name: 1
				}
			},

			{
				$facet: {
					metaData: [
						{
							$count: 'totalRecords'
						},
						{
							$addFields: {
								previous,
								current,
								limit
							}
						}
					],
					results: [
						{
							$skip: startIndex
						},
						{
							$limit: limit
						}
					]
				}
			},
			{
				$project: {
					results: {
						password: 0,
						createdAt: 0,
						updatedAt: 0,
						__v: 0
					}
				}
			}
		];

		const results: aggregateQueryInterface = await model.aggregate(aggregateFilter).exec();

		let metaData: { totalRecords: number; error: boolean; next: any; totalPages: number } = {
			totalRecords: 0,
			error: false,
			next: null,
			totalPages: 0
		};

		if (!results[0].metaData[0]) {
			results[0].metaData.push({ totalRecords: 0, limit: 15, previous: null, current, next: null });
			metaData = results[0].metaData[0];
		} else {
			metaData = results[0].metaData[0];
		}

		if (endIndex < metaData.totalRecords) {
			next = {
				page: page + 1,
				limit
			};
		}

		const totalPages = Math.ceil(metaData.totalRecords / limit);

		metaData.error = false;
		metaData.next = next;
		metaData.totalPages = totalPages;

		return results[0];
	} catch (err) {
		logger.error(err);
		return { metaData: [{ error: true }], message: err.message };
	}
};

export default aggregateQuery;
