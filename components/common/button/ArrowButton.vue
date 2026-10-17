<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Internal route target */
    to?: string
    /** External URL target */
    href?: string
    /** Arrow direction: 'auto' (respects RTL), 'left', or 'right' */
    direction?: 'auto' | 'left' | 'right'
    /** Size of the circular button */
    size?: 'sm' | 'md' | 'lg'
    /** Accessible label for screen readers */
    ariaLabel?: string
    /** Disabled state */
    disabled?: boolean
  }>(),
  {
    to: undefined,
    href: undefined,
    direction: 'auto',
    size: 'md',
    ariaLabel: 'سهم الانتقال',
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { locale } = useI18n?.() ?? { locale: ref('ar') }

const isRTL = computed(() => locale.value === 'ar')

const arrowPointsLeft = computed(() => {
  if (props.direction === 'left') return true
  if (props.direction === 'right') return false
  return isRTL.value
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-8 h-8'
    case 'lg':
      return 'w-12 h-12'
    case 'md':
    default:
      return 'w-10 h-10'
  }
})

const iconSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4'
    case 'lg':
      return 'w-6 h-6'
    case 'md':
    default:
      return 'w-5 h-5'
  }
})
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :type="!to && !href ? 'button' : undefined"
    :disabled="disabled"
    :aria-label="ariaLabel"
    class="text-primary hover:bg-primary hover:shadow-primary/25 inline-flex shrink-0 items-center justify-center rounded-full bg-blue-100 transition-all duration-300 ease-out hover:scale-105 hover:text-white hover:shadow-md active:scale-95 disabled:pointer-events-none disabled:opacity-50"
    :class="sizeClasses"
    @click="emit('click', $event)"
  >
    <svg
      :class="[iconSizeClasses, arrowPointsLeft ? 'rotate-0' : 'rotate-180']"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <!-- Standard left-pointing arrow -->
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  </component>
</template>
