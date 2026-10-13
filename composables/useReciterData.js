import { computed } from 'vue'
import { resolveReciter, reciterSlug, POPULAR_RECITER_IDS } from '~/utils/reciterSlug'

/**
 * بيانات صفحة القارئ وصفحة السورة: القارئ المطلوب في المسار وقائمة السور.
 *
 * تُجلب على الخادم ليصل المحتوى كاملاً في HTML (للزواحف ومعاينات المشاركة)،
 * ويتشاركها قالب القارئ وقالب السورة المتداخل فيه بالمفتاح نفسه فلا تُجلب
 * مرتين. في التنقل داخل الموقع لا تحجب الانتقال (`lazy`) فيظهر الهيكل فوراً.
 */
export const useReciterData = () => {
  const route = useRoute()
  const event = import.meta.server ? useRequestEvent() : null

  // كل ما يحتاج سياق المكوّن يُنشأ هنا قبل أي انتظار؛ السياق لا يعبر `await`
  // داخل الدوال القابلة لإعادة الاستخدام.
  const asyncData = useAsyncData(
    () => `listen-reciter:${route.params.reciter}`,
    async () => {
      const [rRes, sRes] = await Promise.all([
        $fetch('/api/mp3quran/reciters'),
        $fetch('/api/mp3quran/suwar'),
      ])
      const all = rRes?.reciters || []
      return {
        reciter: resolveReciter(all, route.params.reciter),
        suwar: sRes?.suwar || [],
        // روابط بين الصفحات: القرّاء الأشهر وسورهم (لـ"السورة نفسها بصوت قارئ آخر").
        popular: POPULAR_RECITER_IDS.map((id) => all.find((r) => r.id === id))
          .filter(Boolean)
          .map((r) => ({ id: r.id, name: r.name, slug: reciterSlug(r), surahs: allSurahIds(r) })),
      }
    },
    {
      lazy: import.meta.client,
      // التنقل بين سور القارئ نفسه يعيد استخدام البيانات بدل جلب قائمة القرّاء كاملة.
      getCachedData: (key, nuxtApp, ctx) =>
        ctx.cause === 'refresh:manual' ? undefined : (nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]),
    },
  )

  const { data, status, error } = asyncData
  const reciter = computed(() => data.value?.reciter || null)
  const suwar = computed(() => data.value?.suwar || [])
  const popular = computed(() => data.value?.popular || [])
  const loading = computed(() => status.value === 'idle' || status.value === 'pending')

  return asyncData.then(() => {
    // صفحة لقارئ غير موجود يجب ألا تُفهرس كصفحة سليمة (soft 404).
    if (event) {
      if (error.value) setResponseStatus(event, 503)
      else if (!reciter.value) setResponseStatus(event, 404)
      // تُخزَّن على CDN Vercel لكل رابط بمعاملاته؛ أما تعثّر الـ API فلا يُخزَّن.
      event.node.res.setHeader(
        'cache-control',
        error.value ? 'no-store' : 'public, s-maxage=86400, stale-while-revalidate=604800',
      )
    }
    return { reciter, suwar, popular, loading, error }
  })
}

export const hasSurah = (moshaf, surahId) =>
  String(moshaf?.surahList || '').split(',').includes(String(surahId))

/**
 * الرواية التي تُعرض: المطلوبة بالمعرّف إن وُجدت، وإلا الأكمل (أكثر سوراً)
 * مما فيه السورة المطلوبة. ترتيب الـ API وحده قد يقدّم رواية من ست سور.
 */
export const pickMoshaf = (reciter, { moshafId, surahId } = {}) => {
  const list = reciter?.moshaf || []
  const wanted = list.find((m) => m.id === moshafId)
  if (wanted) return wanted
  const complete = [...list].sort((a, b) => (b.surahTotal || 0) - (a.surahTotal || 0))
  return (surahId && complete.find((m) => hasSurah(m, surahId))) || complete[0] || null
}

/** أرقام السور المتاحة للقارئ في كل رواياته، مرتبة. */
export const allSurahIds = (reciter) =>
  [...new Set((reciter?.moshaf || []).flatMap((m) => String(m.surahList || '').split(',').map(Number).filter(Boolean)))]
    .sort((a, b) => a - b)

/** عدد السور المتاحة للقارئ في كل رواياته. */
export const reciterSurahCount = (reciter) => allSurahIds(reciter).length

