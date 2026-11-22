<template>
  <div>
    <HeroSection />
    <LazyAppScreensSection />
    <LazyFeaturesSection />
    <LazyAudioLibrarySection />
    <LazyCtaSection />
    <ReviewsSection />
    <LazyFaqSection />
  </div>
</template>

<script setup>
// العنوان والوصف الافتراضيان للموقع في `nuxt.config.ts` هما وسوم الرئيسية.
usePageSeo({
  title: 'مُناجاتك | القرآن الكريم، الأذكار، الأذان ومواقيت الصلاة',
  description:
    'مُناجاتك رفيقك اليومي للطاعة: اقرأ واستمع للقرآن الكريم، تابع مواقيت الصلاة والأذان، أذكار الصباح والمساء، الأدعية، القبلة والمزيد. تطبيق مجاني وبدون إعلانات.',
})
</script>
