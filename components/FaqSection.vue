<script setup lang="ts">
import { computed, ref } from 'vue'

import questionMarkIcon from '~/assets/imgs/tools-section/question_mark_3D_icon.png'
import ChipLabel from '~/components/common/chip/ChipLabel.vue'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const { t } = useI18n()

// First item open by default matching mockup
const activeIndex = ref<number | null>(0)

const faqItemIds = [
  'free',
  'account',
  'offline',
  'feedback',
  'bookmarks',
  'darkMode',
] as const

const faqItems = computed<FaqItem[]>(() =>
  faqItemIds.map(id => ({
    id,
    question: t(`faq.items.${id}.question`),
    answer: t(`faq.items.${id}.answer`),
  })),
)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <section
    id="faq"
    class="relative overflow-hidden py-16 sm:py-20 lg:py-28"
  >
    <div class="relative container">
      <!-- 3D Question Mark Graphic (Floating on the right in RTL, left in LTR) -->
      <div
        class="pointer-events-none absolute top-16 z-10 hidden md:block ltr:left-0 ltr:md:-left-4 ltr:lg:-left-6 ltr:xl:left-2 rtl:right-0 rtl:md:-right-4 rtl:lg:-right-6 rtl:xl:right-2"
        aria-hidden="true"
      >
        <img
          :src="questionMarkIcon"
          :alt="t('faq.questionMarkAlt')"
          width="340"
          height="695"
          loading="lazy"
          decoding="async"
          class="w-32 drop-shadow-2xl md:w-44 lg:w-56 xl:w-68"
        />
      </div>

      <!-- Header: Chip & Title with squiggly underline -->
      <div class="relative z-20 flex flex-col items-center text-center">
        <!-- Chip Label -->
        <chip-label :text="t('faq.chipLabel')" />

        <!-- Main Title -->
        <h2
          class="text-secondary mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
        >
          <span>{{ t('faq.titlePart1') }}</span>
          <span class="relative ms-2.5 inline-block text-blue-500">
            {{ t('faq.titlePart2') }}

            <!-- Hand-drawn Squiggly Underline -->
            <svg
              class="pointer-events-none absolute inset-x-0 -bottom-3 mx-auto w-36 text-blue-500 sm:w-44"
              viewBox="0 0 170 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 10C26 4 56 13 86 7C114 1 144 10 167 4"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      <!-- FAQ Accordion List -->
      <div
        class="relative z-20 mx-auto mt-10 flex max-w-4xl flex-col gap-4 sm:mt-14 sm:gap-5"
      >
        <button
          v-for="(item, index) in faqItems"
          :key="item.id"
          type="button"
          :aria-expanded="activeIndex === index"
          class="group w-full rounded-2xl p-5 text-start transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:rounded-3xl sm:px-8 sm:py-6"
          :class="[
            activeIndex === index
              ? 'bg-primary! text-white shadow-xl shadow-blue-900/15'
              : 'border border-slate-100/90 bg-white shadow-xs hover:border-slate-200 hover:shadow-md',
          ]"
          @click="toggleFaq(index)"
        >
          <!-- Question Header Row -->
          <div class="flex items-center justify-between gap-4">
            <h3
              class="text-base font-bold transition-colors duration-200 sm:text-lg"
              :class="
                activeIndex === index
                  ? 'text-white'
                  : 'text-slate-800 group-hover:text-blue-600'
              "
            >
              {{ item.question }}
            </h3>

            <!-- Toggle Icon: × when active, + when collapsed -->
            <span
              class="shrink-0 transition-transform duration-300"
              :class="
                activeIndex === index
                  ? 'text-white'
                  : 'text-slate-400 group-hover:text-blue-500'
              "
            >
              <!-- Close Icon (×) -->
              <svg
                v-if="activeIndex === index"
                class="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>

              <!-- Plus Icon (+) -->
              <svg
                v-else
                class="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </div>

          <!-- Smooth Expandable Answer Area -->
          <div
            class="grid transition-[grid-template-rows] duration-300 ease-out"
            :class="
              activeIndex === index
                ? 'mt-2.5 grid-rows-[1fr] sm:mt-3'
                : 'mt-0 grid-rows-[0fr]'
            "
          >
            <div class="overflow-hidden">
              <p
                class="text-xs leading-relaxed font-normal text-white/90 sm:text-sm"
              >
                {{ item.answer }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
