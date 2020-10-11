import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSelector } from 'reselect'
import { clearId, clearPin, getId, getPin } from 'utils/localStorage'
import { isTruthy } from 'utils/common'
import { fetchPlaceById } from 'modules/actions/places'
import { placeByIdErrorSelector } from 'modules/selectors/places'
import { createGetPlaceByIdBody } from 'utils/api'
import { setLogged } from 'modules/actions/app'

const getPlaceByIdError = createSelector(
  placeByIdErrorSelector,
  ({ code }) => ({ code })
)

function useAuth() {
  const dispatch = useDispatch()
  const { code } = useSelector(getPlaceByIdError)
  const { push } = useHistory()

  useEffect(() => {
    const id = getId()
    const placePin = getPin()

    if (isTruthy(id, placePin)) {
      dispatch(fetchPlaceById(createGetPlaceByIdBody({ id, placePin })))
    }
  }, [dispatch])

  useEffect(() => {
    if (code) {
      clearId()
      clearPin()
      dispatch(setLogged(false))
      push('/places/login')
    }
  }, [code, push, dispatch])
}

export default useAuth
