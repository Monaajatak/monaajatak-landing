<template>
  <div class="islamic-star" :style="{ width: size + 'px', height: size + 'px' }">
    <svg viewBox="0 0 44 44" width="100%" height="100%" :aria-label="`رقم ${number}`">
      <g fill="none">
        <rect :x="sq" :y="sq" :width="sw" :height="sw" :stroke="color" :stroke-opacity="0.55" stroke-width="1" />
        <rect :x="sq" :y="sq" :width="sw" :height="sw" :stroke="color" :stroke-opacity="0.55" stroke-width="1" transform="rotate(45 22 22)" />
        <circle cx="22" cy="22" r="8.82" :stroke="color" :stroke-opacity="0.35" stroke-width="0.8" />
        <circle cx="22" cy="22" r="20.58" :stroke="color" :stroke-opacity="0.2" stroke-width="0.6" />
      </g>
      <g fill-opacity="0.5">
        <circle v-for="i in 8" :key="i" :cx="22 + 18.48 * Math.cos(i * Math.PI / 4 - Math.PI / 2)" :cy="22 + 18.48 * Math.sin(i * Math.PI / 4 - Math.PI / 2)" :r="0.84" :fill="color" />
      </g>
    </svg>
    <span class="star-text" :style="{ fontSize: size * 0.3 + 'px', color }">{{ number }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  number: { type: [String, Number], default: '' },
  color: { type: String, default: '#00A2B5' },
  size: { type: Number, default: 40 },
})

const sq = 8.93
const sw = 26.13
</script>

<style scoped>
.islamic-star {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  user-select: none;
}
.islamic-star svg {
  position: absolute;
  inset: 0;
}
.star-text {
  position: relative;
  font-family: var(--font-body);
  font-weight: 800;
  line-height: 1;
}
</style>