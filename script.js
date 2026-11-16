// 1. Membuat Array Data Produk (Nama, Harga, Deskripsi, Gambar, Kategori)
const daftarProduk = [
  {
    id: 1,
    nama: "Laptop Pro Developer 15",
    harga: 14500000,
    deskripsi:
      "Laptop performa tinggi dengan RAM 16GB dan SSD 512GB, cocok untuk coding dan desain.",
    gambar:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&h=350&q=80",
    kategori: "Elektronik",
  },
  {
    id: 2,
    nama: "Mechanical Keyboard RGB",
    harga: 850000,
    deskripsi:
      "Keyboard mekanikal tactile switch yang nyaman untuk mengetik kode berjam-jam.",
    gambar:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=500&h=350&q=80",
    kategori: "Aksesoris",
  },
  {
    id: 3,
    nama: "Template Landing Page Bisnis",
    harga: 250000,
    deskripsi:
      "Source code website perusahaan modern berbasis HTML5, CSS3, dan Bootstrap 5.",
    gambar:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&h=350&q=80",
    kategori: "Template Web",
  },
  {
    id: 4,
    nama: "Monitor IPS 27 Inch 4K",
    harga: 4200000,
    deskripsi:
      "Monitor layar lebar dengan akurasi warna tinggi untuk kebutuhan UI/UX designer.",
    gambar:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&h=350&q=80",
    kategori: "Elektronik",
  },
  {
    id: 5,
    nama: "Wireless Ergonomic Mouse",
    harga: 450000,
    deskripsi:
      "Mouse tanpa kabel dengan desain ergonomis agar pergelangan tangan tidak mudah lelah.",
    gambar:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&h=350&q=80",
    kategori: "Aksesoris",
  },
  {
    id: 6,
    nama: "Template Toko Online E-Commerce",
    harga: 350000,
    deskripsi:
      "Template katalog toko online responsif lengkap dengan fitur keranjang dan filter produk.",
    gambar:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&h=350&q=80",
    kategori: "Template Web",
  },
];

// Fungsi pembantu untuk format angka ke Rupiah
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// 2. Fungsi Menampilkan Produk ke Halaman Menggunakan Looping (forEach)
const productContainer = document.getElementById("product-list");

function tampilkanProduk(dataProduk) {
  // Kosongkan isi container terlebih dahulu
  productContainer.innerHTML = "";

  // Looping setiap item dalam array produk
  dataProduk.forEach((produk) => {
    const cardHTML = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card product-card h-100 rounded-3 shadow-sm p-2">
                    <div class="project-img-box p-2 rounded-2">
                        <img src="${produk.gambar}" class="card-img-top rounded-2" alt="${produk.nama}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <div class="mb-1">
                            <span class="badge bg-light text-orange border">${produk.kategori}</span>
                        </div>
                        <h5 class="card-title fw-bold mb-1">${produk.nama}</h5>
                        <h6 class="text-orange fw-bold mb-2">${formatRupiah(produk.harga)}</h6>
                        <p class="card-text text-muted small flex-grow-1">${produk.deskripsi}</p>
                        <button class="btn btn-orange text-white w-100 mt-3" onclick="bukaDetailProduk(${produk.id})">
                            Lihat Detail
                        </button>
                    </div>
                </div>
            </div>
        `;
    productContainer.innerHTML += cardHTML;
  });
}

// 3. Fitur Filter Produk Berdasarkan Kategori
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((tombol) => {
  tombol.addEventListener("click", function () {
    // Hapus class 'active' dari semua tombol, lalu tambahkan ke tombol yang diklik
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const kategoriDipilih = this.getAttribute("data-kategori");

    if (kategoriDipilih === "Semua") {
      tampilkanProduk(daftarProduk);
    } else {
      // Menyaring array produk menggunakan metode .filter()
      const produkTersaring = daftarProduk.filter(
        (item) => item.kategori === kategoriDipilih,
      );
      tampilkanProduk(produkTersaring);
    }
  });
});

// Fungsi untuk mengisi & membuka Popup Modal Detail Produk
function bukaDetailProduk(idProduk) {
  const produk = daftarProduk.find((item) => item.id === idProduk);
  if (produk) {
    document.getElementById("modalNamaProduk").textContent = produk.nama;
    document.getElementById("modalGambarProduk").src = produk.gambar;
    document.getElementById("modalKategoriProduk").textContent =
      produk.kategori;
    document.getElementById("modalHargaProduk").textContent = formatRupiah(
      produk.harga,
    );
    document.getElementById("modalDeskripsiProduk").textContent =
      produk.deskripsi;

    const modal = new bootstrap.Modal(
      document.getElementById("detailProdukModal"),
    );
    modal.show();
  }
}

// Tampilkan semua produk saat halaman pertama kali dimuat
tampilkanProduk(daftarProduk);
