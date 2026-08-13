/**
 * روابط المشاركة العميقة — نسخة الويب من عقد الروابط.
 *
 * النظير في التطبيق: `lib/core/utils/share_links.dart`. أي تغيير هنا يجب أن
 * يقابله تغيير هناك، فالرابط هو نقطة اللقاء الوحيدة بين الاثنين:
 *
 *   /app/play?reciterId=&surahId=&moshafId=
 *   /app/radio?id=[&ep=]
 *
 * ⚠️ المضيف `www` إلزامي: هو وحده المسجَّل في `.well-known` وفي إعدادات
 * التطبيق (entitlements / AndroidManifest)؛ الرابط بدونه يفتح المتصفّح بدل
 * التطبيق.
 */
const SITE = 'https://www.monaajatak.app'

const build = (path, params) => {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
  return qs ? `${SITE}/app/${path}?${qs}` : `${SITE}/app/${path}`
}

/** رابط تلاوة سورة بصوت قارئ في مصحف/رواية بعينها. */
export const recitationLink = ({ reciterId, surahId, moshafId }) =>
  build('play', { reciterId, surahId, moshafId })

/** رابط إذاعة — بثاً مباشراً أو حلقة بعينها من أرشيفها. */
export const radioLink = ({ radioId, episodeIndex }) =>
  build('radio', { id: radioId, ep: episodeIndex })
