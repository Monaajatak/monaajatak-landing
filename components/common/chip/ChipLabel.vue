<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    /** The label text */
    text?: string
    /** Icon component to prepend */
    icon?: Component
    /** Color variant: filled (teal), outlined, or subtle/tonal */
    variant?: 'filled' | 'outlined' | 'subtle'
    /** Optional custom background / text color classes */
    colorClass?: string
  }>(),
  {
    text: '',
    icon: undefined,
    variant: 'filled',
    colorClass: '',
  },
)
</script>

<template>
  <div
    class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-200 select-none"
    :class="[
      colorClass,
      variant === 'filled' && !colorClass
        ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/25 hover:bg-blue-600'
        : '',
      variant === 'outlined' && !colorClass
        ? 'border border-blue-500 text-blue-500 hover:bg-blue-50'
        : '',
      variant === 'subtle' && !colorClass
        ? 'bg-blue-50 text-blue-500 hover:bg-blue-100'
        : '',
    ]"
  >
    <slot name="icon">
      <!-- Default asterisk / star icon if no custom icon provided -->
      <component
        :is="icon"
        v-if="icon"
        class="h-4 w-4 shrink-0"
      />
      <svg
        v-else
        class="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"
        />
      </svg>
    </slot>

    <span>
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>
