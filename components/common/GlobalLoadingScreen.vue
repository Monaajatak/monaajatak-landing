<script setup lang="ts">
import Logo from '~/assets/imgs/Logo.vue'

const { isLoading, loadingMessage, stopLoading } = useGlobalLoading()

onMounted(() => {
  // Dismiss smoothly once initial SSR render and hydration are complete
  stopLoading(400)
})
</script>

<template>
  <Transition name="loading-fade">
    <div
      v-if="isLoading"
      id="global-loading-screen"
      class="global-loading-screen"
      role="status"
      aria-live="polite"
      :aria-label="loadingMessage || $t('loading.message')"
    >
      <!-- Ambient background glow layers -->
      <div class="loading-ambient-glow"/>

      <!-- Main Center Content -->
      <div class="loading-content">
        <!-- Logo with Orbital Glow and Spinner Ring -->
        <div class="logo-wrapper">
          <!-- Animated rotating outer ring -->
          <svg
            class="orbital-spinner"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="orbital-track"
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              stroke-width="2.5"
            />
            <circle
              class="orbital-bar"
              cx="60"
              cy="60"
              r="54"
              stroke="url(#loading-gradient)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-dasharray="160 180"
            />
            <defs>
              <linearGradient
                id="loading-gradient"
                x1="0"
                y1="0"
                x2="120"
                y2="120"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00A2B5" />
                <stop
                  offset="0.5"
                  stop-color="#4dd6e2"
                />
                <stop
                  offset="1"
                  stop-color="#173b42"
                />
              </linearGradient>
            </defs>
          </svg>

          <!-- Pulsing inner aura -->
          <div class="aura-pulse"/>

          <!-- Monaajatak Brand Logo -->
          <div class="brand-logo-container">
            <Logo class="brand-logo-svg" />
          </div>
        </div>

        <!-- Brand Name & Status Text -->
        <div class="loading-typography">
          <h2 class="brand-title">
            {{ $t('glopal.monaajatak') }}
          </h2>
          <p class="loading-status">
            <span>{{ loadingMessage || $t('loading.message') }}</span>
          </p>
        </div>

        <!-- Shimmer Progress Bar -->
        <div class="loading-progress-track">
          <div class="loading-progress-shimmer"/>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.global-loading-screen {
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafbfc;
  background: radial-gradient(
    circle at center,
    rgba(0, 162, 181, 0.08) 0%,
    rgba(250, 251, 252, 0.95) 60%,
    #fafbfc 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  user-select: none;
  cursor: wait;
}

/* Dark mode theme styling */
:global([data-theme='dark']) .global-loading-screen {
  background-color: #0a191c;
  background: radial-gradient(
    circle at center,
    rgba(0, 162, 181, 0.16) 0%,
    rgba(10, 25, 28, 0.96) 65%,
    #0a191c 100%
  );
}

.loading-ambient-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 162, 181, 0.22) 0%,
    rgba(38, 203, 218, 0.08) 50%,
    transparent 70%
  );
  filter: blur(40px);
  pointer-events: none;
  animation: breatheGlow 4s ease-in-out infinite alternate;
}

.loading-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
}

/* ── Logo & Rings ── */
.logo-wrapper {
  position: relative;
  width: 124px;
  height: 124px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.orbital-spinner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: orbitalSpin 2.2s linear infinite;
}

.orbital-track {
  opacity: 0.15;
  color: #00a2b5;
}

:global([data-theme='dark']) .orbital-track {
  opacity: 0.2;
}

.aura-pulse {
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  background: rgba(0, 162, 181, 0.12);
  filter: blur(8px);
  animation: auraPulse 2.4s ease-in-out infinite;
}

:global([data-theme='dark']) .aura-pulse {
  background: rgba(0, 162, 181, 0.22);
  filter: blur(12px);
}

.brand-logo-container {
  position: relative;
  z-index: 2;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: logoFloat 3s ease-in-out infinite;
}

.brand-logo-svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 162, 181, 0.25));
}

/* ── Typography ── */
.loading-typography {
  margin-bottom: 22px;
}

.brand-title {
  font-family: 'Tajawal', 'Amiri', system-ui, sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: #173b42;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

:global([data-theme='dark']) .brand-title {
  color: #ffffff;
}

.loading-status {
  font-size: 0.95rem;
  font-weight: 500;
  color: #647c80;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

:global([data-theme='dark']) .loading-status {
  color: #94a5a8;
}

/* ── Progress Shimmer Bar ── */
.loading-progress-track {
  width: 150px;
  height: 3.5px;
  background-color: rgba(0, 162, 181, 0.12);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

:global([data-theme='dark']) .loading-progress-track {
  background-color: rgba(255, 255, 255, 0.1);
}

.loading-progress-shimmer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 45%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #00a2b5 50%,
    #4dd6e2 75%,
    transparent 100%
  );
  border-radius: 999px;
  animation: progressSlide 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* ── Keyframe Animations ── */
@keyframes orbitalSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes auraPulse {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes breatheGlow {
  0% {
    transform: scale(0.85);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.15);
    opacity: 0.9;
  }
}

@keyframes progressSlide {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(350%);
  }
}

/* ── Transition Animations ── */
.loading-fade-enter-active {
  transition: opacity 0.25s ease-out;
}

.loading-fade-leave-active {
  transition:
    opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-fade-enter-from {
  opacity: 0;
}

.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
