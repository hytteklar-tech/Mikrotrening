import webpush from 'web-push'

const APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!
const API_KEY = process.env.ONESIGNAL_REST_API_KEY!

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function sendPushNotification({
  playerIds,
  nativeSubscriptions,
  title,
  body,
}: {
  playerIds: string[]
  nativeSubscriptions?: any[]
  title: string
  body: string
}) {
  const promises: Promise<any>[] = []

  if (playerIds.length) {
    promises.push(
      fetch('https://onesignal.com/api/v1/notifications', {
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
    )
  }

  for (const sub of nativeSubscriptions ?? []) {
    promises.push(
      webpush.sendNotification(sub, JSON.stringify({ title, body })).catch(() => {})
    )
  }

  await Promise.allSettled(promises)
}
