<script setup>
import { computed } from 'vue'

const { data: reviewsData, status } = await useAsyncData('google-play-reviews', () => $fetch('/api/google-play-reviews'))

const reviews = computed(() => {
  if (reviewsData.value && reviewsData.value.success && reviewsData.value.reviews) {
    return reviewsData.value.reviews
  }
  return []
})
</script>

<template>
  <section v-if="reviews.length > 0" id="reviews" class="reviews-section container reveal">
    <div class="section-header">
      <span class="badge reveal-delay-1">آراء حقيقية من مستخدمي التطبيق على Google Play</span>
      <h2 class="reveal-delay-2">ماذا يقول مستخدمو <span class="text-gradient">مُناجاتك؟</span></h2>
      <p class="reveal-delay-3">
        تجارب حقيقية من مجتمع مُناجاتك حول العالم. <br>
        <a href="https://play.google.com/store/apps/details?id=com.mahmoudmourad.monologue" target="_blank" rel="noopener noreferrer" class="play-link">عرض المزيد على Google Play</a>
      </p>
    </div>

    <div class="reviews-grid">
      <div v-for="(review, index) in reviews" :key="review.id" class="review-card card-glass reveal-delay-2">
        <div class="stars" :aria-label="`${review.rating} من 5`">
          {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}
        </div>
        <p class="review-text">"{{ review.text }}"</p>
        <div class="reviewer-info">
          <span class="reviewer">— {{ review.author }}</span>
          <span class="review-source">Google Play</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
    padding: 100px 0;
    position: relative;
}

.section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 60px;
}

.play-link {
    display: inline-block;
    margin-top: 10px;
    color: var(--primary);
    text-decoration: underline;
    font-weight: 600;
    font-size: 14px;
    transition: opacity 0.3s ease;
}

.play-link:hover {
    opacity: 0.8;
}

.reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
}

.review-card {
    padding: 32px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.4s ease;
    border: 1px solid var(--border-color);
}

.review-card:hover {
    transform: translateY(-8px);
    border-color: rgba(var(--primary-rgb), 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.stars {
    color: #f59e0b;
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 2px;
}

.review-text {
    font-size: 16px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 24px;
    font-style: italic;
}

.reviewer-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
}

.reviewer {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary);
    opacity: 0.8;
}

.review-source {
    font-size: 12px;
    color: var(--text-secondary);
    opacity: 0.8;
    background: rgba(var(--text-rgb, 0, 0, 0), 0.05);
    padding: 4px 10px;
    border-radius: 12px;
}

@media (max-width: 768px) {
    .reviews-section { padding: 60px 0; }
    .review-card { padding: 24px; }
}
</style>
