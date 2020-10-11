import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { useFormik } from 'formik'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Heading from 'components/typographies/Heading'
import SubHeading from 'components/typographies/SubHeading'
import ButtonPrimary from 'components/buttons/ButtonPrimary'
import FormControlsBuilder from 'components/builders/FormControlsBuilder'
import CircularProgressWrapper from 'components/progresses/CircularProgressWrapper'
import { phoneSelector } from 'modules/selectors/phone'
import { createPlaceSelector } from 'modules/selectors/places'
import { assign, isFalsy, isTruthy } from 'utils/common'
import { buildForm, errorsToTouched } from 'utils/forms'
import { COUNTRY, CURRENCY } from 'constants/forms'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  controlContainer: {
    marginBottom: 32
  }
})

const getPhone = createSelector(phoneSelector, ({ countryCode }) => ({
  countryCode
}))

const getAllowedAddressForm = createSelector(
  createPlaceSelector,
  ({ allowedAddressForm }) => ({ allowedAddressForm })
)

function Form({
  title,
  subTitle,
  buttonText,
  controlNames,
  options,
  onSubmit,
  isFetching,
  storedValues,
  serverErrors
}) {
  const classes = useStyles()
  const { countryCode } = useSelector(getPhone)
  const { allowedAddressForm } = useSelector(getAllowedAddressForm)

  const {
    controls,
    initialValues,
    validationSchema,
    validateOnMount
  } = useMemo(() => {
    return buildForm(controlNames, options)
  }, [controlNames, options])

  const {
    values,
    errors,
    touched,
    handleChange,
    submitForm,
    handleBlur,
    isValid,
    setFieldValue,
    setTouched
  } = useFormik({
    initialValues: assign(initialValues, storedValues),
    validationSchema,
    onSubmit,
    validateOnMount
  })

  useEffect(() => {
    if (isFalsy(allowedAddressForm)) {
      setFieldValue(COUNTRY, countryCode)
      setFieldValue(CURRENCY, countryCode)
    }
  }, [countryCode, setFieldValue, allowedAddressForm])

  useEffect(() => {
    if (isFalsy(allowedAddressForm)) {
      setFieldValue(CURRENCY, values.country)
    }
  }, [values.country, setFieldValue, allowedAddressForm])

  useEffect(() => {
    setTouched(errorsToTouched(serverErrors), false)
  }, [serverErrors, setTouched])

  return (
    <Grid container direction="column" alignItems="center">
      <Heading>{title}</Heading>
      <SubHeading>{subTitle}</SubHeading>
      <form className={classes.form}>
        <FormControlsBuilder
          groupName="create-place"
          controls={controls}
          values={values}
          errors={assign(serverErrors, errors)}
          touched={touched}
          onChange={handleChange}
          onBlur={handleBlur}
          formControlInputProps={{
            containerClassName: classes.controlContainer
          }}
        />
        <ButtonPrimary onClick={submitForm} disabled={isFalsy(isValid)}>
          <CircularProgressWrapper isLoading={isTruthy(isFetching)}>
            {buttonText}
          </CircularProgressWrapper>
        </ButtonPrimary>
      </form>
    </Grid>
  )
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  controlNames: PropTypes.array.isRequired,
  options: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  storedValues: PropTypes.object,
  serverErrors: PropTypes.object
}

Form.defaultProps = {
  controlNames: [],
  options: {},
  onSubmit: (f) => f,
  storedValues: {},
  serverErrors: {}
}

export default Form
