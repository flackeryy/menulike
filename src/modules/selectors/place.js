export function placeDataSelector({ place }) {
  return place.data
}

export function updatePlaceSelector({ place }) {
  return place.updatePlace
}

export function updatePlaceErrorSelector({ place }) {
  return place.updatePlace.error
}

export function placeSendQRSelector({ place }) {
  return place.placeQr
}

export function placeSendQrErrorSelector({ place }) {
  return place.placeQr.error
}
