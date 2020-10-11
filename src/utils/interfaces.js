import {
  ADDRESS,
  CITY,
  COUNTRY,
  CURRENCY,
  DESCRIPTION,
  EMAIL,
  ID,
  PHONE_CODE,
  PHONE_NUMBER,
  PLACE_NAME,
  PLACE_PIN
} from 'constants/forms'

export function createPostPlacesInterface() {
  return [
    PLACE_NAME,
    EMAIL,
    CITY,
    COUNTRY,
    ADDRESS,
    PHONE_CODE,
    PLACE_PIN,
    PHONE_NUMBER,
    CURRENCY,
    DESCRIPTION
  ]
}

export function createGetPlaceByEmailInterface() {
  return [EMAIL, PLACE_PIN]
}

export function createGetPlaceByIdInterface() {
  return [ID, PLACE_PIN]
}

export function createPostReplacePlaceByEmailInterface() {
  return [EMAIL]
}

export function createPutPlacesInterface() {
  return [
    PLACE_NAME,
    EMAIL,
    COUNTRY,
    CITY,
    ADDRESS,
    PHONE_CODE,
    PHONE_NUMBER,
    CURRENCY,
    DESCRIPTION
  ]
}
