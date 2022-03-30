import { connectDB } from '$lib/database/mongooseDB'
import { setContext } from 'svelte'
import * as cookie from 'cookie'
import { verifyJwt } from '$lib/utility/jwt.utils'
import type { GetSession, Handle } from '@sveltejs/kit'

connectDB()

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')

  const accessToken = cookies.accessToken

  if (!accessToken) {
    return await resolve(event)
  }

  const { decoded, expired } = verifyJwt(accessToken)

  if (decoded && !(event.url.pathname === '/api/logout.json')) {
    event.locals.user = decoded
    event.locals.user.authenticated = true
  } else {
    event.locals.user = {}
    event.locals.user.authenticated = false
  }

  const response = await resolve(event)
  if (event.url.pathname === '/api/logout.json') {
    response.headers.delete('set-cookie')
  }
  return response
}

export const getSession: GetSession = async ({ locals }) => {
  let user = await locals.user
  if (!user) {
    user = { authenticated: false }
  }
  return {
    user,
  }
}
