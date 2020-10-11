import { string, object } from 'yup'
import { assign, isTruthy, keys, map, pickByTruth, reduce } from './common'
import { email, max, min, required } from './errors'
import {
  ADDRESS,
  CITY,
  COUNTRY,
  CURRENCY,
  DESCRIPTION,
  EMAIL,
  PHONE_NUMBER,
  PLACEHOLDER_ADDRESS,
  PLACEHOLDER_CITY,
  PLACEHOLDER_COUNTRY,
  PLACEHOLDER_CURRENCY,
  PLACEHOLDER_DESCRIPTION,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PHONE_NUMBER,
  PLACEHOLDER_PLACE_NAME,
  PLACEHOLDER_PLACE_PIN,
  PLACE_NAME,
  PLACE_PIN,
  TYPE_EMAIL,
  TYPE_SELECT,
  TYPE_TEXT,
  TYPE_PHONE,
  TYPE_NUM,
  LABEL_EMAIL,
  LABEL_PLACE_NAME,
  LABEL_PHONE_NUMBER,
  LABEL_ADDRESS,
  LABEL_DESCRIPTION,
  LABEL_COUNTRY,
  LABEL_CURRENCY,
  LABEL_CITY,
  PHONE_CODE,
  LABEL_PHONE_CODE
} from 'constants/forms'

export function getTypeByName(controlName) {
  switch (controlName) {
    case PHONE_NUMBER:
      return TYPE_PHONE
    case EMAIL:
      return TYPE_EMAIL
    case COUNTRY:
      return TYPE_SELECT
    case CURRENCY:
      return TYPE_SELECT
    case PLACE_PIN:
      return TYPE_NUM
    default:
      return TYPE_TEXT
  }
}

export function getLabelByName(controlName) {
  switch (controlName) {
    case EMAIL:
      return LABEL_EMAIL
    case PLACE_NAME:
      return LABEL_PLACE_NAME
    case PHONE_NUMBER:
      return LABEL_PHONE_NUMBER
    case ADDRESS:
      return LABEL_ADDRESS
    case DESCRIPTION:
      return LABEL_DESCRIPTION
    case COUNTRY:
      return LABEL_COUNTRY
    case CURRENCY:
      return LABEL_CURRENCY
    case CITY:
      return LABEL_CITY
    case PHONE_CODE:
      return LABEL_PHONE_CODE
    default:
      return ''
  }
}

export function getPlaceholderByName(controlName) {
  switch (controlName) {
    case EMAIL:
      return PLACEHOLDER_EMAIL
    case PHONE_NUMBER:
      return PLACEHOLDER_PHONE_NUMBER
    case PLACE_NAME:
      return PLACEHOLDER_PLACE_NAME
    case CURRENCY:
      return PLACEHOLDER_CURRENCY
    case COUNTRY:
      return PLACEHOLDER_COUNTRY
    case CITY:
      return PLACEHOLDER_CITY
    case ADDRESS:
      return PLACEHOLDER_ADDRESS
    case DESCRIPTION:
      return PLACEHOLDER_DESCRIPTION
    case PLACE_PIN:
      return PLACEHOLDER_PLACE_PIN
    default:
      return ''
  }
}

function createControlObject(name, type, placeholder, label, options) {
  return pickByTruth({
    name,
    type,
    placeholder,
    label,
    options
  })
}

function getControlOptions(controlName, options) {
  return options[controlName]
}

function createControls(controlNames, options) {
  return map(controlNames, (name) => {
    return createControlObject(
      name,
      getTypeByName(name),
      getPlaceholderByName(name),
      getLabelByName(name),
      getControlOptions(name, options)
    )
  })
}

function createInitialValues(controlNames) {
  return reduce(
    controlNames,
    (acc, cur) => {
      return { ...acc, [cur]: '' }
    },
    {}
  )
}

function createValidationSchema(controlNames) {
  return object().shape(
    reduce(
      controlNames,
      (acc, cur) => {
        switch (cur) {
          case ADDRESS:
            return {
              ...acc,
              [cur]: string().min(5, min).required(required(cur))
            }
          case PLACE_PIN:
            return {
              ...acc,
              [cur]: string().max(6, max).required(required(cur))
            }
          case EMAIL:
            return {
              ...acc,
              [cur]: string().email(email(cur)).required(required(cur))
            }
          case DESCRIPTION:
            return { ...acc, [cur]: string() }
          default:
            return { ...acc, [cur]: string().required(required(cur)) }
        }
      },
      {}
    )
  )
}

function createFormShape(
  controls,
  initialValues,
  validationSchema,
  validateOnMount = true
) {
  return {
    controls,
    initialValues,
    validationSchema,
    validateOnMount
  }
}

export function errorsToTouched(obj) {
  return reduce(
    keys(obj),
    (acc, cur) => {
      return { ...acc, [cur]: isTruthy(obj[cur]) }
    },
    {}
  )
}

export function createControlNames(...controlNames) {
  return controlNames
}

export function createOption(controlName, options) {
  return {
    [controlName]: options
  }
}

export function createOptions(...options) {
  return assign(...options)
}

export function buildForm(controlNames = [], options = {}) {
  return createFormShape(
    createControls(controlNames, options),
    createInitialValues(controlNames),
    createValidationSchema(controlNames)
  )
}

export function createInitialOverrides() {
  return {
    placeholders: {}
  }
}
