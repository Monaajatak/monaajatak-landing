<template>
  <div>
    <AudioLibraryHero />
    <AudioLibrarySection />
    <AudioLibraryCTA />
    <LazyFaqSection />
  </div>
</template>

<script setup>
import AudioLibrarySection from '~/components/AudioLibrarySection.vue'
import AudioLibraryHero from '~/components/AudioLibraryHero.vue'
import AudioLibraryCTA from '~/components/AudioLibraryCTA.vue'
import LazyFaqSection from '~/components/FaqSection.vue'

useHead(() => ({
  title: 'المكتبة الصوتية | مُناجاتك',
  meta: [
    { name: 'description', content: 'المكتبة الصوتية الشاملة في مُناجاتك: تلاوات قرآنية بأصوات أشهر القراء، إذاعات قرآن مباشر، قوائم تشغيل شخصية، تحميل للاستماع بلا إنترنت، مؤقت نوم، تكرار آيات، والمزيد.' }
  ]
}))
</script>