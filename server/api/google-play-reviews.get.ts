import { GoogleAuth } from 'google-auth-library'

import { defineCachedEventHandler } from '#imports'

interface FormattedReview {
  id: string
  source: string
  author: string
  avatar: string | null
  rating: number
  text: string
  date: string | null
  appVersion?: string | null
}

interface PublisherComment {
  userComment?: {
    starRating?: number
    text?: string
    lastModified?: {
      seconds?: string
    }
    appVersionName?: string
  }
}

interface PublisherReviewItem {
  reviewId: string
  authorName?: string
  comments?: PublisherComment[]
}

async function fetchPublicPlayReviews(
  packageName: string,
): Promise<FormattedReview[]> {
  try {
    const url = `https://play.google.com/store/apps/details?id=${packageName}&hl=ar&gl=eg`
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ar,en;q=0.9',
      },
    })

    if (!response.ok) return []

    const html = await response.text()

    // Match the script block containing ds:10 or review data
    const match = html.match(
      /<script[^>]*class="ds:10"[^>]*>AF_initDataCallback\(\{[\s\S]*?data:([\s\S]*?)(?:,\s*sideChannel:|\}\);<\/script>)/,
    )

    let list: unknown[] = []
    if (match && match[1]) {
      try {
        const data = JSON.parse(match[1].trim()) as unknown[][]
        list = data?.[0] || []
      } catch {
        // try fallback search
      }
    }

    if (!list.length) {
      const allCallbacks =
        html.match(/AF_initDataCallback\(\{[\s\S]*?\}\);<\/script>/g) || []
      for (const cb of allCallbacks) {
        if (cb.includes('ds:10') || cb.includes('ACg8oc')) {
          const dataMatch = cb.match(
            /data:([\s\S]*?)(?:,\s*sideChannel:|\}\);<\/script>)/,
          )
          if (dataMatch) {
            try {
              const parsed = JSON.parse(dataMatch[1].trim()) as unknown[][]
              if (Array.isArray(parsed?.[0])) {
                list = parsed[0]
                break
              }
            } catch {
              // continue
            }
          }
        }
      }
    }

    return list
      .filter(
        (
          item,
        ): item is [
          string,
          [string, [unknown, number, unknown, [unknown, unknown, string]]],
          number,
          unknown,
          string,
          [number],
        ] => {
          if (!Array.isArray(item) || item.length < 5) return false
          const authorArr = item[1] as unknown[]
          const text = item[4]
          return (
            typeof item[0] === 'string' &&
            Array.isArray(authorArr) &&
            typeof authorArr[0] === 'string' &&
            typeof text === 'string' &&
            text.trim().length >= 8 &&
            (typeof item[2] !== 'number' || item[2] >= 4)
          )
        },
      )
      .map(r => ({
        id: r[0],
        source: 'google-play',
        author: r[1][0],
        avatar: (r[1][1]?.[3]?.[2] as string) || null,
        rating: typeof r[2] === 'number' ? r[2] : 5,
        text: r[4].trim(),
        date: r[5]?.[0] ? new Date(r[5][0] * 1000).toISOString() : null,
      }))
  } catch (err) {
    console.warn('[Google Play Reviews] Public scraper error:', err)
    return []
  }
}

export default defineCachedEventHandler(
  async event => {
    const config = useRuntimeConfig(event)
    const serviceAccountJson = config.googlePlayServiceAccountJson as
      string | undefined
    const packageName =
      (config.googlePlayPackageName as string) || 'com.mahmoudmourad.monologue'

    // 1. Try official Android Publisher API if service account is provided
    if (serviceAccountJson) {
      try {
        let credentials: { private_key?: string } | null
        try {
          credentials = JSON.parse(serviceAccountJson)
          if (credentials?.private_key) {
            credentials.private_key = credentials.private_key.replace(
              /\\n/g,
              '\n',
            )
          }
        } catch {
          credentials = null
        }

        if (credentials) {
          const auth = new GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/androidpublisher'],
          })

          const client = await auth.getClient()

          const response = await client.request<{
            reviews?: PublisherReviewItem[]
          }>({
            url: `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/reviews`,
            method: 'GET',
          })

          const reviewsData = response.data?.reviews || []

          const formattedReviews: FormattedReview[] = reviewsData
            .map(item => {
              const userComment = item.comments?.[0]?.userComment
              if (!userComment) return null

              return {
                id: item.reviewId,
                source: 'google-play',
                author: item.authorName || 'مستخدم Google Play',
                avatar: null,
                rating: userComment.starRating || 0,
                text: userComment.text?.trim() || '',
                date: userComment.lastModified?.seconds
                  ? new Date(
                      parseInt(userComment.lastModified.seconds, 10) * 1000,
                    ).toISOString()
                  : null,
                appVersion: userComment.appVersionName || null,
              }
            })
            .filter(
              (r): r is FormattedReview =>
                r !== null &&
                r.rating >= 4 &&
                Boolean(r.text) &&
                r.text.length >= 10,
            )
            .sort((a, b) => {
              if (!a.date || !b.date) return 0
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            .slice(0, 30)

          if (formattedReviews.length > 0) {
            return {
              success: true,
              source: 'google-play-api',
              reviews: formattedReviews,
            }
          }
        }
      } catch (error: unknown) {
        const err = error as {
          status?: number
          code?: number
          message?: string
        }
        console.warn(
          `[Google Play Reviews] API Error: ${err?.status || err?.code || 'Unknown'} - ${err?.message || 'Request failed'} - Falling back to public store reviews`,
        )
      }
    }

    // 2. Fetch directly from Google Play Store public page
    const publicReviews = await fetchPublicPlayReviews(packageName)

    return {
      success: publicReviews.length > 0,
      source: 'google-play-public',
      reviews: publicReviews,
    }
  },
  {
    maxAge: 60 * 60 * 6, // 6 hours cache
    name: 'google-play-reviews',
    getKey: () => 'reviews-cache',
  },
)
