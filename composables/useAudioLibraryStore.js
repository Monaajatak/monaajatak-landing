import { ref } from 'vue'

const LS_KEY = 'munajat-audio-library-v1'

function load() {
  if (typeof window === 'undefined') {
    return { reciters: [], radios: [], surahs: [], playlists: [] }
  }
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEY)) || {}
    return {
      reciters: raw.reciters || [],
      radios: raw.radios || [],
      surahs: raw.surahs || [],
      playlists: raw.playlists || [],
    }
  } catch {
    return { reciters: [], radios: [], surahs: [], playlists: [] }
  }
}

function save(data) {
  if (typeof window === 'undefined') return
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

const stored = load()

const favoriteReciterIds = ref(new Set(stored.reciters))
const favoriteRadioIds = ref(new Set(stored.radios))

// e.g. "3:2" -> reciterId:surahId
const favoriteSurahKeys = ref(new Set(stored.surahs))

const createId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`

const playlists = ref(stored.playlists)

const persist = () => {
  save({
    reciters: [...favoriteReciterIds.value],
    radios: [...favoriteRadioIds.value],
    surahs: [...favoriteSurahKeys.value],
    playlists: playlists.value,
  })
}

export const useAudioLibraryStore = () => {
  const toggleFavoriteReciter = (id) => {
    const next = new Set(favoriteReciterIds.value)
    next.has(id) ? next.delete(id) : next.add(id)
    favoriteReciterIds.value = next
    persist()
  }

  const toggleFavoriteRadio = (id) => {
    const next = new Set(favoriteRadioIds.value)
    next.has(id) ? next.delete(id) : next.add(id)
    favoriteRadioIds.value = next
    persist()
  }

  const toggleFavoriteSurah = (reciterId, surahId) => {
    const key = `${reciterId}:${surahId}`
    const next = new Set(favoriteSurahKeys.value)
    next.has(key) ? next.delete(key) : next.add(key)
    favoriteSurahKeys.value = next
    persist()
  }

  const isFavoriteSurah = (reciterId, surahId) =>
    favoriteSurahKeys.value.has(`${reciterId}:${surahId}`)

  const createPlaylist = (name) => {
    const pl = { id: createId(), name, createdAt: Date.now(), items: [] }
    playlists.value = [...playlists.value, pl]
    persist()
    return pl
  }

  const renamePlaylist = (id, name) => {
    playlists.value = playlists.value.map((p) => (p.id === id ? { ...p, name } : p))
    persist()
  }

  const deletePlaylist = (id) => {
    playlists.value = playlists.value.filter((p) => p.id !== id)
    persist()
  }

  const addToPlaylist = (id, item) => {
    playlists.value = playlists.value.map((p) => {
      if (p.id !== id) return p
      const exists = p.items.some(
        (it) =>
          it.reciterId === item.reciterId && it.surahId === item.surahId,
      )
      return exists ? p : { ...p, items: [...p.items, item] }
    })
    persist()
  }

  const removeFromPlaylist = (id, index) => {
    playlists.value = playlists.value.map((p) =>
      p.id !== id ? p : { ...p, items: p.items.filter((_, i) => i !== index) },
    )
    persist()
  }

  return {
    favoriteReciterIds,
    favoriteRadioIds,
    favoriteSurahKeys,
    playlists,
    toggleFavoriteReciter,
    toggleFavoriteRadio,
    toggleFavoriteSurah,
    isFavoriteSurah,
    createPlaylist,
    renamePlaylist,
    deletePlaylist,
    addToPlaylist,
    removeFromPlaylist,
  }
}