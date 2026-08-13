<template>
  <div class="surah-page">
    <div class="sp-wrap">
      <!-- ══════════ App Bar ══════════ -->
      <header class="sp-appbar">
        <button class="sp-back" aria-label="رجوع" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div class="sp-ab">
          <span>الآن تُشغّل</span>
          <strong>{{ reciter?.name || 'القارئ' }}</strong>
        </div>
        <button class="sp-share" aria-label="مشاركة" @click="share">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </button>
      </header>

      <!-- ══════ States ══════ -->
      <div v-if="loading" class="sp-state">
        <div class="sp-loading"></div>
      </div>
      <div v-else-if="!reciter || !surahId" class="sp-state">
        <p>لم نجد هذه السورة</p>
        <button class="sp-cta" @click="goBack">عودة</button>
      </div>

      <template v-else>
        <!-- ══════════ Artwork ══════════ -->
        <div class="sp-art">
          <StarNumber :number="toArNum(surahId)" color="var(--primary)" :size="26" />
          <svg class="sp-mark" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V4a2 2 0 0 1 2-2h10.9a2 2 0 0 1 2 2v15.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 2h7"/></svg>
        </div>

        <!-- ══════════ Title ══════════ -->
        <h1 class="sp-title">{{ surahName }}</h1>
        <p class="sp-sub">{{ reciter.name }} • {{ isMakki ? 'مكية' : 'مدنية' }} • {{ toArNum(verseCount) }} آيات</p>

        <!-- ══════════ Progress ══════════ -->
        <div class="sp-slider" @pointerdown="startDrag" @pointermove="drag" @pointerup="endDrag" @pointercancel="endDrag">
          <div class="sp-track"><div class="sp-fill" :style="{ width: dragPct }"></div></div>
          <div class="sp-thumb" :style="{ insetInlineStart: dragPct }"></div>
        </div>
        <div class="sp-times">
          <span>{{ toArNum(fmt(dragSec)) }}</span>
          <span>{{ toArNum(fmt(player.duration.value || (isCurrent ? 0 : 0))) }}</span>
        </div>

        <!-- ══════════ Controls ══════════ -->
        <div class="sp-controls">
          <button class="sp-ctl" :class="{ on: loopOn }" aria-label="تكرار السورة" @click="player.cycleLoop">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
          </button>
          <button class="sp-ctl" :disabled="!hasPrev" aria-label="السابق" @click="player.prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
          </button>
          <button class="sp-main" :aria-label="isCurrent && player.isPlaying.value ? 'إيقاف مؤقت' : 'تشغيل'" @click="togglePlay">
            <svg v-if="isCurrent && player.isLoading.value" class="sp-spin" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <svg v-else-if="isCurrent && player.isPlaying.value" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </button>
          <button class="sp-ctl" :disabled="!hasNext" aria-label="التالي" @click="player.next">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
          </button>
          <button class="sp-ctl" :class="{ on: player.playbackRate.value !== 1 }" aria-label="سرعة التشغيل" @click="showSpeed = true">{{ player.playbackRate.value }}x</button>
        </div>

        <!-- ══════════ Favorites + playlist ══════════ -->
        <div class="sp-actions">
          <button class="sp-act" :class="{ on: isFav }" @click="toggleFav">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span>{{ isFav ? 'في المفضلة' : 'أضف للمفضلة' }}</span>
          </button>
          <button class="sp-act" @click="showAdd = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
            <span>إضافة لقائمة</span>
          </button>
        </div>

        <!-- ══════════ Queue ══════════ -->
        <div class="sp-queue-head">
          <h3>سور القارئ</h3>
          <span>{{ toArNum(surahIds.length) }} سورة</span>
        </div>
        <div class="sp-queue">
          <button
            v-for="s in surahIds"
            :key="s"
            :class="['sp-q', { cur: isCurrentSurah(s), now: isCurrentSurah(s) && player.isPlaying.value }]"
            @click="playSurah(s)"
          >
            <StarNumber :number="toArNum(s)" color="var(--primary)" :size="34" />
            <span class="sp-q-name">{{ surahNameOf(s) }}</span>
            <span class="sp-q-sub">{{ isMakkiOf(s) ? 'مكية' : 'مدنية' }} • {{ toArNum(surahVerseCount(s)) }} آيات</span>
            <span class="sp-q-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </span>
          </button>
        </div>
      </template>
    </div>

    <!-- ══════ Speed sheet ══════ -->
    <div v-if="showSpeed" class="sp-sheet" @click.self="showSpeed = false">
      <div class="sp-pop">
        <div class="sp-handle"></div>
        <h3>سرعة التشغيل</h3>
        <div class="sp-speed-grid">
          <button v-for="s in speeds" :key="s" :class="['sp-speed', { sel: player.playbackRate.value === s }]" @click="player.setRate(s); showSpeed = false">{{ s }}x</button>
        </div>
      </div>
    </div>

    <!-- ══════ Add to playlist sheet ══════ -->
    <div v-if="showAdd" class="sp-sheet" @click.self="showAdd = false">
      <div class="sp-pop">
        <div class="sp-handle"></div>
        <h3>إضافة لقائمة تشغيل</h3>
        <button class="sp-new" @click="newNameSheet = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <span>إنشاء قائمة جديدة</span>
        </button>
        <div class="sp-pl-list">
          <div v-if="store.playlists.value.length === 0" class="sp-empty">لا توجد قوائم تشغيل بعد</div>
          <button v-for="pl in store.playlists.value" :key="pl.id" class="sp-pl" @click="addCurrent(pl.id); showAdd = false">
            <span>{{ pl.name }}</span>
            <small>{{ toArNum(pl.items.length) }} عنصر</small>
          </button>
        </div>
      </div>
    </div>

    <!-- ══════ Create playlist ══════ -->
    <div v-if="newNameSheet" class="sp-sheet" @click.self="newNameSheet = false">
      <div class="sp-pop">
        <div class="sp-handle"></div>
        <h3>قائمة تشغيل جديدة</h3>
        <input v-model="newName" class="sp-input" placeholder="اسم القائمة" @keyup.enter="confirmCreate" />
        <div class="sp-actions">
          <button class="sp-cancel" @click="newNameSheet = false">إلغاء</button>
          <button class="sp-apply" @click="confirmCreate">إنشاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAudioPlayer } from '~/composables/useAudioPlayer'
