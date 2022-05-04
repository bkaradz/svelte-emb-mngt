import mongoose, { model, Schema, Document } from 'mongoose';

export interface OptionsDocument extends Document {
	userID: mongoose.Schema.Types.ObjectId;
	group: string;
	name: string;
	value: string;
	isActive: boolean;
	isDefault: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const optionsSchema: Schema = new Schema<OptionsDocument>(
	{
		userID: { type: Schema.Types.ObjectId, ref: 'Contacts', required: true },
		group: {
			type: String,
			required: true
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
		name: {
			type: String,
			required: true,
			unique: true
		},
		value: {
			type: String,
			required: true,
			unique: true
		}
	},
	{ timestamps: true }
);

const OptionsModel = model<OptionsDocument>('Options', optionsSchema);

export default OptionsModel;

// const User = mongoose.models.User as UserModelInterface || mongoose.model<UserDoc, UserModelInterface>('User', UserSchema)
