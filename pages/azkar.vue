<template>
  <div class="seo-landing-page">
    <section class="hero-simple">
      <div class="container text-center">
        <h1>أذكار الصباح والمساء</h1>
        <p class="subtitle">حصّن نفسك يومياً مع أذكار الصباح والمساء، أذكار الاستيقاظ، والنوم. واجهة مريحة ومسبحة إلكترونية مدمجة لتسهيل الورد اليومي.</p>
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
  title: 'أذكار الصباح والمساء | حصن المسلم | مُناجاتك',
  description: 'اقرأ أذكار الصباح والمساء الصحيحة يومياً من خلال تطبيق مُناجاتك. واجهة سهلة الاستخدام ومسبحة إلكترونية وتنبيهات بمواعيد الأذكار.',
  breadcrumbs: [['الأذكار', '/azkar']],
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
