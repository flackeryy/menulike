import { concat, head, isEqual, join, keys, reduce, values } from './common'
import { getPlaceholderByName } from './forms'

function parseErrors(errors = {}) {
  return reduce(
    keys(errors),
    (acc, cur) => {
      return { ...acc, [cur]: head(errors[cur]) }
    },
    {}
  )
}

function createErrorObject(message, errors, code) {
  return {
    message,
    errors,
    code
  }
}

export function parseError({ response }) {
  const { errors, status_code, message } = response.data
  return createErrorObject(message, parseErrors(errors), status_code)
}

export function getErrorMessage({ errors, message }) {
  if (errors) {
    return head(head(values(errors)))
  }
  return message
}

export function required(controlName) {
  return concat(getPlaceholderByName(controlName), ' is required')
}

export function email(controlName) {
  return concat(getPlaceholderByName(controlName), ' is not valid')
}

export function max({ max, path: controlName }) {
  return join(
    ' ',
    getPlaceholderByName(controlName),
    'should not be more than',
    max,
    'characters'
  )
}

export function min({ min, path: controlName }) {
  return join(
    ' ',
    getPlaceholderByName(controlName),
    'should not be less than',
    min,
    'characters'
  )
}

export function is429(code) {
  return isEqual(code, 429)
}
