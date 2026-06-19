import { defineConfig } from 'vitepress'

// ⚙️ Đổi domain này thành tên miền thật khi triển khai (dùng cho SEO: sitemap, canonical, Open Graph)
const SITE_URL = 'https://docs-lms.vercel.app'
const OG_IMAGE = `${SITE_URL}/logo.png` // ảnh chia sẻ mạng xã hội (có thể thay bằng og-image.png 1200x630 để đẹp hơn)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'vi-VN',
  title: 'HUTECH Help Center',
  titleTemplate: ':title | HUTECH Help Center',
  description: 'Trung tâm hỗ trợ và hướng dẫn sử dụng các hệ thống công nghệ thông tin của HUTECH: tài khoản HUTECH ID, email, hệ thống LMS, cổng sinh viên và đào tạo.',
  lastUpdated: true,
  cleanUrls: true,

  // SEO: tạo sitemap.xml tự động
  sitemap: {
    hostname: SITE_URL,
  },

  head: [
    ['meta', { name: 'theme-color', content: '#0a6bd4' }],
    ['meta', { name: 'author', content: 'HUTECH' }],
    ['meta', { name: 'keywords', content: 'HUTECH, hỗ trợ, hướng dẫn, HUTECH ID, SSO, email sinh viên, LMS, cổng sinh viên, đăng ký môn học, học phí' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],

    // Open Graph (Facebook, Zalo...)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'HUTECH Help Center' }],
    ['meta', { property: 'og:locale', content: 'vi_VN' }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    ['meta', { property: 'og:image:alt', content: 'HUTECH Help Center' }],

    // Twitter / X
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
    ['meta', { name: 'twitter:image:alt', content: 'HUTECH Help Center' }],

    // Structured data (JSON-LD) — giúp Google hiểu tổ chức & site, hỗ trợ ô tìm kiếm sitelinks
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Trường Đại học Công nghệ TP.HCM (HUTECH)',
        alternateName: 'HUTECH Help Center',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          email: 'it@hutech.edu.vn',
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
        name: 'HUTECH Help Center',
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

    const title = pageData.frontmatter.title || pageData.title || 'HUTECH Help Center'
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      'Trung tâm hỗ trợ và hướng dẫn sử dụng các hệ thống công nghệ thông tin của HUTECH.'

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
    logo: '/logo.png',
    siteTitle: 'Help Center', // hiển thị cạnh logo Canvas; đặt false nếu chỉ muốn logo

    nav: [
      { text: 'Trang chủ', link: '/' },
      { text: 'Tài khoản', link: '/tai-khoan/' },
      { text: 'Email & Google', link: '/email/' },
      { text: 'Hệ thống LMS', link: '/lms/' },
      { text: 'Cổng SV & Đào tạo', link: '/cong-sinh-vien/' },
      {
        text: 'Liên hệ',
        items: [
          { text: 'Email: it@hutech.edu.vn', link: 'mailto:it@hutech.edu.vn' },
          { text: 'Tổng đài: (028) 5445 2222', link: 'tel:02854452222' },
        ],
      },
    ],

    sidebar: {
      '/tai-khoan/': [
        {
          text: 'Tài khoản HUTECH ID',
          collapsed: false,
          items: [
            { text: 'Giới thiệu', link: '/tai-khoan/' },
            { text: 'Đăng nhập một lần (SSO)', link: '/tai-khoan/dang-nhap-sso' },
            { text: 'Đổi mật khẩu', link: '/tai-khoan/doi-mat-khau' },
            { text: 'Quên mật khẩu', link: '/tai-khoan/quen-mat-khau' },
          ],
        },
      ],
      '/email/': [
        {
          text: 'Email & Google Apps',
          collapsed: false,
          items: [
            { text: 'Giới thiệu', link: '/email/' },
            { text: 'Đăng nhập email', link: '/email/dang-nhap' },
            { text: 'Cấu hình trên điện thoại', link: '/email/cau-hinh-dien-thoai' },
          ],
        },
      ],
      '/lms/': [
        {
          text: 'Hệ thống LMS',
          collapsed: false,
          items: [
            { text: 'Giới thiệu', link: '/lms/' },
            { text: 'Truy cập khóa học', link: '/lms/truy-cap-khoa-hoc' },
            { text: 'Nộp bài & kiểm tra', link: '/lms/nop-bai' },
          ],
        },
      ],
      '/cong-sinh-vien/': [
        {
          text: 'Cổng sinh viên & Đào tạo',
          collapsed: false,
          items: [
            { text: 'Giới thiệu', link: '/cong-sinh-vien/' },
            { text: 'Đăng ký môn học', link: '/cong-sinh-vien/dang-ky-mon-hoc' },
            { text: 'Xem kết quả học tập', link: '/cong-sinh-vien/ket-qua-hoc-tap' },
            { text: 'Học phí & thanh toán', link: '/cong-sinh-vien/hoc-phi' },
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
      message: 'Trung tâm Hỗ trợ CNTT — HUTECH Help Center',
      copyright: 'Copyright © 2026 Trường Đại học Công nghệ TP.HCM (HUTECH)',
    },
  },
})
