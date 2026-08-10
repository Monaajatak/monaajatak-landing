// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
      },
      title: 'مُناجاتك — رفيق الطاعة اليومي',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'مُناجاتك — رفيق الطاعة اليومي. مواقيت الصلاة الحية، القرآن الكريم، الأذكار، الأدعية، والتسبيح في تجربة هادئة وسريعة.' },
        // SEO Open Graph (OG) - المهمة جداً لظهور الموقع بشكل احترافي في وسائل التواصل ومحركات البحث
        { property: 'og:title', content: 'مُناجاتك — رفيق الطاعة اليومي' },
        { property: 'og:description', content: 'مُناجاتك — رفيق الطاعة اليومي. مواقيت الصلاة الحية، القرآن الكريم، الأذكار، الأدعية، والتسبيح في تجربة هادئة وسريعة.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/Icon_White_SVG.svg' }, // يُفضل استبدالها بصورة كبيرة بصيغة PNG أو JPG بأبعاد 1200x630
        { property: 'og:site_name', content: 'مُناجاتك' },
        // SEO Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'مُناجاتك — رفيق الطاعة اليومي' },
        { name: 'twitter:description', content: 'مُناجاتك — رفيق الطاعة اليومي. مواقيت الصلاة الحية، القرآن الكريم، الأذكار، الأدعية، والتسبيح.' },
        { name: 'twitter:image', content: '/images/Icon_White_SVG.svg' }
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

  site: {
    url: 'https://monaajatak.app', 
    name: 'مُناجاتك'
  },

  experimental: {
    viewTransition: true,
    componentIslands: true
  },

  css: [
    '~/assets/css/app.css'
  ]
})
