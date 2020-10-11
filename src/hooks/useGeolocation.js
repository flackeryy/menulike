import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchGeolocation } from 'modules/actions/app'

function useGeolocation() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGeolocation())
  }, [dispatch])
}

export default useGeolocation
