<template>
  <section
    id="screenshots"
    class="screenshots-section section"
  >
    <div class="container">
      <div class="section-header reveal text-center">
        <span class="badge-pill">{{ $t('screenshots.badge') }}</span>
        <h2>
          {{ $t('screenshots.titlePrefix') }}
          <span class="text-gradient">
            {{ $t('screenshots.titleHighlight') }}
          </span>
          {{ $t('screenshots.titleSuffix') }}
        </h2>
        <p class="section-desc">
          {{ $t('screenshots.description') }}
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
