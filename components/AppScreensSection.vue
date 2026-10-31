<template>
  <section
    id="screenshots"
    class="screenshots-section section my-4"
  >
    <div class="container">
      <div class="section-header reveal text-center">
        <span class="text-xl font-medium">
          {{ $t('screenshots.badge') }}
        </span>
        <h2 class="my-6 text-5xl font-black">
          {{ $t('screenshots.titlePrefix') }}
          <span class="text-primary!">
            {{ $t('screenshots.titleHighlight') }}
          </span>
          {{ $t('screenshots.titleSuffix') }}
        </h2>
        <p class="text-xl">
          {{ $t('screenshots.description') }}
          <span class="font-bold">
            {{ $t('screenshots.descriptionSuffix') }}
          </span>
        </p>
      </div>

      <div class="screenshots-wrapper reveal-delay-2">
        <AppShowcase />
      </div>
    </div>
  </section>
</template>

<style scoped>
.screenshots-section {
  background-color: var(--surface-alt);
}
</style>
