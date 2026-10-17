<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    /** Card title */
    title: string
    /** Card description */
    description?: string
    /** Overflowing image source (e.g. 3D icon or screenshot) */
    imageSrc?: string
    /** Alt text for the image */
    imageAlt?: string
    /** Custom class for the overflow image element */
    imageClass?: string
    /** Top badge icon component */
    badgeIcon?: Component
    /** Enable subtle Islamic geometric watermark pattern background */
    hasPattern?: boolean
    /** Additional wrapper class */
    wrapperClass?: string
  }>(),
  {
    description: '',
    imageSrc: '',
    imageAlt: '',
    imageClass: '',
    badgeIcon: undefined,
    hasPattern: false,
    wrapperClass: '',
  },
)
</script>

<template>
  <div
    class="group hover:shadow-primary/5 relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-5 pt-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
    :class="wrapperClass"
  >
    <!-- Background Watermark Pattern (Optional) -->
    <div
      v-if="hasPattern"
      class="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-[0.06]"
      aria-hidden="true"
    >
      <svg
        class="text-primary h-full w-full"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="islamic-card-star"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            viewBox="0 0 120 120"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M0 40 L40 40 L40 0 M80 0 L80 40 L120 40 M120 80 L80 80 L80 120 M40 120 L40 80 L0 80"
              />
              <path
                d="M60 20 L75 35 L95 25 L85 45 L100 60 L85 75 L95 95 L75 85 L60 100 L45 85 L25 95 L35 75 L20 60 L35 45 L25 25 L45 35 Z"
              />
            </g>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#islamic-card-star)"
        />
      </svg>
    </div>

    <!-- Top Row: Overflow Image on Left & Badge Icon on Right (in RTL) -->
    <div class="relative flex w-full items-start justify-between">
      <!-- Top Icon Badge (Top-Right in RTL) -->
      <div class="relative z-10 shrink-0">
        <slot name="badge">
          <div
            v-if="badgeIcon || $slots.badge"
            class="text-primary group-hover:border-primary/40 flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/50 transition-colors duration-200 group-hover:bg-blue-100"
          >
            <component
              :is="badgeIcon"
              v-if="badgeIcon"
              class="h-4.5 w-4.5"
            />
          </div>
        </slot>
      </div>
      <!-- Overflow Image / Slot (Top-Left in RTL) -->
      <div class="pointer-events-none z-10 shrink-0">
        <slot name="image">
          <div
            v-if="imageSrc"
            class="absolute -inset-e-14 -top-10 transition-transform duration-300 group-hover:scale-105"
            :class="imageClass || 'h-24 w-28'"
          >
            <img
              :src="imageSrc"
              :alt="imageAlt || title"
              class="h-full w-full object-contain drop-shadow-md"
            />
          </div>
        </slot>
      </div>

      <!-- Spacer to maintain height for overflowing content -->
      <div
        class="h-10 w-16 shrink-0"
        aria-hidden="true"
      />
    </div>

    <!-- Text Content -->
    <div class="relative z-10 mt-5 flex flex-col">
      <h3 class="text-secondary text-lg font-black tracking-tight">
        <slot name="title">{{ title }}</slot>
      </h3>
      <p
        v-if="description || $slots.description"
        class="text-grey-600 mt-1.5 text-xs leading-relaxed"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
  </div>
</template>
