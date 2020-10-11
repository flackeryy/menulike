import {
  CLEAR_UPDATE_PLACE,
  FETCH_UPDATE_PLACE,
  SET_PLACE_DATA,
  UPDATE_PLACE_FAILURE,
  UPDATE_PLACE_SUCCESS,
  FETCH_PLACE_SEND_QR,
  PLACE_SEND_QR_SUCCESS,
  PLACE_SEND_QR_FAILURE,
  CLEAR_SEND_QR
} from '../actions/place'
import { assign } from 'utils/common'
import {
  ADDRESS,
  CITY,
  COUNTRY,
  CURRENCY,
  DESCRIPTION,
  EMAIL,
  ID,
  MENU_ITEMS,
  PHONE_CODE,
  PHONE_NUMBER,
  PLACE_NAME,
  PUBLIC_ID_URL,
  PUBLIC_URL,
  QR_CODE_URL,
  SLUG
} from 'constants/forms'

const initialState = {
  data: {
    [ID]: '',
    [PLACE_NAME]: '',
    [SLUG]: '',
    [EMAIL]: '',
    [COUNTRY]: '',
    [CITY]: '',
    [ADDRESS]: '',
    [PHONE_CODE]: '',
    [PHONE_NUMBER]: '',
    [CURRENCY]: '',
    [DESCRIPTION]: '',
    [PUBLIC_ID_URL]: '',
    [PUBLIC_URL]: '',
    [QR_CODE_URL]: '',
    [MENU_ITEMS]: []
  },
  updatePlace: {
    isFetching: false,
    isSuccess: false,
    error: {
      errors: {},
      message: '',
      code: null
    }
  },
  placeQr: {
    isFetching: false,
    isSuccess: false,
    error: {
      errors: {},
      message: '',
      code: null
    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLACE_DATA:
      return assign(state, {
        data: assign(state.data, action.data)
      })
    case FETCH_PLACE_SEND_QR:
      return assign(state, {
        placeQr: assign(state.placeQr, {
          isFetching: true,
          isSuccess: false,
          error: {
            errors: {},
            message: '',
            code: null
          }
        })
      })
    case PLACE_SEND_QR_SUCCESS:
      return assign(state, {
        placeQr: assign(state.placeQr, {
          isFetching: false,
          isSuccess: true
        })
      })
    case PLACE_SEND_QR_FAILURE:
      return assign(state, {
        placeQr: assign(state.placeQr, {
          isFetching: false,
          error: action.error
        })
      })
    case CLEAR_SEND_QR:
      return assign(state, {
        placeQr: initialState.placeQr
      })
    case FETCH_UPDATE_PLACE:
      return assign(state, {
        updatePlace: assign(state.updatePlace, {
          isFetching: true
        })
      })
    case UPDATE_PLACE_SUCCESS:
      return assign(state, {
        updatePlace: assign(state.updatePlace, {
          isFetching: false,
          isSuccess: true,
          error: {
            errors: {},
            message: '',
            code: null
          }
        })
      })
    case UPDATE_PLACE_FAILURE:
      return assign(state, {
        updatePlace: assign(state.updatePlace, {
          isFetching: false,
          isSuccess: false,
          error: action.error
        })
      })
    case CLEAR_UPDATE_PLACE:
      return assign(state, {
        updatePlace: initialState.updatePlace
      })
    default:
      return state
  }
}
