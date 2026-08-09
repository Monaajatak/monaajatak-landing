<script setup lang="ts">
const resources = [
  {
    title: 'البيانات والمحتوى الإسلامي',
    items: [
      { name: 'تفاسير القرآن الكريم', description: 'نصوص تفاسير ابن كثير، التفسير الميسر، وتفسير السعدي.', url: 'https://quran.com/' },
      { name: 'بيانات المصحف الشريف', description: 'معلومات السور، الأجزاء، والأحزاب مأخوذة من مصادر مفتوحة موثوقة.', url: 'https://github.com/quran/quran.com-api' },
      { name: 'الأحاديث النبوية', description: 'نصوص صحيح البخاري، صحيح مسلم، ورياض الصالحين.', url: 'https://sunnah.com/' },
      { name: 'الأذكار والأدعية', description: 'أذكار المسلم اليومية وأدعية من الكتاب والسنة وأسماء الله الحسنى.', url: 'https://github.com/osama13th/HisnAlmuslim' }
    ]
  },
  {
    title: 'الخطوط (Fonts)',
    items: [
      { name: 'خط حفص (UthmanTN1)', description: 'الخط العثماني المعتمد من مجمع الملك فهد لطباعة المصحف الشريف.', url: 'https://fonts.qurancomplex.gov.sa/' },
      { name: 'خطوط صفحات المصحف (QCF)', description: 'مجموعة خطوط مجمع الملك فهد المجزأة حسب صفحات المصحف (604 خط) بحجم صغير ومحسن للأداء.', url: 'https://github.com/mosayyyed/monaajatak-resources/tree/main/fonts' },
      { name: 'خط كايرو (Cairo)', description: 'خط عربي مفتوح المصدر مستخدم في واجهات التطبيق.', url: 'https://fonts.google.com/specimen/Cairo' },
      { name: 'خط أسماء السور', description: 'خطوط مخصصة لعرض أسماء السور القرآنية برسم إسلامي جميل.', url: 'https://github.com/mosayyyed/monaajatak-resources/tree/main/fonts' }
    ]
  },
  {
    title: 'أطر العمل والمكتبات',
    items: [
      { name: 'Flutter', description: 'إطار عمل مفتوح المصدر من جوجل نستخدمه لبناء التطبيق على أنظمة Android و iOS.', url: 'https://flutter.dev/' },
      { name: 'Nuxt 3 & Vue.js', description: 'أطر عمل تقدمية نستخدمها في تطوير واجهة هذا الموقع.', url: 'https://nuxt.com/' },
      { name: 'Lucide Icons', description: 'مكتبة أيقونات مفتوحة المصدر وجميلة صُممت ببساطة ووضوح.', url: 'https://lucide.dev/' }
    ]
  }
]

useHead(() => ({
  title: 'الموارد مفتوحة المصدر | مُناجاتك',
  meta: [
    {
      name: 'description',
      content: 'قائمة بالموارد مفتوحة المصدر المستخدمة في تطبيق وموقع مُناجاتك.'
    }
  ]
}))
</script>

<template>
  <section class="section privacy-page">
    <div class="container privacy-container">
      <section class="policy-hero">
        <div class="hero-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
        </div>
        <div class="hero-content">
          <h2>الموارد المفتوحة</h2>
          <p>قائمة بالموارد والأدوات مفتوحة المصدر التي نعتمد عليها في بناء وتطوير تطبيق وموقع مُناجاتك. نحن ممتنون لمجتمع المصادر المفتوحة الذي يسهل الابتكار ويجعله ممكناً للجميع.</p>
        </div>
      </section>

      <article class="privacy-content">
        <template v-for="(section, index) in resources" :key="index">
          <section class="policy-block">
            <div class="block-header">
              <span class="block-badge">{{ index + 1 }}</span>
              <h2>{{ section.title }}</h2>
            </div>
            
            <div class="resources-list">
              <div v-for="item in section.items" :key="item.name" class="resource-card">
                <h3>
                  <a :href="item.url" target="_blank" rel="noopener noreferrer">
                    {{ item.name }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </section>
          
          <hr v-if="index !== resources.length - 1" class="divider">
        </template>
      </article>
    </div>
  </section>
</template>

<style scoped>
.privacy-page {
  padding-top: 24px;
  padding-bottom: 60px;
}

.privacy-container {
  max-width: 920px;
  display: grid;
  gap: 22px;
  text-align: right;
  margin: 0 auto;
}

.policy-hero {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  align-items: center;
  background: linear-gradient(140deg, rgba(var(--primary-rgb), 0.08), rgba(var(--primary-rgb), 0.02));
  border: 1px solid rgba(var(--primary-rgb), 0.18);
  border-radius: 26px;
  padding: 24px 26px;
  box-shadow: var(--shadow-sm);
}

.hero-icon {
  width: 68px;
  height: 68px;
  border-radius: 22px;
  display: grid;
  place-items: center;
  background: rgba(var(--primary-rgb), 0.12);
  color: var(--primary);
}

.hero-content {
  display: grid;
  gap: 8px;
  text-align: right;
}

.hero-content h2 {
  margin: 0;
  font-size: 24px;
  color: var(--text);
}

.hero-content p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.9;
}

.privacy-content {
  padding: 24px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-xs);
}

.policy-block {
  display: grid;
  gap: 20px;
  text-align: start;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.block-badge {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(var(--primary-rgb), 0.15);
  color: var(--primary);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
}

.policy-block h2 {
  font-size: 20px;
  margin: 0;
  color: var(--text);
}

.resources-list {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.resource-card {
  padding: 18px;
  border-radius: 16px;
  background: rgba(var(--surface-rgb), 0.5);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resource-card:hover {
  border-color: rgba(var(--primary-rgb), 0.4);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
  background: var(--surface);
}

.resource-card h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
}

.resource-card h3 a {
  color: var(--primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.resource-card h3 a:hover {
  text-decoration: underline;
}

.resource-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14.5px;
  line-height: 1.7;
}

.divider {
  margin: 32px 0;
  border: 0;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .policy-hero {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .policy-hero {
    gap: 16px;
  }

  .hero-icon {
    margin: 0 auto;
  }

  .hero-content {
    text-align: center;
  }

  .privacy-content {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .policy-hero {
    padding: 20px;
  }

  .hero-icon {
    width: 58px;
    height: 58px;
    border-radius: 18px;
  }

  .block-badge {
    width: 30px;
    height: 30px;
  }
  
  .resources-list {
    grid-template-columns: 1fr;
  }
}
</style>
