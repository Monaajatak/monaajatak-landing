<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const baseScreenshots = [
  { img: '/images/screenshots/01_App_Overview.png', title: 'نظرة عامة', desc: 'تجربة مستخدم هادئة ومنظمة' },
  { img: '/images/screenshots/02_Quran_Reading.png', title: 'القرآن الكريم', desc: 'قراءة بالرسم العثماني مع تحكم في الخط' },
  { img: '/images/screenshots/03_Quran_Listening.png', title: 'الاستماع تلاوات', desc: 'أشهر القراء بأعلى جودة صوتية' },
  { img: '/images/screenshots/04_Electronic_Sebha.png', title: 'السبحة الإلكترونية', desc: 'عداد تسبيح ذكي مع اهتزازات' },
  { img: '/images/screenshots/06_Athkar_Daily.png', title: 'الأذكار اليومية', desc: 'أذكار الصباح والمساء وكل ما تحتاجه' },
  { img: '/images/screenshots/07_Qibla_Compass.png', title: 'بوصلة القبلة', desc: 'تحديد دقيق لاتجاه القبلة من أي مكان' },
  { img: '/images/screenshots/08_Dark_Light_Mode.png', title: 'الوضع الليلي', desc: 'دعم كامل للوضع الداكن لراحة عينك' }
]

// Clone array 3 times to create an infinite loop illusion
const screenshots = [...baseScreenshots, ...baseScreenshots, ...baseScreenshots]
const totalBase = baseScreenshots.length

const virtualIndex = ref(totalBase) // Start at the middle block
const isTransitioning = ref(true)
const actualIndex = computed(() => virtualIndex.value % totalBase)

let isThrottled = false

const handleTeleport = async (newVirtualIndex) => {
  isTransitioning.value = false
  virtualIndex.value = newVirtualIndex
  await nextTick()
  // Force browser reflow so transition: none is applied instantly
  document.body.offsetHeight 
  
  // Wait for the next frame to re-enable transitions
  requestAnimationFrame(() => {
     isTransitioning.value = true
  })
}

const checkBoundsAfterTransition = () => {
  setTimeout(() => {
    if (virtualIndex.value >= totalBase * 2) {
      handleTeleport(virtualIndex.value - totalBase)
    } else if (virtualIndex.value < totalBase) {
      handleTeleport(virtualIndex.value + totalBase)
    }
    isThrottled = false
  }, 600)
}

const nextSlide = () => {
  if (isThrottled) return
  isThrottled = true
  virtualIndex.value++
  checkBoundsAfterTransition()
}

const prevSlide = () => {
  if (isThrottled) return
  isThrottled = true
  virtualIndex.value--
  checkBoundsAfterTransition()
}

const setSlideByVirtual = (targetVirtualIndex) => {
  if (isThrottled) return
  if (targetVirtualIndex === virtualIndex.value) return
  isThrottled = true
  virtualIndex.value = targetVirtualIndex
  checkBoundsAfterTransition()
}

const setSlideByDot = (targetActualIndex) => {
  if (isThrottled) return
  if (targetActualIndex === actualIndex.value) return
  isThrottled = true
  
  // Find shortest path to the target slide (it could be in prev, current, or next block)
  const currentBlock = Math.floor(virtualIndex.value / totalBase)
  
  const option1 = (currentBlock - 1) * totalBase + targetActualIndex
  const option2 = currentBlock * totalBase + targetActualIndex
  const option3 = (currentBlock + 1) * totalBase + targetActualIndex
  
  const dist1 = Math.abs(virtualIndex.value - option1)
  const dist2 = Math.abs(virtualIndex.value - option2)
  const dist3 = Math.abs(virtualIndex.value - option3)
  
  let targetVirtual = option2
  if (dist1 < dist2 && dist1 <= dist3) targetVirtual = option1
  else if (dist3 < dist2 && dist3 < dist1) targetVirtual = option3
  
  virtualIndex.value = targetVirtual
  checkBoundsAfterTransition()
}

let autoplayInterval = null
const startAutoplay = () => {
  stopAutoplay()
  autoplayInterval = setInterval(nextSlide, 3500)
}
const stopAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval)
}

onMounted(() => {
  startAutoplay()
})
onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div class="app-showcase-full" @mouseenter="stopAutoplay" @mouseleave="startAutoplay" @touchstart="stopAutoplay" @touchend="startAutoplay">
    
    <!-- Carousel with Floating Arrows (Moved to Top) -->
    <div class="carousel-container-with-arrows">
      
      <!-- Right Arrow (Previous in RTL) -->
      <button @click="prevSlide" class="floating-arrow right-arrow" aria-label="السابق">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div class="carousel-viewport">
        <!-- The Track that moves -->
        <div class="carousel-track" 
             :class="{ 'transitioning': isTransitioning }"
             :style="{ '--current-slide': virtualIndex }">
          <div v-for="(screen, index) in screenshots" :key="index" 
               class="carousel-slide" 
               :class="{ active: virtualIndex === index }"
               @click="setSlideByVirtual(index)">
            <img :src="screen.img" :alt="screen.title" class="screen-img" loading="lazy" decoding="async">
          </div>
        </div>
        
        <!-- The Real iPhone Frame Overlay (Fixed in Center) -->
        <div class="phone-frame-overlay"></div>
      </div>

      <!-- Left Arrow (Next in RTL) -->
      <button @click="nextSlide" class="floating-arrow left-arrow" aria-label="التالي">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

    </div>

    <!-- Dynamic Caption & Dots (Moved to BOTTOM) -->
    <div class="showcase-bottom-wrapper">
      <transition name="fade-up" mode="out-in">
        <div :key="actualIndex" class="mockup-caption-bottom">
          <h3>{{ baseScreenshots[actualIndex].title }}</h3>
          <p>{{ baseScreenshots[actualIndex].desc }}</p>
        </div>
      </transition>

      <div class="mockup-dots">
        <div v-for="(_, index) in baseScreenshots" :key="index"
             class="mockup-dot" :class="{ 'active': actualIndex === index }"
             @click="setSlideByDot(index)">
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.app-showcase-full {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    margin-top: 20px;
    margin-bottom: 20px;
    overflow-x: hidden;
}

