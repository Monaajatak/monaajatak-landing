<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'

import DownloadIcon from '~/assets/icons/DownloadIcon.vue'
import islamicMask from '~/assets/imgs/IslamicMask.svg'
import handPhone from '~/assets/imgs/screenshots/hand_phone.png'
import Button from '~/components/common/button/Button.vue'

const { t } = useI18n()

const platform = ref('web')

// Inline SVG components for Store Badges (vector, zero network latency, DRY)
const GooglePlayIcon = () =>
  h(
    'svg',
    {
      class: 'shrink-0',
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        d: 'M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.614V3.428c0-.623.228-1.2.61-1.614z',
        fill: '#00E676',
      }),
      h('path', {
        d: 'M17.18 8.613L4.856.786A2.43 2.43 0 0 0 3.61 1.814l10.183 10.186 3.387-3.387z',
        fill: '#FFD600',
      }),
      h('path', {
        d: 'M3.61 22.186a2.43 2.43 0 0 0 1.246 1.028l12.325-7.827-3.388-3.387L3.61 22.186z',
        fill: '#FF3D00',
      }),
      h('path', {
        d: 'M21.134 11.134l-3.954-2.521-3.387 3.387 3.387 3.387 3.954-2.52a1.528 1.528 0 0 0 0-2.733z',
        fill: '#00B0FF',
      }),
    ],
  )

const AppStoreIcon = () =>
  h(
    'svg',
    {
      class: 'shrink-0 fill-current text-white',
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
    },
    [
      h('path', {
        d: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.67 1.39-.56.64-1.05 1.71-.92 2.74 1.04.08 2.06-.51 2.67-1.26z',
      }),
    ],
  )

const stores = [
  {
    id: 'googleplay',
    name: 'Google Play',
    subtitle: 'GET IT ON',
    uppercase: true,
    href: 'https://play.google.com/store/apps/details?id=com.mahmoudmourad.monologue',
    icon: GooglePlayIcon,
  },
  {
    id: 'appstore',
    name: 'App Store',
    subtitle: 'Download on the',
    uppercase: false,
    href: 'https://apps.apple.com/ua/app/%D9%85%D9%86%D8%A7%D8%AC%D8%A7%D8%AA%D9%83-%D8%B1%D9%81%D9%8A%D9%82-%D8%A7%D9%84%D8%B7%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%8A%D9%88%D9%85%D9%8A/id6759576802',
    icon: AppStoreIcon,
  },
]

const platformStoreMap: Record<string, string> = {
  ios: 'appstore',
  android: 'googleplay',
}

const features = computed(() => [
  { id: 'free', title: t('hero.completelyFree') },
  { id: 'noAds', title: t('hero.noAds') },
  { id: 'offline', title: t('hero.offlineFeatures') },
])

const downloadHref = computed(() => {
  const storeId = platformStoreMap[platform.value]
  return stores.find(s => s.id === storeId)?.href ?? '/download'
})

const detectPlatform = () => {
  const ua = navigator?.userAgent?.toLowerCase() || ''
  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  if (/android/.test(ua)) return 'android'
  return 'web'
}

onMounted(() => {
  platform.value = detectPlatform()
})
</script>

<template>
  <section
    id="download"
    class="download-cta container my-14 scroll-mt-28 py-6 sm:my-20 lg:my-24"
  >
    <div
      class="bg-primary! relative overflow-hidden rounded-4xl p-4 shadow-2xl shadow-blue-900/15 sm:rounded-[40px] lg:min-h-92.5 lg:px-12"
    >
      <!-- Content Layout: 3 Columns on Desktop (Hand Right, Text Center, Badges Left in RTL) -->
      <div
        class="relative z-20 flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-center"
      >
        <!-- Center: Headline, CTA Buttons & Bullet Features (order-1 on mobile / order-2 on desktop) -->
        <div
          class="order-2 flex max-w-xl flex-col items-center text-center lg:order-2 lg:max-w-lg xl:max-w-xl"
        >
          <!-- Main Headline -->
          <h2
            class="text-4xl leading-tight font-black tracking-tight text-white sm:text-5xl lg:text-[54px] xl:text-[62px]"
          >
            <span>{{ t('ctaSection.titleLine1') }}</span>
            <br />
            <span>{{ t('ctaSection.titleLine2') }}</span>
          </h2>

          <!-- CTA Buttons -->
          <div
            class="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8"
          >
            <!-- Primary Download Button (White with Teal Text) -->
            <Button
              :href="downloadHref"
              variant="flat"
              size="large"
            >
              <template #append>
                <download-icon class="h-5 w-5" />
              </template>
              <span>{{ t('ctaSection.downloadNow') }}</span>
            </Button>

            <!-- Secondary Discover Button (Outlined White) -->
            <Button
              href="/#features"
              variant="outlined"
              size="large"
              class="text-white!"
            >
              <span>{{ t('ctaSection.discoverFeatures') }}</span>
            </Button>
          </div>

          <!-- Feature Bullets -->
          <ul
            class="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-white/95 sm:gap-6 sm:text-sm"
          >
            <li
              v-for="feat in features"
              :key="feat.id"
              class="inline-flex items-center"
            >
              <span
                class="before:me-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-white"
              >
                {{ feat.title }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Store Badges: Single DRY Block (order-2 on mobile / order-3 on desktop in RTL = Left) -->
        <div
          class="order-3 flex flex-col items-center lg:items-start ltr:lg:order-3 rtl:lg:order-3"
        >
          <span
            class="mb-3 self-center text-center text-xs font-bold text-white sm:text-sm lg:mb-3.5"
          >
            {{ t('ctaSection.availableOn') }}
          </span>
          <div class="flex flex-row flex-wrap justify-center gap-3 lg:flex-col">
            <a
              v-for="store in stores"
              :key="store.id"
              :href="store.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex w-40 items-center gap-2.5 rounded-md border border-white bg-black/90 px-3 py-2 shadow-md transition-all duration-300 hover:scale-105 sm:w-44 sm:gap-3 sm:px-3.5"
            >
              <component
                :is="store.icon"
                class="h-5 w-5 sm:h-6 sm:w-6"
              />
              <div class="flex flex-col text-start">
                <span
                  class="text-[8px] leading-none font-medium tracking-wider text-white/70 sm:text-[9px]"
                  :class="{ uppercase: store.uppercase }"
                >
                  {{ store.subtitle }}
                </span>
                <span
                  class="mt-0.5 text-xs leading-tight font-bold text-white sm:text-sm"
                >
                  {{ store.name }}
                </span>
              </div>
            </a>
          </div>
        </div>

        <!-- Hand Phone Mockup (order-3 on mobile / order-1 on desktop in RTL = Right) -->
        <div
          class="pointer-events-none relative order-1 w-64 shrink-0 self-center sm:w-80 md:w-88 lg:-mb-10 lg:w-[320px] lg:self-end xl:-mb-10 xl:w-90 ltr:lg:order-1 rtl:lg:order-1"
        >
          <img
            :src="handPhone"
            :alt="t('ctaSection.phoneAlt')"
            width="373"
            height="462"
            loading="lazy"
            decoding="async"
            class="h-auto w-full object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

      <!-- Background Islamic Mask Pattern -->
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 flex h-1/2 justify-between overflow-hidden opacity-20 sm:opacity-25"
        aria-hidden="true"
      >
        <img
          v-for="i in 3"
          :key="i"
          :src="islamicMask"
          alt=""
          class="h-full w-105 shrink-0 object-contain object-bottom"
        />
      </div>
    </div>
  </section>
</template>
