import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import FormControlInput from 'components/form/FormControlInput'
import FormControlTel from 'components/form/FormControlTel'
import FormControlSelect from 'components/form/FormControlSelect'
import { assign, concat, map, takeTruth } from 'utils/common'
import { createInitialOverrides } from 'utils/forms'
import { PHONE_CODE, TYPE_PHONE, TYPE_SELECT } from 'constants/forms'

function FormControlsBuilder({
  groupName,
  controls,
  values,
  errors,
  touched,
  onChange,
  onBlur,
  formControlInputProps,
  inputTextComponent: InputTextComponent,
  inputTelComponent: InputTelComponent,
  selectComponent: SelectComponent,
  overrides
}) {
  const { placeholders } = useMemo(() => {
    return assign(createInitialOverrides(), overrides)
  }, [overrides])

  return map(controls, ({ name, type, placeholder, options, label }, index) => {
    switch (type) {
      case TYPE_PHONE:
        return (
          <InputTelComponent
            id={concat(groupName, '_', name)}
            key={index}
            name={name}
            value={values[name]}
            phoneCodeValue={values[PHONE_CODE]}
            error={errors[name]}
            touched={touched[name]}
            placeholder={takeTruth(placeholders[name], placeholder)}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            {...formControlInputProps}
          />
        )
      case TYPE_SELECT:
        return (
          <SelectComponent
            id={concat(groupName, '_', name)}
            key={index}
            name={name}
            label={label}
            value={values[name]}
            options={options}
            placeholder={takeTruth(placeholders[name], placeholder)}
            onChange={onChange}
            {...formControlInputProps}
          />
        )
      default:
        return (
          <InputTextComponent
            id={concat(groupName, '_', name)}
            key={index}
            name={name}
            type={type}
            value={values[name]}
            error={errors[name]}
            touched={touched[name]}
            placeholder={takeTruth(placeholders[name], placeholder)}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            {...formControlInputProps}
          />
        )
    }
  })
}

FormControlsBuilder.propTypes = {
  groupName: PropTypes.string.isRequired,
  controls: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  formControlInputProps: PropTypes.object,
  inputTextComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  inputTelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  overrides: PropTypes.object
}

FormControlsBuilder.defaultProps = {
  controls: [],
  values: {},
  errors: {},
  touched: {},
  onChange: (f) => f,
  onBlur: (f) => f,
  formControlInputProps: {},
  inputTextComponent: FormControlInput,
  inputTelComponent: FormControlTel,
  selectComponent: FormControlSelect,
  overrides: {}
}

export default FormControlsBuilder
