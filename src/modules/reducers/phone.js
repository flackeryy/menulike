import { SET_PHONE_VALUES } from 'modules/actions/phone'
import { assign } from 'utils/common'

const initialState = {
  dialCode: '',
  countryCode: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PHONE_VALUES:
      return assign(state, action.values)
    default:
      return state
  }
}
