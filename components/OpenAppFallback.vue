<script setup>
const stores = [
  {
    id: 'googleplay',
    name: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.mahmoudmourad.monologue',
    icon: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-play/default.svg'
  },
  {
    id: 'appstore',
    name: 'App Store',
    href: 'https://apps.apple.com/ua/app/%D9%85%D9%86%D8%A7%D8%AC%D8%A7%D8%AA%D9%83-%D8%B1%D9%81%D9%8A%D9%82-%D8%A7%D9%84%D8%B7%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%8A%D9%88%D9%85%D9%8A/id6759576802',
    icon: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/app-store/default.svg'
  },
  {
    id: 'appgallery',
    name: 'AppGallery',
    href: 'https://appgallery.huawei.com/app/C117271909',
    icon: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/huawei/default.svg'
  }
]

const platform = ref('web')

const detectPlatform = () => {
  const ua = navigator?.userAgent || ''
  const uaLower = ua.toLowerCase()

  if (/huawei|honor|hmscore/.test(uaLower)) {
    return 'huawei'
  }

  if (/iphone|ipad|ipod/.test(uaLower)) {
    return 'ios'
  }

  if (/android/.test(uaLower)) {
    return 'android'
  }

  return 'web'
}

const preferredStore = computed(() => {
  return {
    ios: stores.find((s) => s.id === 'appstore'),
    android: stores.find((s) => s.id === 'googleplay'),
    huawei: stores.find((s) => s.id === 'appgallery')
  }[platform.value] || null
})

onMounted(() => {
  platform.value = detectPlatform()
})
</script>

<template>
  <section class="open-app-page section">
    <div class="container">
      <div class="open-app-card card-glass">
        <div class="open-app-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-smartphone">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>

        <h1>افتح التطبيق</h1>
        <p class="open-app-lead">
          إذا كان تطبيق مُناجاتك مثبتًا على جهازك، فسيُفتح الآن تلقائيًا.
          <br />
          إذا لم يُفتح، فحمّله أولًا من أحد المتاجر أدناه ثم عُد واضغط الرابط من جديد.
        </p>

        <div class="store-cards">
          <a
            v-for="store in stores"
            :key="store.id"
            :href="store.href"
            target="_blank"
            rel="noopener"
            class="store-card"
            :class="{ 'store-card-preferred': preferredStore?.id === store.id }"
          >
            <div class="store-card-icon">
              <img :src="store.icon" :alt="store.name" />
            </div>
            <div class="store-card-info">
              <span class="store-card-text">تحميل من</span>
              <span class="store-card-name">{{ store.name }}</span>
            </div>
          </a>
        </div>

        <div class="open-app-note">
          <a href="/">← العودة إلى الصفحة الرئيسية</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.open-app-page {
  display: flex;
  align-items: center;
  min-height: 70vh;
}

.open-app-card {
  padding: 48px 36px;
  border-radius: 28px;
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}

.open-app-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  color: #fff;
  background: var(--primary);
}

.open-app-card h1 {
  font-size: clamp(28px, 4vw, 40px);
  margin-bottom: 12px;
  color: var(--text);
}

.open-app-lead {
  color: var(--muted);
  font-size: 16px;
  line-height: 1.8;
  max-width: 520px;
  margin: 0 auto 28px;
}

.store-cards {
  justify-content: center;
}

.store-card {
  position: relative;
}

.store-card-preferred {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 3px var(--primary-soft, rgba(0, 162, 181, 0.15));
}

.open-app-note {
  margin-top: 28px;
  font-size: 14px;
  color: var(--muted);
}

.open-app-note a {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}

.open-app-note a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .open-app-card {
    padding: 36px 24px;
  }
}

@media (max-width: 480px) {
  .open-app-card {
    padding: 28px 18px;
  }
  .open-app-lead {
    font-size: 14px;
  }
}
</style>
