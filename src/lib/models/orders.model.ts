import mongoose, { model, Schema, Document } from 'mongoose';
import type { ProductsDocument } from './products.models';
import logger from '$lib/utility/logger';
import dayjs from 'dayjs';
import { getMonetaryValue } from '$lib/services/monetary.services';
import {
	optionContainsName,
	optionsGroupsNames,
	optionsGroupsValuesDefaults
} from '$lib/models/options.models';
dayjs().format();

const oneWeek = dayjs().add(7, 'day').toDate();
const date = dayjs().toDate();

export interface ProductDocument extends Document {
	_id: mongoose.Schema.Types.ObjectId;
	productID: string;
	name: string;
	quantity: number;
	unitPrice: mongoose.Schema.Types.Decimal128;
	total: mongoose.Schema.Types.Decimal128;
	category: string;
	embroideryType?: string;
	garmentPositions?: string;
	manufacturingStatus?: string;
	stitches?: number;
	createdAt: Date;
	updatedAt: Date;
}

const productsSchema: Schema = new Schema<ProductDocument>(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Products'
		},
		productID: {
			// of the form xxx-xxx-xxxx /^([0-9]{3}-){2}[0-9]{4}$/gm
			type: String,
			match: /^([0-9]{3}-){2}[0-9]{4}$/,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		unitPrice: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		total: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		category: {
			type: String,
			required: true,
			validate: (value: string) => {
				return optionContainsName(optionsGroupsNames.PRODUCT_CATEGORIES, value);
			}
		},
		embroideryType: {
			type: String,
			validate: (value: string) => {
				return optionContainsName(optionsGroupsNames.EMBROIDERY_TYPES, value);
			},
			required: function () {
				return this.category === optionsGroupsValuesDefaults.DEF_PRODUCT_CATEGORY;
			}
		},
		garmentPositions: {
			type: String,
			validate: (value: string) => {
				return optionContainsName(optionsGroupsNames.GARMENT_POSITIONS, value);
			},
			required: function () {
				return this.category === optionsGroupsValuesDefaults.DEF_PRODUCT_CATEGORY;
			}
		},
		stitches: {
			type: Number,
			required: function () {
				return this.category === optionsGroupsValuesDefaults.DEF_PRODUCT_CATEGORY;
			}
		},
		manufacturingStatus: {
			type: String,
			validate: (value: string) => {
				return optionContainsName(optionsGroupsNames.MANUFACTURING_STATUS, value);
			}
		},
		createdAt: { type: Date },
		updatedAt: { type: Date }
	},
	{ timestamps: true, toJSON: { getters: true } }
);

export interface OrdersDocument extends Document {
	userID: mongoose.Schema.Types.ObjectId;
	customerID: mongoose.Schema.Types.ObjectId;
	pricelistID: mongoose.Schema.Types.ObjectId;
	orderID: string;
	comment?: string;
	accountsStatus: string;
	orderDate?: Date;
	quoteExpiryDate?: Date;
	requiredDate?: Date;
	subTotal: mongoose.Schema.Types.Decimal128 | number;
	tax?: mongoose.Schema.Types.Decimal128 | number;
	taxRate?: number;
	discount?: mongoose.Schema.Types.Decimal128 | number;
	balance: mongoose.Schema.Types.Decimal128 | number;
	discountRate?: number;
	isActive: boolean;
	orderLine: Array<Partial<ProductsDocument>>;
	createdAt: Date;
	updatedAt: Date;
}

const ordersSchema: Schema = new Schema<OrdersDocument>(
	{
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Users'
		},
		customerID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Contacts'
		},
		pricelistID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Pricelists'
		},
		orderID: {
			// of the form SO 0000001 /SO\s[0-9]{7}$/gm
			type: String,
			match: /SO\s[0-9]{7}$/,
			required: true,
			unique: true,
			index: true
		},
		comment: {
			type: String
		},
		orderDate: {
			type: Date,
			required: true,
			default: date
		},
		quoteExpiryDate: {
			type: Date,
			required: true,
			default: oneWeek
		},
		requiredDate: {
			type: Date,
			required: true,
			default: oneWeek
		},
		subTotal: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		tax: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		taxRate: {
			type: Number,
			required: true
		},
		discount: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		discountRate: {
			type: Number,
			required: true
		},
		balance: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		isActive: {
			type: Boolean,
			required: true,
			default: false
		},
		orderLine: { type: [productsSchema], required: true },
		accountsStatus: {
			type: String,
			required: true,
			validate: (value: string) => {
				return optionContainsName(optionsGroupsNames.ACCOUNTS_STATUS, value);
			}
		}
	},
	{ timestamps: true }
);

ordersSchema.pre('validate', async function (next) {
	const order = this as OrdersDocument;
	console.log('🚀 ~ file: orders.model.ts ~ line 230 ~ order', order);

	if (order?.orderID) {
		return next();
	}

	const oldOrderID = await getCurrentOrderID();
	const currentOrderID = incOrderID(oldOrderID);

	order.orderID = currentOrderID;

	return next();
});

const OrdersModel = model<OrdersDocument>('Orders', ordersSchema);

export default OrdersModel;

export const incOrderID = (orderID: string) => {
	const numOrderID = orderID.slice(2); // remove characters SO from string
	const strOrderID = (parseInt(numOrderID) + 1).toString(); // convert to int and add one then covert to string
	const zeroBuffer = '0000000';
	const newOrderID = `SO ${zeroBuffer.slice(strOrderID.length)}${strOrderID}`;
	return newOrderID;
};

export const getCurrentOrderID = async () => {
	try {
		const quotation = await OrdersModel.find({}).sort({ _id: -1 }).limit(1).select('orderID');
		// console.log('products', products)
		let orderID = '';
		if (quotation.length === 0) {
			// set the orderID to the initial Value so xxxxxxx
			orderID = 'SO 0000000';
		} else {
			orderID = quotation[0].orderID;
		}
		return orderID;
	} catch (err) {
		logger.error(err.message);
		throw new Error(`Error ${err.message}`);
	}
};
