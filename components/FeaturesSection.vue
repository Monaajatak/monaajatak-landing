<script setup lang="ts">
import { computed } from 'vue'

import MoonIcon from '~/assets/icons/MoonIcon.vue'
import MosqueIcon from '~/assets/icons/MosqueIcon.vue'
import QuranIcon from '~/assets/icons/QuranIcon.vue'
import ReciterIcon from '~/assets/icons/ReciterIcon.vue'
import TasbihIcon from '~/assets/icons/TasbihIcon.vue'
import micIcon from '~/assets/imgs/tools-section/microphone_icon.png'
import ArrowButton from '~/components/common/button/ArrowButton.vue'
import OverflowCard from '~/components/common/card/OverflowCard.vue'
import ChipLabel from '~/components/common/chip/ChipLabel.vue'

const { t } = useI18n()

const cards = computed(() => [
  {
    title: t('tools.cards.quran.title'),
    description: t('tools.cards.quran.description'),
    imageSrc: '/images/monaajatak_mobile.svg',
    imageAlt: t('tools.cards.quran.title'),
    badgeIcon: QuranIcon,
    hasPattern: true,
    wrapperClass: 'sm:col-span-2',
  },
  {
    title: t('tools.cards.recitations.title'),
    description: t('tools.cards.recitations.description'),
    imageSrc: micIcon,
    imageAlt: t('tools.cards.recitations.title'),
    badgeIcon: ReciterIcon,
  },
  {
    title: t('tools.cards.azkar.title'),
    description: t('tools.cards.azkar.description'),
    imageSrc: micIcon,
    imageAlt: t('tools.cards.azkar.title'),
    badgeIcon: TasbihIcon,
  },
  {
    title: t('tools.cards.qibla.title'),
    description: t('tools.cards.qibla.description'),
    imageSrc: micIcon,
    imageAlt: t('tools.cards.qibla.title'),
    badgeIcon: MosqueIcon,
  },
  {
    title: t('tools.cards.eyeComfort.title'),
    description: t('tools.cards.eyeComfort.description'),
    imageSrc: '/images/monaajatak_mobile.svg',
    imageAlt: t('tools.cards.eyeComfort.title'),
    badgeIcon: MoonIcon,
  },
])
</script>

<template>
  <section
    id="features"
    class="relative container my-16 scroll-mt-28 py-12 lg:my-24 lg:py-16"
  >
    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
      <!-- Cards Column (Left in RTL, Right in LTR) -->
      <article
        class="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-6 lg:col-start-7"
      >
        <!-- Top Row (2 Cards: Quran & Recitations in RTL order) -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <overflow-card
            v-for="(card, index) in cards"
            :key="index"
            :title="card.title"
            :description="card.description"
            :image-src="card.imageSrc"
            :image-alt="card.imageAlt"
            :badge-icon="card.badgeIcon"
            :has-pattern="card.hasPattern"
            :wrapper-class="card.wrapperClass"
          />
        </div>
      </article>

      <!-- Text / Info Column (Right in RTL, Left in LTR) -->
      <article
        class="order-1 flex flex-col items-start gap-6 lg:order-2 lg:col-span-5"
      >
        <!-- Reusable Component 1: Chip Label -->
        <ChipLabel :text="t('tools.chipLabel')" />

        <!-- Main Title -->
        <h2
          class="text-secondary text-4xl leading-tight font-black sm:text-5xl lg:text-[46px]"
        >
          {{ t('tools.titlePrefix') }}
          <span class="text-blue-500">{{ t('tools.titleHighlight') }}.</span>
        </h2>

        <!-- Description Paragraph -->
        <p class="text-grey-600 max-w-lg text-base leading-relaxed sm:text-lg">
          {{ t('tools.description') }}
        </p>

        <!-- Reusable Component 2: Arrow Button with Link -->
        <a
          href="#experience"
          class="group mt-2 inline-flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <ArrowButton
            size="md"
            :aria-label="t('tools.exploreExperience')"
          />
          <span
            class="text-base font-black text-blue-500 transition-colors group-hover:text-blue-600 sm:text-lg"
          >
            {{ t('tools.exploreExperience') }}
          </span>
        </a>

        <!-- Decorative Teal Ribbon SVG -->
        <div
          class="pointer-events-none mt-4 hidden w-full justify-end opacity-90 lg:flex"
          aria-hidden="true"
        >
          <svg
            class="h-20 w-48"
            viewBox="0 0 200 80"
            fill="none"
            stroke="#00a2b5"
            stroke-width="12"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M190 20 C140 75, 110 75, 80 40 C50 5, 20 20, 15 45 C10 70, 45 75, 80 50 C115 25, 150 25, 190 60"
            />
          </svg>
        </div>
      </article>
    </div>
  </section>
</template>
