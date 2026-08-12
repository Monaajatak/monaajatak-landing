import { ref, computed } from 'vue'

const isPlaying = ref(false)
const isLoading = ref(false)
const currentTrack = ref(null)
const currentQueue = ref([])
const currentIndex = ref(-1)
const audioEl = typeof document !== 'undefined' ? new Audio() : null
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const playbackRate = ref(1)
const loopMode = ref('off') // 'off' | 'one'

export const useAudioPlayer = () => {
  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '٠٠:٠٠'
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = Math.floor(sec % 60)
    const p = (n) => String(n).padStart(2, '0')
    return h > 0 ? `${h}:${p(m)}:${p(s)}` : `${m}:${p(s)}`
  }

  const toArabicDigits = (str) => {
    const map = { '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤', '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩', ':' : ':' }
    return String(str).split('').map((c) => map[c] || c).join('')
  }

  const setupListeners = () => {
    if (!audioEl) return
    audioEl.addEventListener('timeupdate', () => {
      currentTime.value = audioEl.currentTime
      duration.value = audioEl.duration || 0
    })
    audioEl.addEventListener('ended', () => {
      if (loopMode.value === 'one') {
        audioEl.currentTime = 0
        audioEl.play()
        return
      }
      if (currentIndex.value < currentQueue.value.length - 1) {
        playIndex(currentIndex.value + 1)
      } else {
        isPlaying.value = false
        currentTime.value = 0
      }
    })
    audioEl.addEventListener('play', () => { isPlaying.value = true })
    audioEl.addEventListener('pause', () => { isPlaying.value = false })
    audioEl.addEventListener('waiting', () => { isLoading.value = true })
    audioEl.addEventListener('playing', () => { isLoading.value = false })
    audioEl.addEventListener('error', () => { isLoading.value = false })
  }

  const playTrack = (track, queue = []) => {
    if (!audioEl) return
    currentTrack.value = track
    currentQueue.value = queue.length ? queue : [track]
    currentIndex.value = queue.length ? queue.findIndex((t) => t.url === track.url) : 0
    if (currentIndex.value < 0) currentIndex.value = 0
    audioEl.src = track.url
    audioEl.playbackRate = playbackRate.value
    audioEl.volume = volume.value
    audioEl.play()
    setupListeners()
  }

  const playIndex = (index) => {
    if (index < 0 || index >= currentQueue.value.length) return
    currentIndex.value = index
    const track = currentQueue.value[index]
    if (!track) return
    currentTrack.value = track
    audioEl.src = track.url
    audioEl.play()
  }

  const togglePlay = () => {
    if (!audioEl) return
    if (!currentTrack.value) return
    if (audioEl.paused) audioEl.play()
    else audioEl.pause()
  }

  const seek = (time) => {
    if (!audioEl) return
    audioEl.currentTime = time
    currentTime.value = time
  }

  const seekByPercent = (pct) => {
    if (!audioEl || !audioEl.duration) return
    audioEl.currentTime = (pct / 100) * audioEl.duration
  }

  const setVolume = (v) => {
    volume.value = v
    if (audioEl) audioEl.volume = v
  }

  const setRate = (r) => {
    playbackRate.value = r
    if (audioEl) audioEl.playbackRate = r
  }

  const cycleLoop = () => {
    loopMode.value = loopMode.value === 'off' ? 'one' : 'off'
  }

  const stop = () => {
    if (!audioEl) return
    audioEl.pause()
    audioEl.currentTime = 0
    currentTime.value = 0
    isPlaying.value = false
    currentTrack.value = null
    currentQueue.value = []
    currentIndex.value = -1
  }

  const next = () => {
    if (currentIndex.value < currentQueue.value.length - 1) playIndex(currentIndex.value + 1)
  }

  const prev = () => {
    if (currentIndex.value > 0) playIndex(currentIndex.value - 1)
  }

  const progressPercent = computed(() => {
    if (!duration.value) return 0
    return (currentTime.value / duration.value) * 100
  })

  setupListeners()

  return {
    audioEl,
    isPlaying,
    isLoading,
    currentTrack,
    currentQueue,
    currentIndex,
    currentTime,
    duration,
    volume,
    playbackRate,
    loopMode,
    progressPercent,
    formatTime,
    toArabicDigits,
    playTrack,
    playIndex,
    togglePlay,
    seek,
    seekByPercent,
    setVolume,
    setRate,
    cycleLoop,
    stop,
    next,
    prev,
  }
}