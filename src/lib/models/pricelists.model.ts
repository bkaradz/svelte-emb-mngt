import mongoose, { model, Schema, Document } from 'mongoose';

export interface PricelistsSubDocument {
	minimumPrice: mongoose.Schema.Types.Decimal128;
	pricePerThousandStitches: mongoose.Schema.Types.Decimal128;
	maximumQuantity: number;
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
		pricelists: [
			{
				minimumPrice: {
					type: Schema.Types.Decimal128,
					required: true,
					get: (v: number) => v.toString(),
					set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
					default: 0
				},
				pricePerThousandStitches: {
					type: Schema.Types.Decimal128,
					required: true,
					get: (v: number) => v.toString(),
					set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
					default: 0
				},
				maximumQuantity: {
					type: Number,
					required: true
				},
				embroideryType: {
					type: String,
					required: true
				}
			}
		]
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const PricelistsModel = model<PricelistsDocument>('Pricelists', PricelistsSchema);

export default PricelistsModel;
