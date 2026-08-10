<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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
const redirecting = ref(false)
const route = useRoute()

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

onMounted(() => {
  platform.value = detectPlatform()
  const skipRedirect = route.query.all === '1'

  if (skipRedirect || platform.value === 'web' || platform.value === 'huawei') {
    return
  }

  const redirectMap = {
    ios: stores.find((store) => store.id === 'appstore')?.href,
    android: stores.find((store) => store.id === 'googleplay')?.href
  }

  const target = redirectMap[platform.value]
  if (target) {
    redirecting.value = true
    setTimeout(() => {
      window.location.replace(target)
    }, 1500)
  }
})

useHead(() => ({
  title: 'تحميل تطبيق مُناجاتك | أندرويد و iOS',
  meta: [
    { name: 'description', content: 'حمل تطبيق مُناجاتك الآن على أجهزة أندرويد و iOS وابدأ رحلتك الإيمانية مع واجهة مميزة وإمكانيات غير محدودة.' }
  ]
}))
</script>

<template>
  <section class="app-download-page section">
    <!-- Decorative background elements -->
    <div class="bg-shape bg-shape-1"></div>
    <div class="bg-shape bg-shape-2"></div>

    <div class="container relative z-10">
      <div v-if="redirecting" class="redirecting-overlay">
        <div class="spinner"></div>
        <h2>جارٍ تحويلك إلى المتجر المناسب...</h2>
        <p>إذا لم يتم التحويل تلقائياً، <a :href="`?all=1`">اضغط هنا</a>.</p>
      </div>

      <div class="download-layout" :class="{ 'blur-bg': redirecting }">
        <div class="download-content">
          <span class="badge-pill">متوفر الآن</span>
          <h1 class="page-title">حمل تطبيق <span class="text-gradient">مُناجاتك</span></h1>
          <p class="page-lead">
            رفيقك الأمثل في رحلتك الإيمانية. استمتع بتجربة قراءة وتلاوة فريدة للمصحف الشريف مع باقة متكاملة من الأذكار والتفاسير والموارد الإسلامية بتصميم عصري وأداء فائق.
          </p>
          
          <div class="store-buttons">
            <a :href="stores[0].href" target="_blank" rel="noopener" class="store-btn googleplay">
              <img :src="stores[0].icon" alt="Google Play" width="32" height="32" class="store-icon" />
              <div class="store-info">
                <span class="small-text">GET IT ON</span>
                <span class="large-text">Google Play</span>
              </div>
            </a>
            
            <a :href="stores[1].href" target="_blank" rel="noopener" class="store-btn appstore">
              <img :src="stores[1].icon" alt="App Store" width="32" height="32" class="store-icon" />
              <div class="store-info">
                <span class="small-text">Download on the</span>
                <span class="large-text">App Store</span>
              </div>
            </a>
            
            <a :href="stores[2].href" target="_blank" rel="noopener" class="store-btn appgallery" v-if="platform === 'huawei' || route.query.all === '1'">
              <img :src="stores[2].icon" alt="AppGallery" width="32" height="32" class="store-icon" />
              <div class="store-info">
                <span class="small-text">EXPLORE IT ON</span>
                <span class="large-text">AppGallery</span>
              </div>
            </a>
          </div>
        </div>

        <div class="download-image-wrapper">
          <div class="phone-mockup">
            <img src="/images/app-mockup-light.png" alt="صورة التطبيق" class="mockup-img light-img" />
            <img src="/images/app-mockup-dark.png" alt="صورة التطبيق" class="mockup-img dark-img" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.app-download-page {
  padding-top: 80px;
  padding-bottom: 120px;
  min-height: 85vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Decorative Background */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.4;
  pointer-events: none;
}

.bg-shape-1 {
  top: 10%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, rgba(var(--primary-rgb), 0) 70%);
}

.bg-shape-2 {
  bottom: -10%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%);
}

[data-theme='dark'] .bg-shape {
  opacity: 0.15;
}

.relative { position: relative; }
.z-10 { z-index: 10; }

.download-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  transition: filter 0.3s ease;
}

.blur-bg {
  filter: blur(8px);
  pointer-events: none;
}

/* Redirecting Overlay */
.redirecting-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  text-align: center;
  background: var(--surface);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  border: 1px solid var(--border-color);
  width: 90%;
  max-width: 400px;
}

.redirecting-overlay h2 {
  font-size: 20px;
  margin: 20px 0 10px;
  color: var(--text);
}

.redirecting-overlay p {
  color: var(--text-secondary);
  font-size: 14px;
}

.redirecting-overlay a {
  color: var(--primary);
  text-decoration: underline;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(var(--primary-rgb), 0.2);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

/* Content Styles */
.download-content {
  flex: 1;
  max-width: 600px;
}

.badge-pill {
  display: inline-block;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  margin-bottom: 24px;
}

.page-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  margin: 0 0 20px 0;
  color: var(--text);
  line-height: 1.2;
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-lead {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 40px 0;
}

.store-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.store-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 14px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 200px;
}

.store-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

[data-theme='dark'] .store-btn {
  background-color: #111;
  border: 1px solid #333;
}

.store-btn.appgallery {
  background-color: #c90000;
}
[data-theme='dark'] .store-btn.appgallery {
  background-color: #aa0000;
  border: 1px solid #c90000;
}

.store-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.store-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.store-info .small-text {
  font-size: 11px;
  text-transform: uppercase;
  opacity: 0.8;
  letter-spacing: 0.5px;
}

.store-info .large-text {
  font-size: 20px;
  font-weight: 600;
  margin-top: -2px;
}

.download-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.phone-mockup {
  width: 320px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-5deg);
  transition: transform 0.5s ease;
}

.phone-mockup:hover {
  transform: rotate(0deg) translateY(-10px);
}

.mockup-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
}

.dark-img {
  display: none;
}

.light-img {
  display: block;
}

:deep([data-theme='dark']) .dark-img,
html[data-theme='dark'] .dark-img,
body[data-theme='dark'] .dark-img {
  display: block;
}

:deep([data-theme='dark']) .light-img,
html[data-theme='dark'] .light-img,
body[data-theme='dark'] .light-img {
  display: none;
}

@media (max-width: 992px) {
  .download-layout {
    flex-direction: column;
    text-align: center;
    gap: 50px;
  }
  
  .download-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .store-buttons {
    justify-content: center;
  }
  
  .phone-mockup {
    transform: none;
  }
}
</style>
