import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import { isTruthy } from 'utils/common'
import { important } from 'utils/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ shape, palette }) => ({
  container: {
    position: 'relative'
  },
  inputRoot: {
    ...shape.formControlMui
  },
  inputRootError: {
    '& > div': {
      '&::after': {
        borderBottomColor: palette.error.main
      },
      '&::before': {
        borderBottomColor: palette.error.main
      }
    },
    '& label': {
      color: important(palette.error.main)
    }
  },
  labelFocused: {
    ...shape.formControlMuiLabelFocused
  },
  errorMessage: {
    position: 'absolute',
    bottom: -17,
    fontSize: 11,
    color: palette.error.main
  }
}))

function FormControlMuiInput({
  id,
  name,
  label,
  placeholder,
  value,
  error,
  touched,
  type,
  onChange,
  onBlur,
  containerClassName
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
      direction="column"
      className={classNames(classes.container, containerClassName)}
    >
      {renderErrorMessage}
      <TextField
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        InputLabelProps={{
          shrink: true,
          classes: {
            focused: classes.labelFocused
          }
        }}
        InputProps={{
          id,
          type
        }}
        classes={{
          root: classNames(classes.inputRoot, {
            [classes.inputRootError]: isError
          })
        }}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Grid>
  )
}

FormControlMuiInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  containerClassName: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
}

export default memo(FormControlMuiInput)
