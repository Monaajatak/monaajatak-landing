export default defineCachedEventHandler(async () => {
  const data = await $fetch('https://www.mp3quran.net/api/v3/suwar?language=ar')
  const suwar = (data?.suwar || []).map((s) => ({
    id: s.id,
    name: s.name,
    startPage: s.start_page,
    endPage: s.end_page,
    makkia: Number(s.makkia) === 1,
  }))
  return { suwar }
}, { maxAge: 60 * 60 * 24, swr: true })
