<template>
  <div
    class="nt"
    :style="{
      borderRadius: radius + 'px',
      backgroundColor: bg,
      margin: margin,
    }"
    @click="onTap"
  >
    <StarNumber :number="number" :color="accent" :size="starSize" />

    <div class="nt-body">
      <div class="nt-title-row">
        <span class="nt-title" :style="titleStyle">{{ title }}</span>
        <span v-if="titleBadge" class="nt-badge" :style="{ color: badgeColor }">{{ titleBadge }}</span>
      </div>
      <span v-if="subtitle" class="nt-subtitle" :style="subtitleStyle">{{ subtitle }}</span>
    </div>

    <div class="nt-trailing">
      <slot name="trailing">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chev"><path d="m15 18-6-6 6-6" /></svg>
      </slot>
    </div>
  </div>
</template>

<script setup>
import StarNumber from './StarNumber.vue'

const props = defineProps({
  number: { type: [String, Number], default: '' },
  accent: { type: String, default: 'var(--primary)' },
  title: { type: String, default: '' },
  titleStyle: { type: Object, default: null },
  titleBadge: { type: String, default: '' },
  badgeColor: { type: String, default: 'var(--primary)' },
  subtitle: { type: String, default: '' },
  subtitleStyle: { type: Object, default: null },
  starSize: { type: Number, default: 40 },
  radius: { type: Number, default: 12 },
  bg: { type: String, default: 'var(--surface)' },
  margin: { type: String, default: '0 0 6px 0' },
  onTap: { type: Function, default: null },
})

const normalizedTitleStyle = computed(() => {
  const base = {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--text)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  return { ...base, ...(props.titleStyle || {}) }
})

const normalizedSubtitleStyle = computed(() => {
  const base = {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(var(--text-rgb), 0.55)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  return { ...base, ...(props.subtitleStyle || {}) }
})

const cursorStyle = computed(() => (props.onTap ? 'pointer' : 'default'))
</script>

<style scoped>
.nt {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: v-bind(cursorStyle);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);
  border: var(--border);
}
.nt:hover {
  border-color: rgba(var(--primary-rgb), 0.4);
  box-shadow: var(--shadow-sm);
}
.nt-body {
  flex: 1;
  min-width: 0;
  padding-inline-start: 12px;
  padding-inline-end: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nt-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.nt-title {
  transition: color var(--transition-fast);
}
.nt-badge {
  flex-shrink: 0;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 700;
  background: rgba(var(--primary-rgb), 0.09);
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
}
.nt-subtitle {
  line-height: 1.5;
}
.nt-trailing {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(var(--text-rgb), 0.2);
}
.chev {
  display: block;
}
</style>