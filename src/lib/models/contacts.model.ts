import { model, Schema, Model, Document } from 'mongoose';

export interface ContactsDocument extends Document {
	name: string;
	completed: boolean;
}

const contactsSchema: Schema = new Schema<ContactsDocument>(
	{
		name: { type: String, required: true },
		completed: { type: Boolean, required: true, default: false }
	},
	{ timestamps: true }
);

const ContactsModel: Model<ContactsDocument> = model('Contacts', contactsSchema);

export default ContactsModel;