import { useAudioLibraryStore } from '~/composables/useAudioLibraryStore'
import { resolveReciter, reciterSlug } from '~/utils/reciterSlug'
import { recitationLink } from '~/utils/shareLinks'
import { surahVerseCount } from '~/utils/surahVerses'
import StarNumber from '~/components/AudioLibrary/StarNumber.vue'

const route = useRoute()
const router = useRouter()

const player = useAudioPlayer()
const store = useAudioLibraryStore()
const toArNum = player.toArabicDigits
const fmt = player.formatTime

const loading = ref(true)
const reciters = ref([])
const suwar = ref([])
const showSpeed = ref(false)
const showAdd = ref(false)
const newNameSheet = ref(false)
const newName = ref('')
const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

const load = async () => {
  loading.value = true
  try {
    const [rRes, sRes] = await Promise.all([
      $fetch('/api/mp3quran/reciters'),
      $fetch('/api/mp3quran/suwar'),
    ])
    reciters.value = rRes.reciters || []
    suwar.value = sRes.suwar || []
  } catch (e) {
    reciters.value = []
    suwar.value = []
  } finally {
    loading.value = false
  }
}
onMounted(async () => {
  await load()
  // القادم من رابط مشاركة (`?autoplay=1`) جاء ليسمع، لا ليضغط تشغيل من جديد.
  if (route.query.autoplay && moshaf.value && surahId.value) {
    playSurah(surahId.value)
  }
})

const reciter = computed(() => resolveReciter(reciters.value, route.params.reciter))
const surahId = computed(() => parseInt(route.params.surah, 10) || null)

