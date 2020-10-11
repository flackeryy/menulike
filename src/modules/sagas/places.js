import { call, put, all, takeEvery } from 'redux-saga/effects'
import { setLogged } from '../actions/app'
import {
  placeByEmailSuccess,
  placeByEmailFailure,
  recoveryPlaceByEmailSuccess,
  recoveryPlaceByEmailFailure,
  createPlaceSuccess,
  createPlaceFailure,
  FETCH_PLACE_BY_EMAIL,
  FETCH_PLACE_RECOVERY_BY_EMAIL,
  FETCH_CREATE_PLACE,
  setAllowedAddressForm,
  setRecoveryFormValues,
  placeByIdFailure,
  FETCH_PLACE_BY_ID,
  placeByIdSuccess
} from '../actions/places'
import {
  createPlaceService,
  getPlaceByEmailServices,
  getPlaceById,
  recoveryPlaceByEmailService
} from 'services/places'
import { includes, keys } from 'utils/common'
import { COUNTRY, CURRENCY, EMAIL, PHONE_NUMBER } from 'constants/forms'
import { setPlaceData } from '../actions/place'
import { storeId, storePin } from 'utils/localStorage'

function* placesWatcher() {
  yield all([
    takeEvery(FETCH_CREATE_PLACE, createPlaceWorker),
    takeEvery(FETCH_PLACE_BY_EMAIL, getPlaceByEmailWorker),
    takeEvery(FETCH_PLACE_RECOVERY_BY_EMAIL, recoveryPlaceByEmailWorker),
    takeEvery(FETCH_PLACE_BY_ID, getPlaceByIdWorker)
  ])
}

function* createPlaceWorker({ data: requestData }) {
  try {
    const { data } = yield call(createPlaceService, requestData)

    const { id, pin } = data

    yield put(createPlaceSuccess())
    yield put(setLogged(true))
    yield put(setPlaceData(data))
    storeId(id)
    storePin(pin)
  } catch ({ errors, message, code }) {
    if (includes(keys(errors), EMAIL, PHONE_NUMBER, COUNTRY, CURRENCY)) {
      yield put(setAllowedAddressForm(false))
    }
    yield put(createPlaceFailure({ errors, message, code }))
  }
}

function* getPlaceByEmailWorker({ data: requestData }) {
  try {
    const { data } = yield call(getPlaceByEmailServices, requestData)

    const { placePin } = requestData
    const { id } = data

    yield put(placeByEmailSuccess())
    yield put(setLogged(true))
    yield put(setPlaceData(data))
    storeId(id)
    storePin(placePin)
  } catch (e) {
    yield put(placeByEmailFailure(e))
  }
}

function* recoveryPlaceByEmailWorker({ data }) {
  try {
    const response = yield call(recoveryPlaceByEmailService, data)
    yield put(setRecoveryFormValues(data))
    yield put(recoveryPlaceByEmailSuccess(response))
  } catch (e) {
    yield put(recoveryPlaceByEmailFailure(e))
  }
}

function* getPlaceByIdWorker({ data: requestData }) {
  try {
    const { data } = yield call(getPlaceById, requestData)

    const { placePin } = requestData
    const { id } = data

    yield put(placeByIdSuccess())
    yield put(setLogged(true))
    yield put(setPlaceData(data))
    storeId(id)
    storePin(placePin)
  } catch (e) {
    yield put(placeByIdFailure(e))
  }
}

export default placesWatcher
