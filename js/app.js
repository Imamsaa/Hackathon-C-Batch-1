// Code Arena uses the browsercc + WASI Web Worker runtime already proven in
// Imamsaa/codelab-cpp. No Emception package bundling is required.
const SESSION_SECONDS = 90 * 60;
const STORAGE_KEY = 'codearena-cpp-progress-v1';
const START_KEY = 'codearena-cpp-start-v1';
const BREAK_KEY = 'codearena-cpp-breaks-v1';
const INSPECT_RESTRICTIONS_ENABLED = false; // Re-enable after development.

const challenges = [
  {
    "id": "sambutan-hackathon",
    "stage": 1,
    "title": "Sambutan Hackathon",
    "category": "Dasar & Output",
    "difficulty": "Easy",
    "xp": 50,
    "time": "8 min",
    "signature": "int main() — output dan baris baru",
    "description": "Hackathon akan segera dimulai! Panitia meminta kamu membuat layar sambutan sederhana. Tampilkan tiga baris informasi dengan urutan yang tepat. Tantangan ini melatih struktur program, <code>cout</code>, teks, dan baris baru.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: tampilkan tiga baris informasi hackathon\n    return 0;\n}",
    "examples": [
      {
        "input": "Tidak ada input",
        "output": "SELAMAT DATANG DI HACKATHON\nSiapkan ide dan logikamu!\nSemangat belajar C++!"
      }
    ],
    "constraints": [
      "Gunakan cout untuk menampilkan teks.",
      "Setiap kalimat harus berada pada baris tersendiri.",
      "Jangan menambahkan teks lain."
    ],
    "hint": "Gunakan operator << dan akhiri teks dengan \\n atau endl.",
    "tests": [
      {
        "label": "Tampilan sambutan",
        "input": "",
        "expected": "SELAMAT DATANG DI HACKATHON\nSiapkan ide dan logikamu!\nSemangat belajar C++!"
      },
      {
        "label": "Urutan dan baris",
        "input": "",
        "expected": "SELAMAT DATANG DI HACKATHON\nSiapkan ide dan logikamu!\nSemangat belajar C++!",
        "hidden": true
      }
    ]
  },
  {
    "id": "papan-skor",
    "stage": 1,
    "title": "Papan Skor Tim",
    "category": "Dasar & Output",
    "difficulty": "Easy",
    "xp": 60,
    "time": "8 min",
    "signature": "int main() — menampilkan hasil perhitungan",
    "description": "Tim kamu mendapat 10 poin dari tantangan pertama, 15 poin dari tantangan kedua, dan 5 poin bonus. Tampilkan total poin dengan menghitung ekspresi C++ secara langsung, bukan mengetik hasil akhirnya.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: tampilkan total 10 + 15 + 5 dengan format Total poin: ...\n    return 0;\n}",
    "examples": [
      {
        "input": "Tidak ada input",
        "output": "Total poin: 30"
      }
    ],
    "constraints": [
      "Gunakan ekspresi penjumlahan di dalam cout.",
      "Teks output harus diawali Total poin:.",
      "Tidak perlu menggunakan variabel."
    ],
    "hint": "C++ dapat menghitung ekspresi matematika sebelum hasilnya ditampilkan oleh cout.",
    "tests": [
      {
        "label": "Total poin",
        "input": "",
        "expected": "Total poin: 30"
      },
      {
        "label": "Ekspresi dihitung",
        "input": "",
        "expected": "Total poin: 30",
        "hidden": true
      }
    ]
  },
  {
    "id": "data-peserta",
    "stage": 2,
    "title": "Data Peserta",
    "category": "Variabel & Input",
    "difficulty": "Easy",
    "xp": 70,
    "time": "10 min",
    "signature": "int main() — variabel string, int, dan cin",
    "description": "Panitia membutuhkan nama panggilan dan umur peserta. Bacalah dua data dari input, lalu tampilkan kembali dengan format yang diminta. Gunakan variabel <code>string</code>, <code>int</code>, dan <code>cin</code>.",
    "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nama;\n    int umur;\n    // TODO: baca nama dan umur\n    // TODO: tampilkan data peserta\n    return 0;\n}",
    "examples": [
      {
        "input": "Alya 13",
        "output": "Peserta: Alya\nUmur: 13 tahun"
      }
    ],
    "constraints": [
      "Input berisi satu kata nama, kemudian umur.",
      "Gunakan cin untuk membaca kedua data.",
      "Tampilkan umur dengan tambahan teks tahun."
    ],
    "hint": "Setelah mendeklarasikan variabel, gunakan cin >> nama >> umur; kemudian tampilkan nilainya dengan cout.",
    "tests": [
      {
        "label": "Data contoh",
        "input": "Alya 13",
        "expected": "Peserta: Alya\nUmur: 13 tahun"
      },
      {
        "label": "Nama dan umur berbeda",
        "input": "Rafi 14",
        "expected": "Peserta: Rafi\nUmur: 14 tahun",
        "hidden": true
      },
      {
        "label": "Peserta kelas 7",
        "input": "Dina 12",
        "expected": "Peserta: Dina\nUmur: 12 tahun",
        "hidden": true
      }
    ]
  },
  {
    "id": "kasir-kantin",
    "stage": 2,
    "title": "Kasir Kantin Sekolah",
    "category": "Variabel & Operator",
    "difficulty": "Easy",
    "xp": 80,
    "time": "12 min",
    "signature": "int main() — variabel dan operasi aritmetika",
    "description": "Di kantin, seorang siswa membeli beberapa roti. Program menerima harga satu roti, jumlah roti, dan uang pembayaran. Hitung total belanja serta uang kembaliannya. Gunakan variabel dan operator aritmetika.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int harga, jumlah, bayar;\n    cin >> harga >> jumlah >> bayar;\n    // TODO: hitung total dan kembalian\n    return 0;\n}",
    "examples": [
      {
        "input": "3000 2 10000",
        "output": "Total: 6000\nKembalian: 4000"
      }
    ],
    "constraints": [
      "Urutan input: harga, jumlah, uang bayar.",
      "Total dihitung dari harga dikali jumlah.",
      "Kembalian adalah uang bayar dikurangi total."
    ],
    "hint": "Simpan harga * jumlah ke variabel total, lalu hitung bayar - total.",
    "tests": [
      {
        "label": "Dua roti",
        "input": "3000 2 10000",
        "expected": "Total: 6000\nKembalian: 4000"
      },
      {
        "label": "Tiga roti",
        "input": "2500 3 10000",
        "expected": "Total: 7500\nKembalian: 2500",
        "hidden": true
      },
      {
        "label": "Pembayaran pas",
        "input": "4000 2 8000",
        "expected": "Total: 8000\nKembalian: 0",
        "hidden": true
      }
    ]
  },
  {
    "id": "rata-rata-ulangan",
    "stage": 2,
    "title": "Rata-rata Nilai Ulangan",
    "category": "Variabel & Operator",
    "difficulty": "Easy",
    "xp": 90,
    "time": "12 min",
    "signature": "int main() — tipe data numerik dan pembagian",
    "description": "Tiga nilai ulangan Informatika seorang siswa dimasukkan melalui input. Hitung nilai rata-ratanya. Gunakan tipe data <code>double</code> agar hasil pembagian dapat memiliki angka desimal.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    double a, b, c;\n    cin >> a >> b >> c;\n    // TODO: hitung dan tampilkan rata-rata\n    return 0;\n}",
    "examples": [
      {
        "input": "80 90 70",
        "output": "Rata-rata: 80"
      }
    ],
    "constraints": [
      "Urutan input adalah tiga nilai ulangan.",
      "Gunakan pembagian dengan 3.0.",
      "Tampilkan awalan Rata-rata:."
    ],
    "hint": "Jumlahkan ketiga nilai, kemudian bagi dengan 3.0.",
    "tests": [
      {
        "label": "Rata-rata bulat",
        "input": "80 90 70",
        "expected": "Rata-rata: 80"
      },
      {
        "label": "Rata-rata desimal",
        "input": "80 85 90",
        "expected": "Rata-rata: 85"
      },
      {
        "label": "Nilai rendah",
        "input": "60 70 80",
        "expected": "Rata-rata: 70",
        "hidden": true
      }
    ]
  },
  {
    "id": "cek-kelayakan-lomba",
    "stage": 3,
    "title": "Cek Kelayakan Lomba",
    "category": "Percabangan",
    "difficulty": "Easy",
    "xp": 100,
    "time": "12 min",
    "signature": "int main() — if dan else",
    "description": "Lomba robotik tingkat SMP dapat diikuti siswa yang berusia minimal 12 tahun. Baca umur peserta dan tampilkan apakah ia boleh mengikuti lomba. Gunakan percabangan <code>if</code> dan <code>else</code>.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int umur;\n    cin >> umur;\n    // TODO: jika umur minimal 12, tampilkan Boleh ikut\n    // selain itu tampilkan Belum memenuhi syarat\n    return 0;\n}",
    "examples": [
      {
        "input": "13",
        "output": "Boleh ikut"
      }
    ],
    "constraints": [
      "Umur minimal adalah 12 tahun.",
      "Umur 12 tahun sudah boleh mengikuti lomba.",
      "Gunakan if dan else."
    ],
    "hint": "Gunakan kondisi umur >= 12.",
    "tests": [
      {
        "label": "Umur 13",
        "input": "13",
        "expected": "Boleh ikut"
      },
      {
        "label": "Batas umur",
        "input": "12",
        "expected": "Boleh ikut",
        "hidden": true
      },
      {
        "label": "Umur 11",
        "input": "11",
        "expected": "Belum memenuhi syarat",
        "hidden": true
      }
    ]
  },
  {
    "id": "seleksi-robotik",
    "stage": 3,
    "title": "Seleksi Tim Robotik",
    "category": "Percabangan & Logika",
    "difficulty": "Medium",
    "xp": 110,
    "time": "15 min",
    "signature": "int main() — operator logika &&",
    "description": "Untuk masuk tim robotik, siswa harus berusia minimal 12 tahun dan sudah mendapat izin orang tua. Baca umur dan status izin (1 = ya, 0 = tidak). Gunakan operator logika <code>&&</code> untuk memeriksa kedua syarat.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int umur, izin;\n    cin >> umur >> izin;\n    // TODO: periksa apakah umur cukup DAN izin diberikan\n    return 0;\n}",
    "examples": [
      {
        "input": "13 1",
        "output": "Diterima"
      }
    ],
    "constraints": [
      "Input pertama adalah umur.",
      "Input kedua adalah izin orang tua: 1 atau 0.",
      "Kedua syarat harus terpenuhi."
    ],
    "hint": "Kondisi dapat ditulis umur >= 12 && izin == 1.",
    "tests": [
      {
        "label": "Umur dan izin terpenuhi",
        "input": "13 1",
        "expected": "Diterima"
      },
      {
        "label": "Umur cukup tanpa izin",
        "input": "13 0",
        "expected": "Belum diterima",
        "hidden": true
      },
      {
        "label": "Umur belum cukup",
        "input": "11 1",
        "expected": "Belum diterima",
        "hidden": true
      }
    ]
  },
  {
    "id": "menu-perpustakaan",
    "stage": 3,
    "title": "Menu Perpustakaan",
    "category": "Switch Case",
    "difficulty": "Medium",
    "xp": 120,
    "time": "15 min",
    "signature": "int main() — switch, case, break, default",
    "description": "Perpustakaan sekolah memiliki tiga menu: 1 untuk Pinjam Buku, 2 untuk Kembalikan Buku, dan 3 untuk Cari Buku. Baca nomor pilihan, lalu tampilkan menu yang sesuai menggunakan <code>switch-case</code>.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int pilihan;\n    cin >> pilihan;\n    // TODO: buat switch(pilihan), case 1, 2, 3, dan default\n    return 0;\n}",
    "examples": [
      {
        "input": "1",
        "output": "Pinjam Buku"
      }
    ],
    "constraints": [
      "Pilihan 1 menampilkan Pinjam Buku.",
      "Pilihan 2 menampilkan Kembalikan Buku.",
      "Pilihan 3 menampilkan Cari Buku.",
      "Pilihan lain menampilkan Menu tidak tersedia."
    ],
    "hint": "Gunakan switch(pilihan). Setiap case sebaiknya diakhiri break, lalu tangani pilihan lain dengan default.",
    "tests": [
      {
        "label": "Menu pinjam",
        "input": "1",
        "expected": "Pinjam Buku"
      },
      {
        "label": "Menu kembalikan",
        "input": "2",
        "expected": "Kembalikan Buku",
        "hidden": true
      },
      {
        "label": "Menu cari",
        "input": "3",
        "expected": "Cari Buku",
        "hidden": true
      },
      {
        "label": "Pilihan tidak tersedia",
        "input": "9",
        "expected": "Menu tidak tersedia",
        "hidden": true
      }
    ]
  },
  {
    "id": "target-tabungan",
    "stage": 4,
    "title": "Target Tabungan",
    "category": "Perulangan",
    "difficulty": "Medium",
    "xp": 130,
    "time": "15 min",
    "signature": "int main() — while dan akumulasi",
    "description": "Alya menabung Rp5.000 setiap hari. Buat program yang menghitung berapa hari yang diperlukan hingga tabungannya mencapai atau melewati target. Gunakan perulangan <code>while</code> dan variabel akumulasi.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int target;\n    cin >> target;\n    int tabungan = 0;\n    int hari = 0;\n    // TODO: gunakan while sampai tabungan mencapai target\n    cout << hari << \" hari\";\n    return 0;\n}",
    "examples": [
      {
        "input": "12000",
        "output": "3 hari"
      }
    ],
    "constraints": [
      "Tabungan bertambah Rp5.000 setiap hari.",
      "Jika target 0 atau kurang, hasilnya 0 hari.",
      "Gunakan while, bukan menulis jawaban langsung."
    ],
    "hint": "Selama tabungan < target, tambahkan 5000 ke tabungan dan tambahkan 1 ke hari.",
    "tests": [
      {
        "label": "Target 12.000",
        "input": "12000",
        "expected": "3 hari"
      },
      {
        "label": "Target 20.000",
        "input": "20000",
        "expected": "4 hari",
        "hidden": true
      },
      {
        "label": "Target nol",
        "input": "0",
        "expected": "0 hari",
        "hidden": true
      },
      {
        "label": "Target tepat",
        "input": "15000",
        "expected": "3 hari",
        "hidden": true
      }
    ]
  },
  {
    "id": "ulangi-kuis",
    "stage": 4,
    "title": "Ulangi Kuis Sampai Benar",
    "category": "Perulangan",
    "difficulty": "Medium",
    "xp": 140,
    "time": "18 min",
    "signature": "int main() — do-while",
    "description": "Dalam kuis, jawaban yang benar adalah angka 7. Program menerima beberapa jawaban sampai peserta memasukkan angka 7. Hitung berapa kali peserta mencoba. Gunakan <code>do-while</code> agar input pertama selalu dihitung.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int jawaban, percobaan = 0;\n    // TODO: baca jawaban minimal satu kali dengan do-while\n    cout << percobaan << \" percobaan\";\n    return 0;\n}",
    "examples": [
      {
        "input": "2 4 7",
        "output": "3 percobaan"
      }
    ],
    "constraints": [
      "Jawaban benar adalah 7.",
      "Input selalu menyediakan angka 7.",
      "Percobaan pertama harus ikut dihitung.",
      "Gunakan do-while."
    ],
    "hint": "Di dalam do, baca jawaban lalu tambah percobaan. Ulangi selama jawaban != 7.",
    "tests": [
      {
        "label": "Benar pada percobaan ketiga",
        "input": "2 4 7",
        "expected": "3 percobaan"
      },
      {
        "label": "Langsung benar",
        "input": "7",
        "expected": "1 percobaan",
        "hidden": true
      },
      {
        "label": "Benar pada percobaan keempat",
        "input": "1 2 3 7",
        "expected": "4 percobaan",
        "hidden": true
      }
    ]
  },
  {
    "id": "rekap-kehadiran",
    "stage": 4,
    "title": "Rekap Kehadiran Kelas",
    "category": "Perulangan",
    "difficulty": "Medium",
    "xp": 150,
    "time": "18 min",
    "signature": "int main() — for dan penjumlahan",
    "description": "Data kehadiran siswa ditulis sebagai angka: 1 berarti hadir dan 0 berarti tidak hadir. Baca jumlah siswa, lalu baca status kehadiran setiap siswa. Hitung jumlah siswa yang hadir menggunakan <code>for loop</code>.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int totalHadir = 0;\n    // TODO: gunakan for untuk membaca n data kehadiran\n    cout << \"Hadir: \" << totalHadir;\n    return 0;\n}",
    "examples": [
      {
        "input": "5\n1 0 1 1 0",
        "output": "Hadir: 3"
      }
    ],
    "constraints": [
      "Input pertama adalah jumlah siswa.",
      "Input berikutnya berisi n angka 1 atau 0.",
      "Gunakan for untuk membaca seluruh data."
    ],
    "hint": "Ulangi sebanyak n kali. Jika status yang dibaca bernilai 1, tambahkan totalHadir.",
    "tests": [
      {
        "label": "Lima siswa",
        "input": "5\n1 0 1 1 0",
        "expected": "Hadir: 3"
      },
      {
        "label": "Semua hadir",
        "input": "4\n1 1 1 1",
        "expected": "Hadir: 4",
        "hidden": true
      },
      {
        "label": "Tidak ada yang hadir",
        "input": "3\n0 0 0",
        "expected": "Hadir: 0",
        "hidden": true
      }
    ]
  },
  {
    "id": "denah-aula",
    "stage": 5,
    "title": "Denah Kursi Aula",
    "category": "Array & Pola",
    "difficulty": "Medium",
    "xp": 160,
    "time": "20 min",
    "signature": "int main() — nested for loop",
    "description": "Panitia ingin membuat denah kursi aula berbentuk kotak. Program membaca jumlah baris dan kolom, lalu menampilkan huruf O untuk setiap kursi. Gunakan <code>nested for loop</code> atau perulangan bersarang.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int baris, kolom;\n    cin >> baris >> kolom;\n    // TODO: gunakan for di dalam for untuk mencetak pola kursi\n    return 0;\n}",
    "examples": [
      {
        "input": "2 3",
        "output": "O O O\nO O O"
      }
    ],
    "constraints": [
      "Input pertama adalah jumlah baris, kedua jumlah kolom.",
      "Pisahkan kursi dengan satu spasi.",
      "Jangan memberi spasi setelah kursi terakhir pada setiap baris."
    ],
    "hint": "Loop luar mengatur baris, loop dalam mengatur kolom. Cetak baris baru setelah loop kolom selesai.",
    "tests": [
      {
        "label": "Denah 2 x 3",
        "input": "2 3",
        "expected": "O O O\nO O O"
      },
      {
        "label": "Denah 1 x 4",
        "input": "1 4",
        "expected": "O O O O",
        "hidden": true
      },
      {
        "label": "Denah 3 x 2",
        "input": "3 2",
        "expected": "O O\nO O\nO O",
        "hidden": true
      }
    ]
  },
  {
    "id": "nilai-tertinggi",
    "stage": 5,
    "title": "Cari Nilai Tertinggi",
    "category": "Array",
    "difficulty": "Medium",
    "xp": 170,
    "time": "20 min",
    "signature": "int main() — array dan perulangan",
    "description": "Guru ingin mengetahui nilai ulangan tertinggi di kelas. Program menerima jumlah siswa dan nilai setiap siswa. Simpan data ke dalam array, lalu cari nilai tertinggi menggunakan perulangan.",
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int nilai[100];\n    // TODO: baca nilai ke dalam array\n    // TODO: cari nilai tertinggi\n    return 0;\n}",
    "examples": [
      {
        "input": "5\n78 90 85 92 88",
        "output": "Nilai tertinggi: 92"
      }
    ],
    "constraints": [
      "Jumlah siswa minimal 1 dan maksimal 100.",
      "Gunakan array untuk menyimpan nilai.",
      "Jangan mengurutkan array."
    ],
    "hint": "Baca semua nilai ke array. Gunakan nilai[0] sebagai nilai tertinggi awal, lalu bandingkan dengan elemen berikutnya.",
    "tests": [
      {
        "label": "Nilai lima siswa",
        "input": "5\n78 90 85 92 88",
        "expected": "Nilai tertinggi: 92"
      },
      {
        "label": "Satu siswa",
        "input": "1\n67",
        "expected": "Nilai tertinggi: 67",
        "hidden": true
      },
      {
        "label": "Nilai pertama tertinggi",
        "input": "3\n100 80 70",
        "expected": "Nilai tertinggi: 100",
        "hidden": true
      }
    ]
  },
  {
    "id": "profil-nama-tim",
    "stage": 6,
    "title": "Profil Nama Tim",
    "category": "String & Method",
    "difficulty": "Medium",
    "xp": 180,
    "time": "18 min",
    "signature": "int main() — string, length(), dan at()",
    "description": "Panitia ingin menampilkan ringkasan nama tim. Bacalah satu nama tim, kemudian tampilkan panjang nama dan karakter pertamanya. Gunakan object <code>string</code> serta method <code>length()</code> dan <code>at()</code>.",
    "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nama;\n    cin >> nama;\n    // TODO: tampilkan panjang nama dan karakter pertama\n    return 0;\n}",
    "examples": [
      {
        "input": "RobotHebat",
        "output": "Panjang nama: 10\nHuruf pertama: R"
      }
    ],
    "constraints": [
      "Nama tim tidak mengandung spasi.",
      "Gunakan nama.length() untuk menghitung karakter.",
      "Gunakan nama.at(0) untuk karakter pertama."
    ],
    "hint": "Panjang string dapat diketahui dengan nama.length(). Karakter pertama memiliki indeks 0.",
    "tests": [
      {
        "label": "Nama RobotHebat",
        "input": "RobotHebat",
        "expected": "Panjang nama: 10\nHuruf pertama: R"
      },
      {
        "label": "Nama ICT",
        "input": "ICT",
        "expected": "Panjang nama: 3\nHuruf pertama: I",
        "hidden": true
      },
      {
        "label": "Nama pendek",
        "input": "Tim7",
        "expected": "Panjang nama: 4\nHuruf pertama: T",
        "hidden": true
      }
    ]
  },
  {
    "id": "hitung-bonus",
    "stage": 6,
    "title": "Hitung Bonus Tim",
    "category": "Fungsi & Scope",
    "difficulty": "Medium",
    "xp": 190,
    "time": "20 min",
    "signature": "int hitungPoin(int dasar, int bonus)",
    "description": "Tim memperoleh poin dasar dan poin bonus. Buat fungsi <code>hitungPoin()</code> yang menerima dua parameter dan mengembalikan jumlah keduanya. Panggil fungsi tersebut dari <code>main()</code>. Gunakan variabel lokal di dalam fungsi.",
    "starter": "#include <iostream>\nusing namespace std;\n// TODO: buat fungsi hitungPoin dengan dua parameter int\n\nint main() {\n    int dasar, bonus;\n    cin >> dasar >> bonus;\n    cout << \"Total poin: \" << hitungPoin(dasar, bonus);\n    return 0;\n}",
    "examples": [
      {
        "input": "100 25",
        "output": "Total poin: 125"
      }
    ],
    "constraints": [
      "Buat fungsi bernama hitungPoin.",
      "Fungsi menerima parameter dasar dan bonus.",
      "Gunakan return untuk mengembalikan hasil penjumlahan.",
      "Jangan menggunakan variabel global."
    ],
    "hint": "Buat fungsi bertipe int, lalu return dasar + bonus. main() memanggil fungsi tersebut.",
    "tests": [
      {
        "label": "Ada bonus",
        "input": "100 25",
        "expected": "Total poin: 125"
      },
      {
        "label": "Bonus kecil",
        "input": "50 10",
        "expected": "Total poin: 60",
        "hidden": true
      },
      {
        "label": "Bonus nol",
        "input": "80 0",
        "expected": "Total poin: 80",
        "hidden": true
      }
    ]
  },
  {
    "id": "final-rekap-nilai",
    "stage": 7,
    "title": "Final: Rekap Nilai Kelas",
    "category": "Final Challenge",
    "difficulty": "Hard",
    "xp": 300,
    "time": "30 min",
    "signature": "vector<string> rekapKelas(...) + int main()",
    "description": "Ini adalah tantangan akhir. Guru ingin membuat rekap sederhana untuk satu kelas. Baca nama dan nilai setiap siswa, tentukan statusnya, lalu tampilkan hasil rekap. Gabungkan fungsi, vector, string, perulangan, dan percabangan yang sudah dipelajari.",
    "starter": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\n// TODO: buat fungsi string statusNilai(int nilai)\n// Nilai 75 atau lebih: LULUS\n// Nilai di bawah 75: REMEDIAL\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> nama(n);\n    vector<int> nilai(n);\n    // TODO: baca nama dan nilai setiap siswa\n    // TODO: tampilkan Nama: STATUS untuk setiap siswa\n    return 0;\n}",
    "examples": [
      {
        "input": "3\nAlya 90\nRafi 70\nDina 80",
        "output": "Alya: LULUS\nRafi: REMEDIAL\nDina: LULUS"
      }
    ],
    "constraints": [
      "Jumlah siswa 1 sampai 30.",
      "Gunakan vector untuk menyimpan nama dan nilai.",
      "Buat fungsi statusNilai() yang mengembalikan string.",
      "Nilai minimal kelulusan adalah 75.",
      "Urutan hasil harus mengikuti urutan input."
    ],
    "hint": "Baca data menggunakan for. Buat fungsi yang memeriksa nilai dengan if-else. Setelah semua data dibaca, tampilkan nama dan hasil fungsi tersebut.",
    "tests": [
      {
        "label": "Tiga siswa",
        "input": "3\nAlya 90\nRafi 70\nDina 80",
        "expected": "Alya: LULUS\nRafi: REMEDIAL\nDina: LULUS"
      },
      {
        "label": "Nilai batas",
        "input": "2\nBudi 75\nSiti 74",
        "expected": "Budi: LULUS\nSiti: REMEDIAL",
        "hidden": true
      },
      {
        "label": "Seluruhnya lulus",
        "input": "3\nAli 90\nNina 88\nFajar 100",
        "expected": "Ali: LULUS\nNina: LULUS\nFajar: LULUS",
        "hidden": true
      }
    ]
  }
];

