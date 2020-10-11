import {
  createPostPlacesInterface,
  createGetPlaceByEmailInterface,
  createPostReplacePlaceByEmailInterface,
  createGetPlaceByIdInterface,
  createPutPlacesInterface
} from './interfaces'
import { pickByTruth, reduce, toUpper } from './common'
import { getCurrencyByISO } from './countries'
import { COUNTRY, CURRENCY, PHONE_CODE, PHONE_NUMBER } from 'constants/forms'
import { cutDialCode } from './phone'

export function createPostPlacesBody(values) {
  return pickByTruth(
    reduce(
      createPostPlacesInterface(),
      (acc, cur) => {
        switch (cur) {
          case COUNTRY:
            return { ...acc, [cur]: toUpper(values[cur]) }
          case CURRENCY:
            return { ...acc, [cur]: getCurrencyByISO(values[cur]) }
          case PHONE_NUMBER:
            return {
              ...acc,
              [cur]: cutDialCode(values[cur], values[PHONE_CODE])
            }
          default:
            return { ...acc, [cur]: values[cur] }
        }
      },
      {}
    )
  )
}

export function createGetPlaceByEmailBody(values) {
  return pickByTruth(
    reduce(
      createGetPlaceByEmailInterface(),
      (acc, cur) => {
        return { ...acc, [cur]: values[cur] }
      },
      {}
    )
  )
}

export function createGetPlaceByIdBody(values) {
  return pickByTruth(
    reduce(
      createGetPlaceByIdInterface(),
      (acc, cur) => {
        return { ...acc, [cur]: values[cur] }
      },
      {}
    )
  )
}

export function createPostReplacePlaceByEmailBody(values) {
  return pickByTruth(
    reduce(
      createPostReplacePlaceByEmailInterface(),
      (acc, cur) => {
        return { ...acc, [cur]: values[cur] }
      },
      {}
    )
  )
}

export function createPutPlacesBody(values) {
  return pickByTruth(
    reduce(
      createPutPlacesInterface(),
      (acc, cur) => {
        return { ...acc, [cur]: values[cur] }
      },
      {}
    )
  )
}
