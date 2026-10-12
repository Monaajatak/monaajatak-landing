import { computed, toValue } from 'vue'
import { absoluteUrl, breadcrumbSchema } from '~/utils/seo'

/**
 * وسوم الصفحة لمحركات البحث ومعاينات المشاركة من مكان واحد.
 *
 * كل حقل يقبل قيمة ثابتة أو ref أو دالة، فتصلح للصفحات التي تجلب بياناتها.
 * الرابط المعياري (canonical) و`og:url` يضبطهما التخطيط من المسار تلقائياً؛
 * `path` هنا لتجاوزه فقط (كصفحة قارئ وصلناها بالمعرّف أو باسم مختصر).
 *
 * @param {object} opts
 * @param {*} opts.title
 * @param {*} opts.description
 * @param {*} [opts.path] المسار المعياري إن خالف مسار الطلب
 * @param {*} [opts.breadcrumbs] أزواج [الاسم، المسار] بعد الرئيسية
 * @param {*} [opts.schema] عُقد JSON-LD إضافية
 * @param {*} [opts.noindex]
 */
export const usePageSeo = ({ title, description, path, breadcrumbs, schema, noindex = false }) => {
  const t = computed(() => toValue(title))
  const d = computed(() => toValue(description))

  useSeoMeta({
    title: t,
    description: d,
    ogTitle: t,
    ogDescription: d,
    twitterTitle: t,
    twitterDescription: d,
    robots: computed(() => (toValue(noindex) ? 'noindex, follow' : undefined)),
  })

  const canonical = computed(() => {
    const p = toValue(path)
    return p ? absoluteUrl(p) : null
  })

  const graph = computed(() => {
    const crumbs = toValue(breadcrumbs)
    const extra = toValue(schema)
    return [
      ...(crumbs?.length ? [breadcrumbSchema(crumbs)] : []),
      ...(Array.isArray(extra) ? extra : extra ? [extra] : []),
    ]
  })

  useHead(() => ({
    link: canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
    meta: canonical.value ? [{ property: 'og:url', content: canonical.value }] : [],
    script: graph.value.length
      ? [{
          key: 'page-schema',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph.value }),
        }]
      : [],
  }))
}
