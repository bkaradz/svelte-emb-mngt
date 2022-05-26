import mongoose, { model, Schema, Document } from 'mongoose';

const constants = {
	USER_ROLES: 'userRoles',
	PRODUCT_CATEGORIES: 'productCategories',
	EMBROIDERY_TYPES: 'embTypes',
	GARMENT_POSITIONS: 'garmentPositions',
	CUSTOMER_TYPES: 'customerTypes',
	ACCOUNTS_STATUS: 'accountsStatus',
	MANUFACTURING_STATUS: 'manufacturingStatus',
	// Default values
	DEF_USER_ROLE: 'USER',
	DEF_PRODUCT_CATEGORY: 'embLogo',
	DEF_EMBROIDERY_TYPE: 'Flat',
	DEF_GARMENT_POSITION: 'Front Left',
	DEF_CUSTOMER_TYPE: 'Individual',
	DEF_ACCOUNTS_STATUS: 'quotation',
	DEF_MANUFACTURING_STATUS: 'awaitingEmbroidery'
};

export interface ProductsDocument extends Document {
	_id: mongoose.Schema.Types.ObjectId;
	userID: mongoose.Schema.Types.ObjectId;
	name: string;
	productID: string;
	title?: string;
	description?: string;
	unitPrice: number;
	category?: string;
	stitches: number;
	quantity: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const productsSchema: Schema = new Schema<ProductsDocument>(
	{
		userID: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
		name: { type: String, required: true, unique: true, index: true },
		productID: {
			// of the form xxx-xxx-xxxx /^([0-9]{3}-){2}[0-9]{4}$/
			type: String,
			match: /^([0-9]{3}-){2}[0-9]{4}$/,
			required: true,
			unique: true,
			index: true
		},
		title: {
			type: String
		},
		description: {
			type: String
		},
		unitPrice: {
			type: Number,
			required: function () {
				return this.category !== constants.DEF_PRODUCT_CATEGORY;
			}
		},
		category: {
			type: String,
			default: constants.DEF_PRODUCT_CATEGORY,
			required: true
		},
		stitches: {
			type: Number,
			required: function () {
				return this.category === constants.DEF_PRODUCT_CATEGORY;
			}
		},
		quantity: {
			type: Number,
			required: function () {
				return this.category !== constants.DEF_PRODUCT_CATEGORY;
			}
		},
		isActive: { type: Boolean, required: true, default: true },
		createdAt: { type: Date },
		updatedAt: { type: Date }
	},
	{ timestamps: true }
);

productsSchema.pre('validate', async function (next) {
	const product = this as ProductsDocument;

	/**
	 * TODO: test this when updating a product, The productID must not Change
	 */
	if (product?.productID) {
		return next();
	}

	const oldProductID = await getCurrentProductID();
	const currentProductID = incProductID(oldProductID);

	product.productID = currentProductID;

	return next();
});

const ProductsModel = model<ProductsDocument>('Products', productsSchema);

export default ProductsModel;

export const incProductID = (productID) => {
	const oldProductID = productID.replace(/-/g, ''); // remove - from string
	const strProductID = (parseInt(oldProductID) + 1).toString(); // convert to int and add one then covert to string
	productID = `${strProductID.slice(0, 3)}-${strProductID.slice(3, 6)}-${strProductID.slice(6)}`;
	return productID;
};

export const getCurrentProductID = async () => {
	try {
		const products = await ProductsModel.find({}).sort({ _id: -1 }).limit(1).select('productID');
		let productID = '';
		if (products.length === 0) {
			// set the productID to the initial Value xxx-xxx-xxxx (xxyxxyxxxx)
			productID = '100-000-0000';
		} else {
			productID = products[0].productID;
		}
		return productID;
	} catch (err) {
		throw new Error('Error ${err.message}');
	}
};
