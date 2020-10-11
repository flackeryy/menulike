import React, { memo, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Select from 'react-windowed-select'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import { find, isEqual } from 'utils/common'
import { simulateEvent } from 'utils/formik'

const useStyles = makeStyles(({ maxWidth }) => ({
  container: {
    maxWidth,
    width: '100%',
    position: 'relative'
  }
}))

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%',
    '& *': {
      fontFamily: 'Roboto'
    }
  }),
  control: (provided, { isFocused }) => ({
    ...provided,
    width: '100%',
    height: 56,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 28,
    boxSizing: 'border-box',
    background: 'transparent',
    boxShadow: isFocused ? '0 0 0 0.2em rgba(0, 0, 0, 0.5)' : '',
    transition: 'all 350ms',

    '&:hover': {
      borderColor: '#000'
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    minWidth: '100%',
    justifyContent: 'center'
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '100%',
    position: 'absolute',
    right: 0,
    fontSize: 16
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(0, 0, 0, 0.2)'
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontWeight: 300
  }),
  option: (provided) => ({
    ...provided,
    fontWeight: 300,
    cursor: 'pointer'
  }),
  menuList: (provided) => ({
    ...provided,
    height: 220
  })
}

function FormControlSelect({
  name,
  value,
  error,
  touched,
  options,
  placeholder,
  onChange,
  containerClassName
}) {
  const classes = useStyles()

  const selectedOption = useMemo(() => {
    return find(options, (option) => isEqual(option.value, value))
  }, [value, options])

  const handleChange = useCallback(
    ({ value }) => {
      return onChange(simulateEvent(name, value))
    },
    [onChange, name]
  )

  return (
    <Grid
      container
      justify="center"
      className={classNames(classes.container, containerClassName)}
    >
      <Select
        styles={customStyles}
        value={selectedOption}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
      />
    </Grid>
  )
}

FormControlSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  containerClassName: PropTypes.string
}

FormControlSelect.defaultProps = {
  options: [],
  onChange: (f) => f
}

export default memo(FormControlSelect)
