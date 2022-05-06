import OptionsModel from '$lib/models/options.models'
import { postSuite } from '$lib/validation/server/options.validate'
import type { OptionsDocument } from '$lib/models/options.models'
import logger from '$lib/utility/logger'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async ({ request, locals }): Promise<{ body: OptionsDocument | string }> => {
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

    const reqOptions = await request.json()

    reqOptions.userID = userId
    console.log('🚀 ~ file: index.ts ~ line 25 ~ post ~ reqOptions', reqOptions)

    const result = postSuite(reqOptions)
    console.log('🚀 ~ file: index.ts ~ line 28 ~ post ~ result', result)

    const newOption = new OptionsModel(reqOptions)

    const res = await newOption.save()
    console.log('🚀 ~ file: index.ts ~ line 33 ~ post ~ res', res)

    return {
      status: 200,
      body: res,
    }
  } catch (err) {
    logger.error(err)
    return {
      status: 500,
      body: {
        error: `A server error occurred ${err}`,
      },
    }
  }
}
