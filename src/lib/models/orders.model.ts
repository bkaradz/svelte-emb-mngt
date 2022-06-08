import mongoose, { model, Schema, Document } from 'mongoose'
import type { ProductsDocument } from './products.models'
import dayjs from 'dayjs'
dayjs().format()

const oneWeek = dayjs().add(7, 'day')
const date = dayjs()

export interface OrdersDocument extends Document {
  userID: mongoose.Schema.Types.ObjectId
  customerID: mongoose.Schema.Types.ObjectId
  pricelistID: mongoose.Schema.Types.ObjectId
  orderID: string
  comment: string
  accountsStatus: string
  orderDate: Date
  quoteExpiryDate: Date
  requiredDate: Date
  subTotal: mongoose.Schema.Types.Decimal128 | number
  tax: mongoose.Schema.Types.Decimal128 | number
  taxRate: number
  discount: mongoose.Schema.Types.Decimal128 | number
  balance: mongoose.Schema.Types.Decimal128 | number
  discountRate: number
  isActive: boolean
  orderLine: Array<Partial<ProductsDocument>>
  createdAt: Date
  updatedAt: Date
}

const OrdersSchema: Schema = new Schema<OrdersDocument>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Contacts',
    },
    pricelistID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Pricelists',
    },
    orderID: {
      // of the form SO0000001 /SO\s[0-9]{7}$/gm
      type: String,
      match: /SO\s[0-9]{7}$/,
      required: true,
      unique: true,
      index: true,
    },
    comment: {
      type: String,
    },
    orderDate: {
      type: Date,
      required: true,
      default: date,
    },
    quoteExpiryDate: {
      type: Date,
      required: true,
      default: oneWeek,
    },
    requiredDate: {
      type: Date,
      required: true,
      default: oneWeek,
    },
    subTotal: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v: number) => getMonetaryValue(v),
      set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
      default: 0,
    },
    tax: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v: number) => getMonetaryValue(v),
      set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
      default: 0,
    },
    taxRate: {
      type: Number,
      required: true,
    },
    discount: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v: number) => getMonetaryValue(v),
      set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
      default: 0,
    },
    discountRate: {
      type: Number,
      required: true,
    },
    balance: {
      type: Schema.Types.Decimal128,
      required: true,
      get: (v: number) => getMonetaryValue(v),
      set: (v: number) => mongoose.Types.Decimal128.fromString((+v).toFixed(4)),
      default: 0,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderLine: { type: [productsSchema], required: true },
    accountsStatus: {
      type: String,
      default: 'quotation',
      validate: (value) => {
        return findEnumValue(constants.ACCOUNTS_STATUS, value)
      },
    },
  },
  { timestamps: true }
)

const OrdersModel = model<OrdersDocument>('Orders', OrdersSchema)

export default OrdersModel

function getMonetaryValue(value: number) {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString())
  }
  return value
}

export const incOrderID = (orderID) => {
  const numOrderID = orderID.slice(2) // remove characters SO from string
  const strOrderID = (parseInt(numOrderID) + 1).toString() // convert to int and add one then covert to string
  const zeroBuffer = '0000000'
  const newOrderID = `SO ${zeroBuffer.slice(strOrderID.length)}${strOrderID}`
  return newOrderID
}

export const getCurrentOrderID = async () => {
  try {
    const quotation = await OrdersModel.find({}).sort({ _id: -1 }).limit(1).select('orderID')
    // console.log('products', products)
    let orderID = ''
    if (quotation.length === 0) {
      // set the orderID to the initial Value so xxxxxxx
      orderID = 'SO 0000000'
    } else {
      orderID = quotation[0].orderID
    }
    return orderID
  } catch (err) {
    return { errors: [{ msg: `Sever Error: ${err.message}` }] }
  }
}
