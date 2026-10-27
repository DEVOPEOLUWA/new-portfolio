// Vercel tags every request with the visitor's approximate location, worked out
// from their IP at the edge. Passing it on lets the welcome panel greet people in
// a local language without a third-party IP lookup — and the IP is never stored.
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'private, no-store')
  const city = getRequestHeader(event, 'x-vercel-ip-city')
  return {
    country: getRequestHeader(event, 'x-vercel-ip-country') ?? null,
    region: getRequestHeader(event, 'x-vercel-ip-country-region') ?? null,
    city: city ? decodeURIComponent(city) : null,
  }
})