.carousel-container-with-arrows {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Master viewport with global scaling variable */
.carousel-viewport {
    --scale: 1; /* Desktop scale */
    
    /* Phone Image Dimensions & Offsets */
    --frame-width: calc(288px * var(--scale));
    --frame-height: calc(600px * var(--scale));
    --frame-mt: calc(-316px * var(--scale));
    --frame-ml: calc(-144px * var(--scale));
    
    /* Screen Image Dimensions */
    --slide-width: calc(274px * var(--scale));
    --slide-height: calc(580px * var(--scale));
    --slide-gap: calc(40px * var(--scale));
    
    /* Move track UP to hide the extra height safely under the thick top camera bezel! */
    --slide-mt: calc(-16px * var(--scale));
    
    /* Math variables for perfect RTL tracking */
    --slide-step: calc(var(--slide-width) + var(--slide-gap));
    --center-offset: calc(var(--slide-width) / 2);
    
    position: relative;
    width: 100%;
    height: calc(640px * var(--scale));
    overflow: hidden;
}

.carousel-track {
    position: absolute;
    top: 50%;
    right: 50%; /* Starts exactly at the center of the viewport */
    margin-top: var(--slide-mt);
    transform: translate(calc(var(--center-offset) + (var(--current-slide) * var(--slide-step))), -50%);
    display: flex;
    gap: var(--slide-gap);
    align-items: center;
    direction: rtl; /* Ensure flex layout is RTL explicitly */
}

.carousel-track.transitioning {
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel-slide {
    width: var(--slide-width);
    height: var(--slide-height);
    border-radius: calc(36px * var(--scale));
    overflow: hidden;
    flex-shrink: 0;
    opacity: 0.3;
    transform: scale(0.85);
    cursor: pointer;
}

.carousel-track.transitioning .carousel-slide {
    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel-slide:hover {
    opacity: 0.6;
}

.carousel-slide.active {
    opacity: 1;
    transform: scale(1);
    cursor: default;
}

.screen-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}

/* Authentic iPhone PNG Frame */
.phone-frame-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: var(--frame-mt);
    margin-left: var(--frame-ml);
    width: var(--frame-width);
    height: var(--frame-height);
    background: url('/images/iPhone-17-Pro-Silver.png') center/contain no-repeat;
    pointer-events: none; /* Let clicks pass through to the screen */
    z-index: 10;
}

/* Dynamic Caption (Bottom) */
.showcase-bottom-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    height: 140px; /* Fixed height to prevent jumping */
    width: 100%;
}

.mockup-caption-bottom {
    text-align: center;
    max-width: 600px;
    margin-bottom: 24px;
}

.mockup-caption-bottom h3 {
    font-size: 26px;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 8px;
}

.mockup-caption-bottom p {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.5;
    margin-bottom: 0;
}

/* Floating Navigation Arrows */
.floating-arrow {
    position: absolute;
    top: 50%;
    margin-top: calc(-16px * var(--scale)); /* Align perfectly with the shifted carousel track */
    transform: translateY(-50%);
    z-index: 30;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(var(--surface-rgb, 255, 255, 255), 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(var(--primary-rgb), 0.2);
    color: var(--primary);
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.floating-arrow:hover {
    background: var(--primary);
    color: #fff;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 15px 35px rgba(var(--primary-rgb), 0.3);
    border-color: var(--primary);
}

.right-arrow {
    right: 40px;
}

.left-arrow {
    left: 40px;
}

.mockup-dots {
    display: flex;
    gap: 12px;
}

.mockup-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-color);
    cursor: pointer;
    transition: all 0.3s ease;
}

.mockup-dot.active {
    background: var(--primary);
    transform: scale(1.4);
}

/* Transitions for Caption */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* Responsive Scaling */
@media (max-width: 768px) {
    .carousel-viewport { --scale: 0.85; }
    .showcase-bottom-wrapper { height: 130px; margin-top: 24px; }
    .mockup-caption-bottom h3 { font-size: 22px; }
    .mockup-caption-bottom p { font-size: 14px; padding: 0 16px; }
    .floating-arrow { width: 44px; height: 44px; }
    .right-arrow { right: 10px; }
    .left-arrow { left: 10px; }
}

@media (max-width: 480px) {
    .carousel-viewport { --scale: 0.70; }
    .showcase-bottom-wrapper { height: 120px; }
    .mockup-caption-bottom h3 { font-size: 20px; }
    .floating-arrow { width: 38px; height: 38px; display: none; } /* Hide arrows on mobile to save space, user can tap images */
}

@media (max-width: 360px) {
    .carousel-viewport { --scale: 0.60; }
}
</style>
