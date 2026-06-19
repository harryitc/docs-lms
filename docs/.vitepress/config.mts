import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'vi-VN',
  title: 'HUTECH Help Center',
  description: 'Trung tâm hỗ trợ và hướng dẫn sử dụng các hệ thống công nghệ thông tin của HUTECH',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#0a6bd4' }],
    ['meta', { name: 'author', content: 'HUTECH' }],
  ],

  themeConfig: {
    // logo: '/logo.svg', // bật lại khi bạn cung cấp logo

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
