import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Link, useParams } from 'react-router-dom'
import { createSelector } from 'reselect'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import classNames from 'classnames'

import Heading from 'components/typographies/Heading'
import SubHeading from 'components/typographies/SubHeading'
import ButtonPrimary from 'components/buttons/ButtonPrimary'
import PageContainer from 'components/containers/PageContainer'
import FormControlsBuilder from 'components/builders/FormControlsBuilder'
import CircularProgressWrapper from 'components/progresses/CircularProgressWrapper'
import BackButton from 'components/buttons/BackButton'

import { buildForm, createControlNames } from 'utils/forms'
import { assign, isEmpty, isFalsy, isTruthy } from 'utils/common'
import { createGetPlaceByEmailBody, createGetPlaceByIdBody } from 'utils/api'
import { px } from 'utils/styles'
import {
  clearPlaceByEmail,
  clearPlaceById,
  clearPlaceRecoveryByEmail,
  fetchPlaceByEmail,
  fetchPlaceById
} from 'modules/actions/places'
import {
  placeByEmailSelector,
  placeByIdErrorSelector,
  recoveryPlaceByEmailSelector
} from 'modules/selectors/places'
import { placeByEmailErrorSelector } from 'modules/selectors/places'
import { PLACE_PIN, EMAIL } from 'constants/forms'

const useStyles = makeStyles(({ palette, lineHeight }) => ({
  root: {
    padding: '73px 31px 64px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  controlContainer: {
    marginBottom: 32
  },
  buttonPrimary: {
    marginBottom: 16
  },
  linkForgot: {
    fontSize: 14,
    lineHeight: px(lineHeight.primary),
    color: palette.link.primary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  subHeadingError: {
    color: palette.error.main
  },
  subHeadingSuccess: {
    color: palette.success.main
  }
}))

const controlNames = createControlNames(EMAIL, PLACE_PIN)
const {
  controls,
  initialValues,
  validationSchema,
  validateOnMount
} = buildForm(controlNames)

const getPlaceByEmail = createSelector(
  placeByEmailSelector,
  ({ isFetching, isSuccess, response, error }) => ({
    isFetching,
    isSuccess,
    response,
    error
  })
)

const getPlaceByEmailError = createSelector(
  placeByEmailErrorSelector,
  ({ message, errors }) => ({
    placeByEmailErrorMessage: message,
    serverErrors: errors
  })
)

const getRecoveryPlaceByEmail = createSelector(
  recoveryPlaceByEmailSelector,
  ({ isSuccess, formValues }) => ({
    isRecoverySuccess: isSuccess,
    recoveryFormValues: formValues
  })
)

const getPlaceByIdError = createSelector(
  placeByIdErrorSelector,
  ({ message }) => ({ placeByIdErrorMessage: message })
)

function GetPlaceByEmail() {
  const { t } = useTranslation(['login', 'buttons', 'alerts'])
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isFetching } = useSelector(getPlaceByEmail)
  const { placeByEmailErrorMessage, serverErrors } = useSelector(
    getPlaceByEmailError
  )
  const { isRecoverySuccess, recoveryFormValues } = useSelector(
    getRecoveryPlaceByEmail
  )
  const { placeByIdErrorMessage } = useSelector(getPlaceByIdError)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { id, placePin } = useParams()

  useEffect(() => {
    if (isTruthy(id, placePin)) {
      dispatch(fetchPlaceById(createGetPlaceByIdBody({ id, placePin })))
    }
  }, [id, placePin, dispatch])

  useEffect(() => {
    if (isRecoverySuccess) {
      setRecoveryEmail(recoveryFormValues.email)
      dispatch(clearPlaceRecoveryByEmail())
    }
  }, [isRecoverySuccess, recoveryFormValues, dispatch])

  useEffect(() => {
    if (placeByIdErrorMessage) {
      setErrorMessage(placeByIdErrorMessage)
      dispatch(clearPlaceById())
    }
  }, [placeByIdErrorMessage, dispatch, setErrorMessage])

  useEffect(() => {
    if (placeByEmailErrorMessage) {
      setErrorMessage(placeByEmailErrorMessage)
    }
  }, [placeByEmailErrorMessage, setErrorMessage])

  useEffect(() => {
    return () => {
      dispatch(clearPlaceByEmail())
      dispatch(clearPlaceById())
    }
  }, [dispatch])

  const onSubmit = useCallback(
    (values) => {
      dispatch(fetchPlaceByEmail(createGetPlaceByEmailBody(values)))
    },
    [dispatch]
  )

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isValid,
    submitForm
  } = useFormik({
    onSubmit,
    initialValues: assign(initialValues, recoveryFormValues),
    validationSchema,
    validateOnMount
  })

  const subHeadingText = useMemo(() => {
    if (isTruthy(errorMessage, isEmpty(serverErrors))) {
      return errorMessage
    }

    if (recoveryEmail) {
      return t('alerts:pin_recovery_success', { email: recoveryEmail })
    }
    return t('login:sub_heading')
  }, [t, errorMessage, recoveryEmail, serverErrors])

  return (
    <PageContainer>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.root}
      >
        <BackButton to="/places/welcome" />
        <Heading className={classes.heading}>{t('login:heading')}</Heading>
        <SubHeading
          className={classNames(classes.subHeading, {
            [classes.subHeadingError]: isTruthy(
              errorMessage,
              isEmpty(serverErrors)
            ),
            [classes.subHeadingSuccess]: isTruthy(
              isFalsy(errorMessage),
              recoveryEmail
            )
          })}
        >
          {subHeadingText}
        </SubHeading>

        <form className={classes.form}>
          <FormControlsBuilder
            groupName="place-login"
            controls={controls}
            values={values}
            errors={assign(errors, serverErrors)}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
            formControlInputProps={{
              containerClassName: classes.controlContainer
            }}
          />
        </form>

        <Grid container direction="column" alignItems="center">
          <ButtonPrimary
            className={classes.buttonPrimary}
            onClick={submitForm}
            disabled={isFalsy(isValid)}
          >
            <CircularProgressWrapper isLoading={isFetching}>
              {t('buttons:login')}
            </CircularProgressWrapper>
          </ButtonPrimary>
          <Link className={classes.linkForgot} to="/places/recovery">
            <Typography>{t('buttons:forgot_pin')}</Typography>
          </Link>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default GetPlaceByEmail
