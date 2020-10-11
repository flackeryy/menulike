import { assign, isTruthy } from 'utils/common'
import {
  FETCH_GEOLOCATION,
  GEOLOCATION_FAILURE,
  GEOLOCATION_SUCCESS,
  SET_IS_LOGGED
} from '../actions/app'
import { getId, getPin } from 'utils/localStorage'

const isLogged = isTruthy(getId(), getPin())

const initialState = {
  isLogged,
  geolocation: {
    isFetching: false,
    isSuccess: false,
    error: null,
    data: {
      city: '',
      country: '',
      ip: '',
      postal: ''
    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_IS_LOGGED:
      return assign(state, {
        isLogged: action.value
      })
    case FETCH_GEOLOCATION:
      return assign(state, {
        geolocation: assign(initialState.geolocation, {
          isFetching: true
        })
      })
    case GEOLOCATION_SUCCESS:
      return assign(state, {
        geolocation: assign(state.geolocation, {
          isFetching: false,
          isSuccess: true,
          data: action.data
        })
      })
    case GEOLOCATION_FAILURE:
      return assign(state, {
        geolocation: assign(state.geolocation, {
          isFetching: false,
          error: action.error
        })
      })
    default:
      return state
  }
}
