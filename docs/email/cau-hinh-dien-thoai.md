# Cấu hình email trên điện thoại

Cách nhanh nhất là dùng ứng dụng **Gmail** (có sẵn trên Android, tải miễn phí trên iOS).

## Dùng ứng dụng Gmail

1. Mở **Gmail** → nhấn ảnh đại diện góc phải → **Thêm tài khoản khác**.
2. Chọn **Google**.
3. Nhập email trường `…@student.hutech.edu.vn` → **Tiếp theo**.
4. Trang **SSO HUTECH** hiện ra → nhập mật khẩu HUTECH ID.
5. Hoàn tất — email sẽ tự đồng bộ.

<!-- ![Thêm tài khoản trên Gmail](/images/email-mobile.png) -->

## Cấu hình thủ công (IMAP) — nếu cần

| Thông số | Giá trị |
| --- | --- |
| Máy chủ thư đến (IMAP) | `imap.gmail.com` — cổng `993` (SSL) |
| Máy chủ thư đi (SMTP) | `smtp.gmail.com` — cổng `465` (SSL) |
| Tên đăng nhập | Địa chỉ email đầy đủ |
| Mật khẩu | Mật khẩu ứng dụng (App Password) |

::: tip
Nếu đã bật xác thực 2 bước, ứng dụng email bên thứ ba cần dùng **Mật khẩu ứng dụng** thay cho mật khẩu thường.
:::
