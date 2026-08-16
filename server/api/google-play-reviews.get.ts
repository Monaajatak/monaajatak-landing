import { defineCachedEventHandler } from '#imports'
import { GoogleAuth } from 'google-auth-library'

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const serviceAccountJson = config.googlePlayServiceAccountJson
  const packageName = config.googlePlayPackageName || 'com.mahmoudmourad.monologue'

  if (!serviceAccountJson) {
    console.error('[Google Play Reviews] Missing GOOGLE_PLAY_SERVICE_ACCOUNT_JSON')
    return { success: false, source: 'google-play', reviews: [] }
  }

  let credentials;
  try {
    credentials = JSON.parse(serviceAccountJson)
    // Handle escaped newlines in private_key (common in env vars)
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n')
    }
  } catch (e) {
    console.error('[Google Play Reviews] Failed to parse GOOGLE_PLAY_SERVICE_ACCOUNT_JSON')
    return { success: false, source: 'google-play', reviews: [] }
  }

  try {
    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    })

    const client = await auth.getClient()
    
    // Call Android Publisher API
    const response = await client.request({
      url: `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/reviews`,
      method: 'GET',
    })

    const reviewsData = (response.data as any).reviews || []
    
    const formattedReviews = reviewsData
      .map((item: any) => {
        const userComment = item.comments?.[0]?.userComment
        if (!userComment) return null

        return {
          id: item.reviewId,
          source: 'google-play',
          author: item.authorName || 'مستخدم Google Play',
          rating: userComment.starRating || 0,
          text: userComment.text?.trim() || '',
          date: userComment.lastModified?.seconds ? new Date(parseInt(userComment.lastModified.seconds) * 1000).toISOString() : null,
          appVersion: userComment.appVersionName || null,
        }
      })
      .filter((r: any) => r !== null)

    // Filter rules
    // Rating >= 4
    // Has text
    // Text length >= 15
    const filteredReviews = formattedReviews
      .filter((r: any) => r.rating >= 4 && r.text && r.text.length >= 15)
      // We can also assume sorting is handled by API natively but just to be sure we sort by date descending
      .sort((a: any, b: any) => {
        if (!a.date || !b.date) return 0
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      .slice(0, 30)

    return {
      success: true,
      source: 'google-play',
      reviews: filteredReviews
    }

  } catch (error: any) {
    // Return safe error, hide sensitive stack trace
    console.error(`[Google Play Reviews] API Error: ${error?.status || error?.code || 'Unknown'} - ${error?.message || 'Request failed'}`)
    return { success: false, source: 'google-play', reviews: [] }
  }
}, {
  maxAge: 60 * 60 * 12, // 12 hours cache
  name: 'google-play-reviews',
  getKey: () => 'reviews-cache'
})
