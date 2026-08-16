import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  try {
    // Fetch reciters from the local API
    const response = await $fetch('/api/mp3quran/reciters')
    const reciters = response.reciters || []
    
    // Map reciters to sitemap entries
    return reciters.map((reciter: any) => ({
      loc: `/listen/${reciter.slug}`,
      changefreq: 'weekly',
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error generating dynamic sitemap URLs', error)
    return []
  }
})
