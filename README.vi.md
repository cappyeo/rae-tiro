# Tiro 4.9.14 — project khôi phục

Project này được dựng từ bộ cài trong `tiro-4.9.14-windows.zip`, sử dụng REA để nhận diện, trích xuất, phân tích JavaScript/Electron và quan sát ứng dụng khi chạy. Mã và dữ liệu khôi phục được lưu cùng bằng chứng nguồn gốc.

## Đã lấy lại được

- 353 file của ứng dụng Electron đã phát hành, giữ nguyên byte trong `preserved/app`.
- 63 file mã ứng dụng từ source map, gồm 62 file TypeScript. Xem `recovered/sourcemaps/application`.
- 560 file mã thư viện từ source map trong `recovered/sourcemaps/vendor`.
- Mã C++/header, wrapper JavaScript và khai báo TypeScript của `@plato-corp/microphone`, trong `recovered/native/microphone`.
- JavaScript giao diện, CSS, HTML, font và hình ảnh. Bản để đọc/sửa ở `src/compiled/.vite`.
- Binary ghi âm Windows/macOS, giữ lại trong `preserved/external`.

Các file TypeScript trên lấy trực tiếp từ `sourcesContent` trong source map. JavaScript của giao diện là bản đã biên dịch được định dạng lại; tên biến đã rút gọn và cấu trúc component React gốc không được phục hồi bằng thao tác định dạng.

## Chạy trên Windows

Cần Node.js và npm. Trong thư mục chứa file này:

Nếu lấy project từ GitHub trên Windows, dùng lệnh sau để giữ được các đường dẫn vendor dài:

```powershell
git -c core.longpaths=true clone https://github.com/cappyeo/rae-tiro.git
cd rae-tiro
```

```powershell
npm ci
npm run build
npm start
```

`build` biên dịch main và ba preload từ TypeScript khôi phục, kết hợp giao diện đã phát hành để tạo `dist/source-app`. Nó cũng tạo bản tham chiếu từ bundle ở `dist/app`. Launcher mặc định chạy `dist/source-app` offline, dùng profile riêng trong `.recovery-profiles`, tắt cập nhật tự động và đăng ký URL protocol. Nó không dùng dữ liệu của Tiro đã cài trên máy.

Khi chủ động muốn kết nối dịch vụ thật:

```powershell
npm start -- --online
```

Đăng nhập, tài khoản và dịch vụ phía máy chủ cần còn hoạt động. Các bước khôi phục hiện tại không đăng nhập hoặc gửi dữ liệu lên dịch vụ này.

## Sửa mã

| Phần | Đường dẫn |
|---|---|
| Main Electron TypeScript | `recovered/sourcemaps/application/src/main` |
| Preload và IPC | `recovered/sourcemaps/application/src/main/preload.ts` |
| Locale loader | `recovered/sourcemaps/application/src/locales` |
| Giao diện JavaScript/CSS/HTML | `src/compiled/.vite/renderer/main_window` |
| Bản main/preload JavaScript đã phát hành | `src/compiled/.vite/build` |
| Microphone C++ | `recovered/native/microphone/src` |
| Manifest gốc và dependency declarations | `preserved/app/package.json` |
| Build và launcher mới | `scripts` |

Giữ `preserved/` làm bản tham chiếu. Đây không phải toàn bộ Git repository gốc.

## Kiểm tra

```powershell
npm run verify:recovery
npm run smoke
```

`verify:recovery` đối chiếu hash các file trích xuất/source map với mốc khôi phục và kiểm tra bản code đã định dạng. Các chỉnh sửa có chủ đích sau này sẽ làm hash thay đổi.

`smoke` mở bản dựng trong profile riêng, chặn mạng, kiểm tra renderer, preload và một số IPC chỉ đọc, chụp màn hình rồi tự thoát. Bằng chứng ở `evidence/`.

Đã kiểm tra `npm ci`, `npm run build` và `npm run smoke` trên một bản sao sạch ở đường dẫn khác, không tái sử dụng `node_modules` hoặc `dist`. Bản main/preload biên dịch lại mở được trang đăng nhập với cùng nội dung, kết quả IPC và ảnh PNG giống từng byte với bản bảo tồn. Phạm vi này chỉ xác nhận khởi động offline; chưa xác nhận các luồng sau đăng nhập hoặc ghi âm.

Lockfile npm và cấu hình build trong project này được tái tạo. Lockfile Yarn và cấu hình Forge/Vite gốc không có trong bộ cài. Các lệnh `recover:*` dùng để trích xuất lại dữ liệu từ bản bảo tồn; chúng có thể ghi đè nội dung đã khôi phục trước đó.

## Phần chưa lấy lại được từ bộ cài

- Mã React/TSX đầy đủ của giao diện và cách chia module ban đầu.
- Mã nguồn Rust của `tiro-audio-capture`; binary gốc vẫn được giữ lại. Giao thức điều khiển và frame audio được ghi trong `evidence/native-audio.md`.
- Backend, database, hạ tầng máy chủ, lịch sử Git, test suite gốc, file cấu hình build gốc đầy đủ, khóa ký bản phát hành và cấu hình bí mật.

Không có bằng chứng để gọi đây là mã nguồn gốc phục hồi 100%. Phần có nguồn gốc, phần bundle tái sử dụng và tooling mới được phân biệt trong cây thư mục và báo cáo.

## Bằng chứng

- `evidence/source-recovery.json`: từng source map, source index, tên đường dẫn và hash nội dung.
- `evidence/asar-extraction.json`: 353 file REA trích xuất cùng hash.
- `evidence/rea-summary.json`: phạm vi và giới hạn phân tích REA.
- `evidence/rea-evidence.json`: hồ sơ REA đầy đủ của lượt điều tra chính.
- `evidence/rea-runtime-preserved.json`: quan sát thụ động trang đăng nhập qua REA/CDP.
- `evidence/rea-runtime-recovered.json`: quan sát thụ động bản main/preload vừa biên dịch.
- `evidence/source-build.json`: cấu hình, dependency và phạm vi của bản build từ TypeScript.
- `evidence/locale-recovery.json`: hash dữ liệu EN/JA/KO lấy lại từ chunk đã phát hành.
- `evidence/startup-comparison.json`: đối chiếu giao diện và IPC lúc khởi động với bản bảo tồn.
- `evidence/architecture.md`: kiến trúc và ranh giới dịch vụ.
- `evidence/native-audio.md`: giao thức chương trình ghi âm native.
- `evidence/recovery-verification.json`: kết quả kiểm tra mốc khôi phục.
- `evidence/clean-acceptance.json`: cài dependency, build và chạy thử trên bản sao sạch.

REA ghi nhận một sai lệch giữa hash được khai báo trong ASAR và byte thực tế của `microphone.node`. File thực tế có chữ ký Authenticode hợp lệ của ThePlato Inc.; nguyên nhân sai lệch không được khẳng định. Byte thực tế và cả hai hash đều được lưu trong hồ sơ, không âm thầm thay thế file.

