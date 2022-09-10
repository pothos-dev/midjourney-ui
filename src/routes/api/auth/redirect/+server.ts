import type { RequestEvent } from "@sveltejs/kit"

export async function GET({ url }: RequestEvent) {
  const code = url.searchParams.get("code")!

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: import.meta.env.VITE_DISCORD_REDIRECT_URI,
      scope: "identify",
      code,
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })

  const {
    access_token,
    refresh_token,
    expires_in,
  }: {
    access_token: string
    refresh_token: string
    expires_in: number
    scope: string
    token_type: string
  } = await response.json()

  return new Response("", {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie":
        `disco_access_token=${access_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${expires_in},` +
        `disco_refresh_token=${refresh_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${expires_in}`,
    },
  })
}
