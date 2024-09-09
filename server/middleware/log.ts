export default defineEventHandler(async (event) => {
  // eslint-disable-next-line no-console
  console.log(`New request: ${getRequestURL(event)}`)
})
