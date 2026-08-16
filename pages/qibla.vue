<template>
  <div class="seo-landing-page">
    <section class="hero-simple">
      <div class="container text-center">
        <h1>اتجاه القبلة بدقة</h1>
        <p class="subtitle">بوصلة القبلة الدقيقة لتحديد اتجاه الكعبة المشرفة في أي وقت ومن أي مكان في العالم باستخدام تطبيق مُناجاتك.</p>
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
  title: 'اتجاه القبلة | تحديد دقيق لبوصلة القبلة | مُناجاتك',
  meta: [
    { name: 'description', content: 'تحديد اتجاه القبلة بدقة من أي مكان في العالم باستخدام بوصلة القبلة المدمجة في تطبيق مُناجاتك. صلاتك دائمًا في الاتجاه الصحيح.' },
    { property: 'og:title', content: 'اتجاه القبلة | تحديد دقيق لبوصلة القبلة | مُناجاتك' },
    { property: 'og:description', content: 'تحديد اتجاه القبلة بدقة من أي مكان في العالم باستخدام بوصلة القبلة المدمجة في تطبيق مُناجاتك. صلاتك دائمًا في الاتجاه الصحيح.' },
    { property: 'og:url', content: 'https://www.monaajatak.app/qibla' },
  ],
  link: [
    { rel: 'canonical', href: 'https://www.monaajatak.app/qibla' }
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
