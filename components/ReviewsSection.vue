<script setup>
import { computed } from 'vue'

const { data: reviewsData } = await useAsyncData('google-play-reviews', () => $fetch('/api/google-play-reviews'))

const reviews = computed(() => {
  if (reviewsData.value && reviewsData.value.success && reviewsData.value.reviews) {
    return reviewsData.value.reviews
  }
  return []
})

const formatReview = (text) => {
  if (!text) return { title: '', body: '' }
  const clean = text.trim()
  if (clean.length <= 40) return { title: clean, body: '' }
  
  const lines = clean.split(/[\n.،]/)
  if (lines[0].length > 10 && lines[0].length < 50) {
    return { 
      title: lines[0], 
      body: clean.substring(lines[0].length).replace(/^[\n.،\s]+/, '') 
    }
  }
  
  const words = clean.split(' ')
  return {
    title: words.slice(0, 6).join(' '),
    body: words.slice(6).join(' ')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays === 1) return 'أمس'
  if (diffDays === 2) return 'منذ يومين'
  if (diffDays <= 10) return `قبل ${diffDays} أيام`
  if (diffDays <= 30) return `قبل ${diffDays} يوم`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return 'قبل شهر'
  if (diffMonths <= 12) return `قبل ${diffMonths} أشهر`
  return 'منذ فترة'
}
</script>

<template>
  <section v-if="reviews.length > 0" id="reviews" class="reviews-section reveal">
    <div class="container">
      <div class="section-header">
        <span class="badge reveal-delay-1">آراء مستخدمي التطبيق</span>
        <h2 class="reveal-delay-2">ماذا يقول مستخدمو <span class="text-gradient">مُناجاتك؟</span></h2>
        <p class="reveal-delay-3">
          تجارب حقيقية من مجتمع مُناجاتك حول العالم.
        </p>
      </div>
    </div>

    <div class="reviews-marquee-container" dir="rtl">
      <div class="reviews-marquee-track">
        <!-- Render the list twice to create the infinite scroll effect -->
        <div v-for="i in 2" :key="i" class="reviews-marquee-content">
          <div v-for="review in reviews" :key="review.id + '-' + i" class="review-card">
            
            <div class="card-top">
              <div class="app-logo-box">
                <img src="/images/Icon_White_SVG.svg" class="app-logo-img" alt="مُناجاتك">
                <span class="app-name-sm">مناجاتك</span>
              </div>
              <div class="stars" :aria-label="`${review.rating} من 5`">
                <svg v-for="s in review.rating" :key="'star-full-'+s" class="star filled" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg v-for="s in (5 - review.rating)" :key="'star-empty-'+s" class="star empty" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
              </div>
            </div>

            <div class="card-body">
              <div class="quote-header">
                <span class="quote-mark">”</span>
                <h3 class="review-title">"{{ formatReview(review.text).title }}"</h3>
              </div>
              <p class="review-text" v-if="formatReview(review.text).body">
                {{ formatReview(review.text).body }}
              </p>
            </div>

            <div class="card-divider"></div>

            <div class="card-footer">
              <div class="reviewer-profile">
                <div class="avatar-circle">
                  <svg viewBox="0 0 24 24" class="avatar-icon"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div class="reviewer-details">
                  <div class="reviewer-name">
                    {{ review.author }} <span class="dash">—</span>
                  </div>
                  <div class="review-meta">
                    <svg class="verified-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/><path d="M9.999 14.172l-3.586-3.586L5 12l5 5 9-9-1.414-1.414z" fill="#111322"/></svg>
                    <span class="review-date">{{ formatDate(review.date) }}</span>
                  </div>
                </div>
              </div>

              <div class="google-play-pill">
                <svg viewBox="0 0 24 24" class="play-icon">
                  <path fill="#EA4335" d="M11.996 11.666L2.355 2.025a2.536 2.536 0 0 0-.355.707v18.536c0 .259.123.51.355.707l9.641-9.641z"/>
                  <path fill="#34A853" d="M16.536 16.205l-4.54-4.539 4.54-4.54 3.738 2.158c1.168.674 1.168 1.77 0 2.444l-3.738 2.477z"/>
                  <path fill="#4285F4" d="M11.996 11.666l4.54 4.539-14.181 8.188a2.52 2.52 0 0 1-1.775-.327l11.416-12.4z"/>
                  <path fill="#FBBC04" d="M11.996 11.666L.58 23.082a2.52 2.52 0 0 1-1.775.327l13.191-11.743z"/>
                </svg>
                <span>Google Play</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
    padding: 100px 0;
    position: relative;
    overflow: hidden;
}

