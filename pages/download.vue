<script setup>
const categories = [
  {
    id: 'fonts',
    title: 'الخطوط والأيقونات',
    description: 'الخطوط والأيقونات المستخدمة في واجهة التطبيق والمصحف',
    items: [
      { name: 'خط Arsura', description: 'الخط المخصص لعرض أسماء السور القرآنية بخط الثلث', format: 'TTF', size: '~1 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/fonts/arsura.ttf' },
      { name: 'خطوط صفحات المصحف (QCF)', description: 'مجموعة خطوط مجمع الملك فهد (604 خط) مجزأة لصفحات المصحف بحجم صغير ومحسن', format: 'WOFF', size: 'متعدد الأجزاء (55MB كلياً)', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/fonts/qcf.zip' },
      { name: 'خط القاهرة (Cairo)', description: 'الخط الأساسي المستخدم في النصوص العادية وقوائم التطبيق', format: 'TTF', size: '~3 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/fonts/Cairo-VariableFont_slnt,wght.ttf' },
      { name: 'مجموعة الأيقونات', description: 'أيقونات التطبيق بدقة عالية', format: 'SVG', size: 'متوفر قريباً', url: '#' }
    ]
  },
  {
    id: 'databases',
    title: 'قواعد البيانات',
    description: 'ملفات قواعد البيانات الأساسية لتشغيل التطبيق',
    items: [
      { name: 'تفسير السعدي', description: 'تفسير السعدي كامل بصيغة قاعدة بيانات', format: 'DB', size: '~10 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/tafsir-as-saadi.db' },
      { name: 'التفسير الميسر', description: 'التفسير الميسر للقرآن الكريم لجميع الآيات', format: 'DB', size: '~15 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/ar-tafsir-muyassar.db' },
      { name: 'معلومات السور', description: 'بيانات السور القرآنية (الاسم، مكان النزول، إلخ)', format: 'DB', size: 'صغير', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/surah_info.db' },
      { name: 'بيانات الأجزاء والأحزاب', description: 'تقسيمات المصحف (أرباع، أحزاب، إلخ)', format: 'SQLite', size: 'صغير', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/quran-metadata-hizb.sqlite' }
    ]
  },
  {
    id: 'media',
    title: 'الصور والوسائط',
    description: 'الصور والخلفيات المستخدمة في تصميم الواجهات',
    items: [
      { name: 'خلفية التطبيق الأساسية', description: 'الخلفية الإسلامية المستخدمة (الوضع العادي)', format: 'PNG', size: '~2 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/img/page_header.png' },
      { name: 'خلفية التطبيق (الوضع الليلي)', description: 'الخلفية الإسلامية المستخدمة (الوضع الليلي)', format: 'PNG', size: '~2 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/img/page_header_dark.png' },
      { name: 'إطار السورة', description: 'المخطوطة المستخدمة في إطار اسم السورة', format: 'PNG', size: '~1 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/img/surah_banner.png' }
    ]
  }
]

const getIconType = (format) => {
  const f = format.toLowerCase();
  if (['ttf', 'woff', 'otf'].includes(f)) return 'font';
  if (['db', 'sqlite', 'sql'].includes(f)) return 'database';
  if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(f)) return 'image';
  return 'file';
}
</script>

<template>
  <section class="download-assets-page section">
    <!-- Decorative background elements -->
    <div class="bg-shape bg-shape-1"></div>
    <div class="bg-shape bg-shape-2"></div>

    <div class="container relative z-10">
      <div class="page-header text-center">
        <span class="badge-pill">مفتوح المصدر</span>
        <h1 class="page-title">مكتبة <span class="text-gradient">الملحقات</span></h1>
        <p class="page-lead">
          مساحة مخصصة لمشاركة جميع الملحقات، الخطوط، وقواعد البيانات المستخدمة في مشروع مُناجاتك لتكون متاحة للجميع للتحميل المباشر وبناء مشاريعهم الخاصة.
        </p>
      </div>

      <div class="categories-container">
        <div v-for="category in categories" :key="category.id" class="category-block">
          <div class="category-header">
            <div class="category-title-wrapper">
              <div class="category-icon" :class="category.id">
                <svg v-if="category.id === 'fonts'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                <svg v-else-if="category.id === 'databases'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <h2>{{ category.title }}</h2>
            </div>
            <p>{{ category.description }}</p>
          </div>
          
          <div class="cards-grid">
            <div v-for="item in category.items" :key="item.name" class="asset-card card-glass group">
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="card-icon-wrapper" :class="getIconType(item.format)">
                  <svg v-if="getIconType(item.format) === 'font'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
                  <svg v-else-if="getIconType(item.format) === 'database'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
                  <svg v-else-if="getIconType(item.format) === 'image'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div class="card-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.description }}</p>
                  <div class="card-meta">
                    <span class="meta-tag format">{{ item.format }}</span>
                    <span class="meta-tag size">{{ item.size }}</span>
                  </div>
                </div>
              </div>
              <a :href="item.url" class="download-btn" :class="{ 'disabled': item.url === '#' }" :title="item.url === '#' ? 'قريباً' : 'تحميل المورد'">
                <span v-if="item.url !== '#'">تحميل مباشر</span>
                <span v-else>قريباً</span>
                <svg v-if="item.url !== '#'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.download-assets-page {
  padding-top: 60px;
  padding-bottom: 100px;
  min-height: 85vh;
  position: relative;
  overflow: hidden;
}

