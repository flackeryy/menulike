import api from './api'
import { parseError } from 'utils/errors'
import { concat } from 'utils/common'

export async function createPlaceService(data) {
  try {
    const response = await api({
      method: 'POST',
      url: '/places',
      data
    })

    return response.data
  } catch (e) {
    throw parseError(e)
  }
}

export async function getPlaceByEmailServices({ email, placePin }) {
  try {
    const { data } = await api({
      method: 'GET',
      url: concat('/places/by-email?email=', encodeURIComponent(email)),
      headers: {
        placePin
      }
    })

    return data
  } catch (e) {
    throw parseError(e)
  }
}

export async function recoveryPlaceByEmailService(data) {
  try {
    const response = await api({
      method: 'POST',
      url: '/places/by-email/recovery',
      data
    })

    return response.data
  } catch (e) {
    throw parseError(e)
  }
}

export async function getPlaceById({ id, placePin }) {
  try {
    const { data } = await api({
      method: 'GET',
      url: concat('/places/', id),
      headers: {
        placePin
      }
    })

    return data
  } catch (e) {
    throw parseError(e)
  }
}
