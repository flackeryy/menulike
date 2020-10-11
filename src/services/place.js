import api from './api'
import { concat } from 'utils/common'
import { parseError } from 'utils/errors'
import { getId, getPin } from 'utils/localStorage'

export async function updatePlaceService(data) {
  try {
    const response = await api({
      method: 'PUT',
      url: concat('/places/', getId()),
      headers: {
        placePin: getPin()
      },
      data
    })

    return response.data
  } catch (e) {
    throw parseError(e)
  }
}

export async function postPlaceQREmail() {
  try {
    const { data } = await api({
      method: 'POST',
      url: concat('/places/', getId(), '/qr/sendmail'),
      headers: {
        placePin: getPin()
      }
    })

    return data
  } catch (e) {
    throw parseError(e)
  }
}
