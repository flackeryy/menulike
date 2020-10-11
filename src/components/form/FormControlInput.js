import React, { useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import InputBase from '@material-ui/core/InputBase'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { concat, isTruthy } from 'utils/common'
import { transition, ms } from 'utils/styles'

const useStyles = makeStyles(({ palette, shape, transitions, maxWidth }) => ({
  container: {
    maxWidth,
    width: '100%',
    position: 'relative'
  },
  inputRoot: {
    width: '100%'
  },
  input: {
    borderColor: palette.formControl.border.primary,
    transition: transition('all', ms(transitions.primary)),
    ...shape.formControl,

    '-webkit-appearance': 'none',

    '&:focus': {
      boxShadow: concat(
        '0 0 0 0.2em ',
        palette.formControl.focused.shadow.primary
      )
    }
  },
  inputError: {
    borderColor: palette.error.main,
    '&:focus': {
      boxShadow: concat(
        '0 0 0 0.2em ',
        palette.formControl.error.shadow.primary
      )
    }
  },
  errorMessage: {
    position: 'absolute',
    bottom: -17,
    fontSize: 11,
    color: palette.error.main
  }
}))

function FormControlInput({
  name,
  type,
  value,
  error,
  touched,
  placeholder,
  onChange,
  onBlur,
  containerClassName,
  ...props
}) {
  const classes = useStyles()
  const isError = useMemo(() => isTruthy(error, touched), [error, touched])

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
      <InputBase
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        classes={{
          root: classes.inputRoot,
          input: classNames(classes.input, {
            [classes.inputError]: isError
          })
        }}
        {...props}
      />
      {renderErrorMessage}
    </Grid>
  )
}

FormControlInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  containerClassName: PropTypes.string
}

export default memo(FormControlInput)
