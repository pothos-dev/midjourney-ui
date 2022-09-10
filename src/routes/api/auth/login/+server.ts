export async function GET() {
  const url = `https://discord.com/api/oauth2/authorize`
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify",
  })

  return Response.redirect(`${url}?${params}`)
}
