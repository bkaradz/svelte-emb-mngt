import mongoose, { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface ContactsDocument extends Document {
	_id: mongoose.Schema.Types.ObjectId;
	userID?: mongoose.Schema.Types.ObjectId;
	organizationID?: mongoose.Schema.Types.ObjectId;
	name: string;
	isCorporate: boolean;
	notes?: string;
	vatOrBpNo?: string;
	email?: string;
	phone: string;
	address?: string;
	balanceDue: mongoose.Schema.Types.Decimal128;
	totalReceipts: mongoose.Schema.Types.Decimal128;
	isActive: boolean;
	isUser: boolean;
	userRole?: string;
	password?: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const contactsSchema: Schema = new Schema<ContactsDocument>(
	{
		userID: { type: Schema.Types.ObjectId, ref: 'Contacts' },
		organizationID: { type: Schema.Types.ObjectId, ref: 'Contacts' },
		name: { type: String, required: true },
		isCorporate: { type: Boolean, required: true, default: false },
		notes: { type: String },
		vatOrBpNo: { type: String },
		email: {
			type: String,
			unique: true,
			sparse: true,
			required: function () {
				return this.isUser === true;
			}
		},
		phone: { type: String, required: true },
		address: {
			type: String,
			required: function () {
				return this.isUser === true;
			}
		},
		balanceDue: {
			type: Schema.Types.Decimal128,
			required: true,
			get: (v: number) => v.toString(),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		totalReceipts: {
			type: Schema.Types.Decimal128,
			required: true,
			// get: (v) => mongoose.Types.Decimal128.fromString((+v.toString()).toFixed(2)),
			get: (v: number) => v.toString(),
			set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
			default: 0
		},
		isActive: { type: Boolean, required: true, default: false },
		isUser: { type: Boolean, required: true, default: false },
		userRole: {
			type: String,
			default: 'USER',
			required: function () {
				return this.isUser === true;
			}
		},
		password: {
			type: String,
			required: function () {
				return this.isUser === true;
			}
		},
		createdAt: { type: Date },
		updatedAt: { type: Date }
	},
	{ timestamps: true, toJSON: { getters: true } }
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
