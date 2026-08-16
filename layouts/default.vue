<script setup>
const cursorDot = ref(null)
const cursorOutline = ref(null)
const isPointerFine = ref(true)
const route = useRoute()
let domMutationObserver = null
let revealObserver = null

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": "https://www.monaajatak.app/#website",
            "url": "https://www.monaajatak.app/",
            "name": "مُناجاتك",
            "description": "مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد.",
            "inLanguage": "ar"
          },
          {
            "@type": "SoftwareApplication",
            "@id": "https://www.monaajatak.app/#software",
            "name": "مُناجاتك",
            "alternateName": "Monaajatak",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "Android, iOS",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "url": "https://www.monaajatak.app/",
            "description": "مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد."
          }
        ]
      })
    }
  ]
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
