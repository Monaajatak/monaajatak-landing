import { defineSitemapEventHandler } from '#imports'
import { reciterSlug } from '../../../utils/reciterSlug'
import { getAllResources } from '../../../utils/resourcesData'

/**
 * الصفحات الديناميكية لخريطة الموقع: الموارد المفتوحة، وصفحة لكل قارئ
 * وصفحة لكل سورة عنده (من أي مصحف/رواية). الروابط بلا معاملات، فهي الروابط
 * المعيارية نفسها التي تعلنها الصفحات في `canonical`.
 */
export default defineSitemapEventHandler(async () => {
  const resources = getAllResources().map((r) => ({ loc: `/resources/${r.id}` }))

  try {
    const { reciters = [] } = await $fetch<{ reciters: any[] }>('/api/mp3quran/reciters')

    return [...resources, ...reciters.flatMap((reciter) => {
      const slug = reciterSlug(reciter)
      if (!slug) return []

      const surahIds = new Set<number>()
      for (const m of reciter.moshaf || []) {
        for (const n of String(m.surahList || '').split(',')) {
          const id = parseInt(n, 10)
          if (id) surahIds.add(id)
        }
      }

      return [
        { loc: `/listen/${slug}` },
        ...[...surahIds].sort((a, b) => a - b).map((id) => ({ loc: `/listen/${slug}/${id}` })),
      ]
    })]
  } catch (error) {
    console.error('[sitemap] تعذّر جلب قائمة القرّاء', error)
    return resources
  }
})
