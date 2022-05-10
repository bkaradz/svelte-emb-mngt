import type { RequestHandler } from '@sveltejs/kit'
import logger from '$lib/utility/logger'
import ProductsModel from '$lib/models/products.models'
import aggregateQuery from '$lib/services/aggregateQuery.services'
import { omit } from 'lodash'

export const get: RequestHandler = async ({ url }) => {
  try {
    const queryParams = Object.fromEntries(url.searchParams)

    let { limit = 15, page = 1 } = queryParams

    limit = parseInt(limit) < 1 ? 1 : parseInt(limit)
    page = parseInt(page)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let previous = null
    let next = null
    const current = {
      page: page,
      limit,
    }

    if (startIndex > 0) {
      previous = {
        page: page - 1,
        limit,
      }
    }

    // const { sort = 'name' } = searchQuery;
    /**
     * TODO: Make sort to be dynamic
     */

    const finalQuery = omit(queryParams, ['page', 'limit', 'sort'])

    const objectKeys = Object.keys(finalQuery)

    let newRegExQuery = {}

    objectKeys.forEach((name) => {
      if (name === 'isCorporate' || name === 'isUser' || name === 'isActive') {
        finalQuery[name] = finalQuery[name] === 'true' ? true : false
        newRegExQuery = { ...newRegExQuery, [name]: finalQuery[name] }
      } else {
        newRegExQuery = { ...newRegExQuery, [name]: { $regex: finalQuery[name], $options: 'ig' } }
      }
    })

    const aggregateFilter = [
      {
        $lookup: {
          from: 'contacts',
          localField: 'organizationID',
          foreignField: '_id',
          as: 'organizationID',
        },
      },
      {
        $addFields: {
          balanceDue: {
            $toString: '$balanceDue',
          },
          totalReceipts: {
            $toString: '$totalReceipts',
          },
        },
      },
      {
        $match: newRegExQuery,
      },
      {
        $sort: {
          name: 1,
        },
      },

      {
        $facet: {
          metaData: [
            {
              $count: 'totalRecords',
            },
            {
              $addFields: {
                previous,
                current,
                limit,
              },
            },
          ],
          results: [
            {
              $skip: startIndex,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
      {
        $project: {
          results: {
            userRole: 0,
            password: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      },
    ]

    let products = await aggregateQuery(queryParams, ProductsModel, aggregateFilter)

    products = { ...products, ...products.metaData[0] }
    delete products.metaData

    return {
      status: 200,
      body: { ...products },
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
