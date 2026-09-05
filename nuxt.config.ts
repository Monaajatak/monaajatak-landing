import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // ربط جوجل أنالاتيكس
    '@nuxtjs/sitemap', // ربط تحليلات Vercel
    'nuxt-gtag',
    '@vercel/analytics',
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  i18n: {
    locales: [
      { code: 'ar', name: 'العربية', dir: 'rtl' },
      { code: 'en', name: 'English', dir: 'ltr' },
    ],
    defaultLocale: 'ar',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'ar',
    },
  },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl',
      },
      title: 'مناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'مناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.',
        },
        // SEO — عام
        {
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        { name: 'author', content: 'مناجاتك' },
        { name: 'application-name', content: 'مناجاتك' },
        {
          name: 'keywords',
          content:
            'مناجاتك, القرآن الكريم, أذكار, أذان, مواقيت الصلاة, تسبيح, قبلة, أدعية, تطبيق إسلامي, Monaajatak, Quran, Azkar, Prayer Times',
        },
        { name: 'theme-color', content: '#00A2B5' },
        // SEO — Open Graph
        {
          property: 'og:title',
          content: 'مناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة',
        },
        {
          property: 'og:description',
          content:
            'مناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.monaajatak.app/' },
        { property: 'og:locale', content: 'ar_AR' },
        { property: 'og:locale:alternate', content: 'en_US' },
        {
          property: 'og:image',
          content: 'https://www.monaajatak.app/images/app-mockup-dark.png',
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        {
          property: 'og:image:alt',
          content: 'تطبيق مناجاتك — القرآن الكريم والأذكار ومواقيت الصلاة',
        },
        { property: 'og:site_name', content: 'مناجاتك' },
        // SEO — Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'مناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة',
        },
        {
          name: 'twitter:description',
          content:
            'مناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.',
        },
        {
          name: 'twitter:image',
          content: 'https://www.monaajatak.app/images/app-mockup-dark.png',
        },
        {
          name: 'twitter:image:alt',
          content: 'تطبيق مناجاتك — القرآن الكريم والأذكار ومواقيت الصلاة',
        },
      ],
      link: [
        { rel: 'canonical', href: 'https://www.monaajatak.app/' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '48x48',
          href: '/favicon-48x48.png',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Tajawal:wght@300;400;500;700;800&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/app.css'],

  site: {
    url: 'https://www.monaajatak.app',
    name: 'مناجاتك',
    defaultLocale: 'ar',
  },
  runtimeConfig: {
    googlePlayServiceAccountJson: process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON,
    googlePlayPackageName:
      process.env.GOOGLE_PLAY_PACKAGE_NAME || 'com.mahmoudmourad.monologue',
  },

  experimental: {
    viewTransition: true,
    componentIslands: true,
    lazyHydration: true,
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  routeRules: {
    '/': {
      prerender: true,
    },
  },
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  gtag: {
    // معرف التتبع الخاص بجوجل أنالاتيكس
    id: 'G-14VLRZE6D7',
    config: {
      page_title: 'مُناجاتك',
    },
  },

  sitemap: {
    exclude: ['/app/**', '/listen/*'], // نستثني صفحات القراء مؤقتاً لأنها تعتمد على client-side rendering
  },
})
