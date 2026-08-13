<template>
  <Transition name="fp-fade">
    <div class="full-player" @click.self="$emit('close')">
      <div class="fp-sheet">
        <!-- ── Top bar ── -->
        <div class="fp-topbar">
          <button class="fp-iconbtn" aria-label="تصغير" @click="$emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <span class="fp-now">الآن يُشغّل</span>
          <button class="fp-iconbtn" aria-label="مشاركة" @click="share">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </button>
        </div>

        <!-- ── Artwork ── -->
        <div class="fp-art" :class="{ live: isLive }">
          <svg v-if="!isLive" class="quran-mark" xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V4a2 2 0 0 1 2-2h10.9a2 2 0 0 1 2 2v15.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 2h7"/></svg>
          <span v-if="!isLive" class="art-suraid">{{ toArNum(surahId) }}</span>
        </div>

        <!-- ── Title / artist / fav ── -->
        <div class="fp-title-row">
          <div class="fp-title-info">
            <h2 class="fp-title">{{ track.title }}</h2>
            <span class="fp-artist">{{ track.subtitle }}</span>
          </div>
          <button v-if="!isLive" class="fp-fav" :class="{ on: isFav }" :aria-label="isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'" @click="toggleFav">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>

        <!-- ── Progress ── -->
        <div class="fp-slider" @pointerdown="startDrag" @pointermove="drag" @pointerup="endDrag" @pointercancel="endDrag">
          <div class="fp-track">
            <div class="fp-fill" :style="{ width: dragPct }"></div>
          </div>
          <div class="fp-thumb" :style="{ insetInlineStart: dragPct }"></div>
        </div>
        <div class="fp-times">
          <span>{{ toArNum(fmt(dragSec)) }}</span>
          <span>{{ toArNum(fmt(player.duration.value)) }}</span>
        </div>

        <!-- ── Main controls ── -->
        <div class="fp-controls">
          <button class="fp-ctl" :class="{ active: loopActive }" :aria-label="loopActive ? 'إيقاف التكرار' : 'تكرار السورة'" @click="player.cycleLoop">
            <svg v-if="loopActive" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
          </button>

          <button class="fp-ctl" :disabled="!hasPrev" aria-label="السابق" @click="player.prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
          </button>

          <button class="fp-main" :aria-label="player.isPlaying.value ? 'إيقاف مؤقت' : 'تشغيل'" @click="player.togglePlay">
            <svg v-if="player.isLoading.value" class="fp-spin" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <svg v-else-if="player.isPlaying.value" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </button>

          <button class="fp-ctl" :disabled="!hasNext" aria-label="التالي" @click="player.next">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
          </button>

          <button class="fp-ctl speed" :class="{ active: player.playbackRate.value !== 1 }" @click="showSpeed = true">
            {{ player.playbackRate.value }}x
          </button>
        </div>

        <!-- ── Extra actions ── -->
        <div class="fp-extras">
          <button class="fp-extra" :class="{ on: sleepOn }" @click="sleepOn ? cancelSleep() : (showSleep = true)">
            <span class="fp-extra-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </span>
            المؤقت
          </button>
          <button class="fp-extra" @click="showQueue = true">
            <span class="fp-extra-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
            </span>
            القائمة
          </button>
          <button class="fp-extra" @click="showAdd = true">
            <span class="fp-extra-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            </span>
            إضافة
          </button>
        </div>
      </div>

      <!-- ══════ Sheets ══════ -->
      <div v-if="showSpeed" class="fp-sheet-pop" @click.self="showSpeed = false">
        <div class="fps">
          <div class="fps-handle"></div>
          <h3>سرعة التشغيل</h3>
          <div class="fps-grid">
            <button v-for="s in speeds" :key="s" :class="['fps-item', { sel: player.playbackRate.value === s }]" @click="player.setRate(s); showSpeed = false">{{ s }}x</button>
          </div>
        </div>
      </div>

      <div v-if="showSleep" class="fp-sheet-pop" @click.self="showSleep = false">
        <div class="fps">
          <div class="fps-handle"></div>
          <h3>مؤقت النوم</h3>
          <div class="fps-sleep-list">
            <button v-for="opt in sleepOptions" :key="opt.ms" class="fps-sleep-item" @click="setSleep(opt.ms); showSleep = false">
              <span>{{ opt.label }}</span>
              <small>إيقاف بعد {{ opt.label }}</small>
            </button>
          </div>
        </div>
      </div>

      <div v-if="showQueue" class="fp-sheet-pop" @click.self="showQueue = false">
        <div class="fps">
          <div class="fps-handle"></div>
          <div class="fps-head-row">
            <h3>قائمة التشغيل</h3>
            <button class="fps-save" @click="saveAsPlaylist">حفظ</button>
          </div>
          <div class="fps-queue">
            <div v-for="(t, i) in player.currentQueue.value" :key="i" :class="['fps-q-item', { cur: i === player.currentIndex.value }]" @click="player.playIndex(i); showQueue = false">
              <StarNumber :number="toArNum(surahIdOf(t))" color="var(--primary)" :size="36" />
              <span class="fps-q-name">{{ t.title }}</span>
              <span class="fps-q-badge">{{ t.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showAdd" class="fp-sheet-pop" @click.self="showAdd = false">
        <div class="fps">
          <div class="fps-handle"></div>
          <h3>إضافة لقائمة تشغيل</h3>
          <button class="fps-new" @click="newPlaylistSheet = true">
            <span class="add-ic">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </span>
            <span class="add-tx">
              <strong>إنشاء قائمة جديدة</strong>
              <small>أنشئ قائمة تشغيل بالسور المفضلة لديك</small>
            </span>
          </button>
          <div class="fps-pl-list">
            <div v-if="store.playlists.value.length === 0" class="fps-empty">لا توجد قوائم تشغيل بعد</div>
            <div v-for="pl in store.playlists.value" :key="pl.id" class="fps-pl-item" @click="addCurrent(pl.id); showAdd = false">
              <span class="pl-badge">{{ toArNum(pl.items.length) }}</span>
              <span class="pl-name">{{ pl.name }}</span>
              <span class="pl-count">{{ toArNum(pl.items.length) }} عنصر</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="newPlaylistSheet" class="fp-sheet-pop" @click.self="newPlaylistSheet = false">
        <div class="fps">
          <div class="fps-handle"></div>
          <h3>قائمة تشغيل جديدة</h3>
          <div class="fps-create">
            <input v-model="newPlaylistName" class="fps-input" placeholder="اسم القائمة" @keyup.enter="confirmCreate" />
            <div class="fps-create-actions">
              <button class="fps-cancel" @click="newPlaylistSheet = false">إلغاء</button>
              <button class="fps-apply" @click="confirmCreate">إنشاء</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useAudioPlayer } from '~/composables/useAudioPlayer'
import { useAudioLibraryStore } from '~/composables/useAudioLibraryStore'
import StarNumber from '~/components/AudioLibrary/StarNumber.vue'
import { recitationLink, radioLink } from '~/utils/shareLinks'

defineEmits(['close'])

const player = useAudioPlayer()
const store = useAudioLibraryStore()

const isLive = computed(() => player.currentTrack.value?.type === 'radio')
const track = computed(() => player.currentTrack.value || { title: '', subtitle: '' })
const loopActive = computed(() => player.loopMode.value === 'one')

const surahId = computed(() => {
  const t = player.currentTrack.value
  if (!t) return ''
  if (t.surahId) return t.surahId
  const m = String(t.url || '').match(/\/(\d{3})\.mp3$/)
  return m ? parseInt(m[1], 10) : ''
})

const surahIdOf = (t) => {
  if (t.surahId) return t.surahId
  const m = String(t.url || '').match(/\/(\d{3})\.mp3$/)
  return m ? parseInt(m[1], 10) : ''
}

const isFav = computed(() =>
  player.currentTrack.value?.reciterId != null ? store.isFavoriteSurah(player.currentTrack.value.reciterId, surahId.value) : false,
)

const toggleFav = () => {
  const t = player.currentTrack.value
  if (t?.reciterId != null && surahId.value) store.toggleFavoriteSurah(t.reciterId, surahId.value)
}

const hasPrev = computed(() => player.currentIndex.value > 0)
const hasNext = computed(() => player.currentIndex.value < player.currentQueue.value.length - 1)

// ── progress drag ──
const dragPct = ref('0%')
const dragSec = ref(0)
const dragActive = ref(false)

watch(() => player.progressPercent.value, (p) => {
  if (!dragActive.value) {
    dragPct.value = p + '%'
    dragSec.value = player.currentTime.value
  }
})

const pctToSec = (clientX, el) => {
  const rect = el.getBoundingClientRect()
  const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
  const dur = player.duration.value || 0
  return { pct, sec: (pct / 100) * dur }
}

const startDrag = (e) => {
  dragActive.value = true
  const { pct, sec } = pctToSec(e.clientX, e.currentTarget)
  dragPct.value = pct + '%'
  dragSec.value = sec
  e.currentTarget.setPointerCapture?.(e.pointerId)
}
const drag = (e) => {
  if (!dragActive.value) return
  const { pct, sec } = pctToSec(e.clientX, e.currentTarget)
  dragPct.value = pct + '%'
  dragSec.value = sec
}
const endDrag = () => {
  if (!dragActive.value) return
  dragActive.value = false
  player.seek(dragSec.value)
}

// ── formats ──
const fmt = player.formatTime
const toArNum = player.toArabicDigits

// ── speed / sleep ──
const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
const showSpeed = ref(false)
const showSleep = ref(false)
const sleepOn = ref(false)
const sleepTimer = ref(null)
const sleepOptions = [
  { label: '5 دقائق', ms: 5 * 60 * 1000 },
  { label: '10 دقائق', ms: 10 * 60 * 1000 },
  { label: '15 دقيقة', ms: 15 * 60 * 1000 },
  { label: '30 دقيقة', ms: 30 * 60 * 1000 },
  { label: '45 دقيقة', ms: 45 * 60 * 1000 },
  { label: 'ساعة', ms: 60 * 60 * 1000 },
]
const setSleep = (ms) => {
  cancelSleep()
  sleepOn.value = true
  sleepTimer.value = setTimeout(() => {
    player.stop()
    dismiss()
  }, ms)
}
const cancelSleep = () => {
  sleepOn.value = false
  if (sleepTimer.value) clearTimeout(sleepTimer.value)
  sleepTimer.value = null
}
const dismiss = () => {
  showSpeed.value = false
  showSleep.value = false
  showQueue.value = false
  showAdd.value = false
}

// ── queue / add ──
const showQueue = ref(false)
const showAdd = ref(false)
const newPlaylistSheet = ref(false)
const newPlaylistName = ref('')

const addCurrent = (plId) => {
  const t = player.currentTrack.value
  if (!t || t.type === 'radio') return
  store.addToPlaylist(plId, {
    reciterId: t.reciterId,
    reciterName: t.subtitle,
    surahId: surahId.value,
    surahName: t.title,
    audioUrl: t.url,
  })
}

const saveAsPlaylist = () => {
  const t = player.currentTrack.value
  if (!t || t.type === 'radio') return
  const name = t.type === 'radio' ? 'إذاعة' : `تلاوات ${t.subtitle || ''}`
  const pl = store.createPlaylist(name)
  store.playlists.value.forEach((p) => {
    if (p.id === pl.id) store.addToPlaylist(pl.id, {
      reciterId: t.reciterId,
      reciterName: t.subtitle,
      surahId: surahId.value,
      surahName: t.title,
      audioUrl: t.url,
    })
  })
}

const confirmCreate = () => {
  const name = newPlaylistName.value.trim()
  if (!name) return
  const pl = store.createPlaylist(name)
  addCurrent(pl.id)
  newPlaylistName.value = ''
  newPlaylistSheet.value = false
  showAdd.value = false
}

const share = async () => {
  // كان الرابط يحمل `surahId` وحده — بلا قارئ لا يعرف التطبيق ماذا يفتح
  // فيتجاهله. الآن نبني نفس الرابط الذي يبنيه التطبيق.
  const t = player.currentTrack.value || {}
  const link = isLive.value
    ? radioLink({ radioId: t.id, episodeIndex: t.episodeIndex })
    : recitationLink({
        reciterId: t.reciterId,
        surahId: surahId.value,
        moshafId: t.moshafId,
      })
  const text = `استمع إلى ${track.value.title} عبر تطبيق مناجاتك:\n${link}`
  if (navigator.share) {
    try { await navigator.share({ text }) } catch {}
  } else if (navigator.clipboard) {
    try { await navigator.clipboard.writeText(text) } catch {}
  }
}

watch(isLive, (v) => { if (v) cancelSleep() })

onUnmounted(() => cancelSleep())
</script>

<style scoped>
.fp-fade-enter-active, .fp-fade-leave-active { transition: opacity 0.3s ease; }
.fp-fade-enter-from, .fp-fade-leave-to { opacity: 0; }

.full-player {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-end;
}
.fp-sheet {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  background: var(--body-bg);
  border-radius: 28px 28px 0 0;
  border-top: var(--border);
  padding: 10px 26px calc(34px + env(safe-area-inset-bottom));
  position: relative;
  max-height: 94vh;
  overflow-y: auto;
  box-shadow: 0 -18px 60px rgba(0, 0, 0, 0.24);
}
:global(html.dark) .fp-sheet { background: #0f172a; }

.fp-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fp-iconbtn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 12px;
  color: var(--muted);
  cursor: pointer;
}
.fp-iconbtn:hover { background: rgba(var(--primary-rgb), 0.08); color: var(--primary); }
.fp-now {
  font-size: 12px;
  font-weight: 600;
  color: var(--faint);
}

/* ── artwork ── */
.fp-art {
  aspect-ratio: 1;
  max-width: 320px;
  width: 100%;
  margin: 12px auto 0;
  border-radius: 20px;
  border: 1px solid rgba(var(--primary-rgb), 0.15);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 34px rgba(var(--primary-rgb), 0.09);
}
.fp-art.live {
  background: radial-gradient(circle at 30% 20%, rgba(var(--primary-rgb), 0.28), rgba(var(--surface-rgb, 255, 255, 255), 0) 60%), var(--surface);
}
.quran-mark {
  position: absolute;
  right: -40px;
  bottom: -30px;
  color: var(--primary);
  opacity: 0.09;
  transform: rotate(-8deg);
}
.art-suraid {
  font-family: var(--font-surah);
  font-size: clamp(64px, 18vw, 100px);
  color: var(--text);
  opacity: 0.85;
  line-height: 1;
}

/* ── title ── */
.fp-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}
.fp-title-info { flex: 1; min-width: 0; }
.fp-title {
  font-family: var(--font-surah);
  font-size: 24px;
  font-weight: 400;
  color: var(--text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fp-artist {
  display: block;
  font-size: 13px;
  color: var(--muted);
  margin-top: 4px;
}
.fp-fav {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: var(--faint);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-fast), transform var(--transition-fast);
}
.fp-fav:hover { transform: scale(1.12); }
.fp-fav.on { color: #f43f5e; }

/* ── slider ── */
.fp-slider {
  position: relative;
  height: 26px;
  display: flex;
  align-items: center;
  margin-top: 6px;
  cursor: pointer;
  touch-action: none;
}
.fp-track {
  height: 3px;
  width: 100%;
  background: rgba(var(--primary-rgb), 0.14);
  border-radius: 999px;
  overflow: visible;
}
.fp-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 999px;
  transition: width 0.1s linear;
}
.fp-thumb {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--surface);
  border: 3px solid var(--primary);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.18);
  transition: inset-inline-start 0.1s linear;
}
.fp-times {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--faint);
  margin-top: 2px;
  font-variant-numeric: tabular-nums;
}

