# Sistem E-Peperiksaan UTHM (UTHM E-Examination System)
### Prototaip Demonstrasi & Rantaian Jagaan Dokumen Peperiksaan Bertaraf SULIT
**Universiti Tun Hussein Onn Malaysia (UTHM)**  
*Pejabat Pengurusan Akademik (PPA) & Pusat Pengajian Siswazah (CGS)*

---

## 🎯 Ringkasan & Objektif Demonstrasi

Aplikasi web ini direka khusus bagi sesi pembentangan (pitch) kepada pihak pengurusan tertinggi UTHM. Sistem ini memperagakan pengurusan dokumen peperiksaan akhir bertaraf **SULIT (Aras 3)** di bawah **Akta Rahsia Rasmi 1972** dengan pematuhan keselamatan penuh, pengesanan rantaian jagaan (*Chain of Custody*), dan integrasi merentas empat peranan utama universiti.

Skema warna korporat UTHM digunakan sepenuhnya:
- **UTHM Royal Navy Blue (`#002B7F` / `#071E3D`)**
- **UTHM Crimson Red (`#C8102E`)**
- **Aksen Emas Akademik (`#D4AF37`)**

---

## 🚀 Cara Menjalankan Aplikasi

1. **Cara Pantas:**
   - Dwiklik fail `start-demo.bat`, atau
   - Buka fail `index.html` secara terus dalam mana-mana pelayar web moden (Google Chrome, Microsoft Edge, Firefox, Safari).
2. Sistem beroperasi secara mandiri (*standalone*), sedia luar talian (*offline-ready*), tanpa memerlukan sebarang arahan `npm install` atau pelayan backend luaran.

---

## 🔄 Panduan Skrip Pembentangan (Pitch Walkthrough)

Tukar peranan pengguna pada bila-bila masa menggunakan **Penukar Peranan (Role Switcher)** di bahagian atas bar navigasi:

```
[ Pensyarah ] ➔ [ Panel Vetting ] ➔ [ Ketua Jabatan ] ➔ [ PPA / CGS ]
```

### 1. Modul Pembangunan dan Penyediaan Dokumen (Pandangan Pensyarah)
* **Persona:** Dr. Ahmad Syahir bin Ramli (Pensyarah Kanan, FSKTM)
* **Elemen Penting Ditunjukkan:**
  * **Sepanduk Keselamatan (Security Banner):** Menegaskan *"Ruang Kerja Sulit: Akses cetakan dan muat turun dilarang"* mengikut Akta Rahsia Rasmi 1972 dan perlindungan DRM/tera air.
  * **Jadual Kursus Pensyarah:** Menyenaraikan kursus dengan lencana status berwarna:
    * `Draf` (Kelabu)
    * `Menunggu Semakan` (Kuning/Amber)
    * `Lulus` (Hijau)
    * `Lulus Bersyarat` (Biru)
    * `Tolak (Perlu Pindaan)` (Merah)
  * **Pengurusan 3 Dokumen Wajib per Kursus:**
    1. Kertas Soalan Peperiksaan Akhir
    2. Table of Specification (TOS / Jadual Spesifikasi Ujian - JSU)
    3. Skema Jawapan & Panduan Pemarkahan Analitik
  * **Tindakan Interaktif:**
    * Klik butang **"Lampiran"** untuk membuka laci muat naik dengan simulasi peratusan muat naik, imbasan antivirus, dan penjanaan cincangan SHA-256.
    * Klik butang **"Pratonton"** untuk melihat paparan soalan peperiksaan bertera air digital khas (*watermark* dinamik).
    * Klik butang **"Hantar Vetting"** untuk memajukan kertas soalan kepada panel penilai.

---

### 2. Modul Vetting (Pandangan Panel Vetting)
* **Persona:** Prof. Madya Dr. Noraini binti Yusof (Pengerusi Panel Vetting FSKTM)
* **Elemen Penting Ditunjukkan:**
  * **Antaramuka Semakan Dokumen:** Senarai kertas soalan yang memerlukan kelulusan fakulti.
  * **Tab Pemeriksaan Bersepadu:** Memaparkan Kertas Soalan, Jadual Spesifikasi Ujian (TOS), dan Skema Jawapan secara sebelah-menyebelah (*side-by-side*).
  * **Senarai Semak Kualiti PPA/VET-01:** Pemetaan Aras Taksonomi Bloom (C1-C6), keselarasan CLO/PLO, dan kadar keaslian soalan.
  * **Panel Tindakan & Ulasan Wajib:**
    * Butang **"Lulus"** (Hijau)
    * Butang **"Lulus Bersyarat"** (Kuning/Amber)
    * Butang **"Tolak (Pindaan)"** (Merah)
    * Kotak teks maklum balas vetting yang wajib diisi sebelum pengesahan.
  * **Jejak Audit Digital (Audit Trail) Visual:** Panel sisi yang merekodkan cap masa milisaat, ID pengguna, alamat IP/VLAN, dan cincangan kriptografi bagi setiap tindakan.

