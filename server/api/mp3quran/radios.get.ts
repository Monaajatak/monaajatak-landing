export default defineEventHandler(async () => {
  const data = await $fetch('https://api.mp3quran.net/api_2/atheer/radios')

  const radios = (data?.reads || []).map((r) => {
    let url = String(r.URL || r.url || '').trim()
    if (url && !url.endsWith('.mp3') && !url.endsWith('.m3u8')) url = `${url}.mp3`

    const episodes = Array.isArray(r.list)
      ? r.list.map((e) => {
          let u = String(e.url || '').trim()
          if (u && !u.endsWith('.mp3') && !u.endsWith('.m3u8')) u = `${u}.mp3`
          return {
            radio_id: e.radio_id,
            seq_id: e.seq_id,
            url: u,
            name: e.name,
          }
        })
      : []

    return {
      id: r.id,
      name: String(r.name || '').replace(/^-+|-+$/g, '').trim(),
      url,
      category: r.category || '',
      episodes,
    }
  })

  return { radios }
})