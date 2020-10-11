import {
  FETCH_PLACE_BY_EMAIL,
  PLACE_BY_EMAIL_SUCCESS,
  PLACE_BY_EMAIL_FAILURE,
  FETCH_PLACE_RECOVERY_BY_EMAIL,
  PLACE_RECOVERY_BY_EMAIL_SUCCESS,
  PLACE_RECOVERY_BY_EMAIL_FAILURE,
  CLEAR_PLACE_BY_EMAIL,
  CLEAR_PLACE_RECOVERY_BY_EMAIL,
  SET_CREATE_PLACE_FORM_VALUES,
  FETCH_CREATE_PLACE,
  CREATE_PLACE_FAILURE,
  CREATE_PLACE_SUCCESS,
  CLEAR_CREATE_PLACE,
  SET_ALLOWED_ADDRESS_FORM,
  SET_RECOVERY_FORM_VALUES,
  FETCH_PLACE_BY_ID,
  PLACE_BY_ID_SUCCESS,
  PLACE_BY_ID_FAILURE,
  CLEAR_PLACE_BY_ID
} from '../actions/places'
import { assign } from 'utils/common'
import {
  ADDRESS,
  CITY,
  COUNTRY,
  CURRENCY,
  DESCRIPTION,
  EMAIL,
  PHONE_NUMBER,
  PLACE_NAME
} from 'constants/forms'

const initialState = {
  createPlace: {
    formValues: {
      [EMAIL]: '',
      [PHONE_NUMBER]: '',
      [COUNTRY]: '',
      [CURRENCY]: '',
      [PLACE_NAME]: '',
      [CITY]: '',
      [ADDRESS]: '',
      [DESCRIPTION]: ''
    },
    allowedAddressForm: false,
    isFetching: false,
    isSuccess: false,
    error: {
      errors: {},
      message: '',
      code: null
    }
  },
  placeByEmail: {
    isFetching: false,
    isSuccess: false,
    error: {
      errors: {},
      message: '',
      code: null
    }
  },
  placeRecoveryByEmail: {
    formValues: {
      [EMAIL]: ''
    },
    isFetching: false,
    isSuccess: false,
    error: {
      errors: {},
      message: '',
      code: null
    }
  },
  placeById: {
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
    case SET_CREATE_PLACE_FORM_VALUES:
      return assign(state, {
        createPlace: assign(state.createPlace, {
          formValues: assign(state.createPlace.formValues, action.formValues)
        })
      })
    case SET_ALLOWED_ADDRESS_FORM:
      return assign(state, {
        createPlace: assign(state.createPlace, {
          allowedAddressForm: action.value
        })
      })
    case FETCH_CREATE_PLACE:
      return assign(state, {
        createPlace: assign(state.createPlace, {
          isFetching: true,
          isSuccess: false,
          error: {
            errors: {},
            message: '',
            code: null
          }
        })
      })
    case CREATE_PLACE_SUCCESS:
      return assign(state, {
        createPlace: assign(state.createPlace, {
          isFetching: false,
          isSuccess: true
        })
      })
    case CREATE_PLACE_FAILURE:
      return assign(state, {
        createPlace: assign(state.createPlace, {
          isFetching: false,
          error: action.error
        })
      })
    case CLEAR_CREATE_PLACE:
      return assign(state, {
        createPlace: initialState.createPlace
      })
    case FETCH_PLACE_BY_EMAIL:
      return assign(state, {
        placeByEmail: assign(state.placeByEmail, {
          isFetching: true
        })
      })
    case PLACE_BY_EMAIL_SUCCESS:
      return assign(state, {
        placeByEmail: assign(state.placeByEmail, {
          isFetching: false,
          isSuccess: true
        })
      })
    case PLACE_BY_EMAIL_FAILURE:
      return assign(state, {
        placeByEmail: assign(state.placeByEmail, {
          isFetching: false,
          error: action.error
        })
      })
    case CLEAR_PLACE_BY_EMAIL:
      return assign(state, {
        placeByEmail: initialState.placeByEmail
      })
    case SET_RECOVERY_FORM_VALUES:
      return assign(state, {
        placeRecoveryByEmail: assign(state.placeRecoveryByEmail, {
          formValues: assign(
            state.placeRecoveryByEmail.formValues,
            action.formValues
          )
        })
      })
    case FETCH_PLACE_RECOVERY_BY_EMAIL:
      return assign(state, {
        placeRecoveryByEmail: assign(state.placeRecoveryByEmail, {
          isFetching: true
        })
      })
    case PLACE_RECOVERY_BY_EMAIL_SUCCESS:
      return assign(state, {
        placeRecoveryByEmail: assign(state.placeRecoveryByEmail, {
          isFetching: false,
          isSuccess: true
        })
      })
    case PLACE_RECOVERY_BY_EMAIL_FAILURE:
      return assign(state, {
        placeRecoveryByEmail: assign(state.placeRecoveryByEmail, {
          isFetching: false,
          error: action.error
        })
      })
    case CLEAR_PLACE_RECOVERY_BY_EMAIL:
      return assign(state, {
        placeRecoveryByEmail: initialState.placeRecoveryByEmail
      })
    case FETCH_PLACE_BY_ID:
      return assign(state, {
        placeById: assign(initialState.placeById, {
          isFetching: true
        })
      })
    case PLACE_BY_ID_SUCCESS:
      return assign(state, {
        placeById: assign(state.placeById, {
          isFetching: false,
          isSuccess: true
        })
      })
    case PLACE_BY_ID_FAILURE:
      return assign(state, {
        placeById: assign(state.placeById, {
          isFetching: false,
          error: action.error
        })
      })
    case CLEAR_PLACE_BY_ID:
      return assign(state, {
        placeById: initialState.placeById
      })
    default:
      return state
  }
}
