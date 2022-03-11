import { model, Schema, Model, Document, Types } from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface ContactsDocument extends Document {
  userID?: Types.ObjectId
  name: string
  isCorporate: boolean
  notes?: string
  vatOrBpNo?: string
  email?: string
  phoneNo: string[]
  address?: string
  balanceDue: number
  totalReceipts: number
  isDeleted: boolean
  isUser: boolean
  password?: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const contactsSchema: Schema = new Schema<ContactsDocument>(
  {
    userID: { type: Types.ObjectId, ref: 'Contacts' },
    name: { type: String, required: true },
    isCorporate: { type: Boolean, required: true },
    notes: { type: String },
    vatOrBpNo: { type: String },
    email: { type: String, unique: true },
    phoneNo: [{ type: String, required: true }],
    address: { type: String },
    balanceDue: { type: Number, required: true, default: 0 },
    totalReceipts: { type: Number, required: true, default: 0 },
    isDeleted: { type: Boolean, required: true, default: false },
    isUser: { type: Boolean, required: true, default: false },
    password: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
)

const ContactsModel: Model<ContactsDocument> = model('Contacts', contactsSchema)

export default ContactsModel

contactsSchema.pre('save', async function (next) {
  const contact = this as ContactsDocument

  if (!contact.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))

  const hash = bcrypt.hashSync(contact.password, salt)

  contact.password = hash

  return next()
})

contactsSchema.method.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const contact = this as ContactsDocument
  return bcrypt.compare(candidatePassword, contact.password).catch((e) => false)
}
