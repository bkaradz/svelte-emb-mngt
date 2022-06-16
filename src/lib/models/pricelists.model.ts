import { getMonetaryValue, setMonetaryValue } from '$lib/services/monetary';
import mongoose, { model, Schema, Document } from 'mongoose';
import logger from '$lib/utility/logger';

export interface PricelistsSubDocument {
	_id: mongoose.Schema.Types.ObjectId | string;
	minimumPrice: string | number;
	pricePerThousandStitches: string | number;
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
	// getQuantityPricelist: ({
	// 	id,
	// 	embroideryType,
	// 	quantity
	// }: {
	// 	id: string;
	// 	embroideryType: string;
	// 	quantity: number;
	// }) => Promise<PricelistsSubDocument>;
}

const pricelistsSubSchema: Schema = new Schema<PricelistsSubDocument>(
	{
		minimumPrice: {
			type: String,
			required: true,
			get: (v: string) => getMonetaryValue(v),
			set: (v: number) => setMonetaryValue(v),
			default: 0
		},
		pricePerThousandStitches: {
			type: String,
			required: true,
			get: (v: string) => getMonetaryValue(v),
			set: (v: number) => setMonetaryValue(v),
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

const pricelistsSchema: Schema = new Schema<PricelistsDocument>(
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

pricelistsSchema.pre(/^(save)/, async function (next) {
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

pricelistsSchema.pre(/^(updateOne|findOneAndUpdate|findByIdAndUpdate)/, async function (next) {
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

const PricelistsModel = model<PricelistsDocument>('Pricelists', pricelistsSchema);

export default PricelistsModel;

export const getQuantityPricelist = async ({
	id,
	embroideryType,
	quantity
}: {
	id: string;
	embroideryType: string;
	quantity: number;
}): Promise<PricelistsSubDocument> => {
	try {
		const pricelist = await PricelistsModel.findById({ _id: id }).lean();
		const pricelistsArray = pricelist.pricelists;

		const minimumQuantityArray = pricelistsArray
			.filter((list) => embroideryType === list.embroideryType)
			.sort((a, b) => a.minimumQuantity - b.minimumQuantity)
			.filter((list) => list.minimumQuantity <= quantity);

		return minimumQuantityArray.pop();
	} catch (err) {
		logger.error(`Error ${err.message}`);
		throw new Error(`Error ${err.message}`);
	}
};
