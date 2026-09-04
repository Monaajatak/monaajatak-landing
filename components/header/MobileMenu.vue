<script setup lang="ts">
import Button from '../common/button/Button.vue'

import type { NavLink } from './types'

import UserMultiple from '~/assets/icons/UserMultiple.vue'

const props = defineProps<{
  isMenuOpen: boolean
  closeMenu: () => void
  links: NavLink[]
  isActive(link: NavLink): boolean
}>()
</script>

<template>
  <transition name="mobile-menu">
    <div
      v-if="isMenuOpen"
      class="bg-gray-50 lg:hidden"
      @click.self="closeMenu"
    >
      <div class="container flex flex-col gap-1 py-4">
        <!-- Nav links -->
        <nuxt-link
          v-for="link in props.links"
          :key="link.label"
          :to="{ path: link.path, hash: link.hash }"
          :class="{
            'mobile-link-active': isActive(link),
          }"
          class="hover:bg-primary/10 hover:text-primary rounded-lg px-2 py-2 text-gray-500"
          @click="props.closeMenu"
        >
          {{ $t(link.label) }}
        </nuxt-link>

        <!-- Divider + CTA buttons -->
        <div class="mobile-cta-divider mt-4 flex flex-col gap-3 pt-4">
          <Button
            variant="flat"
            block
            :text="$t('nav.downloadApp')"
          />
          <Button
            variant="outlined"
            block
            :text="$t('nav.volunteerToMonaajatak')"
          >
            <template #prepend>
              <user-multiple />
            </template>
          </Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.mobile-link-active {
  background: rgba(var(--primary-rgb), 0.1) !important;
  color: var(--primary) !important;
  font-weight: 700 !important;
}

/* ── Slide-down transition ──────────────────────────────────── */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