/* Decorative Background */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.4;
  pointer-events: none;
}

.bg-shape-1 {
  top: -10%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, rgba(var(--primary-rgb), 0) 70%);
}

.bg-shape-2 {
  bottom: 10%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%);
}

[data-theme='dark'] .bg-shape {
  opacity: 0.15;
}

.relative {
  position: relative;
}

.z-10 {
  z-index: 10;
}

/* Header */
.page-header {
  margin-bottom: 60px;
  max-width: 680px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.badge-pill {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
}

.page-title {
  font-size: clamp(36px, 5vw, 48px);
  font-weight: 800;
  margin: 0;
  color: var(--text);
  line-height: 1.2;
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-lead {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
}

/* Categories */
.categories-container {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.category-block {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.category-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.category-icon.fonts {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.category-icon.databases {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.category-icon.media {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.category-header h2 {
  font-size: 26px;
  font-weight: 800;
  color: var(--text);
  margin: 0;
}

.category-header p {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
  padding-right: 56px;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

/* Asset Card */
.asset-card {
  position: relative;
  padding: 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  background: var(--surface);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  z-index: 1;
}

.asset-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border-color: rgba(var(--primary-rgb), 0.3);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(var(--primary-rgb), 0.08) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.asset-card:hover .card-glow {
  opacity: 1;
}

.card-content {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

/* Icon Wrapper */
.card-icon-wrapper {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.asset-card:hover .card-icon-wrapper {
  transform: scale(1.05) rotate(-3deg);
}

.card-icon-wrapper.font {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.card-icon-wrapper.database {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.card-icon-wrapper.image {
  background: rgba(236, 72, 153, 0.1);
  color: #ec4899;
}

.card-icon-wrapper.file {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
}

/* Card Info */
.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  transition: color 0.3s ease;
}

.asset-card:hover .card-info h3 {
  color: var(--primary);
}

.card-info p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Meta Tags */
.card-meta {
  display: flex;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.meta-tag {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--bg-color);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.meta-tag.format {
  background: rgba(var(--text-rgb), 0.05);
}

/* Download Button */
.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  background-color: var(--bg-color);
  color: var(--text);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.download-btn:hover:not(.disabled) {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 8px 16px rgba(var(--primary-rgb), 0.25);
  transform: translateY(-2px);
}

.download-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: rgba(var(--text-rgb), 0.05);
}

/* Responsive */
@media (max-width: 768px) {
  .download-assets-page {
    padding-top: 40px;
  }
  
  .category-header p {
    padding-right: 0;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
