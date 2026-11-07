<script setup lang="ts">
import { computed } from 'vue'

import Button from '~/components/common/button/Button.vue'

const { t } = useI18n()

const currentYear = new Date().getFullYear()

interface FooterLink {
  label: string
  to: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const appSections = computed<FooterColumn>(() => ({
  title: t('footer.sections.appSections'),
  links: [
    { label: t('footer.links.audioLibrary'), to: '/listen' },
    { label: t('footer.links.prayerTimes'), to: '/prayer-times' },
    { label: t('footer.links.quran'), to: '/quran' },
    { label: t('footer.links.duas'), to: '/duas' },
    { label: t('footer.links.qibla'), to: '/qibla' },
    { label: t('footer.links.azkar'), to: '/azkar' },
  ],
}))

const quickLinks = computed<FooterColumn>(() => ({
  title: t('footer.sections.quickLinks'),
  links: [
    { label: t('footer.links.features'), to: '/#features' },
    { label: t('footer.links.story'), to: '/#about' },
    { label: t('footer.links.team'), to: '/#team' },
    { label: t('footer.links.faq'), to: '/#faq' },
    { label: t('footer.links.volunteerWithUs'), to: '/volunteer' },
  ],
}))

const legalLinks = computed<FooterColumn>(() => ({
  title: t('footer.sections.legal'),
  links: [
    { label: t('footer.links.privacyPolicy'), to: '/privacy-policy' },
    { label: t('footer.links.openResources'), to: '/resources' },
  ],
}))

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/Monaajatak',
    type: 'facebook',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/monaajatak',
    type: 'instagram',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@monaajatak',
    type: 'tiktok',
  },
]
</script>

