import { replace } from './common'

export function cutDialCode(phoneNumber, dialCode) {
  return replace(phoneNumber, dialCode, '')
}

export function createPhoneValues(countryCode, dialCode) {
  return {
    countryCode,
    dialCode
  }
}
