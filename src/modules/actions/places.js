export const SET_CREATE_PLACE_FORM_VALUES =
  'PLACES/SET_CREATE_PLACE_FORM_VALUES'
export const SET_ALLOWED_ADDRESS_FORM = 'PLACES/SET_ALLOWED_ADDRESS_FORM'
export const FETCH_CREATE_PLACE = 'PLACES/FETCH_CREATE_PLACE'
export const CREATE_PLACE_SUCCESS = 'PLACES/CREATE_PLACE_SUCCESS'
export const CREATE_PLACE_FAILURE = 'PLACES/CREATE_PLACE_FAILURE'
export const CLEAR_CREATE_PLACE = 'PLACES/CLEAR_CREATE_PLACE'
export const FETCH_PLACE_BY_EMAIL = 'PLACES/FETCH_PLACE_BY_EMAIL'
export const PLACE_BY_EMAIL_SUCCESS = 'PLACES/PLACE_BY_EMAIL_SUCCESS'
export const PLACE_BY_EMAIL_FAILURE = 'PLACES/PLACE_BY_EMAIL_FAILURE'
export const SET_RECOVERY_FORM_VALUES = 'PLACES/SET_RECOVERY_FORM_VALUES'
export const FETCH_PLACE_RECOVERY_BY_EMAIL =
  'PLACES/FETCH_PLACE_RECOVERY_BY_EMAIL'
export const PLACE_RECOVERY_BY_EMAIL_SUCCESS =
  'PLACES/PLACE_RECOVERY_BY_EMAIL_SUCCESS'
export const PLACE_RECOVERY_BY_EMAIL_FAILURE =
  'PLACES/PLACE_RECOVERY_BY_EMAIL_FAILURE'
export const CLEAR_PLACE_BY_EMAIL = 'PLACES/CLEAR_PLACE_BY_EMAIL'
export const CLEAR_PLACE_RECOVERY_BY_EMAIL =
  'PLACES/CLEAR_PLACE_RECOVERY_BY_EMAIL'
export const FETCH_PLACE_BY_ID = 'PLACES/FETCH_PLACE_BY_ID'
export const PLACE_BY_ID_SUCCESS = 'PLACES/PLACE_BY_ID_SUCCESS'
export const PLACE_BY_ID_FAILURE = 'PLACES/PLACE_BY_ID_FAILURE'
export const CLEAR_PLACE_BY_ID = 'PLACES/CLEAR_PLACE_BY_ID'

export function setCreatePlaceFormValues(formValues) {
  return {
    type: SET_CREATE_PLACE_FORM_VALUES,
    formValues
  }
}

export function setAllowedAddressForm(value) {
  return {
    type: SET_ALLOWED_ADDRESS_FORM,
    value
  }
}

export function fetchCreatePlace(data) {
  return {
    type: FETCH_CREATE_PLACE,
    data
  }
}

export function createPlaceSuccess() {
  return {
    type: CREATE_PLACE_SUCCESS
  }
}

export function createPlaceFailure(error) {
  return {
    type: CREATE_PLACE_FAILURE,
    error
  }
}

export function clearCreatePlace() {
  return {
    type: CLEAR_CREATE_PLACE
  }
}

export function fetchPlaceByEmail(data) {
  return {
    type: FETCH_PLACE_BY_EMAIL,
    data
  }
}

export function placeByEmailSuccess(data) {
  return {
    type: PLACE_BY_EMAIL_SUCCESS,
    data
  }
}

export function placeByEmailFailure(error) {
  return {
    type: PLACE_BY_EMAIL_FAILURE,
    error
  }
}

export function setRecoveryFormValues(formValues) {
  return {
    type: SET_RECOVERY_FORM_VALUES,
    formValues
  }
}

export function fetchPlaceRecoveryByEmail(data) {
  return {
    type: FETCH_PLACE_RECOVERY_BY_EMAIL,
    data
  }
}
export function recoveryPlaceByEmailSuccess(data) {
  return {
    type: PLACE_RECOVERY_BY_EMAIL_SUCCESS,
    data
  }
}

export function recoveryPlaceByEmailFailure(error) {
  return {
    type: PLACE_RECOVERY_BY_EMAIL_FAILURE,
    error
  }
}

export function clearPlaceRecoveryByEmail() {
  return {
    type: CLEAR_PLACE_RECOVERY_BY_EMAIL
  }
}

export function clearPlaceByEmail() {
  return {
    type: CLEAR_PLACE_BY_EMAIL
  }
}

export function clearPlaceById() {
  return {
    type: CLEAR_PLACE_BY_ID
  }
}

export function fetchPlaceById(data) {
  return {
    type: FETCH_PLACE_BY_ID,
    data
  }
}

export function placeByIdSuccess() {
  return {
    type: PLACE_BY_ID_SUCCESS
  }
}

export function placeByIdFailure(error) {
  return {
    type: PLACE_BY_ID_FAILURE,
    error
  }
}
