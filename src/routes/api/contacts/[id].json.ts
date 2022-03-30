import ContactsModel from '$lib/models/contacts.model'
import omit from 'lodash/omit'

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
  let contact = await ContactsModel.findOne({ _id: params.id })

  contact = omit(contact.toJSON(), 'password')

  if (!contact) {
    return {
      status: 404,
      body: {
        message: 'Customer not found',
      },
    }
  }

  return {
    status: 200,
    body: {
      contact,
    },
  }
}
