import busboy from 'busboy'
import { pipeline } from 'stream/promises'
import logger from '$lib/utility/logger'
import csv from 'csvtojson'

export const parseCSV = async (request) => {
  const content = request.headers.get('content-type')

  const bb = busboy({
    headers: {
      'content-type': content,
    },
  })

  let dataV = ''

  bb.on('file', async (name, file, info) => {
    const { filename, encoding, mimeType } = info

    file
      .on('data', (data) => {
        dataV = data
      })
      .on('close', () => {
        logger.info(`File [${name}] done`)
      })
  })

  await pipeline(request.body as any, bb)

  return await csv().fromString(dataV.toString())
}

export default parseCSV
