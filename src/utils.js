export function getHash (str) {
  return str.split('').reduce(
    (r, ch) => ((r << 5) - r) + ch.charCodeAt(0)
  , 0)
}

// TODO: extract to API middleware
export async function fetchResource (resource) {
  try {
    const response = await fetch(`/api/${resource}`)
    return await response.json()
  } catch (e) {
    console.warn(e)
  }
}
