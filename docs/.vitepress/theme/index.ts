import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import AiHero from './components/AiHero.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Animation chủ đề AI hiển thị bên phải Hero của trang chủ
      'home-hero-image': () => h(AiHero),
    })
  },
} satisfies Theme
