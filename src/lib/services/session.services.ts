import * as cookie from 'cookie'
import SessionsModel from '$lib/models/sessions.model'
import type { SessionsDocument } from '$lib/models/sessions.model'
import type { FilterQuery } from 'mongoose'
import ContactsModel from '$lib/models/contacts.model'
import type { ContactsDocument } from '$lib/models/contacts.model'
import omit from 'lodash/omit'
import config from 'config'

export const setSessionCookies = (accessToken: string, refreshToken: string) => {
  return {
    'Set-Cookie': [
      cookie.serialize('accessToken', accessToken, {
        maxAge: config.get('cookieAccessTokenTtl'), // 15min
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'lax',
        secure: false,
      }),
      cookie.serialize('refreshToken', refreshToken, {
        maxAge: config.get('cookieRefreshTokenTtl'), // 1year
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'lax',
        secure: false,
      }),
    ],
  }
}

export const deleteSessionCookies = () => {
  return {
    'Set-Cookie': [
      cookie.serialize('accessToken', '', {
        maxAge: -1,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'lax',
        secure: false,
      }),
      cookie.serialize('refreshToken', '', {
        maxAge: -1,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'lax',
        secure: false,
      }),
    ],
  }
}

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionsModel.create({ user: userId, userAgent })
  return session
}

export async function findSessions(query: FilterQuery<SessionsDocument>) {
  return await SessionsModel.find(query).lean()
}

export async function validateSessionPassword({ email, password }: { email: string; password: string }) {
  const user: ContactsDocument = await ContactsModel.findOne({ email })

  if (!user) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return false
  }

  return omit(user.toJSON(), 'password')
}

export async function deleteSessions(query: FilterQuery<SessionsDocument>) {
  return await SessionsModel.findByIdAndDelete(query)
}
