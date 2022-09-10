import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = {
    access_token: event.cookies.get("disco_access_token"),
    refresh_token: event.cookies.get("disco_refresh_token"),
  }

  const response = await resolve(event)
  return response
}
