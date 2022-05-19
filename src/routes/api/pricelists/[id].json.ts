import PricelistsModel from '$lib/models/pricelists.model'
import logger from '$lib/utility/logger'

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
  console.log('🚀 ~ file: [id].json.ts ~ line 6 ~ get ~ params', params)
  try {
    const pricelist = await PricelistsModel.findOne({ _id: params.id }, { createdAt: 0, updatedAt: 0, __v: 0 }).lean()
    console.log('🚀 ~ file: [id].json.ts ~ line 9 ~ get ~ pricelist', pricelist)

    return {
      status: 200,
      body: {
        pricelist,
      },
    }
  } catch (err) {
    logger.error(err)
    throw new Error(err.message)
  }
}
