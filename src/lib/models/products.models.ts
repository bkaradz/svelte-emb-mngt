import { model, Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface ContactsDocument extends Document {
	userID?: Types.ObjectId;
	name: string;
	productID: string;
	isCorporate: boolean;
	notes?: string;
	vatOrBpNo?: string;
	email?: string;
	phone: string;
	address?: string;
	balanceDue: number;
	totalReceipts: number;
	isActive: boolean;
	isUser: boolean;
	password?: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const contactsSchema: Schema = new Schema<ContactsDocument>(
	{
		userID: { type: Types.ObjectId, ref: 'Contacts' },
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
		unit_price: {
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

contactsSchema.pre('save', async function (next) {
	const contact = this as ContactsDocument;

	if (!contact.isUser) {
		return next();
	}

	if (!contact.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

	const hash = bcrypt.hashSync(contact.password, salt);

	contact.password = hash;

	return next();
});

contactsSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	const contact = this as ContactsDocument;
	return bcrypt.compare(candidatePassword, contact.password).catch(() => false);
};

const ContactsModel = model<ContactsDocument>('Contacts', contactsSchema);

export default ContactsModel;
