import { getDialCodeByISO } from './countries'

export function parseGeolocation({ city, country, ip, postal }) {
  return {
    city,
    country,
    ip,
    postal
  }
}

export function parsePhoneValues({ country }) {
  return {
    countryCode: country,
    dialCode: getDialCodeByISO(country)
  }
}

export function parseCreatePlaceFormValues({ country }) {
  return {
    country,
    currency: country
  }
}
