<template>
  <section id="hero" class="hero reveal">
    <div class="hero-bg-pattern"></div>
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="hero-logo-tagline reveal-delay-1">
          <span class="tagline-dot"></span>
          <span>مُناجاتك — رفيقك الإيماني اليومي</span>
        </div>
        
        <h1 class="reveal-delay-2">اجعل طاعتك أقرب مع <span class="text-teal">مُناجاتك</span></h1>
        
        <p class="lead reveal-delay-3">
          تجربة هادئة وسريعة تجمع لك القرآن الكريم، الأذكار، والتسبيح في تطبيق واحد. صُمم ليرافقك في كل خطوة نحو رضا الله، بدون إعلانات وبشكل مجاني تماماً.
        </p>

        <div class="hero-actions reveal-delay-4">
                    <a href="/app" class="btn btn-primary btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
            افتح التطبيق
          </a>
          <a href="/download" class="btn btn-outline btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            تحميل التطبيق
          </a>
        </div>

        <div class="hero-capsules reveal-delay-5">
          <div class="capsule">
            <span class="capsule-icon">⭐</span>
            <span class="capsule-text">تقييم 4.9/5</span>
          </div>
          <div class="capsule">
            <span class="capsule-icon">📥</span>
            <span class="capsule-text">+2000 مستخدم</span>
          </div>
          <div class="capsule">
            <span class="capsule-icon">🎁</span>
            <span class="capsule-text">مجاني تماماً</span>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
    min-height: 88vh;
    display: flex;
    align-items: center;
    padding: 72px 0 84px;
}

.hero-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.ml-2 { margin-left: 8px; }

/* Content Styling */
.hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.hero-content h1 {
    font-size: clamp(38px, 5vw, 64px);
    margin: 24px auto 20px;
    line-height: 1.2;
}

.hero-content .lead {
    margin: 0 auto 36px;
    max-width: 650px;
    font-size: 18px;
}

.hero-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 40px;
}

/* Brand emphasis aligned to mobile teal identity (no orange in hero). */
.text-teal {
    color: var(--primary);
    background: none;
    -webkit-text-fill-color: var(--primary);
}

/* Hero Capsules */
.hero-capsules {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: -16px;
    margin-bottom: 40px;
}

.capsule {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(128, 128, 128, 0.08);
    border: 1px solid var(--border-color);
    border-radius: 99px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: transform 0.2s ease, background 0.2s ease;
}

.capsule:hover {
    transform: translateY(-2px);
    background: rgba(128, 128, 128, 0.12);
}

.capsule-icon {
    font-size: 14px;
}

.capsule-text {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-secondary);
}



@media (max-width: 1024px) {
    .hero {
        padding: 56px 0 76px;
    }
}

@media (max-width: 480px) {
    .hero {
        min-height: auto;
        padding: 48px 0 36px;
    }
    .hero-content h1 {
        font-size: 32px !important;
    }
    .hero-content .lead {
        font-size: 15px;
        max-width: 100%;
        padding: 0 6px;
    }
    .hero-actions {
        flex-direction: column;
        width: 100%;
        gap: 12px;
    }
    .hero-actions .btn {
        width: 100% !important;
        padding: 16px;
        font-size: 16px;
        gap: 10px;
    }
}

@media (max-width: 360px) {
    .hero {
        padding: 48px 0 36px;
    }
}
</style>
