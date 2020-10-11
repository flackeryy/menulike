import { countries } from 'countries-list'
import getSymbol from 'currency-symbol-map'
import {
  concat,
  filter,
  head,
  includes,
  isFalsy,
  isTruthy,
  keys,
  map,
  sortByKey,
  split,
  toUpper
} from './common'
import { createSelectOption } from './select'

/**
 * Helper functions
 */

const DUPLICATED_CURRENCIES = [
  'ANG',
  'AUD',
  'DKK',
  'EUR',
  'GBP',
  'ILS',
  'MAD',
  'NOK',
  'NZD',
  'USD',
  'XAF',
  'XCD',
  'XOF'
]

const DUPLICATES_CURRENCIES_ISO = [
  'SX',
  'HM',
  'DK',
  'IT',
  'GB',
  'IL',
  'EH',
  'SJ',
  'NZ',
  'US',
  'RD',
  'KN',
  'TG'
]

function filterCurrencies({ iso, currency }) {
  if (isFalsy(currency)) {
    return false
  }
  if (includes(DUPLICATED_CURRENCIES, currency)) {
    return isTruthy(includes(DUPLICATES_CURRENCIES_ISO, iso))
  }
  return true
}

function cutCurrency(currency) {
  return head(split(currency, ','))
}

function cutPhone(phone) {
  return head(split(phone, ','))
}

function createCountry(iso) {
  const { emoji, native, phone, currency } = countries[iso]
  return {
    iso,
    emoji,
    native,
    phone,
    currency
  }
}

function createNative({ iso, emoji, native }) {
  return {
    iso,
    native,
    emoji
  }
}

function createPhone({ iso, emoji, phone }) {
  return {
    iso,
    emoji,
    phone: cutPhone(phone)
  }
}

function createCurrency({ iso, emoji, currency: cur }) {
  const currency = cutCurrency(cur)
  const symbol = getSymbol(currency) ? getSymbol(currency) : ''
  return {
    iso,
    emoji,
    currency,
    symbol
  }
}

/**
 * Arrays for creating select options
 *
 * @isoCodes: ["US", "GB", "UA", "RU"]
 *
 * @countriesArray:
 * [
 *  {
 *    iso: "GB",
 *    native: "United Kingdom",
 *    emoji: emoji,
 *    phone: "44",
 *    currency: GBP
 *  }
 * ]
 *
 * @natives:
 * [
 *  {
 *    iso: "GB",
 *    emoji: emoji,
 *    native: "United Kingdom"
 *  }
 * ]
 *
 * @phones:
 * [
 *  {
 *    iso: "GB",
 *    emoji: emoji,
 *    phone: "44"
 *  }
 * ]
 *
 * @currencies:
 * [
 *  {
 *    iso: "GB",
 *    emoji: emoji,
 *    currency: "GBP"
 *  }
 * ]
 */

const isoCodes = keys(countries)
const countriesArray = map(keys(countries), createCountry)
const natives = sortByKey(map(countriesArray, createNative), 'native')
const phones = sortByKey(map(countriesArray, createPhone), 'phone')
const currencies = filter(
  sortByKey(map(countriesArray, createCurrency), 'currency'),
  filterCurrencies
)

/**
 * Temporary helper functions functions for Create Place page
 * Will remove them lately
 */

function getNative({ native }) {
  return native
}

function getCurrency({ currency }) {
  return currency
}

function getDialCode({ phone }) {
  return phone
}

function getPhone({ phone }) {
  return phone
}

export function getCountryByISO(iso) {
  return countries[toUpper(iso)]
}

export function getPhoneByISO(iso) {
  return getPhone(getCountryByISO(iso))
}

export function getCurrencyByISO(iso) {
  return getCurrency(getCountryByISO(iso))
}

export function getDialCodeByISO(iso) {
  return getDialCode(getCountryByISO(iso))
}

/**
 * Functions for creating select options
 */

export function getCountriesOptions() {
  return map(natives, ({ iso, native, emoji }) => {
    return createSelectOption(iso, concat(emoji, ' ', native))
  })
}

export function getCurrencyOptions() {
  return map(currencies, ({ currency, symbol }) => {
    return createSelectOption(currency, concat(currency, ' ', symbol))
  })
}

export function getPhoneCodeOptions() {
  return map(phones, ({ phone, emoji }) => {
    return createSelectOption(phone, concat(emoji, ' +', phone))
  })
}

/**
 * Deprecates functions for creating select options
 * Currently used on the CreatePlace page
 * will remove them later
 */

export function getCurrencyOptions__DEPRECATED() {
  return map(isoCodes, (iso) => {
    return createSelectOption(iso, getCurrencyByISO(iso))
  })
}

export function getCountriesOptions__DEPRECATED() {
  return map(isoCodes, (iso) => {
    return createSelectOption(iso, getNative(getCountryByISO(iso)))
  })
}