const $ = (selector) => document.querySelector(selector);
const state = loadProgress();
let activeChallenge = challenges.find(c => c.id === state.lastTaskId) || challenges[0];
let activeFilter = 'all';
let editor = null;
let compiler = null;
let compileBusy = false;
let lastResult = null;
let timerInterval = null;
let activeConsoleTab = 'output';
let cmEditor = null;
let EditorViewRef = null;
let editorEditableCompartment = null;
let sessionStarted = Boolean(Number(localStorage.getItem(START_KEY)));
let leftTabDuringActiveSession = false;
let breakState = loadBreakState();

function loadBreakState() {
  try {
    const saved = JSON.parse(localStorage.getItem(BREAK_KEY) || '{}');
    return {
      used: Math.max(0, Math.min(2, Number(saved.used) || 0)),
      active: Boolean(saved.active),
      pausedRemaining: Number.isFinite(Number(saved.pausedRemaining)) ? Math.max(0, Math.min(SESSION_SECONDS, Number(saved.pausedRemaining))) : null
    };
  } catch {
    return { used: 0, active: false, pausedRemaining: null };
  }
}

function saveBreakState() {
  localStorage.setItem(BREAK_KEY, JSON.stringify(breakState));
}

function requireSession() {
  if (!sessionStarted) {
    toast('Tekan Mulai Sesi terlebih dahulu untuk membuka tantangan.', 'bad');
    return false;
  }
  if (breakState.active) {
    toast('Kamu sedang istirahat. Akhiri istirahat untuk melanjutkan.', 'bad');
    return false;
  }
  return true;
}

