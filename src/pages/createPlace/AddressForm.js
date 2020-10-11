import React, { useCallback, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { createSelector } from 'reselect'
import Form from './Form'
import { createControlNames } from 'utils/forms'
import { createPostPlacesBody } from 'utils/api'
import { assign, isFalsy, pickKeys } from 'utils/common'
import {
  fetchCreatePlace,
  setCreatePlaceFormValues
} from 'modules/actions/places'
import {
  createPlaceErrorSelector,
  createPlaceFormValuesSelector,
  createPlaceSelector
} from 'modules/selectors/places'
import { phoneSelector } from 'modules/selectors/phone'
import {
  ADDRESS,
  CITY,
  DESCRIPTION,
  PHONE_CODE,
  PLACE_NAME
} from 'constants/forms'

const controlNames = createControlNames(PLACE_NAME, CITY, ADDRESS, DESCRIPTION)

const getCreatePlace = createSelector(
  createPlaceSelector,
  ({ allowedAddressForm, isFetching, isSuccess, error }) => ({
    allowedAddressForm,
    isFetching,
    isSuccess,
    error
  })
)

const getFormValues = createSelector(
  createPlaceFormValuesSelector,
  ({ name, city, address, description }) => ({
    name,
    city,
    address,
    description
  })
)

const getGeneralFormValues = createSelector(
  createPlaceFormValuesSelector,
  ({ email, phone_number, country, currency }) => ({
    email,
    phone_number,
    country,
    currency
  })
)

const getErrors = createSelector(createPlaceErrorSelector, ({ errors }) => ({
  errors
}))

const getPhone = createSelector(phoneSelector, ({ dialCode }) => ({
  dialCode
}))

function AddressForm() {
  const { t } = useTranslation(['create_place_page', 'buttons'])
  const dispatch = useDispatch()
  const { allowedAddressForm, isFetching } = useSelector(getCreatePlace)
  const { dialCode } = useSelector(getPhone)
  const { errors } = useSelector(getErrors)
  const formValues = useSelector(getFormValues)
  const generalFormValues = useSelector(getGeneralFormValues)

  const handleSubmit = useCallback(
    (values) => {
      const other = { [PHONE_CODE]: dialCode }
      dispatch(setCreatePlaceFormValues(values))
      dispatch(
        fetchCreatePlace(
          createPostPlacesBody(assign(values, generalFormValues, other))
        )
      )
    },
    [dispatch, generalFormValues, dialCode]
  )

  const addressErrors = useMemo(() => {
    return pickKeys(errors, PLACE_NAME, CITY, ADDRESS, DESCRIPTION)
  }, [errors])

  if (isFalsy(allowedAddressForm)) {
    return <Redirect to="/places/create/general" />
  }

  return (
    <Form
      title={t('create_place_page:address_heading')}
      subTitle={t('create_place_page:address_sub_heading')}
      buttonText={t('buttons:create_restaurant')}
      controlNames={controlNames}
      onSubmit={handleSubmit}
      isFetching={isFetching}
      storedValues={formValues}
      serverErrors={addressErrors}
    />
  )
}

export default AddressForm