.section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 60px;
}

/* Marquee Styles */
.reviews-marquee-container {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    padding: 20px 0;
    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.reviews-marquee-track {
    display: inline-flex;
    animation: marquee-rtl 40s linear infinite;
    gap: 24px;
}

.reviews-marquee-track:hover {
    animation-play-state: paused;
}

.reviews-marquee-content {
    display: inline-flex;
    gap: 24px;
    padding-left: 24px;
}

/* Review Card Styles */
.review-card {
    background: #111526;
    border-radius: 24px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    width: 440px; /* Wider card to fit the new layout properly */
    min-height: 260px;
    white-space: normal;
    flex-shrink: 0;
    text-align: right;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05);
    transition: transform 0.4s ease, border-color 0.4s ease;
}

.review-card:hover {
    transform: translateY(-5px);
    border-color: rgba(160, 132, 232, 0.3);
}

.card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
}

/* Logo Box */
.app-logo-box {
    background: rgba(122, 85, 219, 0.1);
    border: 1px solid rgba(122, 85, 219, 0.2);
    border-radius: 20px;
    width: 72px;
    height: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(122, 85, 219, 0.15);
}

.app-logo-img {
    width: 32px;
    height: auto;
    filter: drop-shadow(0 0 8px rgba(160, 132, 232, 0.8));
    margin-bottom: 4px;
}

.app-name-sm {
    font-size: 10px;
    font-weight: 700;
    color: #fff;
}

/* Stars */
.stars {
    display: flex;
    gap: 4px;
}

.star {
    width: 24px;
    height: 24px;
}

.star.filled {
    fill: #facc15;
}

.star.empty {
    fill: #4b5563;
}

/* Card Body */
.card-body {
    flex-grow: 1;
}

.quote-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
}

.quote-mark {
    font-family: Georgia, serif;
    font-size: 64px;
    line-height: 1;
    color: #5c4b8b;
    margin-top: -10px;
    user-select: none;
}

.review-title {
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    line-height: 1.4;
    margin: 0;
}

.review-text {
    font-size: 15px;
    line-height: 1.8;
    color: #9ca3af;
    margin: 0;
}

/* Divider */
.card-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    margin: 24px 0;
}

/* Card Footer */
.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.reviewer-profile {
    display: flex;
    align-items: center;
    gap: 14px;
}

.avatar-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #2d264f;
    border: 2px solid rgba(160, 132, 232, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-icon {
    width: 24px;
    height: 24px;
    fill: #a084e8;
}

.reviewer-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* in RTL, flex-start means right aligned */
}

.reviewer-name {
    color: #00d4ff;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
}

.dash {
    color: #4b5563;
}

.review-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
}

.verified-icon {
    width: 14px;
    height: 14px;
    fill: #00d4ff;
}

.review-date {
    font-size: 13px;
    color: #9ca3af;
}

/* Google Play Pill */
.google-play-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    transition: background 0.3s ease;
}

.google-play-pill:hover {
    background: rgba(255, 255, 255, 0.08);
}

.play-icon {
    width: 18px;
    height: 18px;
}

@keyframes marquee-rtl {
    0% { transform: translateX(0); }
    100% { transform: translateX(50%); }
}

@media (max-width: 768px) {
    .reviews-section { padding: 60px 0; }
    .review-card { 
        width: 340px;
        padding: 24px; 
    }
    .review-title { font-size: 20px; }
    .quote-mark { font-size: 48px; }
    .app-logo-box { width: 56px; height: 56px; }
    .app-logo-img { width: 24px; }
    .app-name-sm { font-size: 9px; }
}
</style>
