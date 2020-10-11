export const SET_PLACE_DATA = 'PLACE/SET_PLACE_DATA'
export const FETCH_PLACE_SEND_QR = 'PLACE/FETCH_PLACE_SEND_QR'
export const PLACE_SEND_QR_SUCCESS = 'PLACE/PLACE_SEND_QR_SUCCESS'
export const PLACE_SEND_QR_FAILURE = 'PLACE/PLACE_QR_FAILURE'
export const CLEAR_SEND_QR = 'PLACE/CLEAR_SEND_QR'
export const FETCH_UPDATE_PLACE = 'PLACE/FETCH_UPDATE_PLACE'
export const UPDATE_PLACE_SUCCESS = 'PLACE/UPDATE_PLACE_SUCCESS'
export const UPDATE_PLACE_FAILURE = 'PLACE/UPDATE_PLACE_FAILURE'
export const CLEAR_UPDATE_PLACE = 'PLACE/CLEAR_UPDATE_PLACE'

export function setPlaceData(data) {
  return {
    type: SET_PLACE_DATA,
    data
  }
}

export function fetchPlaceSendQr(data) {
  return {
    type: FETCH_PLACE_SEND_QR,
    data
  }
}

export function placeSendQrSuccess(data) {
  return {
    type: PLACE_SEND_QR_SUCCESS,
    data
  }
}

export function placeSendQrFailure(error) {
  return {
    type: PLACE_SEND_QR_FAILURE,
    error
  }
}

export function clearSendQr() {
  return {
    type: CLEAR_SEND_QR
  }
}

export function fetchUpdatePlace(data) {
  return {
    type: FETCH_UPDATE_PLACE,
    data
  }
}

export function updatePlaceSuccess() {
  return {
    type: UPDATE_PLACE_SUCCESS
  }
}

export function updatePlaceFailure(error) {
  return {
    type: UPDATE_PLACE_FAILURE,
    error
  }
}

export function clearUpdatePlace() {
  return {
    type: CLEAR_UPDATE_PLACE
  }
}
