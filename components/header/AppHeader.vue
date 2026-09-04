<script lang="ts" setup>
import type { NavLink } from './types'

import ClosedBook from '~/assets/icons/ClosedBook.vue'
import UserMultiple from '~/assets/icons/UserMultiple.vue'
import BrandBook from '~/assets/imgs/BrandBook.vue'
import Logo from '~/assets/imgs/Logo.vue'

const MobileMenu = defineAsyncComponent(() => import('./MobileMenu.vue'))

const isMenuOpen = ref(false)

const links: NavLink[] = [
  { label: 'nav.home', path: '/', hash: '#hero' },
  { label: 'nav.features', path: '/', hash: '#features' },
  { label: 'nav.audioLibrary', path: '/listen' },
  { label: 'nav.story', path: '/', hash: '#about' },
  { label: 'nav.team', path: '/', hash: '#team' },
  { label: 'nav.faq', path: '/', hash: '#faq' },
  { label: 'nav.resources', path: '/resources' },
  { label: 'nav.volunteer', path: '/volunteer' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const route = useRoute()

const activeLink = computed(() => {
  return links.find(link => {
    if (!link.hash) {
      return route.path === link.path
    }

    return route.path === link.path && route.hash === link.hash
  })
})

const isActive = (link: NavLink) => {
  return activeLink.value?.label === link.label
}
</script>

<template>
  <!-- Outer wrapper handles sticky + hide-on-scroll -->
  <div class="sticky top-0 z-50 bg-gray-50">
    <!-- Main bar -->
    <header class="container flex items-center justify-between gap-4">
      <!-- ── Desktop nav links (hidden below lg / 1024px) ── -->
      <nav class="hidden items-center justify-center gap-8 lg:flex">
        <!-- ── Logo ── -->
        <nuxt-link
          to="/"
          class="brand shrink-0"
          @click="closeMenu"
        >
          <Logo />
        </nuxt-link>
        <div class="flex items-center gap-3">
          <nuxt-link
            v-for="link in links"
            :key="link.label"
            :to="{ path: link.path, hash: link.hash }"
            class="hover:text-primary text-gray-500"
            :class="{ 'link-active': isActive(link) }"
            @click="closeMenu"
          >
            <span>{{ $t(link.label) }}</span>
            <brand-book
              v-if="isActive(link)"
              class="h-1.5 w-full"
            />
          </nuxt-link>
        </div>
      </nav>

      <!-- ── Desktop action buttons (hidden below lg) ── -->
      <section class="hidden shrink-0 items-center gap-3 lg:flex">
        <Button
          variant="flat"
          :text="$t('nav.downloadApp')"
        />
        <Button
          variant="outlined"
          :text="$t('nav.volunteerToMonaajatak')"
        >
          <template #prepend>
            <UserMultiple />
          </template>
        </Button>
      </section>

      <!-- ── Mobile: locale toggle + hamburger (shown below lg) ── -->
      <div class="flex w-full items-center justify-between gap-2 lg:hidden">
        <nuxt-link
          to="/"
          class="brand shrink-0"
          @click="closeMenu"
        >
          <Logo />
        </nuxt-link>
        <Button
          variant="text"
          :aria-expanded="isMenuOpen.toString()"
          :aria-label="isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'"
          @click="toggleMenu"
        >
          <brand-book
            v-if="isMenuOpen"
            class="h-2 w-full"
          />
          <closed-book
            v-else
            color="var(--primary)"
            class="h-6 w-full rtl:rotate-180"
          />
        </Button>
      </div>
    </header>

    <!-- ── Mobile dropdown menu ── -->
    <mobile-menu
      :is-menu-open="isMenuOpen"
      :close-menu="closeMenu"
      :links="links"
      :is-active="isActive"
    />
  </div>
</template>

<style scoped>
.link-active {
  color: var(--primary);
  font-weight: 700;
}
</style>
