import { concat } from 'utils/common'

const MODULE_NAME = 'APP/'

export const SET_IS_LOGGED = concat(MODULE_NAME, 'SET_IS_LOGGED')
export const FETCH_GEOLOCATION = concat(MODULE_NAME, 'FETCH_GEOLOCATION')
export const GEOLOCATION_SUCCESS = concat(MODULE_NAME, 'GEOLOCATION_SUCCESS')
export const GEOLOCATION_FAILURE = concat(MODULE_NAME, 'GEOLOCATION_FAILURE')

export function setLogged(value) {
  return {
    type: SET_IS_LOGGED,
    value
  }
}

export function fetchGeolocation() {
  return {
    type: FETCH_GEOLOCATION
  }
}

export function geolocationSuccess(data) {
  return {
    type: GEOLOCATION_SUCCESS,
    data
  }
}

export function geolocationFailure(error) {
  return {
    type: GEOLOCATION_FAILURE,
    error
  }
}
