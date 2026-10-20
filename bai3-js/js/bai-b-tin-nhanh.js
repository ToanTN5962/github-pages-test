/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
const oTimKiem = document.getElementById("o-tim-kiem");
const danhSachTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");

function locVaDemTin() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacTin = danhSachTin.querySelectorAll("li");
	let soTinHien = 0;

	for (const tin of cacTin) {
		const noiDungTim = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
		const khop = noiDungTim.toLowerCase().includes(tuKhoa);
		tin.classList.toggle("an", !khop);
		if (khop) soTinHien++;
	}

	boDem.textContent = `Đang hiển thị ${soTinHien}/${cacTin.length} tin`;
	khongThay.classList.toggle("an", soTinHien !== 0);
	khongThay.textContent = soTinHien === 0 ? `Không tìm thấy tin nào cho "${oTimKiem.value}"` : "";
}

locVaDemTin();

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
oTimKiem.addEventListener("keyup", locVaDemTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSachTin.addEventListener("click", (e) => {
	if (!e.target.matches("button.more")) return;

	const doanVan = e.target.parentNode.querySelector("p");
	const dangMo = doanVan.classList.toggle("day-du");
	e.target.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");

document.getElementById("nut-dang").addEventListener("click", () => {
	if (oTieuDe.value === "" || oNoiDung.value === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const tin = document.createElement("li");
	const ngay = document.createElement("span");
	const tieuDe = document.createElement("h3");
	const noiDung = document.createElement("p");
	const nutMo = document.createElement("button");

	ngay.className = "time";
	ngay.textContent = homNay();
	tieuDe.textContent = oTieuDe.value;
	noiDung.textContent = oNoiDung.value;
	nutMo.type = "button";
	nutMo.className = "more";
	nutMo.textContent = "Read more >>";

	tin.append(ngay, tieuDe, noiDung, nutMo);
	danhSachTin.prepend(tin);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locVaDemTin();
});
