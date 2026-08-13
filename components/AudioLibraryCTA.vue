<template>
  <section class="audio-cta section">
    <div class="container">
      <div class="audio-cta-card">
        <div class="cta-glow"></div>
<span class="cta-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          المكتبة الصوتية بانتظارك
        </span>
        <h2 class="cta-title">استمع للمصحف المسموع مباشرة<br>من متصفحك — بدون تحميل</h2>
        <p class="cta-lead">
          تلاوات أشهر القراء، وإذاعات قرآنية حية، وقوائم تشغيل مخصصة — كلها متاحة الآن من صفحة الاستماع.
        </p>
        <div class="cta-buttons">
          <NuxtLink to="/listen" class="btn cta-btn-primary">
            افتح صفحة الاستماع
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </NuxtLink>
          <NuxtLink to="/download" class="btn cta-btn-ghost">
            حمّل التطبيق للهواتف
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </NuxtLink>
        </div>
        <div class="cta-stores">
          <div class="store-badges">
            <span class="badge-chip">iOS · App Store</span>
            <span class="badge-chip">Android · Google Play</span>
            <span class="badge-chip">Android · AppGallery</span>
          </div>
          <div class="cta-guarantee">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span>الطبعات برواية حفص المعتمدة</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.audio-cta {
  padding: 60px 0 100px;
}

.audio-cta-card {
  position: relative;
  text-align: center;
  padding: 80px 40px;
  border-radius: 40px;
  background: var(--cta-gradient);
  border: var(--border);
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: -120px;
  right: -80px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.25) 0%, transparent 70%);
  pointer-events: none;
  animation: ctaPulse 5s ease-in-out infinite alternate;
}

@keyframes ctaPulse {
  from { opacity: 0.6; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1.1); }
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: clamp(28px, 4.5vw, 44px);
  font-weight: 800;
  color: #fff;
  margin: 0 0 16px;
  line-height: 1.3;
  position: relative;
  z-index: 1;
}

.cta-lead {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin: 0 auto 36px;
  max-width: 520px;
  position: relative;
  z-index: 1;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.cta-btn-primary {
  background: #fff;
  color: var(--teal-deep);
  font-weight: 800;
  padding: 16px 32px;
  border-radius: var(--radius-pill);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all var(--transition-fast);
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cta-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
}

.cta-btn-ghost {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 700;
  padding: 16px 32px;
  border-radius: var(--radius-pill);
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cta-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.cta-stores {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.store-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge-chip {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e2f0f5;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 600;
}

.cta-guarantee {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .audio-cta-card {
    padding: 60px 24px;
    border-radius: 28px;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .cta-buttons .btn {
    width: 100%;
  }

  .cta-stores {
    flex-direction: column;
    gap: 12px;
  }
}
</style>