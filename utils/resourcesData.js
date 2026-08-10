export const resourceCategories = [
  {
    id: 'fonts',
    title: 'الخطوط والأيقونات',
    description: 'الخطوط والأيقونات المستخدمة في واجهة التطبيق والمصحف',
    items: [
      { id: 'font-arsura', name: 'خط Arsura', description: 'الخط المخصص لعرض أسماء السور القرآنية بخط الثلث', format: 'TTF', size: '~1 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/fonts/arsura.ttf' },
      { id: 'font-qcf', name: 'خطوط صفحات المصحف (QCF)', description: 'مجموعة خطوط مجمع الملك فهد (604 خط) مجزأة لصفحات المصحف بحجم صغير ومحسن', format: 'WOFF', size: 'متعدد الأجزاء (55MB كلياً)', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/fonts/qcf.zip' },
      { id: 'font-cairo', name: 'خط القاهرة (Cairo)', description: 'الخط الأساسي المستخدم في النصوص العادية وقوائم التطبيق', format: 'TTF', size: '~3 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/fonts/Cairo-VariableFont_slnt,wght.ttf' },
      { id: 'icons-svg', name: 'مجموعة الأيقونات', description: 'أيقونات التطبيق بدقة عالية', format: 'SVG', size: 'متوفر قريباً', url: '#' }
    ]
  },
  {
    id: 'databases',
    title: 'قواعد البيانات',
    description: 'ملفات قواعد البيانات الأساسية لتشغيل التطبيق',
    items: [
      { id: 'db-saadi', name: 'تفسير السعدي', description: 'تفسير السعدي كامل بصيغة قاعدة بيانات لتسهيل البحث والعرض المباشر', format: 'DB', size: '~10 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/tafsir-as-saadi.db' },
      { id: 'db-muyassar', name: 'التفسير الميسر', description: 'التفسير الميسر للقرآن الكريم لجميع الآيات بصيغة مهيأة للتطبيقات', format: 'DB', size: '~15 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/ar-tafsir-muyassar.db' },
      { id: 'db-surah-info', name: 'معلومات السور', description: 'بيانات السور القرآنية (الاسم، مكان النزول، عدد الآيات، إلخ)', format: 'DB', size: 'صغير', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/surah_info.db' },
      { id: 'db-hizb-metadata', name: 'بيانات الأجزاء والأحزاب', description: 'تقسيمات المصحف الدقيقة (أرباع، أحزاب، أجزاء)', format: 'SQLite', size: 'صغير', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/dbs/quran-metadata-hizb.sqlite' }
    ]
  },
  {
    id: 'media',
    title: 'الصور والوسائط',
    description: 'الصور والخلفيات المستخدمة في تصميم الواجهات',
    items: [
      { id: 'img-bg-light', name: 'خلفية التطبيق الأساسية', description: 'الخلفية الإسلامية المستخدمة (الوضع العادي)', format: 'PNG', size: '~2 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/img/page_header.png' },
      { id: 'img-bg-dark', name: 'خلفية التطبيق (الوضع الليلي)', description: 'الخلفية الإسلامية المستخدمة (الوضع الليلي المظلم)', format: 'PNG', size: '~2 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/img/page_header_dark.png' },
      { id: 'img-surah-banner', name: 'إطار السورة', description: 'المخطوطة والزخرفة المستخدمة في إطار اسم السورة في بداية كل سورة', format: 'PNG', size: '~1 MB', url: 'https://raw.githubusercontent.com/mosayyyed/monaajatak-resources/main/img/surah_banner.png' }
    ]
  }
]

export const getAllResources = () => {
  return resourceCategories.flatMap(category => category.items)
}

export const getResourceById = (id) => {
  return getAllResources().find(item => item.id === id)
}
