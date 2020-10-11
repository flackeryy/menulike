import { concat } from 'utils/common'

// Module name
const MODULE_NAME = 'PHONE/'

// Action types
export const SET_PHONE_VALUES = concat(MODULE_NAME, 'SET_PHONE_VALUES')

// Action creators
export function setPhoneValues(values) {
  return {
    type: SET_PHONE_VALUES,
    values
  }
}
