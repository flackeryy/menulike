import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { createSelector } from 'reselect'
import Form from './Form'
import { createControlNames, createOption, createOptions } from 'utils/forms'
import { COUNTRY, CURRENCY, EMAIL, PHONE_NUMBER } from 'constants/forms'
import {
  setAllowedAddressForm,
  setCreatePlaceFormValues
} from 'modules/actions/places'
import {
  createPlaceErrorSelector,
  createPlaceFormValuesSelector,
  createPlaceSelector
} from 'modules/selectors/places'
import {
  getCountriesOptions__DEPRECATED,
  getCurrencyOptions__DEPRECATED
} from 'utils/countries'
import { pickKeys } from '../../utils/common'

const controlNames = createControlNames(EMAIL, PHONE_NUMBER, COUNTRY, CURRENCY)
const options = createOptions(
  createOption(COUNTRY, getCountriesOptions__DEPRECATED()),
  createOption(CURRENCY, getCurrencyOptions__DEPRECATED())
)

const getAllowedAddressForm = createSelector(
  createPlaceSelector,
  ({ allowedAddressForm }) => ({ allowedAddressForm })
)

const getFormValues = createSelector(
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

function GeneralForm() {
  const { t } = useTranslation(['create_place_page', 'buttons'])
  const dispatch = useDispatch()
  const { allowedAddressForm } = useSelector(getAllowedAddressForm)
  const { errors } = useSelector(getErrors)
  const formValues = useSelector(getFormValues)

  const handleSubmit = useCallback(
    (values) => {
      dispatch(setCreatePlaceFormValues(values))
      dispatch(setAllowedAddressForm(true))
    },
    [dispatch]
  )

  const generalErrors = useMemo(() => {
    return pickKeys(errors, EMAIL, PHONE_NUMBER, COUNTRY, CURRENCY)
  }, [errors])

  if (allowedAddressForm) {
    return <Redirect to="/places/create/address" />
  }

  return (
    <Form
      title={t('create_place_page:general_heading')}
      subTitle={t('create_place_page:general_sub_heading')}
      buttonText={t('buttons:continue')}
      controlNames={controlNames}
      options={options}
      onSubmit={handleSubmit}
      storedValues={formValues}
      serverErrors={generalErrors}
    />
  )
}

export default GeneralForm
