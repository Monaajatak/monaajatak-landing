<template>
  <div class="seo-landing-page">
    <section class="hero-simple">
      <div class="container text-center">
        <h1>موسوعة الأدعية الشاملة</h1>
        <p class="subtitle">مجموعة شاملة من الأدعية النبوية وأدعية القرآن الكريم مقسمة لتناسب كل موقف وحاجة في يومك.</p>
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
  title: 'الأدعية اليومية | أدعية مستجابة وشاملة | مُناجاتك',
  meta: [
    { name: 'description', content: 'تصفح وشارك الأدعية اليومية وأدعية القرآن والسنة النبوية بكل سهولة. تطبيق مُناجاتك رفيقك للطاعة والتقرب إلى الله في كل وقت.' },
    { property: 'og:title', content: 'الأدعية اليومية | أدعية مستجابة وشاملة | مُناجاتك' },
    { property: 'og:description', content: 'تصفح وشارك الأدعية اليومية وأدعية القرآن والسنة النبوية بكل سهولة. تطبيق مُناجاتك رفيقك للطاعة والتقرب إلى الله في كل وقت.' },
    { property: 'og:url', content: 'https://www.monaajatak.app/duas' },
  ],
  link: [
    { rel: 'canonical', href: 'https://www.monaajatak.app/duas' }
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
