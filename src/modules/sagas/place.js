import { all, put, call, takeEvery } from 'redux-saga/effects'
import {
  FETCH_UPDATE_PLACE,
  setPlaceData,
  updatePlaceFailure,
  updatePlaceSuccess,
  placeSendQrSuccess,
  placeSendQrFailure,
  FETCH_PLACE_SEND_QR
} from '../actions/place'
import { updatePlaceService, postPlaceQREmail } from 'services/place'

function* placeWatcher() {
  yield all([
    takeEvery(FETCH_UPDATE_PLACE, updatePlaceWorker),
    takeEvery(FETCH_PLACE_SEND_QR, getPlaceQRWorker)
  ])
}

function* updatePlaceWorker({ data }) {
  try {
    const { data: responseData } = yield call(updatePlaceService, data)
    yield put(updatePlaceSuccess())
    yield put(setPlaceData(responseData))
  } catch (e) {
    yield put(updatePlaceFailure(e))
  }
}

function* getPlaceQRWorker() {
  try {
    yield call(postPlaceQREmail)
    yield put(placeSendQrSuccess())
  } catch (e) {
    yield put(placeSendQrFailure(e))
  }
}

export default placeWatcher
