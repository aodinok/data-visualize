import URI from 'urijs'

export function getHash (str) {
  return str.split('').reduce(
    (r, ch) => ((r << 5) - r) + ch.charCodeAt(0)
  , 0)
}

// TODO: extract to API middleware
export async function fetchResource (resource, params = {}) {
  try {
    const url = new URI()
      .path(`../api/${resource}`)
      .query(params)
      .normalize()
      .toString()
    const response = await fetch(url)
    return await response.json()
  } catch (e) {
    console.warn(e)
  }
}
