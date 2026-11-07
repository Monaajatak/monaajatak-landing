<script setup lang="ts">
import QuranReadingScreenshot from '~/assets/imgs/screenshots/03_Quran_Listening.png'
import Vector from '~/assets/imgs/tools-section/Vector.vue'
import ArrowButton from '~/components/common/button/ArrowButton.vue'
import ChipLabel from '~/components/common/chip/ChipLabel.vue'

const { t } = useI18n()
</script>

<template>
  <section
    id="audio-library"
    class="quran-reading-section relative overflow-hidden py-16 lg:py-24"
  >
    <div class="container">
      <div
        class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
      >
        <!-- Phone Mockup Column (Right side in RTL) -->
        <article
          class="order-2 flex items-center justify-center lg:order-1 lg:col-span-6"
        >
          <div class="phone-mockup-wrapper relative">
            <!-- Decorative teal background shape -->
            <div
              class="mockup-bg-shape absolute -top-8 -right-8 h-[110%] w-[85%] rounded-[40px]"
              aria-hidden="true"
            />
            <!-- Phone screenshot -->
            <img
              :src="QuranReadingScreenshot"
              :alt="t('quranReading.phoneAlt')"
              loading="lazy"
              decoding="async"
              class="phone-image relative z-10 h-auto w-64 rounded-[32px] shadow-2xl sm:w-72 lg:w-80"
            />
          </div>
        </article>

        <!-- Text / Info Column (Left side in RTL) -->
        <article
          class="order-1 flex flex-col items-start gap-6 lg:order-2 lg:col-span-6"
        >
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
          <p
            class="text-grey-600 max-w-lg text-base leading-relaxed sm:text-lg"
          >
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

          <!-- Decorative Vector -->
          <div class="relative">
            <Vector class="absolute -top-15 -left-30 -z-1 h-40 w-60" />
          </div>
        </article>
      </div>

      <!-- Bottom Floating Card -->
      <div class="floating-card-wrapper mt-12 flex justify-center lg:mt-16">
        <div
          class="floating-card inline-flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-lg"
        >
          <!-- Teal Icon -->
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
          <!-- Card Text -->
          <div class="flex flex-col">
            <span class="text-secondary text-lg font-black">
              {{ t('quranReading.floatingCardTitle') }}
            </span>
            <span class="text-grey-600 text-sm">
              {{ t('quranReading.floatingCardDesc') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quran-reading-section {
  background-color: var(--color-blue-50);
}

[data-theme='dark'] .quran-reading-section {
  background-color: var(--color-black-800);
}

.mockup-bg-shape {
  background-color: var(--color-blue-500);
}

.phone-mockup-wrapper {
  max-width: 360px;
}

.phone-image {
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.floating-card {
  border: 1px solid rgba(0, 162, 181, 0.12);
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}

.floating-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(103, 109, 119, 0.14);
}

[data-theme='dark'] .floating-card {
  background: var(--color-black-600);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .phone-mockup-wrapper {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .mockup-bg-shape {
    display: none;
  }

  .phone-image {
    border-radius: 24px;
  }
}
</style>
