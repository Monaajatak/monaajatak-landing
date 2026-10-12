<template>
  <div class="seo-landing-page">
    <section class="hero-simple">
      <div class="container text-center">
        <h1>مواقيت الصلاة والأذان</h1>
        <p class="subtitle">تعرف على مواعيد الصلاة بدقة لأي مكان في العالم. تنبيهات حية للأذان لضمان عدم تفويت أي صلاة مع تطبيق مُناجاتك.</p>
        <div class="hero-actions">
          <NuxtLink to="/download" class="btn btn-primary">حمّل التطبيق مجاناً</NuxtLink>
          <NuxtLink to="/listen" class="btn btn-outline">استمع للقرآن الآن</NuxtLink>
        </div>
      </div>
    </section>

    <LazyFeaturesSection />
    <LazyAppScreensSection />
    <LazyCtaSection />
  </div>
</template>

<script setup>
usePageSeo({
  title: 'مواقيت الصلاة والأذان | أوقات دقيقة لكل صلاة | مُناجاتك',
  description: 'احصل على مواقيت الصلاة الدقيقة وتنبيهات الأذان الحية أينما كنت. تطبيق مُناجاتك يوفر لك أوقات الصلاة لكل دول العالم بدون تعقيد وبشكل مجاني.',
  breadcrumbs: [['مواقيت الصلاة', '/prayer-times']],
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
  flex-wrap: wrap;
  gap: 12px;
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
