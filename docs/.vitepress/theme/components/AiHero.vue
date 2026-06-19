<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

// Mạng nơ-ron quanh lõi AIDT — toạ độ tính sẵn (tất định, an toàn cho SSR)
const cx = 180
const cy = 180
const R = 140
const nodes = Array.from({ length: 8 }, (_, i) => {
  const a = (Math.PI / 4) * i
  return { i, x: +(cx + R * Math.cos(a)).toFixed(1), y: +(cy + R * Math.sin(a)).toFixed(1) }
})
const particles = [0, 1, 2, 3, 4, 5]

const root = ref(null)
let ctx

onMounted(() => {
  // Tôn trọng người dùng tắt hiệu ứng chuyển động
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  gsap.registerPlugin(MotionPathPlugin)

  ctx = gsap.context((self) => {
    // Vòng quỹ đạo: căn giữa rồi xoay liên tục
    gsap.set(['.ai-orbit-1', '.ai-orbit-2', '.ai-orbit-3'], { xPercent: -50, yPercent: -50 })
    gsap.to('.ai-orbit-1', { rotation: 360, duration: 18, repeat: -1, ease: 'none' })
    gsap.to('.ai-orbit-2', { rotation: -360, duration: 13, repeat: -1, ease: 'none' })
    gsap.to('.ai-orbit-3', { rotation: 360, duration: 9, repeat: -1, ease: 'none' })

    // Nút mạng nhấp nháy theo nhịp
    gsap.to('.ai-node', {
      scale: 1.35,
      opacity: 1,
      transformOrigin: 'center',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { each: 0.18, from: 'random' },
    })

    // Tín hiệu dữ liệu chạy dọc đường nối vào lõi
    self.selector('.ai-signal').forEach((el, i) => {
      gsap.to(el, {
        duration: 2.4,
        repeat: -1,
        delay: i * 0.28,
        ease: 'power1.in',
        motionPath: {
          path: '#ai-line-' + i,
          align: '#ai-line-' + i,
          alignOrigin: [0.5, 0.5],
        },
      })
    })

    // Lõi & ánh sáng "thở"
    gsap.to('.ai-core', {
      scale: 1.06,
      transformOrigin: 'center',
      duration: 1.7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to('.ai-glow', {
      scale: 1.08,
      opacity: 1,
      transformOrigin: 'center',
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // Hạt bay lơ lửng
    self.selector('.ai-particle').forEach((el, i) => {
      gsap.to(el, {
        x: i % 2 ? -14 : 12,
        y: -16,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      })
    })

    // Toàn khối xuất hiện mềm mại
    gsap.from(root.value, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, root.value)
})

onBeforeUnmount(() => ctx && ctx.revert())
</script>

<template>
  <div ref="root" class="ai-hero" aria-hidden="true">
    <!-- Ánh sáng nền -->
    <div class="ai-glow"></div>

    <!-- Các vòng quỹ đạo (GSAP xoay) -->
    <div class="ai-orbit ai-orbit-1"><span class="ai-orbit-dot"></span></div>
    <div class="ai-orbit ai-orbit-2"><span class="ai-orbit-dot orange"></span></div>
    <div class="ai-orbit ai-orbit-3"><span class="ai-orbit-dot"></span></div>

    <!-- Mạng nơ-ron + tín hiệu dữ liệu -->
    <svg class="ai-net" viewBox="0 0 360 360">
      <defs>
        <linearGradient id="aiLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2b8af0" />
          <stop offset="100%" stop-color="#f26a1b" />
        </linearGradient>
      </defs>

      <g class="ai-lines">
        <path
          v-for="n in nodes"
          :key="'l' + n.i"
          :id="'ai-line-' + n.i"
          :d="`M${n.x},${n.y} L${cx},${cy}`"
        />
      </g>

      <g>
        <circle v-for="n in nodes" :key="'s' + n.i" class="ai-signal" r="3.5" />
      </g>

      <g>
        <circle v-for="n in nodes" :key="'nd' + n.i" class="ai-node" :cx="n.x" :cy="n.y" r="6.5" />
      </g>
    </svg>

    <!-- Lõi trung tâm -->
    <div class="ai-core"><span class="ai-core-text">AIDT</span></div>

    <!-- Hạt bay -->
    <span v-for="p in particles" :key="'p' + p" class="ai-particle" :class="'ai-particle-' + p"></span>
  </div>
</template>

<style scoped>
.ai-hero {
  position: relative;
  width: 340px;
  height: 340px;
  max-width: 100%;
  margin: 0 auto;
}

.ai-glow {
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(42, 138, 240, 0.35), rgba(242, 106, 27, 0.18) 55%, transparent 72%);
  filter: blur(26px);
}

.ai-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1.5px dashed rgba(42, 138, 240, 0.28);
}
.ai-orbit-1 { width: 100%; height: 100%; }
.ai-orbit-2 { width: 74%; height: 74%; border-color: rgba(242, 106, 27, 0.3); }
.ai-orbit-3 { width: 50%; height: 50%; }

.ai-orbit-dot {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  border-radius: 50%;
  background: #2b8af0;
  box-shadow: 0 0 10px rgba(42, 138, 240, 0.9);
}
.ai-orbit-dot.orange {
  background: #f26a1b;
  box-shadow: 0 0 10px rgba(242, 106, 27, 0.9);
}

.ai-net {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.ai-lines path {
  fill: none;
  stroke: url(#aiLineGrad);
  stroke-width: 1.4;
  opacity: 0.4;
}
.ai-node {
  fill: #2b8af0;
  opacity: 0.5;
  filter: drop-shadow(0 0 4px rgba(42, 138, 240, 0.7));
}
.ai-signal {
  fill: #f26a1b;
  filter: drop-shadow(0 0 5px rgba(242, 106, 27, 0.9));
}

.ai-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 96px;
  height: 96px;
  margin: -48px 0 0 -48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2b8af0, #1e7fe0 45%, #f26a1b);
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.18), 0 10px 30px rgba(42, 86, 160, 0.45);
}
.ai-core-text {
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 22px;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
}

.ai-particle {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(242, 106, 27, 0.85);
  box-shadow: 0 0 8px rgba(242, 106, 27, 0.6);
}
.ai-particle-0 { top: 12%; left: 20%; background: rgba(42, 138, 240, 0.85); }
.ai-particle-1 { top: 26%; right: 12%; }
.ai-particle-2 { bottom: 18%; left: 14%; }
.ai-particle-3 { bottom: 12%; right: 22%; background: rgba(42, 138, 240, 0.85); }
.ai-particle-4 { top: 46%; left: 6%; }
.ai-particle-5 { top: 8%; right: 38%; background: rgba(42, 138, 240, 0.85); }

:global(.dark) .ai-orbit { border-color: rgba(90, 168, 245, 0.3); }
:global(.dark) .ai-orbit-2 { border-color: rgba(255, 138, 69, 0.32); }
</style>
