export default defineEventHandler(async () => {
  const data = await $fetch('https://www.mp3quran.net/api/v3/riwayat?language=ar')
  const riwayat = (data?.riwayat || []).map((r) => ({
    id: r.id,
    name: r.name,
  }))
  return { riwayat }
})