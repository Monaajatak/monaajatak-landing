export const resourceCategories = [
  {
    id: 'fonts',
    title: 'الخطوط والأيقونات',
    description: 'الخطوط والأيقونات المستخدمة في واجهة التطبيق والمصحف',
    items: [
      { id: 'font-arsura', name: 'خط Arsura', description: 'الخط المخصص لعرض أسماء السور القرآنية بخط الثلث', format: 'TTF', size: '~1 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/fonts/arsura.ttf' },
      { id: 'font-qcf', name: 'خطوط صفحات المصحف (QCF)', description: 'مجموعة خطوط مجمع الملك فهد (604 خط) مجزأة لصفحات المصحف بحجم صغير ومحسن', format: 'WOFF', size: 'متعدد الأجزاء (55MB كلياً)', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/fonts/qcf.zip' },
      { id: 'font-cairo', name: 'خط القاهرة (Cairo)', description: 'الخط الأساسي المستخدم في النصوص العادية وقوائم التطبيق', format: 'TTF', size: '~3 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/fonts/Cairo-VariableFont_slnt,wght.ttf' },
      { id: 'font-uthman', name: 'خط عثمان طه (UthmanTN1-Ver10)', description: 'خط المصحف الكلاسيكي المعتمد برواية حفص عن عاصم', format: 'OTF', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/fonts/UthmanTN1-Ver10.otf' }
    ]
  },
  {
    id: 'databases',
    title: 'قواعد البيانات',
    description: 'ملفات قواعد البيانات الأساسية لتشغيل التطبيق',
    items: [
      { id: 'db-saadi', name: 'تفسير السعدي', description: 'تفسير السعدي كامل بصيغة قاعدة بيانات لتسهيل البحث والعرض المباشر', format: 'DB', size: '~10 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/dbs/tafsir-as-saadi.db' },
      { id: 'db-muyassar', name: 'التفسير الميسر', description: 'التفسير الميسر للقرآن الكريم لجميع الآيات بصيغة مهيأة للتطبيقات', format: 'DB', size: '~15 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/dbs/ar-tafsir-muyassar.db' },
      { id: 'db-ibn-kathir', name: 'تفسير ابن كثير', description: 'تفسير ابن كثير للقرآن الكريم بصيغة قاعدة بيانات لتسهيل البحث', format: 'DB', size: '~13 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/dbs/ar-tafsir-ibn-kathir.db' },
      { id: 'db-surah-info', name: 'معلومات السور', description: 'بيانات السور القرآنية (الاسم، مكان النزول، عدد الآيات، إلخ)', format: 'DB', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/dbs/surah_info.db' },
      { id: 'db-hizb-metadata', name: 'بيانات الأجزاء والأحزاب', description: 'تقسيمات المصحف الدقيقة (أرباع، أحزاب، أجزاء)', format: 'SQLite', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/dbs/quran-metadata-hizb.sqlite' },
      { id: 'db-quran-ruku', name: 'بيانات الركوعات', description: 'تقسيمات المصحف الخاصة بالركوعات (Ruku)', format: 'SQLite', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/dbs/quran-metadata-ruku.sqlite' },
      { id: 'db-topics', name: 'مواضيع القرآن', description: 'فهرس مواضيع القرآن الكريم والآيات المتعلقة بها', format: 'DB', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/dbs/topics.db' }
    ]
  },
  {
    id: 'json-data',
    title: 'ملفات البيانات (JSON)',
    description: 'مجموعات الأذكار والأحاديث النبوية بصيغة JSON الجاهزة للاستخدام البرمجي',
    items: [
      { id: 'json-adhkar', name: 'أذكار المسلم', description: 'مجموعة شاملة للأذكار (الصباح والمساء، النوم، وغيرها)', format: 'JSON', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/adhkar.json' },
      { id: 'json-bukhari', name: 'صحيح البخاري', description: 'أحاديث صحيح البخاري كاملة مرتبة وجاهزة', format: 'JSON', size: '~10 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/bukhari.json' },
      { id: 'json-muslim', name: 'صحيح مسلم', description: 'أحاديث صحيح مسلم كاملة مرتبة وجاهزة', format: 'JSON', size: '~12 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/muslim.json' },
      { id: 'json-riyad', name: 'رياض الصالحين', description: 'كتاب رياض الصالحين للإمام النووي', format: 'JSON', size: '~3 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/riyad_assalihin.json' },
      { id: 'json-names', name: 'أسماء الله الحسنى', description: 'قائمة بأسماء الله الحسنى مع معانيها', format: 'JSON', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/namesofallah.json' },
      { id: 'json-duaa', name: '100 دعاء', description: '100 دعاء من الكتاب والسنة الصحيحة', format: 'JSON', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/100-duaa-from-the-book-and-authentic-sunnah.json' },
      { id: 'json-messages', name: 'رسائل قرآنية', description: 'مجموعة من الرسائل والاقتباسات الإيمانية من القرآن', format: 'JSON', size: 'صغير', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/messages.json' },
      { id: 'json-afyaa', name: 'أفياء الوحي', description: 'محتوى كتاب أفياء الوحي بصيغة إملائية', format: 'JSON', size: '~1 MB', url: 'https://raw.githubusercontent.com/Monaajatak/monaajatak-resources/main/json/%D8%A3%D9%81%D9%8A%D8%A7%D8%A1%20%D8%A7%D9%84%D9%88%D8%AD%D9%8A.imlaei.json' }
    ]
  }
]

export const getAllResources = () => {
  return resourceCategories.flatMap(category => category.items)
}

export const getResourceById = (id) => {
  return getAllResources().find(item => item.id === id)
}
