import mongoose, { model, Schema, Document } from 'mongoose';

export interface OptionsDocument extends Document {
	_id: mongoose.Schema.Types.ObjectId | string;
	userID: mongoose.Schema.Types.ObjectId | string;
	group: string;
	name: string;
	value: string;
	isActive: boolean;
	isDefault: boolean;
	createdAt: Date | string;
	updatedAt: Date | string;
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

optionsSchema.pre('save', async function (next) {
	const option = this as OptionsDocument;

	if (option.isDefault === false) {
		return next();
	}

	const getGroupDefault = await OptionsModel.find({ group: option.group, isDefault: true });

	if (getGroupDefault.length >= 1) {
		// reset all values to false
		await OptionsModel.updateMany({ group: option.group }, { isDefault: false });
	}

	return next();
});

const OptionsModel = model<OptionsDocument>('Options', optionsSchema);

export default OptionsModel;

// const User = mongoose.models.User as UserModelInterface || mongoose.model<UserDoc, UserModelInterface>('User', UserSchema)
