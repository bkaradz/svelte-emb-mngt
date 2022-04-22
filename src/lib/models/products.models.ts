import mongoose, { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface ProductsDocument extends Document {
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
	comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const productsSchema: Schema = new Schema<ProductsDocument>(
	{
		userID: { type: Schema.Types.ObjectId, ref: 'Products' },
		name: { type: String, required: true },
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
			required: true,
			validate: (value) => {
				return findEnumValue(constants.PRODUCT_CATEGORIES, value);
			}
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

productsSchema.pre('save', async function (next) {
	const product = this as ProductsDocument;

	if (!product.isUser) {
		return next();
	}

	if (!product.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

	const hash = bcrypt.hashSync(product.password, salt);

	product.password = hash;

	return next();
});

productsSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	const product = this as ProductsDocument;
	return bcrypt.compare(candidatePassword, product.password).catch(() => false);
};

const ProductsModel = model<ProductsDocument>('Products', productsSchema);

export default ProductsModel;