<template>
  <footer class="relative mt-24 overflow-visible sm:mt-32 lg:mt-40">
    <!-- Floating Volunteer Card -->
    <div class="relative z-20 container">
      <div
        class="group relative mx-auto -mb-20 max-w-4xl rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-blue-900/5 transition-all duration-300 ease-out hover:-translate-y-1 sm:-mb-24 sm:p-8 lg:-mb-28 lg:max-w-5xl lg:px-12 lg:py-9"
      >
        <!-- Background Subtle Watermark Pattern -->
        <div
          class="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-[0.04]"
          aria-hidden="true"
        >
          <svg
            class="text-primary h-full w-full"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern
                id="footer-islamic-pattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
                viewBox="0 0 120 120"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M0 40 L40 40 L40 0 M80 0 L80 40 L120 40 M120 80 L80 80 L80 120 M40 120 L40 80 L0 80"
                  />
                  <path
                    d="M60 20 L75 35 L95 25 L85 45 L100 60 L85 75 L95 95 L75 85 L60 100 L45 85 L25 95 L35 75 L20 60 L35 45 L25 25 L45 35 Z"
                  />
                </g>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#footer-islamic-pattern)"
            />
          </svg>
        </div>

        <!-- 3D Volunteer Character Overflowing Out Of Top -->
        <div
          class="pointer-events-none relative z-10 mx-auto -mt-20 w-36 drop-shadow-lg transition-transform duration-300 group-hover:scale-105 sm:-mt-24 sm:w-44 md:absolute md:-top-28 md:mt-0 md:w-48 md:-translate-x-1/2 lg:-top-32 lg:w-56 ltr:md:right-[32%] rtl:md:left-[32%]"
        >
          <img
            src="/images/3D_volunteer.png"
            :alt="t('footer.volunteer.imageAlt')"
            width="268"
            height="268"
            loading="lazy"
            decoding="async"
            class="h-auto w-full object-contain"
          />
        </div>

        <!-- Card Content: Text & CTA Button -->
        <div
          class="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-center md:text-start"
        >
          <!-- Text Information (Start Side / Right in RTL) -->
          <div class="flex max-w-xl flex-col">
            <h3
              class="text-secondary text-2xl font-black tracking-tight sm:text-3xl"
            >
              {{ t('footer.volunteer.title') }}
            </h3>
            <p class="text-grey-600 mt-2 text-sm leading-relaxed sm:text-base">
              {{ t('footer.volunteer.description') }}
            </p>
          </div>

          <!-- Join Button (End Side / Left in RTL) -->
          <div class="shrink-0">
            <Button
              to="/volunteer"
              variant="flat"
              rounded="xl"
              size="large"
              class="group font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <template #append>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </template>
              <span>{{ t('footer.volunteer.cta') }}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Teal Section -->
    <div
      class="relative z-10 rounded-t-3xl bg-blue-500 pt-28 pb-14 text-white sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20"
    >
      <div class="container">
        <div
          class="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          <!-- Brand Logo & Bio (Right Column in RTL) -->
          <div
            class="flex flex-col items-center text-center sm:col-span-2 lg:order-1 lg:col-span-3"
          >
            <NuxtLink
              to="/"
              class="group inline-block transition-transform duration-300 hover:scale-105"
              aria-label="مُناجاتك"
            >
              <img
                src="/images/Icon_White_SVG.svg"
                alt="شعار مُناجاتك"
                width="84"
                height="84"
                class="h-20 w-20 object-contain drop-shadow-sm transition-transform duration-300 group-hover:rotate-1 sm:h-22 sm:w-22"
                loading="lazy"
                decoding="async"
              />
            </NuxtLink>
            <p
              class="mt-4 max-w-67.5 text-xs leading-relaxed text-white/90 sm:text-sm"
            >
              {{ t('footer.brandDescription') }}
            </p>
          </div>

          <!-- App Sections Column -->
          <div
            class="flex flex-col items-center text-center sm:items-start sm:text-start lg:order-2 lg:col-span-2"
          >
            <h4 class="mb-4 text-base font-bold text-white sm:text-lg">
              {{ appSections.title }}
            </h4>
            <ul class="flex flex-col gap-2.5">
              <li
                v-for="link in appSections.links"
                :key="link.to"
              >
                <NuxtLink
                  :to="link.to"
                  class="inline-block text-sm font-normal text-white/80 transition-colors duration-200 hover:text-white sm:text-base"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Quick Links Column -->
          <div
            class="flex flex-col items-center text-center sm:items-start sm:text-start lg:order-3 lg:col-span-2"
          >
            <h4 class="mb-4 text-base font-bold text-white sm:text-lg">
              {{ quickLinks.title }}
            </h4>
            <ul class="flex flex-col gap-2.5">
              <li
                v-for="link in quickLinks.links"
                :key="link.to"
              >
                <NuxtLink
                  :to="link.to"
                  class="inline-block text-sm font-normal text-white/80 transition-colors duration-200 hover:text-white sm:text-base"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Legal Column -->
          <div
            class="flex flex-col items-center text-center sm:items-start sm:text-start lg:order-4 lg:col-span-2"
          >
            <h4 class="mb-4 text-base font-bold text-white sm:text-lg">
              {{ legalLinks.title }}
            </h4>
            <ul class="flex flex-col gap-2.5">
              <li
                v-for="link in legalLinks.links"
                :key="link.to"
              >
                <NuxtLink
                  :to="link.to"
                  class="inline-block text-sm font-normal text-white/80 transition-colors duration-200 hover:text-white sm:text-base"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Signature Headline (Left Column in RTL) -->
          <div
            class="flex flex-col items-center text-center sm:col-span-2 sm:items-start sm:text-start lg:order-5 lg:col-span-3"
          >
            <h2
              class="text-3xl leading-tight font-black text-white sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              <span>{{ t('footer.taglinePart1') }}</span>
              <br />
              <span>{{ t('footer.taglinePart2') }}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Sub-Footer Bar -->
    <div class="border-t border-slate-100/90 bg-white py-2">
      <div
        class="container flex flex-col-reverse items-center justify-between gap-4 sm:flex-row"
      >
        <!-- Copyright Text (Right Side in RTL) -->
        <p class="text-grey-600 text-xs font-normal sm:text-sm">
          © {{ currentYear }} {{ t('footer.copyright') }}
        </p>

        <!-- Social Icons (Left Side in RTL) -->
        <div class="flex items-center gap-3">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.name"
            class="rounded-full p-1.5 text-blue-500 transition-all duration-200 hover:scale-110 hover:bg-blue-50 hover:text-blue-600"
          >
            <!-- Facebook Icon -->
            <svg
              v-if="social.type === 'facebook'"
              class="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
              />
            </svg>

            <!-- Instagram Icon -->
            <svg
              v-else-if="social.type === 'instagram'"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect
                width="20"
                height="20"
                x="2"
                y="2"
                rx="5"
                ry="5"
              />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line
                x1="17.5"
                x2="17.51"
                y1="6.5"
                y2="6.5"
              />
            </svg>

            <!-- TikTok Icon -->
            <svg
              v-else-if="social.type === 'tiktok'"
              class="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.004-.004.007-.007.01-.011a6.28 6.28 0 0 0 1.91-4.42V8.84a8.27 8.27 0 0 0 4.82 1.54V6.92a4.78 4.78 0 0 1-1.01-.23z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
