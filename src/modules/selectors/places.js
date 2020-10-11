export function placeByEmailSelector({ places }) {
  return places.placeByEmail
}

export function placeByEmailErrorSelector({ places }) {
  return places.placeByEmail.error
}

export function recoveryPlaceByEmailSelector({ places }) {
  return places.placeRecoveryByEmail
}

export function recoveryPlaceErrorSelector({ places }) {
  return places.placeRecoveryByEmail.error
}

export function createPlaceSelector({ places }) {
  return places.createPlace
}

export function createPlaceFormValuesSelector({ places }) {
  return places.createPlace.formValues
}

export function createPlaceErrorSelector({ places }) {
  return places.createPlace.error
}

export function placeByIdSelector({ places }) {
  return places.placeById
}

export function placeByIdErrorSelector({ places }) {
  return places.placeById.error
}