function getRemainingSeconds() {
  if (breakState.active && breakState.pausedRemaining !== null) {
    return breakState.pausedRemaining;
  }
  const startedAt = Number(localStorage.getItem(START_KEY));
  if (!startedAt) return SESSION_SECONDS;
  return Math.max(0, SESSION_SECONDS - Math.floor((Date.now() - startedAt) / 1000));
}

function updateTimerDisplay() {
  const remaining = getRemainingSeconds();
  const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
  const secs = String(remaining % 60).padStart(2, '0');
  $('#timerDisplay').textContent = `${mins}:${secs}`;
  $('#timerDisplay').style.color = remaining === 0 ? 'var(--red)' : '';
}

function updateSessionLock() {
  const preStart = !sessionStarted;
  const onBreak = sessionStarted && breakState.active;
  const locked = preStart || onBreak;

  const startButton = $('#startTimerBtn');
  if (startButton) {
    startButton.textContent = preStart ? 'Mulai Sesi' : 'Sesi Aktif';
    startButton.disabled = !preStart;
  }

  const breakButton = $('#breakBtn');
  if (breakButton) {
    breakButton.hidden = preStart;
    breakButton.disabled = !onBreak && breakState.used >= 2;
    breakButton.textContent = onBreak ? '▶ Akhiri Istirahat' : '☕ Mulai Istirahat';
    breakButton.classList.toggle('is-resume', onBreak);
  }
  const breakCount = $('#breakCountChip');
  if (breakCount) {
    breakCount.hidden = preStart;
    breakCount.textContent = `Istirahat ${breakState.used}/2`;
    breakCount.classList.toggle('break-count-empty', breakState.used >= 2);
  }

  const editorInput = $('#codeFallback');
  if (editorInput) {
    editorInput.readOnly = locked;
    editorInput.setAttribute('aria-readonly', String(locked));
  }
  if (cmEditor && editorEditableCompartment && EditorViewRef) {
    cmEditor.dispatch({effects: editorEditableCompartment.reconfigure(EditorViewRef.editable.of(!locked))});
  }

  ['runBtn','submitBtn','resetCodeBtn','downloadCodeBtn','bookmarkBtn','copySignatureBtn','searchInput']
    .forEach(id => { const element = document.getElementById(id); if (element) element.disabled = locked; });
  document.querySelectorAll('[data-filter],[data-tab]').forEach(button => { button.disabled = locked; });

  const overlay = $('#sessionLockOverlay');
  if (overlay) {
    overlay.classList.toggle('hidden', !locked);
    const title = $('#sessionLockTitle');
    const message = $('#sessionLockMessage');
    const note = $('#sessionLockNote');
    if (title) title.textContent = onBreak ? 'Kamu sedang istirahat' : 'Sesi belum dimulai';
    if (message) message.textContent = onBreak
      ? 'Tantangan, navigasi soal, dan editor dikunci sementara. Klik Akhiri Istirahat untuk kembali mengerjakan.'
      : 'Soal pertama bisa kamu lihat terlebih dahulu. Editor dan tantangan lainnya akan terbuka setelah kamu menekan Mulai Sesi.';
    if (note) note.textContent = onBreak
      ? `Waktu kompetisi dijeda · Kesempatan istirahat terpakai ${breakState.used} dari 2`
      : 'Waktu hackathon mulai dihitung saat sesi dibuka.';
  }
  const editorHost = $('#editorHost');
  if (editorHost) editorHost.classList.toggle('session-locked', locked);
  const challengeList = $('#challengeList');
  if (challengeList) challengeList.classList.toggle('session-locked', locked);
  const editorStatus = $('#editorStatus');
  if (editorStatus) editorStatus.textContent = preStart
    ? 'Terkunci · Mulai sesi untuk coding'
    : onBreak ? 'Terkunci · Sedang istirahat' : 'All changes saved';
  renderChallengeList();
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { solved: Array.isArray(saved.solved) ? saved.solved : [], drafts: saved.drafts || {}, bookmarks: saved.bookmarks || [], attempts: saved.attempts || 0, xp: saved.xp || 0, lastTaskId: saved.lastTaskId || null };
  } catch { return { solved: [], drafts: {}, bookmarks: [], attempts: 0, xp: 0, lastTaskId: null }; }
}
function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function showClipboardWarning(message, title = 'Peringatan') {
  const modal = $('#clipboardWarningModal');
  if (!modal) {
    toast(message, 'bad');
    return;
  }
  const titleNode = $('#clipboardWarningTitle');
  const messageNode = $('#clipboardWarningMessage');
  if (titleNode) titleNode.textContent = title;
  if (messageNode) messageNode.textContent = message;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const acknowledge = $('#clipboardWarningAcknowledge');
  if (acknowledge) acknowledge.focus();
}

