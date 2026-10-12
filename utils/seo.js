/**
 * ثوابت الظهور في محركات البحث ومعاينات المشاركة.
 *
 * ⚠️ المضيف `www` هو الأصل: النطاق المجرد يحوّل إليه، وهو المسجَّل في
 * `.well-known` وفي `site.url` بإعدادات Nuxt.
 */
export const SITE_URL = 'https://www.monaajatak.app'
export const SITE_NAME = 'مُناجاتك'

export const OG_IMAGE = {
  url: `${SITE_URL}/images/og-image.jpg`,
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: 'مُناجاتك — رفيق الطاعة اليومي: القرآن الكريم، مواقيت الصلاة، الأذكار والقبلة',
}

export const APP_STORE_ID = '6759576802'
export const ANDROID_PACKAGE = 'com.mahmoudmourad.monologue'

export const STORE_LINKS = {
  googlePlay: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`,
  appStore: `https://apps.apple.com/app/id${APP_STORE_ID}`,
  appGallery: 'https://appgallery.huawei.com/app/C117271909',
}

export const SOCIAL_LINKS = [
  'https://facebook.com/Monaajatak',
  'https://instagram.com/monaajatak',
  'https://tiktok.com/@monaajatak',
  'https://t.me/monaajatak',
  'https://github.com/Monaajatak',
]

/** رابط مطلق لمسار داخلي، بلا شرطة ختامية (عدا الرئيسية). */
export const absoluteUrl = (path = '/') => {
  const clean = String(path || '/').split(/[?#]/)[0]
  const trimmed = clean.length > 1 ? clean.replace(/\/+$/, '') : clean
  return `${SITE_URL}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`
}

/** BreadcrumbList من أزواج [الاسم، المسار]؛ الرئيسية تُضاف تلقائياً. */
export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['الرئيسية', '/'], ...items].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(path),
  })),
})
