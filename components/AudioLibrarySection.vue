<script setup lang="ts">
import audioLib from '~/assets/imgs/screenshots/audioLib.png'
import WaveVector from '~/assets/imgs/tools-section/WaveVector.vue'
import ArrowButton from '~/components/common/button/ArrowButton.vue'
import ChipLabel from '~/components/common/chip/ChipLabel.vue'

const { t } = useI18n()
</script>

<template>
  <section
    id="audio-library"
    class="relative overflow-hidden bg-blue-50 py-16 lg:py-24"
  >
    <div
      class="container flex flex-col items-center gap-12 overflow-hidden lg:flex-row"
    >
      <!-- Phone Mockup Column (Right side in RTL) -->
      <article class="z-10 h-full w-full flex-1">
        <div
          class="relative h-101 w-11/12 overflow-hidden rounded-3xl bg-blue-600"
        >
          <img
            :src="audioLib"
            :alt="t('quranReading.phoneAlt')"
            loading="lazy"
            decoding="async"
            class="absolute top-15 right-1/2 bottom-0 z-10 h-100 w-60 translate-x-1/2 rounded-4xl"
          />
          <wave-vector class="absolute bottom-0 -left-1 h-100 w-90" />
        </div>
      </article>

      <!-- Text / Info Column (Left side in RTL) -->
      <article class="flex flex-1 flex-col items-start gap-6">
        <!-- Chip Label -->
        <chip-label :text="t('quranReading.chipLabel')" />

        <!-- Main Title -->
        <h2
          class="text-secondary text-4xl leading-tight font-black sm:text-5xl lg:text-[46px]"
        >
          {{ t('quranReading.titleLine1') }}
          <br />
          <span class="text-blue-500">
            {{ t('quranReading.titleHighlight') }}
          </span>
        </h2>

        <!-- Description Paragraph -->
        <p class="text-grey-600 max-w-lg text-base leading-relaxed sm:text-lg">
          <span class="text-secondary font-bold">
            {{ t('quranReading.descBold1') }}
          </span>
          {{ t('quranReading.descMiddle') }}
          <span class="text-secondary font-bold">
            {{ t('quranReading.descBold2') }}
          </span>
          {{ t('quranReading.descEnd') }}
        </p>

        <!-- Arrow Button with Link -->
        <a
          href="#experience"
          class="group mt-2 inline-flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span
            class="text-base font-black text-blue-500 transition-colors group-hover:text-blue-600 sm:text-lg"
          >
            {{ t('quranReading.cta') }}
          </span>
          <arrow-button
            size="md"
            :aria-label="t('quranReading.cta')"
          />
        </a>
      </article>
    </div>
  </section>
</template>
