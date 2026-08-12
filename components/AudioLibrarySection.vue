<template>
  <section id="audio-library" class="audio-library-section section reveal">
    <div class="container">
      <div class="audio-announce">
        <div class="announce-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        </div>

        <span class="badge">المكتبة الصوتية</span>
        <h2>المصحف المسموع <span class="text-gradient">بأصوات القراء</span></h2>
        <p class="announce-desc">استمع للقرآن الكريم بتلاوات عطرة من أشهر القراء، وإذاعات قرآنية على مدار الساعة، مع قوائم تشغيل مخصصة — كل ذلك في صفحة استماع واحدة سريعة وهادئة.</p>

        <div class="announce-stats">
          <div class="stat-pill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>مئات القراء</span>
          </div>
          <div class="stat-pill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>
            <span>إذاعات مباشرة</span>
          </div>
          <div class="stat-pill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2z"/></svg>
            <span>قوائم تشغيل مخصصة</span>
          </div>
        </div>

        <NuxtLink to="/listen" class="btn btn-primary btn-cta">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          افتح المكتبة الصوتية
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </NuxtLink>
      </div>

      <div class="audio-features-highlight">
        <h3 class="highlight-title">ماذا ستجد في المكتبة؟</h3>
        <div class="features-grid">
          <div v-for="feature in audioFeatures" :key="feature.id" class="feature-highlight">
            <div class="feature-icon" v-html="feature.icon"></div>
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const audioFeatures = [
  { id: 1, title: 'بث مباشر للإذاعات', desc: 'استمع لإذاعات القرآن الكريم من حول العالم على مدار الساعة', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>' },
  { id: 2, title: 'قوائم تشغيل مخصصة', desc: 'أنشئ قوائمك المفضلة من السور والقراء واستمع إليها في أي وقت', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2z"/></svg>' },
  { id: 3, title: 'المفضلة والتاريخ', desc: 'احفظ قراءك وإذاعاتك المفضلة وراجع سجل استماعك بسهولة', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>' },
  { id: 4, title: 'مؤقت النوم', desc: 'اضبط مؤقتاً لإيقاف التلاوة تلقائياً بعد مدة محددة', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  { id: 5, title: 'التكرار والسرعة', desc: 'كرر السور والآيات واضبط سرعة التلاوة من 0.5x إلى 2x', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>' },
  { id: 6, title: 'روابط قابلة للمشاركة', desc: 'شارك سورة أو قارئاً محدداً عبر رابط مباشر سهل النسخ', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>' }
]
</script>

<style scoped>
.audio-library-section {
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.audio-announce {
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.announce-icon {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 14px 34px rgba(var(--primary-rgb), 0.3);
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: var(--radius-pill);
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  margin-bottom: 16px;
}

.audio-announce h2 {
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 800;
  margin: 16px 0;
  line-height: 1.2;
  color: var(--text);
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.announce-desc {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 32px;
  max-width: 560px;
}

.announce-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
}

.stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--card-bg);
  border: var(--border);
  border-radius: var(--radius-pill);
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
}

.stat-pill svg {
  color: var(--primary);
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  font-size: 16px;
  border-radius: var(--radius-pill);
  box-shadow: 0 14px 34px rgba(var(--primary-rgb), 0.28);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(var(--primary-rgb), 0.36);
}

/* Features */
.audio-features-highlight {
  margin-top: 80px;
  padding-top: 60px;
  border-top: var(--border);
  position: relative;
  z-index: 1;
}

.highlight-title {
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.feature-highlight {
  background: var(--card-bg);
  border: var(--border);
  border-radius: var(--radius);
  padding: 28px 24px;
  transition: all var(--transition);
  text-align: center;
}

.feature-highlight:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(var(--primary-rgb), 0.3);
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin: 0 auto 20px;
  transition: all var(--transition);
}

.feature-highlight:hover .feature-icon {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

.feature-highlight h4 {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 10px;
}

.feature-highlight p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .audio-library-section {
    padding: 60px 0;
  }

  .announce-desc {
    font-size: 16px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
