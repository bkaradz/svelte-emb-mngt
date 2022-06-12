import { getMonetaryValue } from '$lib/services/monetary.services';
import mongoose, { model, Schema, Document } from 'mongoose';

export interface PricelistsSubDocument {
	_id: mongoose.Schema.Types.ObjectId | string;
	minimumPrice: mongoose.Schema.Types.Decimal128 | number;
	pricePerThousandStitches: mongoose.Schema.Types.Decimal128 | number;
	minimumQuantity: number;
	embroideryType: string;
}

export interface PricelistsDocument extends Document {
	_id: mongoose.Schema.Types.ObjectId | string;
	userID: mongoose.Schema.Types.ObjectId | string;
	name: string;
	isActive: boolean;
	isDefault: boolean;
	pricelists: Array<PricelistsSubDocument>;
	createdAt: Date | string;
	updatedAt: Date | string;
}

const pricelistsSubSchema: Schema = new Schema<PricelistsSubDocument>(
	{
		minimumPrice: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		pricePerThousandStitches: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => getMonetaryValue(v),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		minimumQuantity: {
			type: Number,
			required: true
		},
		embroideryType: {
			type: String,
			required: true
		}
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const PricelistsSchema: Schema = new Schema<PricelistsDocument>(
	{
		userID: { type: Schema.Types.ObjectId, ref: 'Contacts', required: true },
		name: {
			type: String,
			required: true,
			unique: true
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true
		},
		isDefault: {
			type: Boolean,
			required: true,
			default: false
		},
		pricelists: [pricelistsSubSchema]
	},
	{ timestamps: true, toJSON: { getters: true } }
);

PricelistsSchema.pre(/^(save)/, async function (next) {
	const pricelist = this as PricelistsDocument;

	if (pricelist.isDefault === false) {
		return next();
	}

	const getGroupDefault = await PricelistsModel.find({ isDefault: true });

	if (getGroupDefault.length >= 1) {
		// reset all values to false
		await PricelistsModel.updateMany({ isDefault: false });
	}

	return next();
});

PricelistsSchema.pre(/^(updateOne|findOneAndUpdate|findByIdAndUpdate)/, async function (next) {
	const pricelist = { ...this.getUpdate() };

	if (pricelist.isDefault === false) {
		return next();
	}

	const getGroupDefault = await PricelistsModel.find({ isDefault: true });

	if (getGroupDefault.length >= 1) {
		// reset all values to false
		await PricelistsModel.updateMany({ isDefault: false });
	}

	return next();
});

PricelistsSchema.methods.comparePassword = async function ({
	id,
	embroideryType,
	quantity
}: {
	id: string;
	embroideryType: string;
	quantity: number;
}) {
	console.log('🚀 ~ file: pricelists.model.ts ~ line 109 ~ quantity', quantity);
	console.log('🚀 ~ file: pricelists.model.ts ~ line 109 ~ embroideryType', embroideryType);
	const pricelist = await PricelistsModel.findById({ _id: id }).lean();
	const pricelistsArray = pricelist.pricelists;

	const minimumQuantityArray = pricelistsArray
		.filter((list) => embroideryType === list.embroideryType)
		.sort((a, b) => a.minimumQuantity - b.minimumQuantity)
		.filter((list) => list.minimumQuantity <= quantity);

	console.log(
		'🚀 ~ file: pricelists.model.ts ~ line 124 ~ minimumQuantityArray',
		minimumQuantityArray
	);
	return minimumQuantityArray.pop();
};

const PricelistsModel = model<PricelistsDocument>('Pricelists', PricelistsSchema);

export default PricelistsModel;
