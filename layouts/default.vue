<script setup>
import { SITE_URL, SITE_NAME, OG_IMAGE, STORE_LINKS, SOCIAL_LINKS, absoluteUrl } from '~/utils/seo'

const cursorDot = ref(null)
const cursorOutline = ref(null)
const isPointerFine = ref(true)
const route = useRoute()
let domMutationObserver = null
let revealObserver = null

const SITE_DESCRIPTION = 'مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد.'

// صفحات `/app/**` مجرد محطات للروابط العميقة (noindex)، فلا رابط معياري لها.
const canonicalUrl = computed(() =>
  route.path === '/app' || route.path.startsWith('/app/') ? null : absoluteUrl(route.path)
)

useHead(() => ({
  link: canonicalUrl.value ? [{ rel: 'canonical', href: canonicalUrl.value }] : [],
  meta: canonicalUrl.value ? [{ property: 'og:url', content: canonicalUrl.value }] : [],
}))

useHead({
  script: [
    {
      key: 'site-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            alternateName: 'Monaajatak',
            url: `${SITE_URL}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/android-chrome-512x512.png`,
              width: 512,
              height: 512,
            },
            email: 'Monaajatak@gmail.com',
            sameAs: SOCIAL_LINKS,
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: SITE_NAME,
            alternateName: 'Monaajatak',
            description: SITE_DESCRIPTION,
            inLanguage: 'ar',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@type': 'MobileApplication',
            '@id': `${SITE_URL}/#app`,
            name: SITE_NAME,
            alternateName: 'Monaajatak',
            description: SITE_DESCRIPTION,
            url: `${SITE_URL}/`,
            image: OG_IMAGE.url,
            screenshot: [
              `${SITE_URL}/images/screenshots/01_App_Overview.png`,
              `${SITE_URL}/images/screenshots/02_Quran_Reading.png`,
              `${SITE_URL}/images/screenshots/05_Prayer_Times.png`,
            ],
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Android, iOS, HarmonyOS',
            inLanguage: 'ar',
            installUrl: [STORE_LINKS.googlePlay, STORE_LINKS.appStore, STORE_LINKS.appGallery],
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ],
      }),
    },
  ],
})

const setupReveal = () => {
  if (revealObserver) revealObserver.disconnect()
  if (domMutationObserver) domMutationObserver.disconnect()

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        revealObserver?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" })

  const observeElements = () => {
    document.querySelectorAll('.reveal:not(.active)').forEach(el => {
      revealObserver.observe(el)
    })
  }

  observeElements()

  // Watch for lazy-loaded components injected into the DOM later
  domMutationObserver = new MutationObserver(() => {
    observeElements()
  })

  if (document.body) {
    domMutationObserver.observe(document.body, { childList: true, subtree: true })
  }
}

onMounted(() => {
  const pointerQuery = window.matchMedia?.('(pointer: fine)')
  isPointerFine.value = pointerQuery?.matches ?? true
  if (!isPointerFine.value) {
    return
  }
  // --- Custom Cursor Logic ---
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX
    const posY = e.clientY
    
    if (cursorDot.value) {
      cursorDot.value.style.left = `${posX}px`
      cursorDot.value.style.top = `${posY}px`
      cursorDot.value.style.opacity = 1
    }

    if (cursorOutline.value) {
      cursorOutline.value.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" })
      cursorOutline.value.style.opacity = 1
    }
  })

  // Hover effects
  const interactables = document.querySelectorAll('a, button, .card, .nav-item, input, textarea')
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorOutline.value) {
        cursorOutline.value.classList.add('hovering')
      }
    })
    el.addEventListener('mouseleave', () => {
      if (cursorOutline.value) {
        cursorOutline.value.classList.remove('hovering')
      }
    })
  })

  setupReveal()

})

watch(() => route.fullPath, async () => {
  await nextTick()
  setupReveal()
})
</script>

<template>
  <div class="app-wrapper">
    <AppHeader />
    <main :class="{ 'inner-page': route.path !== '/' }">
      <slot />
    </main>
    <AppFooter />

    <!-- Custom Cursor -->
    <div v-if="isPointerFine" class="cursor-dot" ref="cursorDot"></div>
    <div v-if="isPointerFine" class="cursor-outline" ref="cursorOutline"></div>

  </div>
</template>

<style>
/* Additional inline styles from app.blade.php if not in app.css */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.inner-page {
  padding-top: 110px; /* Offset for fixed navbar on all non-home pages */
}
</style>
