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
        { property: 'og:url', content: 'https://www.monaajatak.app/' },
        { property: 'og:locale', content: 'ar_AR' },
        { property: 'og:image', content: '/images/app-mockup-dark.png' }, // صورة بديلة مؤقتة
        { property: 'og:site_name', content: 'مُناجاتك' },
        // SEO Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'مُناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة' },
        { name: 'twitter:description', content: 'مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.' },
        { name: 'twitter:image', content: '/images/app-mockup-dark.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/Icon_White_SVG.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Tajawal:wght@300;400;500;700;800&display=swap' }
      ]
    }
  },

  modules: [
    '@nuxtjs/sitemap', // إضافة موديول خريطة الموقع
    'nuxt-gtag' // ربط جوجل أنالاتيكس
  ],

  gtag: {
    // معرف التتبع الخاص بجوجل أنالاتيكس
    id: 'G-14VLRZE6D7',
    config: {
      page_title: 'مُناجاتك'
    }
  },

  sitemap: {
    exclude: ['/app/**', '/listen/*'] // نستثني صفحات القراء مؤقتاً لأنها تعتمد على client-side rendering
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
