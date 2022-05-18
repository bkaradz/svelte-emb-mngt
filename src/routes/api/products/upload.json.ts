import parseCSV from '$lib/services/csvParse.services';
import { postSuite } from '$lib/validation/server/products.validate';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import logger from '$lib/utility/logger';
import type { RequestHandler } from '@sveltejs/kit';
import ProductsModel, { getCurrentProductID, incProductID } from '$lib/models/products.models';
// import { getCurrentProductID, incProductID } from '$lib/models/products.models';

export const post: RequestHandler = async ({ request, locals }) => {
	try {
		if (!locals?.user?._id) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const userId = locals.user._id;

		const jsonFile = await parseCSV(request);

		interface productInterface {
			name: string;
			productID?: string;
			title?: string;
			description?: string;
			unitPrice?: number;
			category?: string;
			stitches?: number;
			quantity?: number;
			isActive: boolean;
		}

		let productID = await getCurrentProductID();

		jsonFile.forEach(async (element) => {
			productID = incProductID(productID);
			const product = {
				category: 'embLogo',
				isActive: true,
				productID,
				userID: userId,
				...element
			};

			const productFiltered = pickBy(product, identity);

			const result = postSuite(productFiltered);

			if (result.hasErrors()) {
				logger.error(result.getErrors());
				return;
			}

			const newProduct = new ProductsModel(productFiltered);

			newProduct.save();
		});

		return {
			status: 200,
			body: {
				message: 'Product Uploaded'
			}
		};
	} catch (err) {
		logger.error('Error', err);
		return {
			status: 500,
			body: {
				message: 'Error has ocurred'
			}
		};
	}
};
