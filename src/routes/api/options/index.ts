/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async ({ request }): Promise<{ body: returnType }> => {
  try {
    const res: returnType = await something

    if (res) {
      return {
        body: {
          res,
        },
      }
    }
  } catch (err) {}
}
