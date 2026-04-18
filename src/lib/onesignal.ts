const APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!
const API_KEY = process.env.ONESIGNAL_REST_API_KEY!

export async function sendPushNotification({
  playerIds,
  title,
  body,
}: {
  playerIds: string[]
  title: string
  body: string
}) {
  if (!playerIds.length) return

  await fetch('https://onesignal.com/api/v1/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${API_KEY}`,
    },
    body: JSON.stringify({
      app_id: APP_ID,
      include_subscription_ids: playerIds,
      headings: { en: title, nb: title },
      contents: { en: body, nb: body },
    }),
  })
}
