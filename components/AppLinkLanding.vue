<script setup>
/**
 * صفحة هبوط الروابط العميقة (/app/**).
 *
 * تُعرض هذه الصفحة فقط حين *لا* يلتقط التطبيق الرابط (غير مثبَّت، أو متصفّح
 * داخل تطبيق آخر، أو حاسوب). فبدل رسالة "حمّل التطبيق" الجافّة، تعرض المحتوى
 * المقصود بالاسم، وتمنح ثلاثة مخارج: تشغيله هنا على الموقع، فتحه في التطبيق،
 * أو تحميل التطبيق.
 *
 * عقد الروابط مشترك حرفياً مع التطبيق (`lib/core/utils/share_links.dart`):
 *   /app/play?reciterId=&surahId=&moshafId=
 *   /app/radio?id=[&ep=]
 */
import { computed, ref } from 'vue'
import { reciterSlug } from '~/utils/reciterSlug'
import StarNumber from '~/components/AudioLibrary/StarNumber.vue'

const route = useRoute()

const ANDROID_PACKAGE = 'com.mahmoudmourad.monologue'
const SITE = 'https://www.monaajatak.app'

const stores = [
  {
    id: 'googleplay',
    name: 'Google Play',
    href: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`,
    icon: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-play/default.svg',
  },
  {
    id: 'appstore',
    name: 'App Store',
    href: 'https://apps.apple.com/ua/app/%D9%85%D9%86%D8%A7%D8%AC%D8%A7%D8%AA%D9%83-%D8%B1%D9%81%D9%8A%D9%82-%D8%A7%D9%84%D8%B7%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%8A%D9%88%D9%85%D9%8A/id6759576802',
    icon: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/app-store/default.svg',
  },
  {
    id: 'appgallery',
    name: 'AppGallery',
    href: 'https://appgallery.huawei.com/app/C117271909',
    icon: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/huawei/default.svg',
  },
]

// ── أي محتوى يطلبه الرابط؟ ──
const slug = computed(() => {
  const s = route.params.slug
  return (Array.isArray(s) ? s : [s]).filter(Boolean).join('/')
})
const num = (v) => {
  const n = parseInt(v, 10)
  return Number.isNaN(n) ? null : n
}
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
const toArabicDigits = (v) =>
  String(v).replace(/\d/g, (d) => AR_DIGITS[Number(d)])
const kind = computed(() => {
  if (slug.value === 'play') return 'play'
  if (slug.value === 'radio') return 'radio'
  return 'app'
})
const reciterId = computed(() => num(route.query.reciterId))
const surahId = computed(() => num(route.query.surahId))
const moshafId = computed(() => num(route.query.moshafId))
const radioId = computed(() => num(route.query.id))
const episodeIndex = computed(() => num(route.query.ep))

// ── جلب أسماء المحتوى على الخادم: تظهر في بطاقة المعاينة وفي وسوم OG ──
const { data: content } = await useAsyncData(
  () => `applink:${slug.value}:${JSON.stringify(route.query)}`,
  async () => {
    try {
      if (kind.value === 'play' && reciterId.value && surahId.value) {
        const [rRes, sRes] = await Promise.all([
          $fetch('/api/mp3quran/reciters', { query: { reciter: reciterId.value } }),
          $fetch('/api/mp3quran/suwar'),
        ])
        const reciter = (rRes?.reciters || [])[0] || null
        if (!reciter) return null
        const moshafList = reciter.moshaf || []
        const moshaf =
          moshafList.find((m) => m.id === moshafId.value) || moshafList[0] || null
        const surah = (sRes?.suwar || []).find((s) => s.id === surahId.value) || null
        return {
          type: 'play',
          title: surah ? `سورة ${surah.name}` : `سورة ${surahId.value}`,
          subtitle: reciter.name,
          detail: moshaf?.name || '',
          number: surahId.value,
          webHref: `/listen/${reciterSlug(reciter)}/${surahId.value}?autoplay=1${
            moshaf ? `&moshafId=${moshaf.id}` : ''
          }`,
        }
      }

      if (kind.value === 'radio') {
        const rdRes = await $fetch('/api/mp3quran/radios')
        const radio = (rdRes?.radios || []).find((r) => r.id === radioId.value) || null
        if (!radio) return null
        const episode =
          episodeIndex.value != null ? (radio.episodes || [])[episodeIndex.value] : null
        return {
          type: episode ? 'episode' : 'live',
          title: episode ? episode.name : radio.name,
          subtitle: episode ? radio.name : radio.category || 'إذاعة القرآن الكريم',
          detail: episode ? '' : 'بث مباشر',
          number: null,
          webHref: `/listen?tab=radios&radio=${radio.id}${
            episode ? `&ep=${episodeIndex.value}` : ''
          }`,
        }
      }
    } catch (e) {
      // الـ API قد يتعثّر — الصفحة تبقى صالحة بنصّها العام.
    }
    return null
  },
)

// ── معاينة المشاركة (واتساب/تيليجرام/تويتر) ──
const seoTitle = computed(() => {
  const c = content.value
  if (!c) return 'افتح في تطبيق مُناجاتك'
  return c.type === 'play'
    ? `${c.title} — ${c.subtitle} | مُناجاتك`
    : `${c.title} | مُناجاتك`
})
const seoDescription = computed(() => {
  const c = content.value
  if (!c) return 'افتح الرابط في تطبيق مُناجاتك، أو استمع مباشرة من الموقع.'
  return c.type === 'live'
    ? `استمع إلى ${c.title} بثاً مباشراً في تطبيق مُناجاتك أو من الموقع.`
    : `استمع إلى ${c.title} بصوت ${c.subtitle} في تطبيق مُناجاتك أو من الموقع.`
})

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: 'music.song',
  ogSiteName: 'مُناجاتك',
  twitterCard: 'summary',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
})

// ── فتح التطبيق ──
const platform = ref('web')
const detectPlatform = () => {
  const ua = (navigator?.userAgent || '').toLowerCase()
  if (/huawei|honor|hmscore/.test(ua)) return 'huawei'
  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  if (/android/.test(ua)) return 'android'
  return 'web'
}
onMounted(() => {
  platform.value = detectPlatform()
})

const preferredStore = computed(
  () =>
    ({
      ios: stores.find((s) => s.id === 'appstore'),
      android: stores.find((s) => s.id === 'googleplay'),
      huawei: stores.find((s) => s.id === 'appgallery'),
    })[platform.value] || null,
)

const isMobile = computed(() => platform.value !== 'web')

/**
 * إعادة فتح نفس الرابط بإيماءة من المستخدم.
 *
 * وصول الزائر إلى هذه الصفحة يعني أن النظام لم يحوّل الرابط للتطبيق. على
 * أندرويد يفتحه `intent://` صراحةً بالحزمة إن كان مثبَّتاً، وعلى iOS تفتح
 * الروابط الشاملة بنقرة مباشرة من المستخدم (لا بإعادة توجيه تلقائية).
 */
const openInApp = () => {
  const path = `${route.path}${route.fullPath.includes('?') ? `?${route.fullPath.split('?')[1]}` : ''}`
  const url = `${SITE}${path}`

  if (platform.value === 'android' || platform.value === 'huawei') {
    const fallback = encodeURIComponent(stores.find((s) => s.id === 'googleplay').href)
    window.location.href =
      `intent://www.monaajatak.app${path}#Intent;scheme=https;` +
      `package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`
    return
  }
  window.location.href = url
}
</script>

<template>
  <section class="open-app-page section">
    <div class="container">
      <div class="open-app-card card-glass">
        <!-- ══ بطاقة المحتوى المقصود ══ -->
        <template v-if="content">
          <div class="al-art" :class="{ 'al-art-radio': content.type !== 'play' }">
            <StarNumber
              v-if="content.number"
              :number="toArabicDigits(content.number)"
              color="var(--primary)"
              :size="66"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
              <circle cx="12" cy="12" r="2" />
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
              <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
            </svg>
          </div>

          <h1 class="al-title">{{ content.title }}</h1>
          <p class="al-sub">
            {{ content.subtitle }}
            <template v-if="content.detail"> • {{ content.detail }}</template>
          </p>
        </template>

        <template v-else>
          <div class="open-app-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
          </div>
          <h1>افتح التطبيق</h1>
        </template>

        <p class="open-app-lead">
          إذا كان تطبيق مُناجاتك مثبتًا على جهازك فسيُفتح تلقائيًا،
          <br />
          وإلا فاستمع الآن من الموقع أو حمّل التطبيق.
        </p>

        <!-- ══ المخارج الثلاثة ══ -->
        <div class="al-actions">
          <NuxtLink v-if="content" :to="content.webHref" class="al-btn al-btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
            <span>استمع الآن على الموقع</span>
          </NuxtLink>

          <button v-if="isMobile" class="al-btn al-btn-ghost" @click="openInApp">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            <span>افتح في التطبيق</span>
          </button>
        </div>

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

.open-app-icon,
.al-art {
  width: 96px;
  height: 96px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 26px;
  color: var(--primary);
  background: linear-gradient(
    135deg,
    rgba(var(--primary-rgb), 0.16),
    rgba(var(--primary-rgb), 0.04)
  );
  border: 1px solid rgba(var(--primary-rgb), 0.18);
}

.open-app-icon {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  color: #fff;
  background: var(--primary);
  border: none;
}

.al-title {
  font-family: var(--font-surah, inherit);
  font-size: clamp(26px, 4vw, 36px);
  margin: 0 0 6px;
  color: var(--text);
}

.al-sub {
  color: var(--muted);
  font-size: 14px;
  margin: 0 0 22px;
}

.open-app-card h1 {
  font-size: clamp(28px, 4vw, 40px);
  margin-bottom: 12px;
  color: var(--text);
}

.open-app-lead {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.8;
  max-width: 520px;
  margin: 0 auto 24px;
}

.al-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 28px;
}

.al-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: transform var(--transition-fast, 0.15s ease);
}

.al-btn:hover {
  transform: translateY(-1px);
}

.al-btn-primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 8px 22px rgba(var(--primary-rgb), 0.3);
}

.al-btn-ghost {
  background: transparent;
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.4);
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
