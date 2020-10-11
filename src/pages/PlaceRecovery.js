import React, { useCallback, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { createSelector } from 'reselect'
import classNames from 'classnames'

import Heading from 'components/typographies/Heading'
import BackButton from 'components/buttons/BackButton'
import SubHeading from 'components/typographies/SubHeading'
import ButtonPrimary from 'components/buttons/ButtonPrimary'
import PageContainer from 'components/containers/PageContainer'
import FormControlsBuilder from 'components/builders/FormControlsBuilder'
import CircularProgressWrapper from 'components/progresses/CircularProgressWrapper'

import { assign, isFalsy, isSomeTruthy } from 'utils/common'
import { buildForm, createControlNames } from 'utils/forms'
import { createPostReplacePlaceByEmailBody } from 'utils/api'
import { percent } from 'utils/styles'
import { fetchPlaceRecoveryByEmail } from 'modules/actions/places'
import {
  recoveryPlaceByEmailSelector,
  recoveryPlaceErrorSelector
} from 'modules/selectors/places'
import { EMAIL } from 'constants/forms'
import { is429 } from '../utils/errors'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    padding: '73px 31px 64px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: percent(100)
  },
  controlContainer: {
    marginBottom: 25
  },
  subHeadingError: {
    color: palette.error.main
  }
}))

const controlNames = createControlNames(EMAIL)
const {
  controls,
  initialValues,
  validationSchema,
  validateOnMount
} = buildForm(controlNames)

const getRecoveryPlaceByPin = createSelector(
  recoveryPlaceByEmailSelector,
  ({ isFetching, isSuccess, error }) => ({
    isFetching,
    isSuccess,
    error
  })
)

const getRecoveryError = createSelector(
  recoveryPlaceErrorSelector,
  ({ errors, message, code }) => ({
    serverErrors: errors,
    errorMessage: message,
    errorCode: code
  })
)

function PlaceRecovery() {
  const { t } = useTranslation(['place_recovery_page', 'buttons', 'alerts'])
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isFetching, isSuccess } = useSelector(getRecoveryPlaceByPin)
  const { serverErrors, errorMessage, errorCode } = useSelector(
    getRecoveryError
  )

  const onSubmit = useCallback(
    (values) => {
      dispatch(
        fetchPlaceRecoveryByEmail(createPostReplacePlaceByEmailBody(values))
      )
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
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount
  })

  const showError = useMemo(() => is429(errorCode), [errorCode])
  const disabled = useMemo(() => isSomeTruthy(isFalsy(isValid), showError), [
    isValid,
    showError
  ])

  const subHeadingText = useMemo(() => {
    if (showError) {
      return errorMessage
    }
    return t('place_recovery_page:sub_heading')
  }, [errorMessage, showError, t])

  if (isSuccess) {
    return <Redirect to="/places/login" />
  }

  return (
    <PageContainer>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.root}
      >
        <BackButton to="/places/login" />
        <Heading className={classes.heading}>
          {t('place_recovery_page:heading')}
        </Heading>
        <SubHeading
          className={classNames(classes.subHeading, {
            [classes.subHeadingError]: showError
          })}
        >
          {subHeadingText}
        </SubHeading>

        <form className={classes.form}>
          <FormControlsBuilder
            groupName="place-recovery"
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
        <ButtonPrimary onClick={submitForm} disabled={disabled}>
          <CircularProgressWrapper isLoading={isFetching}>
            {t('buttons:resend_pin')}
          </CircularProgressWrapper>
        </ButtonPrimary>
      </Grid>
    </PageContainer>
  )
}

export default PlaceRecovery
