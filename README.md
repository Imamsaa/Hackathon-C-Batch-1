# Code Arena — C++ Hackathon

Platform latihan / hackathon C++ bergaya LeetCode. Dibangun dengan HTML, CSS, dan JavaScript; editor memakai CodeMirror 6 dan compiler menggunakan **Emception (Clang + WebAssembly)** di browser.

## Fitur

- 8 challenge C++ dengan kategori Fundamental, String, dan Array & Logika.
- Editor C++20, tombol Run Code dan Submit.
- Run Code menjalankan sample test; Submit menjalankan seluruh test termasuk hidden test.
- XP, daftar soal selesai, bookmark, draft kode, dan sesi timer tersimpan di `localStorage` browser.
- Kompilasi dan eksekusi dilakukan di browser melalui WebAssembly; aplikasi tidak memerlukan backend.
- Responsif untuk desktop, tablet, dan ponsel.

## Menjalankan secara lokal

Karena aplikasi memakai JavaScript module dan service worker untuk cross-origin isolation, jangan membuka `index.html` langsung dengan `file://`.

Jalankan server statis, misalnya:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Deploy ke GitHub Pages

1. Buat repository GitHub baru.
2. Upload seluruh isi folder ini ke root branch `main`.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu Save.
6. Buka URL GitHub Pages setelah deployment selesai.

Tidak perlu proses build, Node.js, server API, atau database.

## Catatan compiler WebAssembly

- Browser perlu mendukung WebAssembly, module Worker, dan Service Worker.
- Akses situs melalui HTTPS (GitHub Pages menyediakan HTTPS).
- Pada kunjungan pertama, browser perlu mengunduh runtime/toolchain C++ dari CDN. Karena itu, jalankan pertama kali dengan koneksi internet yang stabil. Kunjungan berikutnya dapat memanfaatkan cache browser.
- Runtime browser membutuhkan cross-origin isolation (`SharedArrayBuffer`). Aplikasi memanggil `ensureCrossOriginIsolated()` dari `@gameguild/emception-browser` untuk menyiapkan mekanisme service worker yang diperlukan pada static hosting.
- Kode siswa dikompilasi dan dieksekusi lokal di browser, bukan dikirim ke backend aplikasi.
- Challenge saat ini menggunakan function signature dan test harness otomatis. Siswa mengimplementasikan fungsi yang diminta dan **tidak menulis `main()`**.
- Progres hanya tersimpan di browser/perangkat yang sama. Belum ada akun, sinkronisasi antargawai, leaderboard online, panel guru, atau penyimpanan nilai terpusat.

## Struktur

```text
code-arena-cpp/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## Dependensi runtime (CDN)

- CodeMirror 6: editor kode dan syntax highlighting C++.
- `@gameguild/emception-browser` 4.5.0: runtime compiler C/C++ berbasis WebAssembly.

Lihat dokumentasi upstream:

- https://www.npmjs.com/package/@gameguild/emception-browser
- https://www.npmjs.com/package/emception
- https://codemirror.net/
