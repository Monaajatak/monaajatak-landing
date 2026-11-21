export default defineNuxtPlugin(nuxtApp => {
  const i18n = nuxtApp.$i18n as { locale?: { value: string } } | undefined

  const applyDirection = (code: string) => {
    if (!import.meta.client) return
    const isRtl = code === 'ar'
    const dir = isRtl ? 'rtl' : 'ltr'

    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', code)
    document.documentElement.style.direction = dir

    if (document.body) {
      document.body.setAttribute('dir', dir)
      document.body.style.direction = dir
    }
  }

  // Sync immediately on client start
  const cookieLocale = useCookie('i18n_locale').value
  const initialCode = cookieLocale || i18n?.locale?.value || 'ar'
  applyDirection(initialCode)

  if (i18n?.locale) {
    watch(
      () => i18n.locale.value,
      newCode => {
        if (newCode) {
          applyDirection(newCode)
        }
      },
      { immediate: true },
    )
  }
})
