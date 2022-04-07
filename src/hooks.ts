import { connectDB } from '$lib/database/mongooseDB'
import { setContext } from 'svelte'
import * as cookie from 'cookie'
import { verifyJwt } from '$lib/utility/jwt.utils'
import type { GetSession, Handle } from '@sveltejs/kit'

connectDB()

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')

  const accessToken = cookies.accessToken

  // if (!accessToken) {
  //   return await resolve(event)
  // }

  const { decoded } = verifyJwt(accessToken)
  console.log('🚀 ~ file: hooks.ts ~ line 19 ~ consthandle:Handle= ~ decoded', decoded)

  if (decoded) {
    event.locals.user = decoded
    event.locals.user.authenticated = true
    return await resolve(event)
  }

  event.locals.user = null
  return await resolve(event)
}

export const getSession: GetSession = async ({ locals }) => {
  console.log('🚀 ~ file: hooks.ts ~ line 32 ~ constgetSession:GetSession= ~ locals', locals)

  return locals?.user ? locals : {}
}
