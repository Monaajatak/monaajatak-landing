<template>
  <section id="hero" class="hero reveal">
    <!-- Animated Glowing Orbs -->
    <div class="hero-bg-glow glow-1"></div>
    <div class="hero-bg-glow glow-2"></div>
    
    <!-- Subtle Islamic Watermark Pattern -->
    <svg class="hero-islamic-watermark" width="100%" height="100%"><defs><pattern id="hero-star" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" viewBox="0 0 120 120"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M0 40 L40 40 L40 0 M80 0 L80 40 L120 40 M120 80 L80 80 L80 120 M40 120 L40 80 L0 80" /><path d="M60 20 L75 35 L95 25 L85 45 L100 60 L85 75 L95 95 L75 85 L60 100 L45 85 L25 95 L35 75 L20 60 L35 45 L25 25 L45 35 Z" /><path d="M0 -40 L15 -25 L35 -35 L25 -15 L40 0 L25 15 L35 35 L15 25 L0 40 L-15 25 L-35 35 L-25 15 L-40 0 L-25 -15 L-35 -35 L-15 -25 Z" /><path d="M120 -40 L135 -25 L155 -35 L145 -15 L160 0 L145 15 L155 35 L135 25 L120 40 L105 25 L85 35 L95 15 L80 0 L95 -15 L85 -35 L105 -25 Z" /><path d="M0 80 L15 95 L35 85 L25 105 L40 120 L25 135 L35 155 L15 145 L0 160 L-15 145 L-35 155 L-25 135 L-40 120 L-25 105 L-35 85 L-15 95 Z" /><path d="M120 80 L135 95 L155 85 L145 105 L160 120 L145 135 L155 155 L135 145 L120 160 L105 145 L85 155 L95 135 L80 120 L95 105 L85 85 L105 95 Z" /></g></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#hero-star)" /></svg>

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
    min-height: 100dvh;
    display: flex;
    align-items: center;
    padding: 100px 0 60px;
    position: relative;
    /* Removed overflow to allow glow to bleed freely; body already clips horizontally */
}

/* Background Animated Orbs */
.hero-bg-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 0;
    opacity: 0.15;
    pointer-events: none;
    animation: floatGlow 10s infinite alternate ease-in-out;
}

.glow-1 {
    top: -200px;
    left: -200px;
    background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
}

.glow-2 {
    bottom: -200px;
    right: -200px;
    background: radial-gradient(circle, rgba(0, 209, 227, 0.8) 0%, transparent 70%);
    animation-delay: -5s;
}

@keyframes floatGlow {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(50px, 50px) scale(1.1); }
}

/* Islamic Watermark */
.hero-islamic-watermark {
    position: absolute;
    inset: 0;
    color: var(--primary);
    opacity: 0.05;
    z-index: 0;
    pointer-events: none;
    mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%);
    -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%);
}

:global(html.dark) .hero-islamic-watermark {
    color: #ffffff;
    opacity: 0.03;
}

.hero-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
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

/* Brand emphasis */
.text-teal {
    background: linear-gradient(135deg, var(--primary), var(--primary-2, #00d1e3));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: var(--primary); /* fallback */
    font-weight: 900;
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
