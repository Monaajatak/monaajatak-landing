<template>
  <section class="audio-hero section">
    <div class="bg-shapes" aria-hidden="true">
      <div class="bg-shape bg-shape-1"></div>
      <div class="bg-shape bg-shape-2"></div>
      <div class="bg-shape bg-shape-3"></div>
    </div>

    <div class="container relative">
      <div class="audio-hero-inner">
        <div class="audio-hero-content">
          <span class="badge-pill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            المكتبة الصوتية
          </span>
          <h1 class="audio-hero-title">
            استمع للقرآن الكريم
            <span class="text-gradient">بأجمل الأصوات</span>
          </h1>
          <p class="audio-hero-lead">
            مكتبة صوتية متكاملة: تلاوات بأصوات أشهر القراء، وإذاعات قرآنية مباشرة، وقوائم تشغيل تخصك وحدك — كل ذلك في صفحة استماع واحدة سريعة وهادئة.
          </p>

          <div class="audio-hero-buttons">
            <NuxtLink to="/listen" class="btn btn-primary btn-large">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              استمع الآن
            </NuxtLink>
            <NuxtLink to="/download" class="btn btn-ghost btn-large">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              حمّل التطبيق
            </NuxtLink>
          </div>

          <div class="audio-hero-trust">
            <div class="trust-dots">
              <span class="trust-dot dot-success"></span>
              <span class="trust-dot dot-success"></span>
              <span class="trust-dot dot-success"></span>
            </div>
            <span class="trust-text">مجاناً بالكامل · دون إعلانات مزعجة</span>
          </div>
        </div>

        <div class="audio-hero-visual">
          <div class="audio-player-mockup">
            <div class="mockup-glow"></div>
            <div class="player-top">
              <span class="player-status">● بث مباشر</span>
              <span class="player-time">٣:٤٢:١٢</span>
            </div>
            <div class="player-artwork">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V4a2 2 0 0 1 2-2h10.9a2 2 0 0 1 2 2v15.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M9 2v8l3-2.25L15 10V2"/></svg>
              <span class="artwork-label">القرآن الكريم</span>
            </div>
            <div class="player-track">
              <p class="track-name">سورة الرحمن</p>
              <p class="track-artist">مشاري راشد العفاسي</p>
            </div>
            <div class="player-progress">
              <div class="progress-track">
                <div class="progress-fill" style="width: 45%"></div>
                <span class="progress-thumb"></span>
              </div>
              <div class="progress-times">
                <span>١:٣٥:٢٠</span>
                <span>٣:٠٧:٥٠</span>
              </div>
            </div>
            <div class="player-controls">
              <button class="ctrl-btn" aria-label="سابق">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
              </button>
              <button class="ctrl-btn primary" aria-label="تشغيل">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </button>
              <button class="ctrl-btn" aria-label="التالي">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
              </button>
            </div>
            <div class="player-options">
              <span class="option-chip option-active">تكرار</span>
              <span class="option-chip">بلا إنترنت</span>
              <span class="option-chip">سرعة 1x</span>
            </div>
          </div>

          <div class="floating-card float-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="m16 6-4 4-4-4"/><path d="M12 10v12"/><path d="m8 18 4-4 4 4"/></svg>
            <div>
              <strong>تحميل للاستماع بلا إنترنت</strong>
              <span>احفظ التلاوات على جهازك</span>
            </div>
          </div>

          <div class="floating-card float-quran">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V4a2 2 0 0 1 2-2h10.9a2 2 0 0 1 2 2v15.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M9 2v8l3-2.25L15 10V2"/></svg>
            <div>
              <strong>تكرار الآيات للحفظ</strong>
              <span>كرر أي آية حتى تتقنها</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
useHead(() => ({
  title: 'المكتبة الصوتية | مُناجاتك',
}))
</script>

<style scoped>
.audio-hero {
  padding: 160px 0 80px;
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.bg-shape-1 {
  top: -10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.20) 0%, rgba(var(--primary-rgb), 0) 70%);
}

.bg-shape-2 {
  bottom: -20%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%);
}

.bg-shape-3 {
  top: 30%;
  left: 30%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(var(--primary-2, var(--primary-rgb)), 0.10) 0%, transparent 70%);
}

[data-theme="dark"] .bg-shape-1 {
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.25) 0%, rgba(var(--primary-rgb), 0) 70%);
}

.relative { position: relative; z-index: 1; }

