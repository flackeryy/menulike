import { concat, join } from './common'

export function px(param) {
  return concat(param, 'px')
}

export function important(param) {
  return join(' ', param, '!important')
}

export function transition(prop, duration) {
  return join(' ', prop, duration)
}

export function ms(param) {
  return concat(param, 'ms')
}

export function percent(number) {
  return concat(number, '%')
}

export function vh(param) {
  return concat(param, 'vh')
}

export function vw(param) {
  return concat(param, 'vw')
}

export function rgba(r, g, b, a) {
  return concat('rgba(', r, ',', g, ',', b, ',', a, ')')
}
