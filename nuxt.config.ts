// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  runtimeConfig: {
    googlePlayServiceAccountJson: process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON,
    googlePlayPackageName: process.env.GOOGLE_PLAY_PACKAGE_NAME || 'com.mahmoudmourad.monologue',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
      },
      title: 'مُناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.' },
        // SEO Open Graph (OG) - المهمة جداً لظهور الموقع بشكل احترافي في وسائل التواصل ومحركات البحث
        { property: 'og:title', content: 'مُناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة' },
        { property: 'og:description', content: 'مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ar_AR' },
        { property: 'og:site_name', content: 'مُناجاتك' },
        { property: 'og:image', content: 'https://www.monaajatak.app/images/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:alt', content: 'مُناجاتك — رفيق الطاعة اليومي: القرآن الكريم، مواقيت الصلاة، الأذكار والقبلة' },
        // SEO Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'مُناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة' },
        { name: 'twitter:description', content: 'مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.' },
        { name: 'twitter:image', content: 'https://www.monaajatak.app/images/og-image.jpg' },
        { name: 'twitter:image:alt', content: 'مُناجاتك — رفيق الطاعة اليومي' },
        { name: 'theme-color', content: '#118b82' },
        { name: 'application-name', content: 'مُناجاتك' },
        { name: 'apple-mobile-web-app-title', content: 'مُناجاتك' },
        // شريط "افتح في App Store" الأصلي في Safari على iPhone
        { name: 'apple-itunes-app', content: 'app-id=6759576802' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300..900&family=Amiri:wght@400;700&display=swap' }
      ]
    }
  },

  modules: [
    '@nuxtjs/sitemap', // إضافة موديول خريطة الموقع
    'nuxt-gtag', // ربط جوجل أنالاتيكس
    '@vercel/analytics' // ربط تحليلات Vercel
  ],

  gtag: {
    // معرف التتبع الخاص بجوجل أنالاتيكس
    id: 'G-14VLRZE6D7',
    config: {
      page_title: 'مُناجاتك'
    }
  },

  sitemap: {
    // صفحات القرّاء والسور (/listen/**) تأتي من مصدر ديناميكي يقرأ قائمة القرّاء.
    sources: ['/api/__sitemap__/urls'],
    // `/app/**` محطات للروابط العميقة، و`/play` و`/radio` تحويلات قديمة إليها.
    exclude: ['/app', '/app/**', '/play', '/radio']
  },

  routeRules: {
    // نسمح بالزحف على الـ API (يحتاجه Googlebot ليرندر الصفحات) دون فهرسته.
    '/api/**': { headers: { 'X-Robots-Tag': 'noindex' } },
    '/app': { headers: { 'X-Robots-Tag': 'noindex, follow' } },
    '/app/**': { headers: { 'X-Robots-Tag': 'noindex, follow' } },
  },

  site: {
    url: 'https://www.monaajatak.app', 
    name: 'مُناجاتك',
    defaultLocale: 'ar'
  },

  experimental: {
    viewTransition: true,
    componentIslands: true
  },

  css: [
    '~/assets/css/app.css'
  ]
})
