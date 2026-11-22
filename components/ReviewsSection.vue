<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import ChipLabel from '~/components/common/chip/ChipLabel.vue'

interface ReviewItem {
  id: string
  author: string
  avatar?: string | null
  date: string
  title: string
  body: string
  source: string
}

interface ApiReviewItem {
  id?: string
  author?: string
  avatar?: string | null
  date?: string | null
  text?: string
}

const { t, locale } = useI18n()

const isRTL = computed(() => locale.value === 'ar')

const defaultPersonAvatar = '/images/default-avatar.svg'

const onAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement | null
  if (target && target.src !== defaultPersonAvatar) {
    target.src = defaultPersonAvatar
  }
}

const defaultReviewIds = [
  'review1',
  'review2',
  'review3',
  'review4',
  'review5',
] as const

const fallbackReviews = computed<ReviewItem[]>(() =>
  defaultReviewIds.map(id => ({
    id,
    author: t(`reviews.items.${id}.author`),
    avatar: null,
    date: t(`reviews.items.${id}.date`),
    title: t(`reviews.items.${id}.title`),
    body: t(`reviews.items.${id}.body`),
    source: t('reviews.googlePlay'),
  })),
)

const apiReviewsList = ref<ApiReviewItem[]>([])

const formatReview = (text: string) => {
  if (!text) return { title: '', body: '' }
  const clean = text.trim()
  if (clean.length <= 40) return { title: clean, body: '' }

  const lines = clean.split(/[\n.،]/)
  if (lines[0].length > 10 && lines[0].length < 50) {
    return {
      title: lines[0],
      body: clean.substring(lines[0].length).replace(/^[\n.،\s]+/, ''),
    }
  }

  const words = clean.split(' ')
  return {
    title: words.slice(0, 6).join(' '),
    body: words.slice(6).join(' '),
  }
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays <= 1) return isRTL.value ? 'منذ يوم' : '1 day ago'
  if (diffDays === 2) return isRTL.value ? 'منذ يومين' : '2 days ago'
  if (diffDays <= 10) {
    return isRTL.value ? `منذ ${diffDays} أيام` : `${diffDays} days ago`
  }
  if (diffDays <= 30) {
    return isRTL.value ? `منذ ${diffDays} يوماً` : `${diffDays} days ago`
  }
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return isRTL.value ? 'منذ شهر' : '1 month ago'
  return isRTL.value ? `منذ ${diffMonths} أشهر` : `${diffMonths} months ago`
}

onMounted(async () => {
  try {
    const res = await $fetch<{ success: boolean; reviews?: ApiReviewItem[] }>(
      '/api/google-play-reviews',
    )
    if (res?.success && Array.isArray(res.reviews) && res.reviews.length > 0) {
      apiReviewsList.value = res.reviews
    }
  } catch {
    // Keep fallback reviews
  }
})

const reviews = computed<ReviewItem[]>(() => {
  if (apiReviewsList.value.length > 0) {
    return apiReviewsList.value.map((r: ApiReviewItem, idx: number) => {
      const parsed = formatReview(r.text || '')
      return {
        id: r.id || String(idx),
        author: r.author || 'مستخدم Google Play',
        avatar: r.avatar || null,
        date: formatDate(r.date || null),
        title: parsed.title ? `«${parsed.title}»` : '«تطبيق رائع ومميز»',
        body: parsed.body,
        source: t('reviews.googlePlay'),
      }
    })
  }

  return fallbackReviews.value
})
</script>

<template>
  <section
    id="reviews"
    class="relative overflow-hidden bg-blue-50 py-16 lg:py-24"
  >
    <div
      class="container flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-center lg:gap-14"
    >
      <!-- Text / Info Column (Right side in RTL, Left in LTR) -->
      <article
        class="flex shrink-0 flex-col items-start text-start lg:max-w-md xl:max-w-lg"
      >
        <!-- Chip Label -->
        <chip-label :text="t('reviews.chipLabel')" />

        <!-- Main Title -->
        <h2
          class="text-secondary mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.2]"
        >
          <span>{{ t('reviews.titlePart1') }}</span>
          <br />
          <span class="text-blue-500">
            {{ t('reviews.titleHighlight') }}
          </span>
        </h2>

        <!-- Description Paragraph -->
        <p
          class="text-secondary/80 mt-4 max-w-lg text-sm leading-relaxed sm:text-base"
        >
          {{ t('reviews.description') }}
        </p>
      </article>

      <!-- Reviews Cards Column (Window showing only 2 cards in the strip, continuous loop) -->
      <div
        class="marquee-container relative w-full min-w-0 overflow-hidden sm:max-w-[680px] lg:max-w-[680px] xl:max-w-[710px]"
        dir="ltr"
      >
        <!-- Edge fade gradient for smooth visual cutoff -->
        <div
          class="pointer-events-none absolute inset-y-0 start-0 z-10 w-8 bg-gradient-to-r from-blue-50 to-transparent sm:w-16"
          aria-hidden="true"
        />

        <div class="flex w-max gap-5 py-4">
          <!-- Two sibling groups running the same marquee animation for seamless infinite loop -->
          <div
            v-for="group in 2"
            :key="group"
            class="animate-marquee-scroll flex shrink-0 gap-5"
            :aria-hidden="group === 2 ? 'true' : undefined"
          >
            <article
              v-for="item in reviews"
              :key="item.id + '-g' + group"
              :dir="isRTL ? 'rtl' : 'ltr'"
              class="flex w-[280px] shrink-0 flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-md shadow-teal-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[320px] sm:p-7 md:w-[330px]"
            >
              <!-- Card Top: Google Play Tag with teal dot -->
              <div
                class="flex items-center gap-1.5 text-xs font-bold text-blue-500"
              >
                <span class="h-2 w-2 rounded-full bg-blue-500" />
                <span>{{ item.source }}</span>
              </div>

              <!-- Card Body: Title Quote & Content -->
              <div class="my-4 flex-1">
                <h3
                  class="text-base leading-snug font-bold text-slate-900 sm:text-lg"
                >
                  {{ item.title }}
                </h3>
                <p
                  v-if="item.body"
                  class="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm"
                >
                  {{ item.body }}
                </p>
              </div>

              <!-- Divider & Card Footer: Author + Date + Cyan User Avatar -->
              <div
                class="flex items-center justify-between border-t border-slate-100 pt-4"
              >
                <div class="flex flex-col text-start">
                  <span class="text-sm font-bold text-slate-800 sm:text-base">
                    {{ item.author }}
                  </span>
                  <span class="mt-0.5 text-xs text-slate-400">
                    {{ item.date }}
                  </span>
                </div>

                <!-- Teal Avatar with user photo or fallback person image -->
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-500 text-white shadow-xs sm:h-11 sm:w-11"
                  aria-hidden="true"
                >
                  <img
                    :src="item.avatar || defaultPersonAvatar"
                    :alt="item.author"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    @error="onAvatarError"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
