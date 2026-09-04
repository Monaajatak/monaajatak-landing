<script setup>
import UserMultiple from '~/assets/icons/UserMultiple.vue'
import BrandBook from '~/assets/imgs/BrandBook.vue'
import Logo from '~/assets/imgs/Logo.vue'

const { locale, setLocale } = useI18n()

const isMenuOpen = ref(false)
const theme = ref('light')
const isHidden = ref(false)
let lastScrollPosition = 0

const links = [
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

// const toggleLocale = () => {
//   const next = locale.value === 'ar' ? 'en' : 'ar'
//   setLocale(next)
//   document.documentElement.lang = next
//   document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
// }

// const toggleTheme = () => {
//   const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
//   theme.value = nextTheme
//   document.body.dataset.theme = nextTheme
//   localStorage.setItem('munajat-theme', nextTheme)
// }

const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop
  if (currentScroll <= 0) {
    isHidden.value = false
    return
  }

  // Stop hiding if menu is open
  if (isMenuOpen.value) {
    isHidden.value = false
    return
  }

  // Ignore small scrolls
  if (Math.abs(currentScroll - lastScrollPosition) < 20) {
    return
  }

  if (currentScroll > lastScrollPosition && currentScroll > 150) {
    // Scrolling down -> hide
    isHidden.value = true
  } else if (currentScroll < lastScrollPosition) {
    // Scrolling up -> show
    isHidden.value = false
  }

  lastScrollPosition = currentScroll
}

const route = useRoute()

const isActiveHash = (path, hash) => {
  if (!hash) return route.path === path
  return route.path === '/' && route.hash === hash
}

onMounted(() => {
  const storedTheme = localStorage.getItem('munajat-theme')
  if (storedTheme) {
    theme.value = storedTheme
  } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
  document.body.dataset.theme = theme.value

  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Outer wrapper handles sticky + hide-on-scroll -->
  <div
    class="app-header-wrap sticky top-0 z-50"
    :class="{ 'header-hidden': isHidden }"
  >
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
            class="nav-link"
            :class="{ 'link-active': isActiveHash(link.path, link.hash) }"
            @click="closeMenu"
          >
            <span>{{ $t(link.label) }}</span>
            <brand-book
              v-if="isActiveHash(link.path, link.hash)"
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
          <BrandBook
            v-if="isMenuOpen"
            class="h-2 w-full"
          />
          <span
            v-else
            class="bg-primary! h-1.5 min-w-10 border-r-4 border-blue-600 shadow-xl"
          />
        </Button>
      </div>
    </header>

    <!-- ── Mobile dropdown menu ── -->
    <transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="mobile-menu-panel lg:hidden"
        @click.self="closeMenu"
      >
        <div class="container flex flex-col gap-1 py-4">
          <!-- Nav links -->
          <nuxt-link
            v-for="link in links"
            :key="link.label"
            :to="{ path: link.path, hash: link.hash }"
            :class="{
              'mobile-link-active': isActiveHash(link.path, link.hash),
            }"
            class="mobile-nav-link"
            @click="closeMenu"
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
                <UserMultiple />
              </template>
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* ── Header wrapper ─────────────────────────────────────────── */
.app-header-wrap {
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: var(--border);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-hidden {
  transform: translateY(-100%);
}

/* ── Desktop nav links ──────────────────────────────────────── */
.nav-link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 0;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--primary);
}

.link-active {
  color: var(--primary) !important;
  font-weight: 700 !important;
}

/* ── Hamburger button ───────────────────────────────────────── */
.hamburger-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--primary-rgb), 0.05);
  border: var(--border);
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.hamburger-btn:hover {
  background: rgba(var(--primary-rgb), 0.1);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20px;
}

.hamburger-icon span {
  display: block;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

/* Animate to X when open */
.hamburger-icon.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger-icon.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger-icon.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile dropdown panel ──────────────────────────────────── */
.mobile-menu-panel {
  background: var(--nav-bg);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-top: var(--border);
  box-shadow: var(--shadow-lg);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  background: rgba(var(--primary-rgb), 0.07);
  color: var(--primary);
}

.mobile-link-active {
  background: rgba(var(--primary-rgb), 0.1) !important;
  color: var(--primary) !important;
}

.mobile-cta-divider {
  border-top: var(--border);
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

<!-- <header class="nav" :class="{ 'nav-hidden': isHidden }">
    <nuxt-link to="/" class="brand">
      <img src="/images/Icon_Teal_SVG.svg" alt="شعار مُناجاتك" width="40" height="40" class="logo-light">
      <img src="/images/Icon_White_SVG.svg" alt="شعار مُناجاتك" width="40" height="40" class="logo-dark">
      <div class="brand-text">
        <span class="brand-kicker">Monajatak</span>
        <strong class="brand-name">مُناجاتك</strong>
      </div>
    </nuxt-link>

    <div class="nav-links" :class="{ 'open': isMenuOpen }" id="navLinks">
      <nuxt-link :to="{ path: '/', hash: '#hero' }" @click="closeMenu">الرئيسية</nuxt-link>
      <nuxt-link :to="{ path: '/', hash: '#features' }" @click="closeMenu">المميزات</nuxt-link>
      <nuxt-link to="/listen" @click="closeMenu">المكتبة الصوتية</nuxt-link>
      <nuxt-link :to="{ path: '/', hash: '#about' }" @click="closeMenu">القصة</nuxt-link>
      <nuxt-link :to="{ path: '/', hash: '#team' }" @click="closeMenu">الفريق</nuxt-link>
      <nuxt-link :to="{ path: '/', hash: '#faq' }" @click="closeMenu">الأسئلة</nuxt-link>
      <nuxt-link to="/resources" @click="closeMenu">الموارد</nuxt-link>
      <nuxt-link to="/volunteer" @click="closeMenu">التطوع</nuxt-link>

      <button @click="toggleTheme" class="btn btn-outline theme-toggle nav-theme-toggle" type="button" aria-label="تبديل الوضع">
        <span v-if="theme === 'dark'">الوضع الفاتح</span>
        <span v-else>الوضع الداكن</span>
      </button>
    </div>

    <div class="nav-actions">
      <button @click="toggleTheme" class="btn btn-icon btn-outline theme-toggle" type="button" aria-label="تبديل الوضع">
        <template v-if="theme === 'dark'">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-sun">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M22 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-moon">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </template>
      </button>
      <button @click="toggleMenu" class="menu-toggle" type="button" aria-label="القائمة"
        :aria-expanded="isMenuOpen.toString()">
        <template v-if="isMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </template>
      </button>
      <a class="btn btn-primary btn-sm" href="/download">
        تحميل التطبيق
      </a>
      <a class="btn btn-outline btn-sm" href="/app">
        افتح التطبيق
      </a>
    </div>
  </header> -->
