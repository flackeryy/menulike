import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fork } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import app from 'modules/reducers/app'
import phone from 'modules/reducers/phone'
import places from 'modules/reducers/places'
import place from 'modules/reducers/place'

import placesWatcher from 'modules/sagas/places'
import appWatcher from 'modules/sagas/app'
import placeWatcher from 'modules/sagas/place'

const rootReducer = combineReducers({
  app,
  phone,
  places,
  place
})

function* rootSaga() {
  yield fork(placesWatcher)
  yield fork(appWatcher)
  yield fork(placeWatcher)
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
