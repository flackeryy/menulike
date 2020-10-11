import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { map } from '../../utils/common'

const useStyles = makeStyles(({ shape }) => ({
  inputRoot: {
    '&::after': {
      borderBottomColor: '#000'
    },
    '& select': {
      '&:focus': {
        backgroundColor: 'transparent'
      }
    }
  },
  label: {
    ...shape.formControlMuiLabel
  }
}))

function FormControlMuiSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
  containerClassName
}) {
  const classes = useStyles()

  const renderOptions = useMemo(() => {
    return map(options, ({ value, label }, index) => {
      return (
        <option key={index} value={value}>
          {label}
        </option>
      )
    })
  }, [options])

  return (
    <Grid container direction="column" className={containerClassName}>
      <InputLabel htmlFor={id} className={classes.label}>
        {label}
      </InputLabel>
      <NativeSelect
        className={classes.inputRoot}
        value={value}
        onChange={onChange}
        inputProps={{
          id,
          name
        }}
      >
        {renderOptions}
      </NativeSelect>
    </Grid>
  )
}

FormControlMuiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  containerClassName: PropTypes.string
}

export default memo(FormControlMuiSelect)
