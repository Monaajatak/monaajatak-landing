<template>
  <div class="slv">
    <div class="search-row">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input v-model="surahQuery" type="text" :placeholder="`ابحث في سور ${reciter.name}...`" />
        <button v-if="surahQuery" class="search-clear" aria-label="مسح" @click="surahQuery = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>

    <div v-if="filteredSurahs.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <p>لا توجد نتائج</p>
    </div>

    <div class="nt-list">
      <NumberedTile
        v-for="s in filteredSurahs"
        :key="s"
        :number="toArNum(s)"
        accent="var(--primary)"
        :title="surahName(s)"
        :title-style="surahTitleStyle"
        :subtitle="`${isMakki(s) ? 'مكية' : 'مدنية'} • ${toArNum(verseCount(s))} آيات`"
        :on-tap="() => playSurah(s)"
      >
        <template #trailing>
          <span :class="['surah-play', { on: isCurrentSurah(s) }]">
            <svg v-if="isCurrentSurah(s) && player.isPlaying.value" class="eq" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V4a2 2 0 0 1 2-2h10.9a2 2 0 0 1 2 2v15.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 2h7"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </span>
        </template>
      </NumberedTile>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAudioPlayer } from '~/composables/useAudioPlayer'
import { surahVerseCount } from '~/utils/surahVerses'
import { reciterSlug } from '~/utils/reciterSlug'
import NumberedTile from './NumberedTile.vue'

const props = defineProps({
  reciter: { type: Object, required: true },
  suwar: { type: Array, default: () => [] },
  moshaf: { type: Object, default: null },
})

const player = useAudioPlayer()

const toArNum = player.toArabicDigits
const moshaf = computed(() => props.moshaf || props.reciter?.moshaf?.[0] || null)
const surahIds = computed(() =>
  String(moshaf.value?.surahList || '')
    .split(',')
    .map((n) => parseInt(n, 10))
    .filter(Boolean),
)
const surahName = (id) => props.suwar.find((s) => s.id === id)?.name || `سورة ${id}`
const isMakki = (id) => props.suwar.find((s) => s.id === id)?.makkia ?? false
const verseCount = (id) => surahVerseCount(id)

const surahTitleStyle = {
  fontFamily: 'var(--font-surah)',
  fontSize: '26px',
  fontWeight: 400,
  color: 'var(--text)',
}

const surahQuery = ref('')
const filteredSurahs = computed(() => {
  const q = surahQuery.value.trim()
  if (!q) return surahIds.value
  return surahIds.value.filter((id) => surahName(id).includes(q) || String(toArNum(id)).includes(q))
})

const isCurrentSurah = (s) => {
  const cur = player.currentTrack.value?.url
  return !!cur && cur.includes(`/${String(s).padStart(3, '0')}.mp3`)
}

const emit = defineEmits(['open'])

const playSurah = (s) => {
  if (!moshaf.value) return
  const server = moshaf.value.server
  const queue = surahIds.value.map((id) => ({
    url: `${server}${String(id).padStart(3, '0')}.mp3`,
    title: surahName(id),
    subtitle: props.reciter.name,
    surahId: id,
    reciterId: props.reciter.id,
    reciterSlug: reciterSlug(props.reciter),
    // يسافر مع المقطع ليخرج في رابط المشاركة، فيفتح عند المستقبِل نفس الرواية.
    moshafId: moshaf.value.id,
    type: 'surah',
  }))
  const track = queue.find((t) => t.surahId === s)
  player.playTrack(track, queue)
  emit('open')
}
</script>

<style scoped>
.search-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 12px;
  background: var(--surface);
  border-radius: 10px;
  color: var(--faint);
}
.search-box:focus-within { box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.18); }
.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
}
.search-box input::placeholder { color: var(--faint); }
.search-clear {
  border: none;
  background: transparent;
  color: var(--faint);
  display: flex;
  padding: 4px;
  cursor: pointer;
}
.surah-play {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: var(--border);
  color: var(--muted);
}
.surah-play.on { background: var(--primary); border-color: var(--primary); color: #fff; }
.eq { animation: eqPulse 1.1s ease-in-out infinite; }
@keyframes eqPulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
</style>