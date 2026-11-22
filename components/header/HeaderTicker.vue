<script setup lang="ts">
import { computed } from 'vue'

const { t, locale } = useI18n()

const isRTL = computed(() => locale.value === 'ar')

const tickerKeys = [
  'item1',
  'item2',
  'item3',
  'item4',
  'item5',
  'item6',
  'item7',
  'item8',
  'item9',
  'item10',
] as const

const tickerItems = computed<string[]>(() =>
  tickerKeys.map(k => t(`ticker.items.${k}`)),
)
</script>

<template>
  <div
    class="ticker-bar bg-secondary! relative w-full overflow-hidden py-3 text-white/90 shadow-inner select-none"
    dir="ltr"
    aria-label="Announcement Bar"
  >
    <div class="flex w-max items-center">
      <!-- Two sibling groups running the same marquee animation for seamless infinite loop -->
      <div
        v-for="group in 2"
        :key="group"
        class="animate-ticker-marquee flex shrink-0 items-center"
        :aria-hidden="group === 2 ? 'true' : undefined"
      >
        <div
          v-for="(item, idx) in tickerItems"
          :key="idx"
          class="flex items-center"
        >
          <!-- Cyan / teal dot separator -->
          <span
            class="mx-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00a2b5] sm:mx-4"
            aria-hidden="true"
          />
          <span
            class="text-xs font-medium tracking-wide whitespace-nowrap text-slate-200 sm:text-[13px]"
            :dir="isRTL ? 'rtl' : 'ltr'"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
