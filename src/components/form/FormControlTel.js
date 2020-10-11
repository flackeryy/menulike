import React, { useCallback, memo, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-input-2'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ms, transition } from 'utils/styles'
import {
  concat,
  isEqual,
  isFalsy,
  isTruthy,
  toLower,
  toUpper
} from 'utils/common'
import { phoneSelector } from 'modules/selectors/phone'
import { setPhoneValues } from 'modules/actions/phone'
import { simulateEvent } from 'utils/formik'
import { cutDialCode, createPhoneValues } from 'utils/phone'
import 'react-phone-input-2/lib/material.css'

const useStyles = makeStyles(
  ({ palette, transitions, shape, fontFamily, maxWidth }) => ({
    container: {
      maxWidth,
      width: '100%',
      position: 'relative'
    },
    inputContainer: {
      '& .form-control': {
        width: '100%',
        borderColor: palette.formControl.border.primary,
        transition: transition('all', ms(transitions.primary)),
        background: 'transparent',
        paddingLeft: 0,
        fontFamily: fontFamily.primary,
        ...shape.formControl,

        '-webkit-appearance': 'none',

        '&+div::before': {
          content: '""',
          background: palette.background.primary,
          color: '#000 !important'
        },
        '&:focus': {
          borderColor: palette.formControl.border.primary,
          boxShadow: concat(
            '0 0 0 0.2em ',
            palette.formControl.focused.shadow.primary
          )
        }
      },
      '& .flag-dropdown': {
        width: '100%',
        pointerEvents: 'none',
        borderTopLeftRadius: shape.formControl.borderRadius,
        borderBottomLeftRadius: shape.formControl.borderRadius,
        top: 1,
        bottom: 1,
        left: 1,
        '&.open': {
          borderTopLeftRadius: shape.formControl.borderRadius,
          borderBottomLeftRadius: shape.formControl.borderRadius,
          '& .selected-flag': {
            borderTopLeftRadius: shape.formControl.borderRadius,
            borderBottomLeftRadius: shape.formControl.borderRadius
          }
        },
        '& .selected-flag': {
          pointerEvents: 'auto',
          borderTopLeftRadius: shape.formControl.borderRadius,
          borderBottomLeftRadius: shape.formControl.borderRadius
        },
        '& .country-list': {
          width: '100%',
          pointerEvents: 'auto',
          padding: '5px 0',
          boxShadow: '0 0 0 1px hsla(0,0%,0%,0.1), 0 4px 11px hsla(0,0%,0%,0.1)'
        },
        '& .country': {
          height: 35,
          display: 'flex',
          alignItems: 'center',
          padding: '0 0 0 46px',
          outline: 'none',
          fontWeight: 300,
          '&:hover': {
            background: '#DEEBFF'
          },
          '&.highlight': {
            background: '#2684FF',
            '& span': {
              color: '#fff'
            }
          },
          '& .flag': {
            marginTop: -2,
            top: 'auto'
          }
        }
      }
    },
    inputContainerError: {
      '& .form-control': {
        borderColor: palette.error.main,
        '&:focus': {
          borderColor: palette.error.main,
          boxShadow: concat(
            '0 0 0 0.2em ',
            palette.formControl.error.shadow.primary
          )
        },
        '&:hover': {
          borderColor: palette.error.main
        }
      }
    },
    errorMessage: {
      position: 'absolute',
      bottom: -17,
      fontSize: 11,
      color: palette.error.main
    }
  })
)

const getPhone = createSelector(phoneSelector, ({ countryCode, dialCode }) => ({
  countryCode,
  dialCode
}))

function FormControlTel({
  name,
  value,
  error,
  touched,
  placeholder,
  onChange,
  onBlur,
  containerClassName
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { countryCode, dialCode } = useSelector(getPhone)
  const isError = useMemo(() => isTruthy(error, touched), [error, touched])

  const handleChange = useCallback(
    (value, { countryCode: newCountryCode, dialCode: newDialCode }) => {
      if (isFalsy(isEqual(countryCode, toUpper(newCountryCode)))) {
        dispatch(
          setPhoneValues(
            createPhoneValues(toUpper(newCountryCode), newDialCode)
          )
        )
        return onChange(simulateEvent(name, ''))
      }
      onChange(simulateEvent(name, cutDialCode(value, newDialCode)))
    },
    [countryCode, name, onChange, dispatch]
  )

  const renderErrorMessage = useMemo(() => {
    return isError ? (
      <Typography className={classes.errorMessage}>{error}</Typography>
    ) : null
  }, [isError, error, classes])

  return (
    <Grid
      container
      justify="center"
      className={classNames(classes.container, containerClassName)}
    >
      <PhoneInput
        country={toLower(countryCode)}
        onChange={handleChange}
        value={concat(dialCode, value)}
        containerClass={classNames(classes.inputContainer, {
          [classes.inputContainerError]: isError
        })}
        countryCodeEditable={false}
        placeholder={placeholder}
        inputProps={{
          onBlur,
          name
        }}
      />
      {renderErrorMessage}
    </Grid>
  )
}

FormControlTel.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  containerClassName: PropTypes.string
}

FormControlTel.defaultProps = {
  onChange: (f) => f,
  onBlur: (f) => f,
  containerClassName: {}
}

export default memo(FormControlTel)