function isDeveloperToolsShortcut(event) {
  const key = String(event.key || '').toLowerCase();
  const ctrlOrMeta = event.ctrlKey || event.metaKey;
  const devtoolsCombo = (ctrlOrMeta && event.shiftKey && ['i', 'j', 'c', 'k'].includes(key))
    || (event.metaKey && event.altKey && ['i', 'j', 'c'].includes(key));
  const viewSourceCombo = (event.ctrlKey && key === 'u') || (event.metaKey && key === 'u');
  return event.key === 'F12' || devtoolsCombo || viewSourceCombo;
}

function showDeveloperToolsWarning() {
  showClipboardWarning(
    'Developer Tools dan View Source tidak diperbolehkan selama sesi hackathon. Silakan kembali mengerjakan tantangan.',
    'Akses Developer Tools Dibatasi'
  );
}

function showTabSwitchWarning() {
  showClipboardWarning(
    'Kami mendeteksi kamu meninggalkan tab C++ Hackathon. Tetap fokus pada soal dan jangan membuka browser atau AI selama sesi berlangsung.',
    'Peringatan Pindah Tab'
  );
}

function isScreenshotShortcut(event) {
  const key = String(event.key || '').toLowerCase();
  const printScreen = event.key === 'PrintScreen';
  // Some browsers may expose OS capture shortcuts to the page; many OS-level
  // shortcuts are intercepted before the browser receives a keyboard event.
  const systemCapture = event.metaKey && event.shiftKey && ['s', '3', '4', '5'].includes(key);
  const printCommand = (event.ctrlKey || event.metaKey) && key === 'p';
  return { printScreen, systemCapture, printCommand, blocked: printScreen || systemCapture || printCommand };
}