// للقارئ الواحد عدة مصاحف/روايات بخوادم وقوائم سور مختلفة. رابط المشاركة
// القادم من التطبيق يحمل `moshafId`، فنفتح الرواية نفسها لا أول واحدة.
const moshaf = computed(() => {
  const list = reciter.value?.moshaf || []
  if (!list.length) return null
  const wanted = parseInt(route.query.moshafId, 10)
  return list.find((m) => m.id === wanted) || list[0]
})
const surahIds = computed(() =>
  String(moshaf.value?.surahList || '')
    .split(',')
    .map((n) => parseInt(n, 10))
    .filter(Boolean),
)
const surahNameOf = (id) => suwar.value.find((s) => s.id === id)?.name || `سورة ${id}`
const surahName = computed(() => surahNameOf(surahId.value))
const isMakkiOf = (id) => !!suwar.value.find((s) => s.id === id)?.makkia
const isMakki = computed(() => isMakkiOf(surahId.value))
const verseCount = computed(() => surahVerseCount(surahId.value))

const trackUrl = computed(() => {
  const s = surahId.value
  if (!s || !moshaf.value) return ''
  return `${moshaf.value.server}${String(s).padStart(3, '0')}.mp3`
})

const isCurrent = computed(() => player.currentTrack.value?.url === trackUrl.value)

const buildQueue = () => {
  if (!moshaf.value) return []
  return surahIds.value.map((id) => ({
    url: `${moshaf.value.server}${String(id).padStart(3, '0')}.mp3`,
    title: surahNameOf(id),
    subtitle: reciter.value.name,
    surahId: id,
    reciterId: reciter.value.id,
    reciterSlug: reciterSlug(reciter.value),
    // يسافر مع المقطع ليخرج في رابط المشاركة، فيفتح عند المستقبِل نفس الرواية.
    moshafId: moshaf.value.id,
    type: 'surah',
  }))
}

const findIndex = () => surahIds.value.indexOf(surahId.value)
const hasPrev = computed(() => findIndex() > 0)
const hasNext = computed(() => findIndex() < surahIds.value.length - 1)

const togglePlay = () => {
  if (isCurrent.value) {
    if (player.isPlaying.value) player.togglePlay()
    else player.togglePlay()
    return
  }
  if (!moshaf.value) return
  const queue = buildQueue()
  const track = queue.find((t) => t.surahId === surahId.value)
  player.playTrack(track, queue)
}

const playSurah = (s) => {
  if (!moshaf.value) return
  const queue = buildQueue()
  const track = queue.find((t) => t.surahId === s)
  player.playTrack(track, queue)
}

const isCurrentSurah = (s) => isCurrent.value && player.currentTrack.value?.surahId === s

const loopOn = computed(() => player.loopMode.value === 'one')

// favorites
const isFav = computed(() => reciter.value && store.isFavoriteSurah(reciter.value.id, surahId.value))
const toggleFav = () => {
  if (reciter.value) store.toggleFavoriteSurah(reciter.value.id, surahId.value)
}

// progress slider
const dragging = ref(false)
const dragSec = ref(0)
const dragPct = computed(() => {
  if (dragging.value) {
    const dur = player.duration.value || 0
    return dur ? `${(dragSec.value / dur) * 100}%` : '0%'
  }
  if (!isCurrent.value) return '0%'
  const dur = player.duration.value || 0
  return dur ? `${(player.currentTime.value / dur) * 100}%` : '0%'
})
const startDrag = (e) => {
  dragging.value = true
  dragSec.value = player.currentTime.value
  e.currentTarget.setPointerCapture(e.pointerId)
}
const drag = (e) => {
  if (!dragging.value) return
  const dur = player.duration.value || 0
  if (!dur) return
  const rect = e.currentTarget.getBoundingClientRect()
  let pct = (e.clientX - rect.left) / rect.width
  if (getComputedStyle(document.documentElement).direction === 'rtl') pct = 1 - pct
  dragSec.value = Math.max(0, Math.min(dur, pct * dur))
}
const endDrag = () => {
  if (!dragging.value) return
  dragging.value = false
  if (isCurrent.value) player.seek(dragSec.value)
}

const addCurrent = (plId) => {
  if (!reciter.value) return
  store.addToPlaylist(plId, {
    reciterId: reciter.value.id,
    reciterName: reciter.value.name,
    reciterSlug: reciterSlug(reciter.value),
    surahId: surahId.value,
    surahName: surahName.value,
    moshafId: moshaf.value?.id,
    url: trackUrl.value,
  })
}
const confirmCreate = () => {
  const name = newName.value.trim()
  if (!name) return
  const pl = store.createPlaylist(name)
  addCurrent(pl.id)
  newName.value = ''
  newNameSheet.value = false
  showAdd.value = false
}

