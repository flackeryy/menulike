import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FormControlMuiSelect from './FormControlMuiSelect'
import FormControlMuiInput from './FormControlMuiInput'
import { getLabelByName } from 'utils/forms'
import { concat } from 'utils/common'
import { getPhoneCodeOptions } from 'utils/countries'
import { PHONE_CODE } from 'constants/forms'
import { simulateEvent } from '../../utils/formik'

const useStyles = makeStyles({
  codeContainer: {
    width: 150,
    marginRight: 10
  }
})

const countryCodes = getPhoneCodeOptions()

function FormControlMuiTel({
  id,
  label,
  name,
  value,
  error,
  touched,
  phoneCodeValue,
  containerClassName,
  onChange,
  onBlur
}) {
  const classes = useStyles()

  const handleCodeChange = useCallback(
    ({ target }) => {
      const { value } = target
      onChange(simulateEvent(PHONE_CODE, value))
    },
    [onChange]
  )

  return (
    <Grid container className={containerClassName} wrap="nowrap">
      <FormControlMuiSelect
        id={concat(id, '_code')}
        label={getLabelByName(PHONE_CODE)}
        containerClassName={classes.codeContainer}
        value={phoneCodeValue}
        options={countryCodes}
        onChange={handleCodeChange}
      />
      <FormControlMuiInput
        id={id}
        type="tel"
        label={label}
        name={name}
        value={value}
        error={error}
        touched={touched}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Grid>
  )
}

FormControlMuiTel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  phoneCodeValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  containerClassName: PropTypes.string
}

export default memo(FormControlMuiTel)
