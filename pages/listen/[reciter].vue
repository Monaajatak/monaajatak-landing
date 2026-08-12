<template>
  <NuxtPage v-if="isSurahChild" />

  <div v-else class="alt-page" :class="{ 'has-panel': fullPlayerOpen }">
    <!-- ══════════ App Bar ══════════ -->
    <header class="alt-appbar">
      <div class="ab-text">
        <h1 class="ab-title">{{ reciter?.name || 'القارئ' }}</h1>
        <span v-if="reciter" class="ab-subtitle">{{ moshaf?.name }} • {{ toArNum(surahCount) }} سورة</span>
      </div>
      <button class="ab-action" aria-label="رجوع" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    </header>

    <!-- ══════════ Loading ══════════ -->
    <div v-if="loading" class="alt-state">
      <div class="skel-list">
        <div v-for="i in 8" :key="i" class="skel-tile">
          <div class="skel-star"></div>
          <div class="skel-lines"><i></i><i></i></div>
        </div>
      </div>
    </div>

    <!-- ══════════ Not found ══════════ -->
    <div v-else-if="!reciter" class="alt-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
      <p>لم نجد هذا القارئ</p>
      <button class="btn btn-primary" @click="goBack">العودة للمكتبة</button>
    </div>

    <!-- ══════════ Surah list ══════════ -->
    <div v-else class="alt-content">
      <SurahListView :reciter="reciter" :suwar="suwar" @open="fullPlayerOpen = true" />
    </div>

    <MiniPlayer v-if="player.currentTrack.value && !fullPlayerOpen" @open="fullPlayerOpen = true" />
    <FullPlayer v-if="fullPlayerOpen" @close="fullPlayerOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAudioPlayer } from '~/composables/useAudioPlayer'
import { resolveReciter } from '~/utils/reciterSlug'
import SurahListView from '~/components/AudioLibrary/SurahListView.vue'
import MiniPlayer from '~/components/AudioLibrary/MiniPlayer.vue'
import FullPlayer from '~/components/AudioLibrary/FullPlayer.vue'

const route = useRoute()
const router = useRouter()
const player = useAudioPlayer()
const toArNum = player.toArabicDigits

const isSurahChild = computed(() => route.name === 'listen-reciter-surah')

const loading = ref(true)
const reciters = ref([])
const suwar = ref([])
const fullPlayerOpen = ref(false)

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

onMounted(() => {
  if (!isSurahChild.value) load()
})

const reciter = computed(() => resolveReciter(reciters.value, route.params.reciter))
const moshaf = computed(() => reciter.value?.moshaf?.[0] || null)
const surahCount = computed(() => moshaf.value?.surahTotal || 0)

useHead(() => {
  if (isSurahChild.value) return {}
  return {
    title: reciter.value ? `${reciter.value.name} | المكتبة الصوتية | مُناجاتك` : 'المكتبة الصوتية | مُناجاتك',
    meta: [
      { name: 'description', content: reciter.value ? `استمع لسور القرآن الكريم بصوت القارئ ${reciter.value.name}.` : '' }
    ]
  }
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/listen')
}
</script>

<style scoped>
.alt-page {
  min-height: 100vh;
  position: relative;
  padding: 0 0 120px;
  background: var(--body-bg);
}

/* ══════ App bar ══════ */
.alt-appbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 720px;
  margin: 0 auto;
  padding: 16px 20px 0;
}
.ab-text { min-width: 0; }
.ab-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ab-subtitle { font-size: 12px; color: var(--muted); }
.ab-action {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--muted);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.ab-action:hover { background: rgba(var(--primary-rgb), 0.08); color: var(--primary); }

/* ══════ content ══════ */
.alt-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ══════ states ══════ */
.alt-state {
  max-width: 720px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  text-align: center;
}
.skel-list { width: 100%; display: flex; flex-direction: column; gap: 8px; }
.skel-tile {
  height: 62px;
  border-radius: 12px;
  background: var(--surface);
  border: var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
}
.skel-star {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(var(--text-rgb), 0.06);
  animation: sk 1.3s ease-in-out infinite;
}
.skel-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.skel-lines i { height: 10px; border-radius: 6px; background: rgba(var(--text-rgb), 0.08); animation: sk 1.3s ease-in-out infinite; }
.skel-lines i:last-child { width: 60%; }
@keyframes sk { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

/* desktop: two-column page (CSS Grid) — appbar/content aligned together on the left,
   the player sticky on the physical right; the whole unit stays centered */
@media (min-width: 1024px) {
  .alt-page {
    display: grid;
    justify-content: center;
    column-gap: 24px;
    grid-template-columns: minmax(0, 720px);
    grid-template-areas:
      'appbar'
      'content';
  }
  .alt-page.has-panel {
    grid-template-columns: 380px minmax(0, 720px);
    grid-template-areas:
      'panel appbar'
      'panel content';
  }
  .alt-appbar { grid-area: appbar; max-width: none; margin-inline: 0; }
  .alt-content, .alt-state { grid-area: content; max-width: none; margin-inline: 0; }
}
</style>