export function isTruthy(...params) {
  return params.every((param) => !!param)
}

export function isFalsy(...params) {
  return params.every((param) => !param)
}

export function isSomeTruthy(...params) {
  return params.some((param) => !!param)
}

export function concat(...params) {
  return params.reduce((acc, cur) => {
    return acc + cur
  }, '')
}

export function length(param) {
  return param.length
}

export function takeTruth(...params) {
  return params.find((param) => !!param)
}

export function join(separator, ...params) {
  return params.join(separator)
}

export function toString(param) {
  return param.toString()
}

export function head(array) {
  return array[0]
}

export function reduce(array, cb, initialValue) {
  return array.reduce(cb, initialValue)
}

export function find(array, cb) {
  return array.find(cb)
}

export function replace(value, regexp, newValue) {
  return value.replace(regexp, newValue)
}

export function map(array, cb) {
  return array.map(cb)
}

export function filter(array, cb) {
  return array.filter(cb)
}

export function some(array, cb) {
  return array.some(cb)
}

export function sort(array, cb) {
  return array.sort(cb)
}

export function sortByKey(array, key) {
  return array.sort((a, b) => (a[key] > b[key] ? 1 : -1))
}

export function includes(array, ...options) {
  return some(array, (item) => {
    return options.includes(item)
  })
}

export function split(str, separator) {
  return str.split(separator)
}

export function uniq(array) {
  return [...new Set(sort(array))]
}

export function toUpper(param) {
  return param.toUpperCase()
}

export function toLower(param) {
  return param.toLowerCase()
}

export function cut(str, start = 0, end = length(str)) {
  return str.slice(start, end)
}

export function assign(...objects) {
  return reduce(
    objects,
    (acc, cur) => {
      return { ...acc, ...cur }
    },
    {}
  )
}

export function keys(obj) {
  return Object.keys(obj)
}

export function values(obj) {
  return Object.values(obj)
}

export function pickByTruth(object) {
  return reduce(
    keys(object),
    (acc, cur) => {
      return object[cur] ? { ...acc, [cur]: object[cur] } : { ...acc }
    },
    {}
  )
}

export function pickKeys(object, ...keys) {
  return pickByTruth(
    reduce(
      keys,
      (acc, cur) => {
        return { ...acc, [cur]: object[cur] }
      },
      {}
    )
  )
}

export function isNotEmpty(param) {
  if (isFalsy(param)) return false
  if (Object.prototype.toString.call(param) === '[object Object]') {
    return isTruthy(length(keys(param)))
  }
  return isTruthy(length(param))
}

export function isEmpty(param) {
  if (isFalsy(param)) return true
  if (Object.prototype.toString.call(param) === '[object Object]') {
    return isFalsy(length(keys(param)))
  }
  return isFalsy(length(param))
}

export function isEqual(value, other) {
  const type = Object.prototype.toString.call(value)
  if (type !== Object.prototype.toString.call(other)) return false
  if (['[object String]', '[object Number]', '[object Boolean]'].includes(type))
    return value === other
  if (type === '[object Function]') return toString(value) === toString(other)
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false
  const valueLen =
    type === '[object Array]' ? value.length : Object.keys(value).length
  const otherLen =
    type === '[object Array]' ? other.length : Object.keys(other).length
  if (valueLen !== otherLen) return false

  const compare = function (item1, item2) {
    const itemType = Object.prototype.toString.call(item1)
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false
    } else {
      if (itemType !== Object.prototype.toString.call(item2)) return false
      if (itemType === '[object Function]') {
        if (toString(item1) !== toString(item2)) return false
      } else {
        if (item1 !== item2) return false
      }
    }
  }
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false
    }
  } else {
    for (const key in value) {
      // eslint-disable-next-line
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false
      }
    }
  }
  return true
}
