<script setup lang="ts">
import DownloadIcon from '~/assets/icons/DownloadIcon.vue'
import MobileIcon from '~/assets/icons/MobileIcon.vue'

const { t } = useI18n()

const appFeaturs = computed(() => [
  {
    title: t('hero.completelyFree'),
    id: 'feat1',
  },
  {
    title: t('hero.noAds'),
    id: 'feat2',
  },
  {
    title: t('hero.offlineFeatures'),
    id: 'feat3',
  },
])
</script>

<template>
  <section
    id="hero"
    class="container grid scroll-mt-28 grid-cols-1 lg:grid-cols-2"
  >
    <article class="mt-8 flex flex-col items-center gap-6 lg:items-start">
      <section class="flex flex-col items-center lg:items-start">
        <h2 class="text-6xl leading-tight font-black">
          {{ $t('hero.titlePrefix') }}
        </h2>
        <h1 class="main-heading text-6xl font-black">{{ $t('hero.title') }}</h1>
        <p class="text-lg font-normal">
          {{ $t('hero.description') }}
          <span class="font-bold">{{ $t('hero.completelyFree') }}</span>
        </p>
      </section>

      <section class="flex flex-col items-center lg:items-start">
        <div class="mb-4 flex gap-4">
          <Button
            variant="flat"
            :text="$t('nav.downloadApp')"
            :icon="DownloadIcon"
          />
          <Button
            variant="outlined"
            :text="$t('nav.volunteerToMonaajatak')"
            :icon="MobileIcon"
          />
        </div>
        <ul class="flex gap-4">
          <li
            v-for="feature in appFeaturs"
            :key="feature.id"
          >
            <span
              class="before:bg-primary text-sm font-bold before:me-2 before:inline-block before:h-2 before:w-2 before:rounded-full"
            >
              {{ feature.title }}
            </span>
          </li>
        </ul>
      </section>

      <figure class="flex w-95 items-center gap-2">
        <figcaption>
          <h3 class="text-2xl font-black">
            {{ $t('hero.worshipOnePlace') }}
          </h3>
          <p>
            {{ $t('hero.worshipSummary') }}
          </p>
        </figcaption>
        <nuxt-img
          src="images/monaajatak_mobile.svg"
          :alt="$t('hero.mobileAppAlt')"
          class="h-40"
        />
      </figure>
    </article>

    <figure class="mx-auto">
      <nuxt-img
        src="images/monaajatak_person.svg"
        :alt="$t('hero.personAlt')"
        class="hidden h-fit w-60 lg:inline-block lg:w-110"
      />
    </figure>
  </section>
</template>
