<script setup lang="ts">
/**
 * MainButton — a reusable wrapper around Vuetify's v-btn.
 *
 * Supports:
 *  - Text content via `text` prop OR the default slot
 *  - Prepend / append icons via props or named slots
 *  - Internal navigation (NuxtLink via `to`) and external links (`href`)
 *  - All common Vuetify button knobs (size, variant, rounded, block, elevation)
 */

type VariantType = 'text' | 'flat' | 'elevated' | 'outlined' | 'plain' | 'tonal'
type SizeType = 'x-small' | 'small' | 'default' | 'large' | 'x-large'

withDefaults(
  defineProps<{
    /** Button label — ignored when the default slot is used */
    text?: string
    color?: string
    variant?: VariantType
    size?: SizeType
    /** Prepend icon (e.g. "mdi-download" or "fas fa-download") */
    icon?: string
    /** Append icon */
    appendIcon?: string
    /** Internal route (rendered as NuxtLink) */
    to?: string
    /** External URL (rendered as <a>) */
    href?: string
    /** if button is disabled */
    disabled?: boolean
    /** if button is loading */
    loading?: boolean
    /** Full-width button */
    block?: boolean
    /** Border radius — true | false | string ("pill", "xl", etc.) */
    rounded?: boolean | string
    /** Shadow depth (0–24) */
    elevation?: number | string
    /** if button is rounded */
    type?: 'button' | 'reset' | 'submit'
  }>(),
  {
    text: '',
    color: 'var(--primary)',
    variant: 'flat',
    size: 'default',
    icon: '',
    appendIcon: '',
    to: undefined,
    href: undefined,
    disabled: false,
    loading: false,
    block: false,
    rounded: 'lg',
    elevation: undefined,
    type: 'button',
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <v-btn
    :type="type"
    :color
    :variant
    :size
    :disabled
    :loading
    :block
    :rounded
    :elevation
    :to
    :href
    :class="$attrs.class"
    @click="emit('click', $event)"
  >
    <template
      v-if="$slots.prepend || icon"
      #prepend
    >
      <slot name="prepend">
        <v-icon>{{ icon }}</v-icon>
      </slot>
    </template>

    <slot>{{ text }}</slot>

    <template
      v-if="$slots.append || appendIcon"
      #append
    >
      <slot name="append">
        <v-icon>{{ appendIcon }}</v-icon>
      </slot>
    </template>
  </v-btn>
</template>

<style scoped>
.v-btn--variant-flat,
.v-btn--variant-elevated {
  background: linear-gradient(266.2deg, #30d2dd 0%, #1a7177 205.79%) !important;
  color: var(--on-primary, var(--color-white-50, #ffffff)) !important;
}
</style>
