<template>
  <div class="seo-landing-page">
    <section class="hero-simple">
      <div class="container text-center">
        <h1>مواقيت الصلاة والأذان</h1>
        <p class="subtitle">تعرف على مواعيد الصلاة بدقة لأي مكان في العالم. تنبيهات حية للأذان لضمان عدم تفويت أي صلاة مع تطبيق مُناجاتك.</p>
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
  title: 'مواقيت الصلاة والأذان | أوقات دقيقة لكل صلاة | مُناجاتك',
  meta: [
    { name: 'description', content: 'احصل على مواقيت الصلاة الدقيقة وتنبيهات الأذان الحية أينما كنت. تطبيق مُناجاتك يوفر لك أوقات الصلاة لكل دول العالم بدون تعقيد وبشكل مجاني.' },
    { property: 'og:title', content: 'مواقيت الصلاة والأذان | أوقات دقيقة لكل صلاة | مُناجاتك' },
    { property: 'og:description', content: 'احصل على مواقيت الصلاة الدقيقة وتنبيهات الأذان الحية أينما كنت. تطبيق مُناجاتك يوفر لك أوقات الصلاة لكل دول العالم بدون تعقيد وبشكل مجاني.' },
    { property: 'og:url', content: 'https://www.monaajatak.app/prayer-times' },
  ],
  link: [
    { rel: 'canonical', href: 'https://www.monaajatak.app/prayer-times' }
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
