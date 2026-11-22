<script setup lang="ts">
import { computed } from 'vue'

import MoonIcon from '~/assets/icons/MoonIcon.vue'
import MosqueIcon from '~/assets/icons/MosqueIcon.vue'
import QuranIcon from '~/assets/icons/QuranIcon.vue'
import ReciterIcon from '~/assets/icons/ReciterIcon.vue'
import TasbihIcon from '~/assets/icons/TasbihIcon.vue'
import QuranReading from '~/assets/imgs/screenshots/02_Quran_Reading.png'
import DarkLightMode from '~/assets/imgs/screenshots/08_Dark_Light_Mode.png'
import micIcon from '~/assets/imgs/tools-section/microphone_icon.png'
import mosque from '~/assets/imgs/tools-section/mosque.png'
import Sebha from '~/assets/imgs/tools-section/Sebha.png'
import Vector from '~/assets/imgs/tools-section/Vector.vue'
import ArrowButton from '~/components/common/button/ArrowButton.vue'
import OverflowCard from '~/components/common/card/OverflowCard.vue'
import ChipLabel from '~/components/common/chip/ChipLabel.vue'

const { t } = useI18n()

const cards = computed(() => [
  {
    title: t('tools.cards.quran.title'),
    description: t('tools.cards.quran.description'),
    imageSrc: QuranReading,
    imageClass: 'h-24 w-30 rotate-10 top-1 -left-12',
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
    imageSrc: Sebha,
    imageAlt: t('tools.cards.azkar.title'),
    badgeIcon: TasbihIcon,
  },
  {
    title: t('tools.cards.qibla.title'),
    description: t('tools.cards.qibla.description'),
    imageSrc: mosque,
    imageAlt: t('tools.cards.qibla.title'),
    badgeIcon: MosqueIcon,
    imageClass: 'w-30 h-30',
  },
  {
    title: t('tools.cards.eyeComfort.title'),
    description: t('tools.cards.eyeComfort.description'),
    imageSrc: DarkLightMode,
    imageAlt: t('tools.cards.eyeComfort.title'),
    badgeIcon: MoonIcon,
    imageClass: '-rotate-12',
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
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <overflow-card
            v-for="(card, index) in cards"
            :key="index"
            :title="card.title"
            :description="card.description"
            :image-src="card.imageSrc"
            :image-alt="card.imageAlt"
            :image-class="card.imageClass"
            :badge-icon="card.badgeIcon"
            :has-pattern="card.hasPattern"
            :wrapper-class="card.wrapperClass"
            image-loading="lazy"
          />
        </div>
      </article>

      <!-- Text / Info Column (Right in RTL, Left in LTR) -->
      <article
        class="order-1 flex flex-col items-start gap-6 lg:order-2 lg:col-span-5"
      >
        <!-- Reusable Component 1: Chip Label -->
        <chip-label :text="t('tools.chipLabel')" />

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
          <span
            class="text-base font-black text-blue-500 transition-colors group-hover:text-blue-600 sm:text-lg"
          >
            {{ t('tools.exploreExperience') }}
          </span>
          <arrow-button
            size="md"
            :aria-label="t('tools.exploreExperience')"
          />
        </a>

        <div class="relative">
          <Vector class="absolute -top-15 -left-30 -z-1 h-40 w-60" />
        </div>
      </article>
    </div>
  </section>
</template>