.audio-hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 64px;
  align-items: center;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 700;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  margin-bottom: 24px;
}

.audio-hero-title {
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 24px;
  color: var(--text);
  letter-spacing: -0.02em;
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.audio-hero-lead {
  font-size: 18px;
  line-height: 1.9;
  color: var(--text-secondary);
  margin: 0 0 40px;
  max-width: 560px;
}

.audio-hero-stats {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 40px;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-stat-value {
  font-size: 28px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: -0.02em;
}

.hero-stat-label {
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
}

.hero-stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);
}

.audio-hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.btn-large {
  padding: 16px 32px;
  font-size: 16px;
  border-radius: var(--radius-pill);
}

.audio-hero-trust {
  display: flex;
  align-items: center;
  gap: 12px;
}

.trust-dots {
  display: flex;
  gap: 6px;
}

.trust-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.trust-text {
  font-size: 14px;
  color: var(--muted);
  font-weight: 600;
}

/* Visual */
.audio-hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.audio-player-mockup {
  width: 380px;
  background: var(--card-bg);
  border: var(--border);
  border-radius: 32px;
  padding: 32px;
  position: relative;
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(16px);
  transition: transform var(--transition-spring);
}

.audio-player-mockup:hover {
  transform: translateY(-8px) rotate(1deg);
}

.mockup-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.20) 0%, transparent 70%);
  pointer-events: none;
}

.player-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.player-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
}

.player-status::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.player-time {
  font-size: 14px;
  color: var(--muted);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.player-artwork {
  width: 160px;
  height: 160px;
  margin: 0 auto 32px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--primary-rgb), 0.05));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--primary);
  border: 1px solid rgba(var(--primary-rgb), 0.15);
}

.artwork-label {
  font-size: 13px;
  font-weight: 800;
  color: var(--text);
}

.player-track {
  text-align: center;
  margin-bottom: 24px;
}

.track-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 6px;
}

.track-artist {
  font-size: 14px;
  color: var(--muted);
  margin: 0;
}

.player-progress {
  margin-bottom: 28px;
}

.progress-track {
  height: 6px;
  background: rgba(var(--primary-rgb), 0.1);
  border-radius: var(--radius-pill);
  position: relative;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-2));
  border-radius: var(--radius-pill);
  position: relative;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid var(--primary);
  box-shadow: var(--shadow-sm);
}

.progress-times {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted);
  font-weight: 500;
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.ctrl-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: var(--border);
  background: var(--surface-2);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.ctrl-btn.primary {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: white;
  border: none;
  box-shadow: 0 8px 24px rgba(var(--primary-rgb), 0.35);
}

.ctrl-btn:hover {
  transform: scale(1.1);
}

.player-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.option-chip {
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 700;
  background: var(--surface-2);
  border: var(--border);
  color: var(--muted);
}

.option-chip.option-active {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  border-color: rgba(var(--primary-rgb), 0.2);
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card-bg);
  border: var(--border);
  border-radius: var(--radius-tile);
  padding: 14px 18px;
  box-shadow: var(--shadow-lg);
  font-size: 13px;
  z-index: 2;
  animation: float 4s ease-in-out infinite;
}

.floating-card svg {
  color: var(--primary);
  flex-shrink: 0;
}

.floating-card strong {
  display: block;
  color: var(--text);
  font-size: 13px;
  margin-bottom: 2px;
}

.floating-card span {
  color: var(--muted);
  font-size: 12px;
}

.float-note {
  top: 12%;
  right: -40px;
}

.float-quran {
  bottom: 8%;
  left: -40px;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Responsive */
@media (max-width: 1024px) {
  .audio-hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }

  .audio-hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .audio-hero-lead {
    margin: 0 auto 40px;
  }

  .audio-hero-stats {
    justify-content: center;
  }

  .audio-hero-buttons {
    justify-content: center;
  }

  .float-note {
    right: 0;
  }

  .float-quran {
    left: 0;
  }
}

@media (max-width: 640px) {
  .audio-hero {
    padding: 130px 0 60px;
  }

  .audio-player-mockup {
    width: 100%;
    max-width: 340px;
    padding: 24px;
  }

  .floating-card {
    display: none;
  }

  .audio-hero-stats {
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-stat-value {
    font-size: 24px;
  }

  .audio-hero-buttons {
    flex-direction: column;
    width: 100%;
  }

  .audio-hero-buttons .btn {
    width: 100%;
  }
}
</style>