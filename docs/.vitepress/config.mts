import { defineConfig } from 'vitepress'

// ⚙️ Đổi domain này thành tên miền thật khi triển khai (dùng cho SEO: sitemap, canonical, Open Graph)
const SITE_URL = 'https://docs-lms.vercel.app'
const OG_IMAGE = `${SITE_URL}/logo.png` // ảnh chia sẻ mạng xã hội (thay bằng og-image.png 1200x630 để đẹp hơn)

const BRAND = 'Viện Trí tuệ Nhân tạo và Chuyển đổi số (AIDT) – HUTECH'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'vi-VN',
  title: 'AIDT — Trung tâm Hỗ trợ',
  titleTemplate: ':title | AIDT',
  description:
    'Trung tâm hỗ trợ của Viện Trí tuệ Nhân tạo và Chuyển đổi số (AIDT) – HUTECH: hướng dẫn sử dụng hệ thống học tập trực tuyến Canvas LMS.',
  lastUpdated: true,
  cleanUrls: true,

  // SEO: tạo sitemap.xml tự động
  sitemap: {
    hostname: SITE_URL,
  },

  head: [
    ['meta', { name: 'theme-color', content: '#0a6bd4' }],
    ['meta', { name: 'author', content: 'AIDT – HUTECH' }],
    ['meta', { name: 'keywords', content: 'AIDT, Viện Trí tuệ Nhân tạo và Chuyển đổi số, HUTECH, Canvas LMS, hướng dẫn, hỗ trợ, học trực tuyến' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],

    // Open Graph (Facebook, Zalo...)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'AIDT — Trung tâm Hỗ trợ' }],
    ['meta', { property: 'og:locale', content: 'vi_VN' }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: BRAND }],

    // Twitter / X
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
    ['meta', { name: 'twitter:image:alt', content: BRAND }],

    // Structured data (JSON-LD) — giúp Google hiểu tổ chức & site, hỗ trợ ô tìm kiếm sitelinks
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: BRAND,
        alternateName: 'AIDT',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        parentOrganization: {
          '@type': 'CollegeOrUniversity',
          name: 'Trường Đại học Công nghệ TP.HCM (HUTECH)',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          email: 'aidt@hutech.edu.vn',
          telephone: '+84-28-5445-2222',
          areaServed: 'VN',
          availableLanguage: ['Vietnamese'],
        },
      }),
    ],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AIDT — Trung tâm Hỗ trợ',
        url: SITE_URL,
        inLanguage: 'vi-VN',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    ],
  ],

  // SEO: thêm canonical + og:title/og:description/og:url theo từng trang
  transformPageData(pageData) {
    const path = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonical = `${SITE_URL}/${path}`

    const title = pageData.frontmatter.title || pageData.title || 'AIDT — Trung tâm Hỗ trợ'
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      'Trung tâm hỗ trợ của Viện Trí tuệ Nhân tạo và Chuyển đổi số (AIDT) – HUTECH.'

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },

  themeConfig: {
    // TODO: khi có file logo AIDT, đặt vào docs/public/ rồi bật dòng dưới
    // logo: '/logo.png',
    siteTitle: 'AIDT — Trung tâm Hỗ trợ',

    nav: [
      { text: 'Trang chủ', link: '/' },
      {
        text: 'Hỗ trợ',
        items: [
          { text: 'Hệ thống LMS (Canvas)', link: '/lms/' },
        ],
      },
      { text: 'Hệ thống AIDT', link: '/he-thong-aidt/' },
      { text: 'Liên hệ', link: '/lien-he/' },
    ],

    sidebar: {
      '/lms/': [
        {
          text: 'Hỗ trợ — Hệ thống LMS (Canvas)',
          collapsed: false,
          items: [
            { text: 'Giới thiệu', link: '/lms/' },
            { text: 'Truy cập khóa học', link: '/lms/truy-cap-khoa-hoc' },
            { text: 'Nộp bài & kiểm tra', link: '/lms/nop-bai' },
          ],
        },
      ],
    },

    outline: { level: [2, 3], label: 'Trên trang này' },

    docFooter: { prev: 'Trang trước', next: 'Trang sau' },
    lastUpdatedText: 'Cập nhật lần cuối',
    returnToTopLabel: 'Lên đầu trang',
    sidebarMenuLabel: 'Danh mục',
    darkModeSwitchLabel: 'Giao diện',
    lightModeSwitchTitle: 'Chuyển sang giao diện sáng',
    darkModeSwitchTitle: 'Chuyển sang giao diện tối',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm kiếm' },
          modal: {
            displayDetails: 'Hiển thị chi tiết',
            resetButtonTitle: 'Xóa tìm kiếm',
            backButtonTitle: 'Quay lại',
            noResultsText: 'Không tìm thấy kết quả cho',
            footer: {
              selectText: 'để chọn',
              navigateText: 'để di chuyển',
              closeText: 'để đóng',
            },
          },
        },
      },
    },

    footer: {
      message: 'Viện Trí tuệ Nhân tạo và Chuyển đổi số (AIDT) — HUTECH',
      copyright: 'Copyright © 2026 AIDT – HUTECH',
    },
  },
})
