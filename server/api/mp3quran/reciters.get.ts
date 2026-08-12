export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { rewaya, sura, reciter } = query

  const params = new URLSearchParams({ language: 'ar' })
  if (rewaya) params.set('rewaya', String(rewaya))
  if (sura) params.set('sura', String(sura))
  if (reciter) params.set('reciter', String(reciter))

  const data = await $fetch(`https://www.mp3quran.net/api/v3/reciters?${params.toString()}`)

  const reciters = (data?.reciters || []).map((r) => ({
    id: r.id,
    name: r.name,
    letter: r.letter,
    moshaf: (r.moshaf || []).map((m) => ({
      id: m.id,
      name: m.name,
      server: m.server,
      surahTotal: m.surah_total,
      surahList: m.surah_list,
      rewayaId: m.rewaya_id,
    })),
  }))

  return { reciters }
})