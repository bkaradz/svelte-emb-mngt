import logger from '$lib/utility/logger'
import { omit } from 'lodash'
import type { ContactsDocument } from '../models/contacts.model'

export interface paginationNavInterface {
  page: number
  limit: number
}

export interface metaDataInterface {
  error: boolean
  totalRecords: number
  totalPages: number
  previous: paginationNavInterface
  current: paginationNavInterface
  next: paginationNavInterface
}

export interface aggregateQueryInterface {
  metaData: Array<metaDataInterface>
  results: Omit<ContactsDocument, 'createdAt' | 'updatedAt' | 'password'>[]
}

const aggregateQuery = async (searchQuery, model, aggregateFilter) => {
  try {
    let { limit = 15, page = 1 } = searchQuery

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

    const results: aggregateQueryInterface = await model.aggregate(aggregateFilter).exec()

    let metaData: Partial<metaDataInterface> = {
      totalRecords: 0,
      error: false,
      next: null,
      totalPages: 0,
    }

    if (!results[0].metaData[0]) {
      results[0].metaData.push({ totalRecords: 0, limit: 15, previous: null, current, next: null })
      metaData = results[0].metaData[0]
    } else {
      metaData = results[0].metaData[0]
    }

    if (endIndex < metaData.totalRecords) {
      next = {
        page: page + 1,
        limit,
      }
    }

    const totalPages = Math.ceil(metaData.totalRecords / limit)

    metaData.error = false
    metaData.next = next
    metaData.totalPages = totalPages

    return results[0]
  } catch (err) {
    logger.error(err)
    // return { metaData: [{ error: true }], message: err.message }
    throw new Error(err.message)
  }
}

export default aggregateQuery