function showScreenshotWarning(kind) {
  if (kind === 'print') {
    showClipboardWarning(
      'Fitur cetak dinonaktifkan selama sesi hackathon. Soal dan materi tidak boleh disalin atau dibagikan.',
      'Pencetakan Dibatasi'
    );
    return;
  }
  showClipboardWarning(
    'Kami mendeteksi tombol atau shortcut screenshot. Jangan mengambil atau membagikan tangkapan layar soal selama hackathon.',
    'Screenshot Dilarang'
  );
}

function closeClipboardWarning() {
  const modal = $('#clipboardWarningModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  const editor = $('#codeFallback');
  if (cmEditor && !breakState.active && sessionStarted) cmEditor.focus();
  else if (editor && !editor.readOnly) editor.focus();
}

function toast(message, kind = '') {
  const el = document.createElement('div'); el.className = `toast ${kind}`; el.textContent = message; $('#toastRegion').append(el); setTimeout(() => el.remove(), 3400);
}
function setConsole(tab) {
  activeConsoleTab = tab;
  document.querySelectorAll('[data-console-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.consoleTab === tab));
  $('#outputView').classList.toggle('hidden', tab !== 'output');
  $('#testsView').classList.toggle('hidden', tab !== 'tests');
}
function updateProgress() {
  const count = state.solved.length; const percent = Math.round(count / challenges.length * 100);
  $('#solvedCount').textContent = count; $('#challengeTotal').textContent = challenges.length; $('#xpTotal').textContent = state.xp; $('#progressPercent').textContent = `${percent}%`; $('#progressBar').style.width = `${percent}%`;
  $('#progressPercent').title = `${state.xp} XP terkumpul`;
}
function renderChallengeList() {
  const query = $('#searchInput').value.trim().toLowerCase();
  const locked = !sessionStarted || breakState.active;
  const visible = challenges.filter(ch => (activeFilter === 'all' || String(ch.stage) === activeFilter) && `${ch.title} ${ch.category} tahap ${ch.stage}`.toLowerCase().includes(query));
  $('#challengeList').innerHTML = visible.map(ch => `
    <button class="challenge-item ${ch.id === activeChallenge.id ? 'active' : ''} ${locked ? 'locked' : ''}" data-challenge="${ch.id}" ${locked ? 'disabled aria-disabled="true"' : ''}>
      <span class="challenge-number">${String(challenges.indexOf(ch)+1).padStart(2,'0')}</span>
      <span class="challenge-name">${escapeHTML(ch.title)}</span>
      <span class="challenge-xp">${ch.xp}</span>
      <span class="challenge-check">${locked ? '🔒' : (state.solved.includes(ch.id) ? '✓' : '')}</span>
    </button>`).join('') || '<div class="empty-console"><div><strong>Challenge tidak ditemukan</strong><p>Coba kata kunci lain.</p></div></div>';
  $('#challengeCount').textContent = String(visible.length).padStart(2,'0');
  document.querySelectorAll('[data-challenge]').forEach(btn => btn.addEventListener('click', () => selectChallenge(btn.dataset.challenge)));
}
function renderChallenge() {
  const ch = activeChallenge;
  $('#problemNumber').textContent = String(challenges.indexOf(ch)+1).padStart(2,'0');
  $('#problemStage').textContent = `TAHAP ${ch.stage} · ${ch.category.toUpperCase()}`;
  $('#problemTitle').textContent = ch.title;
  $('#problemDifficulty').textContent = ch.difficulty.toUpperCase();
  $('#problemDifficulty').className = `difficulty ${ch.difficulty.toLowerCase()}`;
  $('#problemXP').textContent = ch.xp;
  $('#problemTime').textContent = ch.time;
  $('#problemDescription').innerHTML = ch.description;
  $('#functionSignature').textContent = ch.signature;
  $('#examples').innerHTML = ch.examples.map((ex,i) => `<div class="example-card"><div class="example-label">EXAMPLE ${i+1}</div><div class="example-io"><div class="io-cell"><small>INPUT</small><code>${escapeHTML(ex.input)}</code></div><div class="io-cell"><small>OUTPUT</small><code>${escapeHTML(ex.output)}</code></div></div></div>`).join('');
  $('#constraintsList').innerHTML = ch.constraints.map(item => `<li>${escapeHTML(item)}</li>`).join('');
  $('#hintText').textContent = ch.hint;
  const solved = state.solved.includes(ch.id);
  $('#solvedBadge').classList.toggle('hidden', !solved);
  $('#bookmarkBtn').classList.toggle('bookmarked', state.bookmarks.includes(ch.id));
  $('#bookmarkBtn').textContent = state.bookmarks.includes(ch.id) ? '◆' : '◇';
  const draft = state.drafts[ch.id] || ch.starter;
  setCode(draft);
  updateCursorInfo();
  renderChallengeList(); updateProgress();
  clearConsole();
}
function selectChallenge(id) {
  if (!requireSession()) return;
  const next = challenges.find(ch => ch.id === id); if (!next) return;
  state.drafts[activeChallenge.id] = getCode();
  activeChallenge = next; state.lastTaskId = id; saveProgress(); renderChallenge();
  document.querySelectorAll('[data-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === 'description'));
  $('#descriptionTab').classList.remove('hidden'); $('#hintsTab').classList.add('hidden');
}
function updateCursorInfo() {
  const text = cmEditor ? cmEditor.state.doc.toString() : ($('#codeFallback')?.value || '');
  const position = cmEditor
    ? cmEditor.state.selection.main.head
    : ($('#codeFallback')?.selectionStart || 0);
  const before = text.slice(0, position);
  const line = before.split('\n').length;
  const lastNewline = before.lastIndexOf('\n');
  const column = position - lastNewline;
  const totalLines = text.split('\n').length;
  if ($('#lineCount')) $('#lineCount').textContent = String(line);
  if ($('#columnCount')) $('#columnCount').textContent = String(column);
  if ($('#totalLines')) $('#totalLines').textContent = String(totalLines);
}

function notifyTextareaChange(input) {
  input.dispatchEvent(new Event('input', { bubbles: true }));
  updateCursorInfo();
}

function indentTextareaSelection(input, outdent = false) {
  const value = input.value;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const lineStart = value.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
  const lastSelectedPosition = end > start ? end - 1 : start;
  let lineEnd = value.indexOf('\n', lastSelectedPosition);
  if (lineEnd < 0) lineEnd = value.length;

  const selectedLines = value.slice(lineStart, lineEnd).split('\n');
  const indentSizes = selectedLines.map(line => {
    if (!outdent) return 0;
    if (line.startsWith('\t')) return 1;
    const spaces = line.match(/^ {1,4}/);
    return spaces ? spaces[0].length : 0;
  });
  const changedLines = selectedLines.map((line, index) => {
    if (!outdent) return '    ' + line;
    return line.slice(indentSizes[index]);
  });

  if (outdent && indentSizes.every(size => size === 0)) return;
  input.setRangeText(changedLines.join('\n'), lineStart, lineEnd, 'select');
  const firstDelta = outdent ? -indentSizes[0] : 4;
  const totalDelta = outdent ? -indentSizes.reduce((sum, size) => sum + size, 0) : 4 * selectedLines.length;
  input.selectionStart = Math.max(lineStart, start + firstDelta);
  input.selectionEnd = Math.max(input.selectionStart, end + totalDelta);
  notifyTextareaChange(input);
}

function toggleTextareaComment(input) {
  const value = input.value;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const lineStart = value.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
  const lastSelectedPosition = end > start ? end - 1 : start;
  let lineEnd = value.indexOf('\n', lastSelectedPosition);
  if (lineEnd < 0) lineEnd = value.length;
  const lines = value.slice(lineStart, lineEnd).split('\n');
  const allCommented = lines.every(line => /^\s*\/\//.test(line));
  const changed = lines.map(line => allCommented
    ? line.replace(/^(\s*)\/\/ ?/, '$1')
    : line.replace(/^(\s*)/, '$1// '));
  const prefixDelta = changed[0].length - lines[0].length;
  const totalDelta = changed.reduce((sum, line, index) => sum + line.length - lines[index].length, 0);
  input.setRangeText(changed.join('\n'), lineStart, lineEnd, 'select');
  input.selectionStart = Math.max(lineStart, start + prefixDelta);
  input.selectionEnd = Math.max(input.selectionStart, end + totalDelta);
  notifyTextareaChange(input);
}

function handleFallbackEditorKeydown(event, input) {
  if (input.readOnly) return;
  const value = input.value;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
    event.preventDefault();
    persistDraft();
    toast('Kode tersimpan otomatis.', 'good');
    return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key === '/') {
    event.preventDefault();
    toggleTextareaComment(input);
    return;
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    indentTextareaSelection(input, event.shiftKey);
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    const lineStart = value.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
    const lineBefore = value.slice(lineStart, start);
    const indentation = (lineBefore.match(/^\s*/) || [''])[0];
    if (value[start - 1] === '{' && value[start] === '}') {
      const innerIndent = indentation + '    ';
      input.setRangeText('\n' + innerIndent + '\n' + indentation, start, end, 'end');
      input.selectionStart = input.selectionEnd = start + 1 + innerIndent.length;
    } else {
      const extraIndent = lineBefore.trimEnd().endsWith('{') ? '    ' : '';
      input.setRangeText('\n' + indentation + extraIndent, start, end, 'end');
    }
    notifyTextareaChange(input);
    return;
  }
  if (event.key === 'Backspace' && start === end && start > 0) {
    const opener = value[start - 1];
    if (pairs[opener] && value[start] === pairs[opener]) {
      event.preventDefault();
      input.setRangeText('', start - 1, start + 1, 'end');
      notifyTextareaChange(input);
      return;
    }
  }
  if (event.key.length === 1 && pairs[event.key]) {
    const closer = pairs[event.key];
    if (start === end && value[start] === closer) {
      event.preventDefault();
      input.selectionStart = input.selectionEnd = start + 1;
      updateCursorInfo();
      return;
    }
    event.preventDefault();
    const selected = value.slice(start, end);
    input.setRangeText(event.key + selected + closer, start, end, 'end');
    input.selectionStart = start + 1;
    input.selectionEnd = start + 1 + selected.length;
    notifyTextareaChange(input);
  }
}

async function enhanceWithCodeMirror(input, hasEdited) {
  try {
    const modules = await Promise.all([
      import('codemirror'),
      import('@codemirror/lang-cpp'),
      import('@codemirror/theme-one-dark'),
      import('@codemirror/commands'),
      import('@codemirror/state')
    ]);
    if (hasEdited()) return;

    const { basicSetup, EditorView } = modules[0];
    const { cpp } = modules[1];
    const { oneDark } = modules[2];
    const { indentMore, indentLess, toggleComment } = modules[3];
    const { Compartment } = modules[4];
    const host = $('#editorHost');
    const overlay = $('#sessionLockOverlay');
    const initialText = input.value;

    EditorViewRef = EditorView;
    editorEditableCompartment = new Compartment();
    cmEditor = new EditorView({
      doc: initialText,
      parent: host,
      extensions: [
        basicSetup,
        cpp(),
        oneDark,
        editorEditableCompartment.of(EditorView.editable.of(sessionStarted && !breakState.active)),
        EditorView.domEventHandlers({
          keydown(event, view) {
            if (event.key === 'Tab') {
              event.preventDefault();
              if (event.shiftKey) indentLess(view);
              else indentMore(view);
              return true;
            }
            if ((event.ctrlKey || event.metaKey) && event.key === '/') {
              event.preventDefault();
              toggleComment(view);
              return true;
            }
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
              event.preventDefault();
              persistDraft();
              toast('Kode tersimpan otomatis.', 'good');
              return true;
            }
            return false;
          }
        }),
        EditorView.theme({
          '&': { height: '100%', fontSize: '12px', backgroundColor: '#0b121c' },
          '.cm-scroller': { overflow: 'auto', fontFamily: 'DM Mono, Consolas, monospace' },
          '.cm-content': { padding: '12px 0' },
          '.cm-line': { padding: '0 12px' },
          '.cm-gutters': { backgroundColor: '#0b121c', borderRight: '1px solid #1c2a3b', color: '#53667c' },
          '.cm-activeLine': { backgroundColor: 'rgba(114,153,128,.08)' },
          '.cm-activeLineGutter': { backgroundColor: 'rgba(114,153,128,.08)' }
        }),
        EditorView.updateListener.of(update => {
          if (update.docChanged) persistDraft();
          if (update.docChanged || update.selectionSet) updateCursorInfo();
        })
      ]
    });
    if (overlay) host.insertBefore(cmEditor.dom, overlay);
    input.remove();
    updateSessionLock();
    updateCursorInfo();
    $('#editorStatus').textContent = 'Editor siap · C++';
  } catch (error) {
    console.warn('CodeMirror gagal dimuat; editor teks tetap aktif.', error);
    const status = $('#editorStatus');
    if (status) status.textContent = 'Editor dasar siap · Tab dan shortcut aktif';
  }
}

function isClipboardShortcut(event) {
  const key = String(event.key || '').toLowerCase();
  const modifier = event.ctrlKey || event.metaKey;
  return (modifier && ['c', 'v', 'x'].includes(key))
    || (event.shiftKey && key === 'insert')
    || (event.ctrlKey && key === 'insert');
}

function installEditorClipboardGuards() {
  const host = $('#editorHost');
  if (!host || host.dataset.clipboardGuard === 'installed') return;
  host.dataset.clipboardGuard = 'installed';

  host.addEventListener('keydown', event => {
    if (!isClipboardShortcut(event)) return;
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    showClipboardWarning('Copy, cut, dan paste dinonaktifkan selama hackathon. Ketik kode secara mandiri.', 'bad');
  }, true);

  ['copy', 'cut', 'paste'].forEach(type => {
    host.addEventListener(type, event => {
      event.preventDefault();
      event.stopPropagation();
      if (type === 'paste') {
        showClipboardWarning('Paste dinonaktifkan. Silakan ketik kode secara mandiri.', 'bad');
      }
    }, true);
  });

  host.addEventListener('beforeinput', event => {
    if (event.inputType === 'insertFromPaste' || event.inputType === 'insertFromDrop') {
      event.preventDefault();
      event.stopPropagation();
      showClipboardWarning('Memasukkan kode melalui clipboard atau drop dinonaktifkan.', 'bad');
    }
  }, true);

  host.addEventListener('contextmenu', event => {
    event.preventDefault();
    event.stopPropagation();
    showClipboardWarning('Menu klik-kanan dinonaktifkan pada editor selama hackathon.', 'bad');
  }, true);

  ['dragover', 'drop'].forEach(type => {
    host.addEventListener(type, event => {
      event.preventDefault();
      event.stopPropagation();
      if (type === 'drop') showClipboardWarning('Drag-and-drop kode dinonaktifkan selama hackathon.', 'bad');
    }, true);
  });
}

function getCode() {
  return cmEditor ? cmEditor.state.doc.toString() : ($('#codeFallback')?.value || '');
}
function setCode(text) {
  const nextValue = String(text ?? '');
  if (cmEditor) {
    cmEditor.dispatch({changes:{from:0,to:cmEditor.state.doc.length,insert:nextValue}});
  } else {
    const input = $('#codeFallback');
    if (input) input.value = nextValue;
  }
  updateCursorInfo();
}
function persistDraft() {
  state.drafts[activeChallenge.id] = getCode();
  state.lastTaskId = activeChallenge.id;
  saveProgress();
  if ($('#editorStatus')) $('#editorStatus').textContent = 'All changes saved';
}
function initEditor() {
  installEditorClipboardGuards();
  const input = $('#codeFallback');
  input.value = state.drafts[activeChallenge.id] || activeChallenge.starter;
  input.readOnly = !sessionStarted || breakState.active;
  let editedBeforeEnhancement = false;
  input.addEventListener('input', () => {
    editedBeforeEnhancement = true;
    if (!requireSession()) return;
    persistDraft();
    updateCursorInfo();
  });
  input.addEventListener('keydown', event => handleFallbackEditorKeydown(event, input));
  ['click','keyup','select'].forEach(type => input.addEventListener(type, updateCursorInfo));
  updateCursorInfo();
  $('#editorStatus').textContent = 'Editor teks siap';
  enhanceWithCodeMirror(input, () => editedBeforeEnhancement);
}
function clearConsole() {
  $('#outputView').innerHTML = '<div class="empty-console"><span class="terminal-glyph">›_</span><div><strong>Output terminal</strong><p>Jalankan kode untuk melihat hasil kompilasi dan output program.</p></div></div>';
  $('#testsView').innerHTML = '<div class="empty-console"><span class="terminal-glyph">✓</span><div><strong>Belum ada hasil test</strong><p>Tekan Run Code atau Submit untuk mulai menguji solusi.</p></div></div>';
  $('#testResultCount').textContent = '—'; $('#runDuration').textContent=''; lastResult=null;
}
function showOutput(text, kind='') {
  $('#outputView').innerHTML = `<pre class="console-output ${kind}">${escapeHTML(text)}</pre>`;
  setConsole('output');
}
function renderTestResults(result, tests, mode) {
  const allPassed = result.passed === result.total && result.total > 0;
  $('#testResultCount').textContent = `${result.passed}/${result.total}`;
  $('#testsView').innerHTML = `
    <div class="result-summary ${allPassed?'pass':'fail'}"><div class="result-score">${result.passed}/${result.total}</div><div><strong>${allPassed?'Semua test berhasil':'Masih ada test yang gagal'}</strong><br><small>${mode==='submit'?'SUBMISSION TEST':'SAMPLE TEST'} · ${result.total} TEST CASE</small></div></div>
    ${tests.map((test,i)=>{const item=result.cases.find(c=>c.index===i);const ok=item?.status==='PASS';return `<div class="test-row"><div class="case-left"><span class="case-status ${ok?'pass':'fail'}">${ok?'✓':'×'}</span><span>${escapeHTML(test.hidden?'Hidden test':test.label)}</span></div><small>${ok?'PASSED':'FAILED'}</small></div>`;}).join('')}
    ${result.extra?`<pre class="console-output muted" style="margin-top:10px">${escapeHTML(result.extra)}</pre>`:''}`;
  setConsole('tests');
  return allPassed;
}
function showLoading(title, message) { $('#loadingTitle').textContent=title; $('#loadingMessage').textContent=message; $('#loadingProgress').style.width='12%'; $('#loadingOverlay').classList.remove('hidden'); }
function updateLoading(title,message,percent) { $('#loadingTitle').textContent=title; $('#loadingMessage').textContent=message; $('#loadingProgress').style.width=`${percent}%`; }
function hideLoading() { $('#loadingOverlay').classList.add('hidden'); }
function runChallenge(mode) {
  if (!requireSession() || compileBusy) return;
  const code = getCode();
  if (!code.trim()) { toast('Editor masih kosong. Tulis program terlebih dahulu.','bad'); return; }
  if (!/\bmain\s*\(/.test(code)) {
    toast('Program harus memiliki fungsi main(). Ikuti kerangka kode pada editor.','bad');
    return;
  }

  compileBusy = true;
  $('#runBtn').disabled = true;
  $('#submitBtn').disabled = true;
  $('#runBtn').innerHTML = '<span>◌</span> Compiling...';
  $('#submitBtn').textContent = 'Checking...';
  const tests = mode === 'submit' ? activeChallenge.tests : activeChallenge.tests.filter(test => !test.hidden);
  const started = performance.now();
  state.attempts++;
  saveProgress();

  const worker = new Worker(new URL('./compiler-worker.js', import.meta.url), { type: 'module' });
  let settled = false;
  const watchdog = setTimeout(() => {
    if (settled) return;
    settled = true;
    showOutput('TIME LIMIT EXCEEDED\n\nProgram berjalan terlalu lama. Periksa kemungkinan infinite loop.', 'error');
    $('#testResultCount').textContent = 'TLE';
    toast('Batas waktu eksekusi terlampaui.', 'bad');
    finish();
  }, 90000);

  function finish() {
    clearTimeout(watchdog);
    worker.terminate();
    compileBusy = false;
    $('#runBtn').disabled = false;
    $('#submitBtn').disabled = false;
    $('#runBtn').innerHTML = '<span>▶</span> Run Code';
    $('#submitBtn').innerHTML = '<span>✓</span> Submit <span class="submit-arrow">↗</span>';
    persistDraft();
  }

  worker.onmessage = event => {
    const data = event.data || {};
    if (data.type === 'status') {
      showOutput('> ' + (data.message || 'Memproses compiler…'), 'muted');
      return;
    }
    if (data.type === 'test-case-start') {
      $('#runDuration').textContent = 'Test ' + (data.index + 1) + '/' + data.total;
      return;
    }
    if (data.type === 'result' && !data.ok) {
      if (settled) return;
      settled = true;
      showOutput('COMPILATION ERROR\n\n' + (data.compileOutput || data.error || 'Kompilasi gagal.'), 'error');
      $('#testResultCount').textContent = 'CE';
      toast('Periksa kembali kode C++ kamu.', 'bad');
      finish();
      return;
    }
    if (data.type === 'challenge-result') {
      if (settled) return;
      settled = true;
      const results = data.tests || [];
      const result = {
        passed: results.filter(item => item.passed).length,
        total: results.length,
        cases: results.map(item => ({index:item.index,status:item.passed?'PASS':'FAIL'})),
        extra: results.filter(item => item.runtimeError || item.stderr)
          .map(item => item.runtimeError || item.stderr).join('\n')
      };
      const allPassed = renderTestResults(result, tests, mode);
      const duration = Math.round(performance.now() - started);
      $('#runDuration').textContent = duration + ' ms';
      const visibleOutput = results.filter((item,index) => !tests[index]?.hidden)
        .map((item,index) => item.actual ? item.actual : '')
        .filter(Boolean).join('\n');
      showOutput(
        (data.compileOutput ? '> Compile berhasil.\n' + data.compileOutput + '\n\n' : '') +
        (visibleOutput || 'Program selesai. Lihat hasil test untuk detail penilaian.'),
        allPassed ? 'success' : ''
      );

      if (mode === 'submit' && allPassed) {
        const isNew = !state.solved.includes(activeChallenge.id);
        if (isNew) {
          state.solved.push(activeChallenge.id);
          state.xp += activeChallenge.xp;
          saveProgress();
          updateProgress();
          renderChallengeList();
          $('#solvedBadge').classList.remove('hidden');
        }
        toast(isNew ? 'Accepted! +' + activeChallenge.xp + ' XP' : 'Accepted! Challenge sudah pernah diselesaikan.', 'good');
      } else if (allPassed) {
        toast('Contoh test berhasil. Lanjutkan Submit untuk test berikutnya.', 'good');
      } else {
        toast('Belum lolos semua test. Periksa kembali programmu.', 'bad');
      }
      finish();
    }
  };

  worker.onerror = event => {
    if (settled) return;
    settled = true;
    showOutput('COMPILER WORKER ERROR\n\n' + (event.message || 'Worker gagal dimuat.') + '\nPeriksa koneksi ke CDN compiler.', 'error');
    $('#testResultCount').textContent = 'ERR';
    toast('Compiler worker gagal dijalankan.', 'bad');
    finish();
  };

  try {
    startTimer();
    showOutput('> Mengirim program ke compiler WebAssembly…\n> Clang C++20 sedang disiapkan.', 'muted');
    worker.postMessage({ source: code, testCases: tests, standard: 'c++20' });
  } catch (error) {
    if (!settled) {
      settled = true;
      showOutput('EXECUTION ERROR\n\n' + (error?.message || error), 'error');
      finish();
    }
  }
}
function startTimer() {
  let startedAt = Number(localStorage.getItem(START_KEY));
  if (!startedAt) {
    startedAt = Date.now();
    localStorage.setItem(START_KEY, String(startedAt));
  }
  sessionStarted = true;
  updateSessionLock();
  if (breakState.active) {
    updateTimerDisplay();
    return;
  }
  if (timerInterval) return;

  $('#startTimerBtn').textContent = 'Sesi Aktif';
  $('#startTimerBtn').disabled = true;
  const tick = () => {
    updateTimerDisplay();
    if (getRemainingSeconds() <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      toast('Waktu sesi hackathon telah habis.');
    }
  };
  tick();
  if (getRemainingSeconds() > 0) timerInterval = setInterval(tick, 1000);
}

function startBreak() {
  if (!requireSession()) return;
  if (compileBusy) {
    toast('Tunggu proses kompilasi selesai sebelum istirahat.', 'bad');
    return;
  }
  if (breakState.used >= 2) {
    toast('Dua kesempatan istirahat sudah digunakan.', 'bad');
    return;
  }
  const remaining = getRemainingSeconds();
  if (remaining <= 0) {
    toast('Waktu kompetisi sudah habis. Istirahat tidak dapat dimulai.', 'bad');
    return;
  }

  breakState.used += 1;
  breakState.active = true;
  breakState.pausedRemaining = remaining;
  saveBreakState();

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  updateTimerDisplay();
  updateSessionLock();
  toast(`Istirahat dimulai. Kesempatan tersisa: ${2 - breakState.used}.`, 'good');
}

function endBreak() {
  if (!sessionStarted || !breakState.active) return;
  const remaining = breakState.pausedRemaining ?? getRemainingSeconds();
  const elapsedSeconds = SESSION_SECONDS - remaining;
  localStorage.setItem(START_KEY, String(Date.now() - elapsedSeconds * 1000));
  breakState.active = false;
  breakState.pausedRemaining = null;
  saveBreakState();

  updateSessionLock();
  startTimer();
  toast('Istirahat selesai. Waktu kompetisi dilanjutkan.', 'good');
}

function toggleBreak() {
  if (breakState.active) endBreak();
  else startBreak();
}
function bindEvents() {
  $('#clipboardWarningAcknowledge')?.addEventListener('click', closeClipboardWarning);
  $('#clipboardWarningModal')?.addEventListener('click', event => {
    if (event.target === $('#clipboardWarningModal')) closeClipboardWarning();
  });

  // Best-effort deterrent for screenshot and print shortcuts during an active session.
  // The operating system may intercept its own capture shortcuts before the page can see them.
  document.addEventListener('keydown', event => {
    if (!sessionStarted) return;
    const shortcut = isScreenshotShortcut(event);
    if (!shortcut.blocked) return;
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    showScreenshotWarning(shortcut.printCommand ? 'print' : 'screenshot');
  }, true);

  // Discourage common browser DevTools / View Source shortcuts during the active session.
  // This is a client-side deterrent, not a security boundary.
  document.addEventListener('keydown', event => {
    if (!INSPECT_RESTRICTIONS_ENABLED || !sessionStarted || breakState.active) return;
    if (!isDeveloperToolsShortcut(event)) return;
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    showDeveloperToolsWarning();
  }, true);

  // Disable the browser context menu while the hackathon session is active.
  document.addEventListener('contextmenu', event => {
    if (!INSPECT_RESTRICTIONS_ENABLED || !sessionStarted || breakState.active) return;
    event.preventDefault();
    event.stopPropagation();
    showDeveloperToolsWarning();
  }, true);

  // Page Visibility API: warn only after the participant returns to the tab.
  // This is a warning-only feature; it does not add violation points or penalties.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (sessionStarted && !breakState.active) {
        leftTabDuringActiveSession = true;
      }
      return;
    }

    if (leftTabDuringActiveSession) {
      leftTabDuringActiveSession = false;
      if (sessionStarted && !breakState.active) {
        showTabSwitchWarning();
      }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('#clipboardWarningModal')?.classList.contains('hidden')) {
      event.preventDefault();
      closeClipboardWarning();
    }
  });
  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!requireSession())return;
    activeFilter=btn.dataset.filter; document.querySelectorAll('[data-filter]').forEach(item=>item.classList.toggle('active',item===btn)); renderChallengeList();
  }));
  $('#searchInput').addEventListener('input',()=>{if(!requireSession())return;renderChallengeList();});
  $('#searchInput').addEventListener('keydown',event=>{if(event.key==='Escape'){$('#searchInput').value='';renderChallengeList();}});
  document.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    const tab=btn.dataset.tab; document.querySelectorAll('[data-tab]').forEach(item=>item.classList.toggle('active',item===btn));
    $('#descriptionTab').classList.toggle('hidden',tab!=='description'); $('#hintsTab').classList.toggle('hidden',tab!=='hints');
  }));
  document.querySelectorAll('[data-console-tab]').forEach(btn=>btn.addEventListener('click',()=>setConsole(btn.dataset.consoleTab)));
  $('#runBtn').addEventListener('click',()=>runChallenge('run'));
  $('#submitBtn').addEventListener('click',()=>runChallenge('submit'));
  $('#startTimerBtn').addEventListener('click',startTimer);
  $('#breakBtn').addEventListener('click',toggleBreak);
  $('#resetCodeBtn').addEventListener('click',()=>{if(!requireSession())return;setCode(activeChallenge.starter);persistDraft();toast('Kode dikembalikan ke template awal.');});
  $('#bookmarkBtn').addEventListener('click',()=>{
    if(!requireSession())return;
    const index=state.bookmarks.indexOf(activeChallenge.id);if(index>=0)state.bookmarks.splice(index,1);else state.bookmarks.push(activeChallenge.id);saveProgress();renderChallenge();
  });
  $('#clearOutputBtn').addEventListener('click',clearConsole);
  document.addEventListener('keydown',event=>{
    if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();runChallenge('run');}
    if(event.key==='/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.closest('.cm-content')){event.preventDefault();$('#searchInput').focus();}
  });
}

function init() {
  initEditor();
  bindEvents();
  updateSessionLock();
  renderChallenge();
  if(sessionStarted) {
    if (breakState.active) updateTimerDisplay();
    else startTimer();
  }
}
init();
