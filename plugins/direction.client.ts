export default defineNuxtPlugin(nuxtApp => {
  const i18n = nuxtApp.$i18n as
    | { locale?: { value: string }; setLocale?: (val: string) => void }
    | undefined

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

  // Force Arabic while language feature is hidden
  const cookie = useCookie('i18n_locale')
  if (cookie.value && cookie.value !== 'ar') {
    cookie.value = 'ar'
  }
  if (i18n?.setLocale && i18n?.locale?.value !== 'ar') {
    i18n.setLocale('ar')
  }

  applyDirection('ar')

  if (i18n?.locale) {
    watch(
      () => i18n.locale.value,
      newCode => {
        applyDirection(newCode || 'ar')
      },
      { immediate: true },
    )
  }
})
