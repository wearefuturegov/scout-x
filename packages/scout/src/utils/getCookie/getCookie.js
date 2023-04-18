/**
 *
 * @param {*} str
 * @param {*} noWords
 * @returns
 */
const getCookie = name => {
  if (typeof document === "undefined") return ""

  let dc = document.cookie
  let prefix = name + "="

  let begin = dc.indexOf(prefix)
  if (begin === -1) return null
  var end = dc.indexOf(";", begin)
  if (end === -1) end = dc.length

  return decodeURI(dc.substring(begin + prefix.length, end))
}

export default getCookie
