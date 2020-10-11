import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
  FETCH_GEOLOCATION,
  geolocationFailure,
  geolocationSuccess
} from '../actions/app'
import { setPhoneValues } from '../actions/phone'
import { getGeolocation } from 'services/geolocation'
import {
  parseCreatePlaceFormValues,
  parseGeolocation,
  parsePhoneValues
} from 'utils/geolocation'
import { setCreatePlaceFormValues } from '../actions/places'

export default function* appWatcher() {
  yield all([takeEvery(FETCH_GEOLOCATION, geolocationWorker)])
}

function* geolocationWorker() {
  try {
    const data = yield call(getGeolocation)
    yield put(geolocationSuccess(parseGeolocation(data)))
    yield put(setPhoneValues(parsePhoneValues(data)))
    yield put(setCreatePlaceFormValues(parseCreatePlaceFormValues(data)))
  } catch (e) {
    yield put(geolocationFailure(e))
  }
}
