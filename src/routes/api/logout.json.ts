import type { RequestHandler } from '@sveltejs/kit'
import * as cookie from 'cookie'
import type { FilterQuery } from 'mongoose'
import SessionsModel from '$lib/models/sessions.model'
import type { SessionsDocument } from '$lib/models/sessions.model'
import { deleteSessionCookies, deleteSessions } from '$lib/services/session.services'

export const get: RequestHandler = async ({ request, locals }) => {
  console.error('Second Come Hear')

  const sessionId = locals.user.session

  deleteSessions(sessionId)

  locals.user = {}

  const headers = deleteSessionCookies()
  console.log('🚀 ~ file: logout.json.ts ~ line 16 ~ constget:RequestHandler= ~ headers', headers)

  return {
    status: 200,
    headers,
  }
}
