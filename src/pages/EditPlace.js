import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import PlacePageContainer from 'components/containers/PlacePageContainer'
import FormControlMuiInput from 'components/form/FormControlMuiInput'
import FormControlsBuilder from 'components/builders/FormControlsBuilder'
import FormControlMuiSelect from 'components/form/FormControlMuiSelect'
import FormControlMuiTel from 'components/form/FormControlMuiTel'
import Form from 'components/form/Form'
import CircularProgressWrapper from 'components/progresses/CircularProgressWrapper'
import HeaderButton from 'components/containers/placePageContainer/header/HeaderButton'
import Snackbar from 'components/notifications/Snackbar'
import {
  buildForm,
  createControlNames,
  createOption,
  createOptions
} from 'utils/forms'
import {
  placeDataSelector,
  updatePlaceErrorSelector,
  updatePlaceSelector
} from 'modules/selectors/place'
import {
  assign,
  isEmpty,
  isEqual,
  isFalsy,
  isSomeTruthy,
  isTruthy
} from 'utils/common'
import { clearUpdatePlace, fetchUpdatePlace } from 'modules/actions/place'
import { setLogged } from 'modules/actions/app'
import { createPutPlacesBody } from 'utils/api'
import { getCountriesOptions, getCurrencyOptions } from 'utils/countries'
import { clearId, clearPin } from 'utils/localStorage'
import {
  ADDRESS,
  CITY,
  COUNTRY,
  CURRENCY,
  DESCRIPTION,
  EMAIL,
  PHONE_CODE,
  PHONE_NUMBER,
  PLACE_NAME
} from 'constants/forms'

const useStyles = makeStyles(({ shape }) => ({
  root: {
    padding: '35px 24px',
    ...shape.container
  },
  inputContainer: {
    marginBottom: 27
  },
  exitIcon: {
    marginRight: 5
  }
}))

const controlNames = createControlNames(
  PLACE_NAME,
  EMAIL,
  PHONE_NUMBER,
  COUNTRY,
  CITY,
  ADDRESS,
  DESCRIPTION,
  CURRENCY
)
const options = createOptions(
  createOption(COUNTRY, getCountriesOptions()),
  createOption(CURRENCY, getCurrencyOptions())
)
const { controls, initialValues, validationSchema } = buildForm(
  controlNames,
  options
)
const overrides = {
  placeholders: {
    [DESCRIPTION]: 'Describe your cuisine, place etc.',
    [PHONE_NUMBER]: 'e.g. +79996573858'
  }
}

const getPlaceData = createSelector(
  placeDataSelector,
  ({
    name,
    email,
    phone_number,
    country,
    city,
    address,
    currency,
    description
  }) => ({
    name,
    email,
    phone_number,
    country,
    city,
    address,
    currency,
    description
  })
)

const getPlacePhoneCode = createSelector(
  placeDataSelector,
  ({ phone_code }) => ({ phoneCode: phone_code })
)

const getUpdatePlace = createSelector(
  updatePlaceSelector,
  ({ isFetching, isSuccess }) => ({ isFetching, isSuccess })
)

const getUpdatePlaceError = createSelector(
  updatePlaceErrorSelector,
  ({ errors, message }) => ({ serverErrors: errors, errorMessage: message })
)

const updatedInitialValues = {
  ...initialValues,
  [PHONE_CODE]: ''
}

function EditPlace() {
  const { t } = useTranslation(['edit_place_page', 'alerts', 'buttons'])
  const classes = useStyles()
  const dispatch = useDispatch()
  const data = useSelector(getPlaceData)
  const { phoneCode } = useSelector(getPlacePhoneCode)
  const { isFetching, isSuccess } = useSelector(getUpdatePlace)
  const { serverErrors, errorMessage } = useSelector(getUpdatePlaceError)
  const [showSnackbar, setSnackbar] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('')

  const onSubmit = useCallback(
    (values) => {
      dispatch(fetchUpdatePlace(createPutPlacesBody(values)))
    },
    [dispatch]
  )

  useEffect(() => {
    if (isSuccess) {
      setSnackbar(true)
      dispatch(clearUpdatePlace())
    }
  }, [isSuccess, dispatch])

  useEffect(() => {
    if (isTruthy(isEmpty(serverErrors), errorMessage)) {
      setErrorSnackbar(true)
      setErrorSnackbarMessage(errorMessage)
      dispatch(clearUpdatePlace())
    }
  }, [
    setErrorSnackbarMessage,
    setErrorSnackbar,
    dispatch,
    errorMessage,
    serverErrors
  ])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    submitForm,
    setValues,
    isValid
  } = useFormik({
    initialValues: updatedInitialValues,
    validationSchema,
    onSubmit
  })

  useEffect(() => {
    setValues(assign({ ...initialValues, [PHONE_CODE]: phoneCode }, data))
  }, [data, phoneCode, setValues])

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(false)
    setErrorSnackbar(false)
  }, [setSnackbar, setErrorSnackbar])

  const handleLogout = useCallback(() => {
    clearId()
    clearPin()
    dispatch(setLogged(false))
  }, [dispatch])

  const isDirty = useMemo(() => {
    return isEqual(values, { ...data, [PHONE_CODE]: phoneCode })
  }, [values, data, phoneCode])

  const disabled = useMemo(() => {
    return isSomeTruthy(isDirty, isFalsy(isValid))
  }, [isDirty, isValid])

  return (
    <PlacePageContainer
      title={t('edit_place_page:title')}
      headerLeftComponent={
        <HeaderButton onClick={handleLogout} id="edit-place_logout">
          <i className={classNames('icon-Exit', classes.exitIcon)} />
          <Typography>{t('buttons:logout')}</Typography>
        </HeaderButton>
      }
      headerRightComponent={
        <HeaderButton
          onClick={submitForm}
          disabled={disabled}
          id="edit-place_save"
        >
          <CircularProgressWrapper isLoading={isFetching} dark>
            <Typography>{t('buttons:save')}</Typography>
          </CircularProgressWrapper>
        </HeaderButton>
      }
      footerActiveRight
    >
      <Snackbar
        open={showSnackbar}
        message={t('alerts:successfully_updated')}
        variant="success"
        anchorHorizontal="center"
        onClose={handleCloseSnackbar}
      />
      <Snackbar
        open={errorSnackbar}
        message={errorSnackbarMessage}
        variant="error"
        onClose={handleCloseSnackbar}
        autoHideDuration={null}
      />
      <div className={classes.root}>
        <Form>
          <FormControlsBuilder
            groupName="edit-place"
            values={values}
            errors={assign(serverErrors, errors)}
            touched={touched}
            controls={controls}
            inputTextComponent={FormControlMuiInput}
            inputTelComponent={FormControlMuiTel}
            selectComponent={FormControlMuiSelect}
            formControlInputProps={{
              containerClassName: classes.inputContainer
            }}
            overrides={overrides}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form>
      </div>
    </PlacePageContainer>
  )
}

export default EditPlace
