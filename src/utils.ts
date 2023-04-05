export class NumUtils {
  static formatWithK(num) {
    const absNum = Math.abs(num) // 取绝对值
    if (absNum >= 1000000) { // 大于等于100万
      return `${(num / 1000000).toFixed(1)}M`
    }
    else if (absNum >= 1000) { // 大于等于1千
      return `${(num / 1000).toFixed(1)}k`
    }
    else {
      return num.toString()
    }
  }
}

/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
export function decode(text: string | number): string {
  return decodeURIComponent(`${text}`)
}
export const PLUS_RE = /\+/g // %2B
export function parseQuery(search: string): any {
  const query: any = {}
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?')
    return query
  const hasLeadingIM = search[0] === '?'
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, ' ')
    // allow the = character
    const eqPos = searchParam.indexOf('=')
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos))
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1))

    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key]
      if (!Array.isArray(currentValue))
        currentValue = query[key] = [currentValue]

      // we force the modification
      ;(currentValue as any[]).push(value)
    }
    else {
      query[key] = value
    }
  }
  return query
}
