<template>
  <div class="mini-player" @click="$emit('open')" role="button" tabindex="0">
    <div class="mp-progress">
      <div class="mp-progress-fill" :style="{ width: player.progressPercent.value + '%' }"></div>
    </div>

    <div class="mp-content">
      <div class="mp-art" :class="{ live: isLive }">
        <svg v-if="isLive" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V4a2 2 0 0 1 2-2h8.5a2 2 0 0 1 2 2v15.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 2h7"/></svg>
      </div>

      <div class="mp-info">
        <span class="mp-title">{{ track.title }}</span>
        <span class="mp-sub">
          <i v-if="isLive" class="live-dot"></i>
          {{ track.subtitle }}
        </span>
      </div>

      <div class="mp-controls">
        <button class="mp-btn mp-play" :aria-label="player.isPlaying.value ? 'إيقاف' : 'تشغيل'" @click.stop="playPause">
          <svg v-if="player.isLoading.value" class="mp-spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <svg v-else-if="player.isPlaying.value" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </button>

        <button v-if="!isLive" class="mp-btn" :disabled="!hasNext" aria-label="التالي" @click.stop="player.next">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
        </button>

        <button class="mp-btn mp-close" aria-label="إغلاق" @click.stop="player.stop">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAudioPlayer } from '~/composables/useAudioPlayer'

defineEmits(['open'])

const player = useAudioPlayer()

const track = computed(() => player.currentTrack.value || { title: '', subtitle: '' })
const isLive = computed(() => player.currentTrack.value?.type === 'radio')
const hasNext = computed(() => player.currentIndex.value < player.currentQueue.value.length - 1)

const playPause = () => player.togglePlay()
</script>

<style scoped>
.mini-player {
  position: fixed;
  bottom: 14px;
  left: 12px;
  right: 12px;
  z-index: 120;
  max-width: 720px;
  margin: 0 auto;
  border-radius: 22px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(0, 162, 181, 0.16);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  cursor: pointer;
  transition: box-shadow var(--transition-fast);
}
.mini-player:hover { box-shadow: 0 16px 48px rgba(15, 23, 42, 0.24); }

:global(html.dark) .mini-player {
  background: rgba(30, 41, 59, 0.78);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

.mp-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0, 162, 181, 0.15);
}
.mp-progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 0 999px 999px 0;
  transition: width 0.3s linear;
}

.mp-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 14px;
}

.mp-art {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  background: linear-gradient(135deg, rgba(0, 162, 181, 0.15), rgba(0, 162, 181, 0.05));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.mp-art.live {
  background: linear-gradient(135deg, var(--primary), rgba(0, 162, 181, 0.65));
  color: #fff;
}

.mp-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.mp-title {
  font-family: var(--font-surah);
  font-size: 16px;
  font-weight: 400;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mp-sub {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.live-dot {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
  animation: livePulse 1.5s infinite;
}
@keyframes livePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.mp-controls {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
.mp-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.mp-btn:hover { background: rgba(var(--primary-rgb), 0.08); color: var(--primary); }
.mp-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.mp-close { color: rgba(var(--text-rgb), 0.4); }
.mp-spinner { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>