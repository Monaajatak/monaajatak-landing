<template>
  <div class="seo-landing-page">
    <section class="hero-simple">
      <div class="container text-center">
        <h1>القرآن الكريم بين يديك</h1>
        <p class="subtitle">اقرأ واستمع للقرآن الكريم في أي وقت وبدون الحاجة للإنترنت. تجربة هادئة، خطوط واضحة، وتصميم يريح العين مع تطبيق مُناجاتك.</p>
        <div class="hero-actions">
          <AppLinkLanding />
        </div>
      </div>
    </section>

    <LazyFeaturesSection />
    <LazyAppScreensSection />
    <LazyCtaSection />
  </div>
</template>

<script setup>
useHead({
  title: 'القرآن الكريم | قراءة واستماع بدون إنترنت | مُناجاتك',
  meta: [
    { name: 'description', content: 'تطبيق القرآن الكريم من مُناجاتك، يوفر لك قراءة واستماع للقرآن بدون إنترنت وتجربة مستخدم مريحة للعين خالية من الإعلانات.' },
    { property: 'og:title', content: 'القرآن الكريم | قراءة واستماع بدون إنترنت | مُناجاتك' },
    { property: 'og:description', content: 'تطبيق القرآن الكريم من مُناجاتك، يوفر لك قراءة واستماع للقرآن بدون إنترنت وتجربة مستخدم مريحة للعين خالية من الإعلانات.' },
    { property: 'og:url', content: 'https://www.monaajatak.app/quran' },
  ],
  link: [
    { rel: 'canonical', href: 'https://www.monaajatak.app/quran' }
  ]
})
</script>

<style scoped>
.hero-simple {
  padding: 80px 20px 60px;
  background: var(--surface);
  border-bottom: var(--border);
  margin-bottom: 40px;
}
.hero-simple h1 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--text);
}
.subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto 32px;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
  .hero-simple {
    padding: 60px 20px 40px;
  }
  .hero-simple h1 {
    font-size: 32px;
  }
}
</style>
