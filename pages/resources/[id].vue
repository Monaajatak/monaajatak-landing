<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getResourceById } from '~/utils/resourcesData'

const route = useRoute()
const router = useRouter()

const resourceId = route.params.id
const resource = computed(() => getResourceById(resourceId))
const showToast = ref(false)

if (!resource.value) {
  router.push('/resources')
}

const getIconType = (format) => {
  if (!format) return 'file';
  const f = format.toLowerCase();
  if (['ttf', 'woff', 'otf'].includes(f)) return 'font';
  if (['db', 'sqlite', 'sql'].includes(f)) return 'database';
  if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(f)) return 'image';
  return 'file';
}

const copyLink = () => {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href);
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
}

useHead(() => {
  if (!resource.value) return {}
  return {
    title: `${resource.value.name} | مُناجاتك المفتوح`,
    meta: [
      { name: 'description', content: resource.value.description },
      { property: 'og:title', content: `${resource.value.name} | تحميل مباشر` },
      { property: 'og:description', content: resource.value.description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${resource.value.name} | تحميل مباشر` },
      { name: 'twitter:description', content: resource.value.description }
    ]
  }
})
</script>

<template>
  <section v-if="resource" class="resource-detail-page section">
    <!-- Decorative background elements -->
    <div class="bg-shape bg-shape-1"></div>
    <div class="bg-shape bg-shape-2"></div>

    <div class="container relative z-10">
      
      <!-- Back button -->
      <NuxtLink to="/resources" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        <span>العودة للمكتبة</span>
      </NuxtLink>

      <div class="resource-card card-glass group">
        <div class="card-glow"></div>
        
        <div class="resource-layout">
          <!-- Big Icon -->
          <div class="resource-icon-wrapper" :class="getIconType(resource.format)">
            <svg v-if="getIconType(resource.format) === 'font'" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
            <svg v-else-if="getIconType(resource.format) === 'database'" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
            <svg v-else-if="getIconType(resource.format) === 'image'" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          
          <!-- Details -->
          <div class="resource-info">
            <div class="meta-tags">
              <span class="meta-tag format">{{ resource.format }}</span>
              <span class="meta-tag size">{{ resource.size }}</span>
            </div>
            
            <h1 class="resource-title">{{ resource.name }}</h1>
            <p class="resource-desc">{{ resource.description }}</p>
            
            <div class="actions">
              <a :href="resource.url" class="btn-download" :class="{ 'disabled': resource.url === '#' }" :title="resource.url === '#' ? 'قريباً' : 'تحميل المورد'" target="_blank">
                <span v-if="resource.url !== '#'">تحميل مباشر للملف</span>
                <span v-else>سيتوفر المورد قريباً</span>
                <svg v-if="resource.url !== '#'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </a>
              
              <!-- Copy Link Button for sharing -->
              <button class="btn-share" @click="copyLink">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>نسخ الرابط للمشاركة</span>
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- Toast Notification -->
    <div class="toast-notification" :class="{ 'toast-visible': showToast }">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>تم نسخ الرابط! يمكنك الآن مشاركته.</span>
    </div>
  </section>
</template>

<style scoped>
.resource-detail-page {
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

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 40px;
  transition: color 0.3s ease;
}
.back-link:hover {
  color: var(--primary);
}

.resource-card {
  position: relative;
  padding: 48px;
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

.resource-layout {
  display: flex;
  gap: 40px;
  align-items: center;
}

.resource-icon-wrapper {
  flex-shrink: 0;
  width: 140px;
  height: 140px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.resource-icon-wrapper.font { background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05)); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.2); }
.resource-icon-wrapper.database { background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05)); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
.resource-icon-wrapper.image { background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05)); color: #ec4899; border: 1px solid rgba(236, 72, 153, 0.2); }
.resource-icon-wrapper.file { background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--primary-rgb), 0.05)); color: var(--primary); border: 1px solid rgba(var(--primary-rgb), 0.2); }


.resource-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
}

.meta-tags {
  display: flex;
  gap: 10px;
}
.meta-tag {
  font-size: 14px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 8px;
  background: var(--bg-color);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.meta-tag.format {
  background: rgba(var(--text-rgb), 0.05);
}

.resource-title {
  font-size: clamp(32px, 4vw, 42px);
  font-weight: 800;
  color: var(--text);
  margin: 0;
  line-height: 1.2;
}

.resource-desc {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.btn-download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: 16px;
  background-color: var(--primary);
  color: white;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(var(--primary-rgb), 0.3);
}

.btn-download:hover:not(.disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(var(--primary-rgb), 0.4);
}

.btn-download.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--border-color);
  box-shadow: none;
}

.btn-share {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 28px;
  border-radius: 16px;
  background-color: var(--bg-color);
  color: var(--text);
  font-weight: 700;
  font-size: 16px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-share:hover {
  background-color: var(--border-color);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .resource-layout {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }
  
  .resource-icon-wrapper {
    margin: 0 auto;
    width: 100px;
    height: 100px;
  }
  
  .meta-tags {
    justify-content: center;
  }
  
  .actions {
    justify-content: center;
    flex-direction: column;
  }
  
  .btn-download, .btn-share {
    width: 100%;
  }
}

/* Toast Notification Styles */
.toast-notification {
  position: fixed;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 1px solid var(--border-color);
  color: var(--text);
  padding: 16px 24px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 9999;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
}

.toast-notification svg {
  color: #10b981;
}

.toast-visible {
  bottom: 40px;
  opacity: 1;
}
</style>
