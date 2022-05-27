import type { RequestHandler } from '@sveltejs/kit'
// import csv from 'csvtojson'
// import { parseString } from '@fast-csv/parse'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post: RequestHandler = async ({ request }) => {
  const data = await request.formData()
  console.log('🚀 ~ file: index.ts ~ line 6 ~ post ~ data', data)

  const file = data.get('file')

  console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file)
  console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', JSON.stringify(file))
  console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.size)
  console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.type)
  console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', file.name)
  console.log('🚀 ~ file: index.ts ~ line 9 ~ post ~ file', await file.text())
  // const text = await new Response(file).text()
  // console.log('🚀 ~ file: index.ts ~ line 21 ~ constpost:RequestHandler= ~ text', text)

  // parseString(file, { headers: true })
  //   .on('error', (error) => console.error(error))
  //   .on('data', (row) => console.log(row))
  //   .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))
  try {
    return {
      status: 200,
      body: { message: 'res' },
    }
  } catch (err) {
    // logger.error(err);
    return {
      status: 500,
      body: {
        error: `A server error occurred ${err}`,
      },
    }
  }
}