/* ── controls ── */
.fp-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 6px;
}
.fp-ctl {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.fp-ctl:hover { background: rgba(var(--primary-rgb), 0.08); }
.fp-ctl:disabled { opacity: 0.3; cursor: not-allowed; }
.fp-ctl.active { color: var(--primary); }
.fp-ctl.speed {
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-body);
}
.fp-main {
  width: 64px;
  height: 64px;
  border: none;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(var(--primary-rgb), 0.35);
  transition: transform var(--transition-fast);
}
.fp-main:hover { transform: scale(1.06); }
.fp-spin { animation: fpSpin 0.8s linear infinite; }
@keyframes fpSpin { to { transform: rotate(360deg); } }

/* ── extras ── */
.fp-extras {
  display: flex;
  justify-content: space-around;
  margin-top: 22px;
}
.fp-extra {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-body);
}
.fp-extra.on { color: var(--primary); }
.fp-extra-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: currentColor;
}
.fp-extra.on .fp-extra-icon { background: rgba(var(--primary-rgb), 0.12); }

/* ══════ sheets ══════ */
.fp-sheet-pop {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: flex-end;
  backdrop-filter: blur(4px);
}
.fps {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  background: var(--body-bg);
  border-radius: 24px 24px 0 0;
  padding: 12px 20px 34px;
  max-height: 80%;
  overflow-y: auto;
}
:global(html.dark) .fps { background: #0f172a; }
.fps-handle {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: rgba(var(--text-rgb), 0.18);
  margin: 4px auto 16px;
}
.fps h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin: 0 0 18px;
}
.fps-head-row { display: flex; align-items: center; justify-content: space-between; }
.fps-save {
  border: none;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-family: var(--font-body);
}

