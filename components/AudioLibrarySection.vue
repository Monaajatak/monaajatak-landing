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
      <article class="z-10 order-2 h-full w-full flex-1 lg:order-1">
        <div
          class="relative h-101 w-full overflow-hidden rounded-3xl bg-blue-600"
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
      <article class="flex flex-col items-start gap-6">
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

<!-- Bottom Floating Card -->
<!-- <div class="floating-card-wrapper mt-12 flex justify-center lg:mt-16">
        <div
          class="floating-card inline-flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-lg"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M4 19.5V4a2 2 0 0 1 2-2h10.9a2 2 0 0 1 2 2v15.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5Z"
              />
              <path d="M9 2v8l3-2.25L15 10V2" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-secondary text-lg font-black">
              {{ t('quranReading.floatingCardTitle') }}
            </span>
            <span class="text-grey-600 text-sm">
              {{ t('quranReading.floatingCardDesc') }}
            </span>
          </div>
        </div>
      </div> -->
