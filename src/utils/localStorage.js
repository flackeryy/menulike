import { ID, PLACE_PIN } from 'constants/forms'

function setItem(name, value) {
  window.localStorage.setItem(name, value)
}

function getItem(name) {
  return window.localStorage.getItem(name)
}

function removeItem(name) {
  return window.localStorage.removeItem(name)
}

export function storeId(id) {
  setItem(ID, id)
}

export function storePin(pin) {
  setItem(PLACE_PIN, pin)
}

export function getId() {
  return getItem(ID)
}

export function getPin() {
  return getItem(PLACE_PIN)
}

export function clearId() {
  removeItem(ID)
}

export function clearPin() {
  removeItem(PLACE_PIN)
}
