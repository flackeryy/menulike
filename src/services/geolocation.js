import api from './api'
import { parseError } from 'utils/errors'

export async function getGeolocation() {
  try {
    const { data } = await api({
      url: '/geo-ip'
    })

    return data
  } catch (e) {
    throw parseError(e)
  }
}
