# GHI NHỚ DỰ ÁN (PROJECT MEMORY)

## 1. Nguồn Dữ Liệu Các Lớp Quy Hoạch Đất
- **Tên lớp (Loại đất):** TỪ BÂY GIỜ, đối với tệp `su dung dat moi.geojson` (và các file dữ liệu quy hoạch chung tương tự), tên các lớp đất (được dùng để hiển thị trên web và biểu đồ) PHẢI ĐƯỢC LẤY TỪ cột `chucNangSuDungDatMuc1` (Chức năng sử dụng đất mức 1), thay vì `tenCongTrinhTrenDat` như trước đây.
- **Bó vỉa giao thông:** Đối với `bo via gt n.geojson`, tên lớp được gán cố định là `GIAO THÔNG`.
- **Diện tích (Area_ha):** Trường `Shape_Area` hoặc `dienTich` trong `su dung dat moi.geojson` (tính bằng m2) phải được trích xuất, chia cho 10,000 và lưu vào trường `Area_ha` của output để vẽ biểu đồ thống kê. (Bó vỉa không có diện tích thì gán bằng 0).