---

### 3. Modul Pemantauan dan Penghantaran (Pandangan Ketua Jabatan / Fakulti)
* **Persona:** Prof. Ir. Ts. Dr. Zulkifli bin Hashim (Ketua Jabatan Kejuruteraan Perisian)
* **Elemen Penting Ditunjukkan:**
  * **Papan Pemuka Eksekutif (KPI Cards):**
    * *Jumlah Kursus*
    * *Sedang Disemak (Under Review)*
    * *Sedia Dihantar (Ready for Physical Dispatch)*
    * *Disimpan di Bilik Kebal (Secured in Vault)*
  * **Senarai Kertas Peperiksaan Diluluskan:** Menyenaraikan kertas peperiksaan yang telah selesai proses vetting dan sedia untuk penghantaran fizikal.
  * **Butang "Jana Borang & Kod QR":**
    * Menjana **Kod QR Kriptografi Dinamik** yang mengandungi data rantaian jagaan.
    * Memaparkan **Borang Penyerahan Dokumen Peperiksaan Bertaraf SULIT (UTHM/PPA/01)** lengkap dengan nombor siri penjejakan, nombor meterai keselamatan (*tamper-evident seal*), dan ruang tandatangan tiga peringkat.
    * Menyokong butang **"Cetak Borang"** yang dioptimumkan untuk cetakan kertas/PDF rasmi (*print CSS*).

---

### 4. Modul Semakan Penerimaan Dokumen (Pandangan PPA / CGS)
* **Persona:** En. Khairul Azman bin Mahmud (Pegawai Peperiksaan Kanan Bilik Kebal PPA)
* **Elemen Penting Ditunjukkan:**
  * **Pengimbas Kod QR Simulasi:**
    * Bingkai pemidang kamera berteknologi tinggi dengan garis laser pengimbas hijau yang bergerak turun dan naik (*laser scan line animation*).
    * Penunjuk sasaran sudut (*target corners*) dan status resolusi sensor optik.
  * **Medan Input Manual (Document ID Fallback):** Ruang sandaran untuk memasukkan nombor siri dokumen (cth: `UTHM/PPA/2026/S1-BIC20403-QR772`) berserta butang pilihan demo pantas.
  * **Butang "Simulasi Imbas":**
    * Menghasilkan kesan audio bip pengimbas (*synthesized Web Audio API sound effect*).
    * Mengesahkan ketulenan kriptografi dokumen dalam masa nyata.
  * **Keadaan Kejayaan (Success State):**
    * Paparan sepanduk utama:  
      **"Rantaian Jagaan Lengkap: Dokumen fizikal diterima di bilik kebal"**
    * Memaparkan lokasi peti keselamatan bilik kebal (cth: *LOKER-A04-RAK3*), nombor meterai keselamatan, dan pegawai penerima.
    * Menghasilkan **Pemberitahuan Toast Segera** yang menunjukkan bahawa notifikasi amaran automatik telah dipancarkan kepada Dekan Fakulti dan Pensyarah Penggubal.
  * **Jadual Inventori Bilik Kebal:** Menyenaraikan dokumen fizikal yang telah selamat disimpan dan dikunci dalam bilik kebal.

---

## 🛡️ Ciri-ciri Keselamatan Utama yang Diterapkan

1. **Digital Watermarking:** Latar belakang dan paparan pratonton dilengkapi tera air digital dinamik mengandungi nama pengguna, cap masa, dan rujukan Akta Rahsia Rasmi 1972.
2. **Kesan Audio Realistik:** Dilengkapi pensintesis Web Audio API (bip pengimbas kod bar, nada pengesahan bilik kebal) tanpa memerlukan fail MP3 luaran.
3. **Penyelarasan Kitaran Hayat Penuh:** Sebarang tindakan dalam Modul 1 mengalir secara lancar ke Modul 2, 3, dan 4 untuk demonstrasi langsung yang meyakinkan panel penilai.

---
*Dibangunkan untuk Universiti Tun Hussein Onn Malaysia (UTHM) • Pejabat Pengurusan Akademik (PPA)*
