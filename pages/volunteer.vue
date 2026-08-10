<script setup>
useHead(() => ({
  title: 'التطوع معنا | مُناجاتك',
  meta: [
    { name: 'description', content: 'كن جزءاً من الأجر وشاركنا في تطوير وإثراء تطبيق مُناجاتك. انضم لفريق التطوع الآن.' }
  ]
}))
</script>

<template>
  <section class="volunteer-page section">
    <!-- Decorative background elements -->
    <div class="bg-shape bg-shape-1"></div>
    <div class="bg-shape bg-shape-2"></div>

    <div class="container relative z-10">
      <div class="volunteer-layout card-glass">
        <div class="card-glow"></div>
        
        <div class="volunteer-content">
          <span class="badge-pill">شارك في الأجر</span>
          <h1 class="page-title">التطوع مع <span class="text-gradient">مُناجاتك</span></h1>
          <p class="page-lead">
            تطبيق "مُناجاتك" هو وقف لله تعالى، يهدف لخدمة المسلمين في شتى بقاع الأرض. نحن نؤمن بقوة المجتمع والتعاون على البر والتقوى. إذا كنت تملك مهارات في البرمجة، التصميم، كتابة المحتوى، التدقيق اللغوي، أو حتى الرغبة في نشر الخير، فنحن نرحب بك لتكون جزءاً من هذا العمل المبارك.
          </p>
          
          <div class="features-list">
            <div class="feature-item">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <div>
                <h3>أجر مستمر</h3>
                <p>ساهم في صدقة جارية يستفيد منها الآلاف يومياً.</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <h3>مجتمع متعاون</h3>
                <p>انضم لفريق من المتطوعين يجمعهم حب الخير والإبداع.</p>
              </div>
            </div>
          </div>

          <div class="actions">
            <a href="https://forms.gle/KxXiVL2LXfakumFN7" target="_blank" rel="noopener noreferrer" class="btn-volunteer">
              <span>تعبئة استمارة التطوع</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.volunteer-page {
  padding-top: 60px;
  padding-bottom: 100px;
  min-height: 85vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Decorative Background */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.4;
  pointer-events: none;
}

.bg-shape-1 {
  top: 10%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, rgba(var(--primary-rgb), 0) 70%);
}

.bg-shape-2 {
  bottom: 10%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%);
}

[data-theme='dark'] .bg-shape {
  opacity: 0.15;
}

.relative { position: relative; }
.z-10 { z-index: 10; }

.volunteer-layout {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px;
  border-radius: 32px;
  background: var(--surface);
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 1;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(var(--primary-rgb), 0.08) 0%, transparent 70%);
  z-index: -1;
}

.volunteer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge-pill {
  display: inline-block;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: 1px solid rgba(var(--primary-rgb), 0.2);
  margin-bottom: 24px;
}

.page-title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  margin: 0 0 20px 0;
  color: var(--text);
  line-height: 1.2;
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-lead {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 40px 0;
  max-width: 650px;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-bottom: 50px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-align: right;
  max-width: 300px;
  padding: 20px;
  background: rgba(var(--text-rgb), 0.03);
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.feature-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-item h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text);
}

.feature-item p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.actions {
  display: flex;
  justify-content: center;
  width: 100%;
}

.btn-volunteer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 36px;
  border-radius: 16px;
  background-color: var(--primary);
  color: white;
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(var(--primary-rgb), 0.3);
  width: 100%;
  max-width: 400px;
}

.btn-volunteer:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(var(--primary-rgb), 0.4);
}

@media (max-width: 768px) {
  .volunteer-layout {
    padding: 40px 20px;
  }
  
  .feature-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
