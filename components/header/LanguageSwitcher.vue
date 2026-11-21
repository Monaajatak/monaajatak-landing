<script setup lang="ts">
import { computed, onMounted } from 'vue'

const { locale, setLocale } = useI18n()

const isArabic = computed(() => locale.value === 'ar')

const targetLanguageName = computed(() =>
  isArabic.value ? 'English' : 'العربية',
)

const toggleLocale = () => {
  const next = isArabic.value ? 'en' : 'ar'
  setLocale(next)
  const cookie = useCookie('i18n_locale')
  cookie.value = next
}

onMounted(() => {
  const savedLocale = useCookie('i18n_locale').value
  if (
    savedLocale &&
    (savedLocale === 'ar' || savedLocale === 'en') &&
    savedLocale !== locale.value
  ) {
    setLocale(savedLocale)
  }
})
</script>

<template>
  <button
    type="button"
    class="hover:border-primary/40 hover:text-primary group inline-flex items-center gap-1.5 rounded-xl border border-gray-200/80 bg-white px-2.5 py-1.5 text-xs font-bold text-gray-700 shadow-xs transition-all duration-200 hover:scale-[1.02] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:px-3"
    :aria-label="`Switch to ${targetLanguageName}`"
    @click="toggleLocale"
  >
    <!-- Globe Icon -->
    <svg
      class="text-primary h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
      />
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      />
    </svg>

    <span class="tracking-wide">{{ targetLanguageName }}</span>
  </button>
</template>
