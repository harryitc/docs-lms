<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

/* ----- Dựng mạng nơ-ron nhiều tầng (toạ độ tất định → an toàn SSR) ----- */
const W = 360
const H = 360
const padX = 50
const padY = 44
const layerSizes = [4, 5, 5, 3] // số nút mỗi tầng: input → ẩn → ẩn → output

const layerX = (i) => padX + (W - 2 * padX) * (i / (layerSizes.length - 1))
const nodeY = (k, n) => (n === 1 ? H / 2 : padY + (H - 2 * padY) * (k / (n - 1)))

const nodes = []
layerSizes.forEach((n, li) => {
  for (let k = 0; k < n; k++) {
    nodes.push({
      id: `${li}-${k}`,
      x: +layerX(li).toFixed(1),
      y: +nodeY(k, n).toFixed(1),
      layer: li,
      frac: li / (layerSizes.length - 1),
    })
  }
})

const edges = []
for (let li = 0; li < layerSizes.length - 1; li++) {
  const a = nodes.filter((nd) => nd.layer === li)
  const b = nodes.filter((nd) => nd.layer === li + 1)
  a.forEach((s) => b.forEach((t) => edges.push({ x1: s.x, y1: s.y, x2: t.x, y2: t.y, layer: li })))
}

const signalCount = 16

// Màu nút: nội suy xanh (input) → cam (output)
const mix = (f) => {
  const c1 = [43, 138, 240]
  const c2 = [242, 106, 27]
  const c = c1.map((v, i) => Math.round(v + (c2[i] - v) * f))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

const root = ref(null)
let ctx
let alive = true

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context((self) => {
    const edgeEls = self.selector('.nn-edge')
    const nodeEls = self.selector('.nn-node')
    const sigEls = self.selector('.nn-signal')

    if (reduce) {
      gsap.set(edgeEls, { strokeDashoffset: 0 })
      gsap.set(nodeEls, { opacity: 1 })
      gsap.set(sigEls, { opacity: 0 })
      return
    }

    // 1) Vẽ dần các đường kết nối (mô phỏng DrawSVG bằng dasharray)
    edgeEls.forEach((el) => {
      const len = el.getTotalLength ? el.getTotalLength() : 220
      const layer = Number(el.dataset.layer || 0)
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power1.inOut',
        delay: 0.35 * layer + Math.random() * 0.35,
      })
    })

    // 2) Nút bật ra rồi nhấp nháy theo nhịp
    gsap.from(nodeEls, {
      scale: 0,
      transformOrigin: 'center',
      duration: 0.5,
      ease: 'back.out(2)',
      stagger: 0.02,
      delay: 0.4,
    })
    gsap.to(nodeEls, {
      scale: 1.2,
      transformOrigin: 'center',
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { each: 0.05, from: 'random' },
      delay: 1,
    })

    // 3) Ánh sáng nền "thở"
    gsap.to('.nn-glow', {
      opacity: 1,
      scale: 1.06,
      transformOrigin: 'center',
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // 4) Xung dữ liệu chạy xuyên các tầng (trái → phải)
    const fire = (el, delay) => {
      if (!alive) return
      const e = edges[(Math.random() * edges.length) | 0]
      gsap.set(el, { attr: { cx: e.x1, cy: e.y1 }, opacity: 0 })
      const tl = gsap.timeline({ delay, onComplete: () => fire(el, Math.random() * 0.5) })
      tl.to(el, { opacity: 1, duration: 0.14 }, 0)
        .to(el, { attr: { cx: e.x2, cy: e.y2 }, duration: 0.55 + Math.random() * 0.5, ease: 'power1.inOut' }, 0)
        .to(el, { opacity: 0, duration: 0.16 }, '>-0.16')
    }
    sigEls.forEach((el, i) => fire(el, 1.1 + i * 0.18))
  }, root.value)
})

onBeforeUnmount(() => {
  alive = false
  if (root.value) gsap.killTweensOf(root.value.querySelectorAll('*'))
  ctx && ctx.revert()
})
</script>

<template>
  <div ref="root" class="nn-hero" aria-hidden="true">
    <div class="nn-glow"></div>

    <svg class="nn-svg" viewBox="0 0 360 360">
      <defs>
        <linearGradient id="nnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2b8af0" />
          <stop offset="100%" stop-color="#f26a1b" />
        </linearGradient>
      </defs>

      <!-- Đường kết nối -->
      <g class="nn-edges">
        <line
          v-for="(e, i) in edges"
          :key="'e' + i"
          class="nn-edge"
          :x1="e.x1"
          :y1="e.y1"
          :x2="e.x2"
          :y2="e.y2"
          :data-layer="e.layer"
        />
      </g>

      <!-- Xung dữ liệu -->
      <g class="nn-signals">
        <circle v-for="s in signalCount" :key="'s' + s" class="nn-signal" r="3" />
      </g>

      <!-- Nút -->
      <g class="nn-nodes">
        <circle
          v-for="n in nodes"
          :key="n.id"
          class="nn-node"
          :cx="n.x"
          :cy="n.y"
          r="6"
          :style="{ fill: mix(n.frac) }"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.nn-hero {
  position: relative;
  width: 360px;
  height: 360px;
  max-width: 100%;
  margin: 0 auto;
}

.nn-glow {
  position: absolute;
  inset: 6%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(42, 138, 240, 0.3), rgba(242, 106, 27, 0.16) 55%, transparent 72%);
  filter: blur(28px);
  opacity: 0.75;
}

.nn-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.nn-edge {
  fill: none;
  stroke: url(#nnGrad);
  stroke-width: 1;
  opacity: 0.32;
}

.nn-node {
  opacity: 0.92;
  transform-box: fill-box;
  transform-origin: center;
  filter: drop-shadow(0 0 4px rgba(42, 138, 240, 0.45));
}

.nn-signal {
  fill: #ffffff;
  filter: drop-shadow(0 0 6px rgba(242, 106, 27, 0.95));
}

/* Dark mode: đường nối sáng hơn chút cho rõ trên nền tối.
   LƯU Ý: phải bọc CẢ selector trong :global(...). Nếu viết
   ":global(.dark) .nn-edge" thì compiler VitePress alpha biên dịch sai
   thành ".dark{opacity:.4}" → làm mờ TOÀN bộ trang ở dark mode. */
:global(.dark .nn-edge) {
  opacity: 0.4;
}
</style>
