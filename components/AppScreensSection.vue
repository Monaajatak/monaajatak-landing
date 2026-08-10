<template>
  <section id="screenshots" class="screenshots-section section">
    <div class="container">
      <div class="section-header text-center reveal">
        <span class="badge-pill">جولة في التطبيق</span>
        <h2>شاهد <span class="text-gradient">مُناجاتك</span> من الداخل</h2>
        <p class="section-desc">
          استكشف واجهة التطبيق المصممة بعناية لتوفير أقصى درجات الهدوء والراحة أثناء القراءة والذكر.
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
    border-top: 1px solid var(--border-color);
}

.screenshots-wrapper {
    margin-top: 48px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}
</style>
