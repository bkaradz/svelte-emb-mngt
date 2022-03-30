import { model, Schema, Document, Types } from 'mongoose'
import type { ContactsDocument } from './contacts.model'

export interface SessionsDocument extends Document {
  user: ContactsDocument['_id']
  valid: boolean
  userAgent: string
  createdAt: Date
  updatedAt: Date
}

const sessionsSchema: Schema = new Schema<SessionsDocument>(
  {
    user: { type: Types.ObjectId, ref: 'Contacts' },
    valid: { type: Boolean, required: true, default: true },
    userAgent: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
)

const SessionsModel = model<SessionsDocument>('Sessions', sessionsSchema)

export default SessionsModel

// const User = mongoose.models.User as UserModelInterface || mongoose.model<UserDoc, UserModelInterface>('User', UserSchema)