const share = () => {
  // نشارك الرابط العميق نفسه الذي يشاركه التطبيق: يفتح التطبيق عند من يملكه،
  // ويهبط بالباقين على صفحة تعرض التلاوة وتشغّلها هنا.
  const url = recitationLink({
    reciterId: reciter.value?.id,
    surahId: surahId.value,
    moshafId: moshaf.value?.id,
  })
  const payload = {
    title: `سورة ${surahName.value}`,
    text: `${surahName.value} - ${reciter.value?.name}`,
    url,
  }
  if (navigator.share) navigator.share(payload).catch(() => {})
  else if (navigator.clipboard) navigator.clipboard.writeText(url)
}

const goBack = () => {
  if (reciter.value) router.push(`/listen/${reciterSlug(reciter.value)}`)
  else router.push('/listen')
}

useHead(() => ({
  title: reciter.value && surahName.value ? `سورة ${surahName.value} | ${reciter.value.name} | مُناجاتك` : 'المكتبة الصوتية | مُناجاتك',
}))
</script>

<style scoped>
.surah-page {
  min-height: 100vh;
  padding: 0 0 80px;
  background: var(--body-bg);
}
.sp-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
}
.sp-appbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 8px;
}
.sp-back, .sp-share {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 12px;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.sp-back:hover, .sp-share:hover { background: rgba(var(--primary-rgb), 0.08); color: var(--primary); }
.sp-ab { text-align: center; display: flex; flex-direction: column; }
.sp-ab span { font-size: 11px; color: var(--muted); }
.sp-ab strong { font-size: 14px; color: var(--text); }

.sp-state { padding: 80px 0; text-align: center; color: var(--muted); display: flex; flex-direction: column; gap: 16px; align-items: center; }
.sp-loading {
  width: 44px; height: 44px; border-radius: 50%;
  border: 3px solid rgba(var(--primary-rgb), 0.2);
  border-top-color: var(--primary);
  animation: spspin 0.8s linear infinite;
}
@keyframes spspin { to { transform: rotate(360deg); } }
.sp-cta {
  padding: 10px 22px; border: none; border-radius: 12px;
  background: var(--primary); color: #fff; cursor: pointer; font-family: var(--font-body);
}

.sp-art {
  position: relative;
  width: 200px; height: 200px;
  margin: 18px auto 22px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.16), rgba(var(--primary-rgb), 0.04));
  border: 1px solid rgba(var(--primary-rgb), 0.18);
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
}
.sp-mark { position: absolute; inset: 0; margin: auto; opacity: 0.5; }
.sp-art :deep(.star-text) { color: var(--primary); }

.sp-title {
  font-family: var(--font-surah);
  font-size: 34px;
  font-weight: 600;
  color: var(--text);
  text-align: center;
  margin: 0;
}
.sp-sub { text-align: center; color: var(--muted); font-size: 13px; margin: 6px 0 0; }

.sp-slider {
  position: relative;
  height: 28px;
  display: flex;
  align-items: center;
  margin-top: 22px;
  cursor: pointer;
  touch-action: none;
}
.sp-track { width: 100%; height: 6px; border-radius: 999px; background: rgba(var(--text-rgb), 0.14); }
.sp-fill { height: 100%; border-radius: 999px; background: var(--primary); }
.sp-thumb {
  position: absolute;
  width: 16px; height: 16px; border-radius: 50%;
  background: #fff; border: 2px solid var(--primary);
  transform: translate(-50%, -50%);
  top: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.sp-times { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); font-family: var(--font-body); }

.sp-controls { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 14px; }
.sp-ctl {
  width: 46px; height: 46px; border: none; border-radius: 50%;
  background: var(--surface); color: var(--muted);
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  transition: all var(--transition-fast);
}
.sp-ctl:hover { color: var(--primary); }
.sp-ctl.on { color: var(--primary); background: rgba(var(--primary-rgb), 0.1); }
.sp-ctl:disabled { opacity: 0.35; cursor: default; }
.sp-main {
  width: 66px; height: 66px; border: none; border-radius: 50%;
  background: var(--primary); color: #fff;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 8px 24px rgba(var(--primary-rgb), 0.35);
  transition: transform var(--transition-fast);
}
.sp-main:hover { transform: scale(1.05); }
.sp-spin { animation: spspin 0.8s linear infinite; }

