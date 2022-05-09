import type { RequestHandler } from '@sveltejs/kit'
import logger from '$lib/utility/logger'
import ProductsModel from '$lib/models/products.models'

export const get: RequestHandler = async ({ request }) => {
  try {
    return {
      status: 200,
      body: {},
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: `A server error occurred ${err}`,
      },
    }
  }
}

export const post = async ({ request, locals }) => {
  try {
    if (!locals?.user?._id) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized',
        },
      }
    }

    const userId = locals.user._id

    const reqProduct = await request.json()

    const newProduct = new ProductsModel(reqProduct)

    newProduct.userID = userId

    console.log('getCurrentProductID', await newProduct.getCurrentProductID())

    await newProduct.save()

    return {
      status: 200,
      body: {
        message: newProduct,
      },
    }
  } catch (err) {
    logger.error(err.message)
    return {
      status: 500,
      body: {
        error: `A server error occurred ${err}`,
      },
    }
  }
}

export const put = async ({ request }) => {
  try {
    return {
      status: 200,
      body: {
        message: 'Success',
      },
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: `A server error occurred ${err}`,
      },
    }
  }
}

export async function del({ request }) {
  return
}
