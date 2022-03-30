import { model, Schema, Document, Types } from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface ContactsDocument extends Document {
  userID?: Types.ObjectId
  organizationID?: Types.ObjectId
  name: string
  isCorporate: boolean
  notes?: string
  vatOrBpNo?: string
  email?: string
  phone: string
  address?: string
  balanceDue: number
  totalReceipts: number
  isActive: boolean
  isUser: boolean
  password?: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const contactsSchema: Schema = new Schema<ContactsDocument>(
  {
    userID: { type: Types.ObjectId, ref: 'Contacts' },
    organizationID: { type: Types.ObjectId, ref: 'Contacts' },
    name: { type: String, required: true },
    isCorporate: { type: Boolean, required: true, default: false },
    notes: { type: String },
    vatOrBpNo: { type: String },
    email: {
      type: String,
      unique: true,
      sparse: true,
      required: function () {
        return this.isUser === true
      },
    },
    phone: { type: String, required: true },
    address: {
      type: String,
      required: function () {
        return this.isUser === true
      },
    },
    balanceDue: { type: Number, required: true, default: 0 },
    totalReceipts: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, required: true, default: false },
    isUser: { type: Boolean, required: true, default: false },
    userRole: {
      type: String,
      default: 'user',
      required: function () {
        return this.isUser === true
      },
    },
    password: {
      type: String,
      required: function () {
        return this.isUser === true
      },
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
)

contactsSchema.pre('save', async function (next) {
  const contact = this as ContactsDocument

  if (!contact.isUser) {
    return next()
  }

  if (!contact.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))

  const hash = bcrypt.hashSync(contact.password, salt)

  contact.password = hash

  return next()
})

contactsSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const contact = this as ContactsDocument
  return bcrypt.compare(candidatePassword, contact.password).catch(() => false)
}

const ContactsModel = model<ContactsDocument>('Contacts', contactsSchema)

export default ContactsModel