.sp-actions { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
.sp-act {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 18px; border-radius: 999px;
  border: var(--border); background: var(--surface);
  color: var(--muted); font-family: var(--font-body); font-size: 13px; cursor: pointer;
  transition: all var(--transition-fast);
}
.sp-act.on { color: var(--primary); border-color: rgba(var(--primary-rgb), 0.4); background: rgba(var(--primary-rgb), 0.08); }

.sp-queue-head {
  display: flex; align-items: center; justify-content: space-between;
  margin: 26px 0 8px;
}
.sp-queue-head h3 { font-size: 15px; color: var(--text); margin: 0; }
.sp-queue-head span { font-size: 12px; color: var(--muted); }
.sp-queue { display: flex; flex-direction: column; gap: 6px; }
.sp-q {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 12px;
  background: var(--surface); border: var(--border);
  font-family: var(--font-body); text-align: start; cursor: pointer;
  transition: border-color var(--transition-fast);
}
.sp-q:hover { border-color: rgba(var(--primary-rgb), 0.35); }
.sp-q.cur { border-color: rgba(var(--primary-rgb), 0.5); }
.sp-q-name { font-size: 16px; font-weight: 600; color: var(--text); font-family: var(--font-quran); }
.sp-q-sub { font-size: 11px; color: var(--muted); flex: 1; }
.sp-q-play { color: var(--muted); display: flex; }
.sp-q.now .sp-q-play { color: var(--primary); }

/* sheets */
.sp-sheet {
  position: fixed; inset: 0; z-index: 210;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  display: flex; align-items: flex-end; justify-content: center;
}
.sp-pop {
  width: 100%; max-width: 560px;
  background: var(--body-bg);
  border-radius: 24px 24px 0 0;
  padding: 12px 24px calc(30px + env(safe-area-inset-bottom));
  max-height: 80vh; overflow-y: auto;
}
:global(html.dark) .sp-pop { background: #0f172a; }
.sp-handle {
  width: 40px; height: 4px; border-radius: 999px;
  background: rgba(var(--text-rgb), 0.18);
  margin: 4px auto 16px;
}
.sp-pop h3 { font-size: 16px; margin: 0 0 14px; color: var(--text); }
.sp-speed-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.sp-speed {
  padding: 14px; border-radius: 12px;
  border: var(--border); background: var(--surface);
  color: var(--text); font-family: var(--font-body); font-size: 15px; cursor: pointer;
}
.sp-speed.sel { background: rgba(var(--primary-rgb), 0.1); border-color: var(--primary); color: var(--primary); }
.sp-new {
  display: flex; align-items: center; gap: 12px;
  width: 100%; padding: 12px; border-radius: 12px; margin-bottom: 10px;
  border: 1px dashed rgba(var(--primary-rgb), 0.4);
  background: rgba(var(--primary-rgb), 0.05);
  color: var(--primary); font-family: var(--font-body); font-size: 14px; cursor: pointer;
}
.sp-pl-list { display: flex; flex-direction: column; gap: 6px; }
.sp-pl {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px; border-radius: 12px;
  border: var(--border); background: var(--surface);
  color: var(--text); font-family: var(--font-body); font-size: 14px; cursor: pointer;
  width: 100%;
}
.sp-pl small { color: var(--muted); font-size: 11px; }
.sp-empty { text-align: center; color: var(--muted); padding: 20px 0; }
.sp-input {
  width: 100%; padding: 12px 14px; border-radius: 12px;
  border: var(--border); background: var(--surface);
  color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none;
}
.sp-input:focus { box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2); }
.sp-actions { display: flex; gap: 10px; margin-top: 14px; }
.sp-cancel, .sp-apply {
  flex: 1; padding: 11px; border-radius: 12px;
  font-family: var(--font-body); font-size: 14px; cursor: pointer;
}
.sp-cancel { border: var(--border); background: transparent; color: var(--muted); }
.sp-apply { border: none; background: var(--primary); color: #fff; }

@media (min-width: 1024px) {
  .sp-sheet { align-items: center; }
  .sp-pop { max-width: 420px; border-radius: 20px; padding-bottom: 22px; }
  .sp-handle { display: none; }
}
</style>