.fps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.fps-item {
  padding: 14px 0;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.fps-item:hover { border-color: rgba(var(--primary-rgb), 0.4); }
.fps-item.sel {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.fps-sleep-list { display: flex; flex-direction: column; gap: 6px; }
.fps-sleep-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 12px;
  border: var(--border);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}
.fps-sleep-item:hover { border-color: rgba(var(--primary-rgb), 0.4); }
.fps-sleep-item small { color: var(--muted); font-weight: 500; font-size: 11px; }

.fps-queue { display: flex; flex-direction: column; gap: 6px; max-height: 46vh; overflow-y: auto; }
.fps-q-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background var(--transition-fast);
}
.fps-q-item:hover { background: rgba(var(--primary-rgb), 0.05); }
.fps-q-item.cur { background: rgba(var(--primary-rgb), 0.09); }
.fps-q-name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-surah);
  font-size: 18px;
  font-weight: 400;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fps-q-badge {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.fps-new {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: var(--border);
  background: rgba(var(--primary-rgb), 0.05);
  color: var(--text);
  cursor: pointer;
  margin-bottom: 10px;
  font-family: var(--font-body);
}
.add-ic {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(var(--primary-rgb), 0.12);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-tx { display: flex; flex-direction: column; align-items: flex-start; }
.add-tx strong { font-size: 14px; color: var(--text); }
.add-tx small { font-size: 11px; color: var(--muted); }

.fps-pl-list { display: flex; flex-direction: column; gap: 6px; max-height: 40vh; overflow-y: auto; }
.fps-empty { text-align: center; color: var(--faint); font-size: 13px; padding: 18px; }
.fps-pl-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: var(--border);
  background: var(--surface);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}
.fps-pl-item:hover { border-color: rgba(var(--primary-rgb), 0.4); }
.pl-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), rgba(var(--primary-rgb), 0.7));
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pl-name {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pl-count { font-size: 11px; color: var(--muted); flex-shrink: 0; }

.fps-create { display: flex; flex-direction: column; gap: 16px; }
.fps-input {
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
  box-shadow: none;
}
.fps-input:focus { outline: 2px solid rgba(var(--primary-rgb), 0.4); }
.fps-create-actions { display: flex; gap: 12px; }
.fps-cancel {
  flex: 1;
  padding: 14px;
  border: none;
  background: transparent;
  color: var(--primary);
  font-family: var(--font-body);
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
}
.fps-apply {
  flex: 2;
  padding: 14px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
}

/* ── Desktop: the player is a plain section of the page — a column beside the centered content ── */
@media (min-width: 1024px) {
  .full-player {
    position: relative;
    inset: auto;
    grid-area: panel;
    display: block;
    z-index: auto;
    background: transparent;
    backdrop-filter: none;
    pointer-events: auto;
    align-items: unset;
    align-self: start;
  }
  .fp-sheet {
    position: relative;
    width: 380px;
    max-width: none;
    margin: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 12px 22px 22px;
    pointer-events: auto;
  }
  .fp-sheet-pop { align-items: center; justify-content: center; }
  .fps {
    max-width: 420px;
    border-radius: 20px;
    padding-bottom: 22px;
    background: var(--surface);
    border: var(--border);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.14);
  }
  .fps-handle { display: none; }
}
</style>