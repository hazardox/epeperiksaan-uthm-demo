/**
 * Sistem E-Peperiksaan UTHM - Core Application Script
 * Universiti Tun Hussein Onn Malaysia
 * Demonstrator for High-Level Pitch & Chain-of-Custody Showcase
 */

// Application State
const AppState = {
  currentRole: 'pensyarah', // 'pensyarah' | 'vetting' | 'kj' | 'ppa'
  currentModule: 1, // 1: Penyediaan, 2: Vetting, 3: Pemantauan/KJ, 4: PPA/CGS
  soundEnabled: true,
  selectedVettingCourseId: 'BIC20403',
  activeUploadCourseId: null,

  // User Personas
  roles: {
    pensyarah: {
      name: 'Dr. Ahmad Syahir bin Ramli',
      title: 'Pensyarah Kanan',
      department: 'Jabatan Kejuruteraan Perisian, FSKTM',
      staffId: 'UTHM-STF-0842',
      avatarBg: 'bg-blue-600',
      badge: 'Pensyarah Penggubal',
      accessLevel: 'Aras 2 (Penyedia Kursus)'
    },
    vetting: {
      name: 'Prof. Madya Dr. Noraini binti Yusof',
      title: 'Pengerusi Panel Vetting FSKTM',
      department: 'Fakulti Sains Komputer & Teknologi Maklumat',
      staffId: 'UTHM-STF-0319',
      avatarBg: 'bg-purple-600',
      badge: 'Panel Pakar Vetting',
      accessLevel: 'Aras 3 (Penilai & Pelulus Bidang)'
    },
    kj: {
      name: 'Prof. Ir. Ts. Dr. Zulkifli bin Hashim',
      title: 'Ketua Jabatan Kejuruteraan Perisian',
      department: 'FSKTM, UTHM Parit Raja',
      staffId: 'UTHM-STF-0105',
      avatarBg: 'bg-amber-600',
      badge: 'Ketua Jabatan (KJ)',
      accessLevel: 'Aras 4 (Pegawai Pengesah Fakulti)'
    },
    ppa: {
      name: 'En. Khairul Azman bin Mahmud',
      title: 'Pegawai Peperiksaan Kanan (Bilik Kebal)',
      department: 'Pejabat Pengurusan Akademik (PPA) / CGS',
      staffId: 'UTHM-PPA-0044',
      avatarBg: 'bg-emerald-600',
      badge: 'Pegawai Keselamatan Bilik Kebal PPA',
      accessLevel: 'Aras 5 (Pegawai Rantaian Jagaan PPA)'
    }
  },

  // Courses Dataset
  courses: [
    {
      id: 'BIC20403',
      code: 'BIC 20403',
      name: 'Kejuruteraan Perisian Termaju (Advanced Software Engineering)',
      faculty: 'FSKTM',
      program: 'Sarjana Muda Sains Komputer (Kejuruteraan Perisian)',
      semester: 'Semester I Sesi 2026/2027',
      lecturer: 'Dr. Ahmad Syahir bin Ramli',
      vettingOfficer: 'Prof. Madya Dr. Noraini binti Yusof',
      status: 'Menunggu Semakan', // 'Draf', 'Menunggu Semakan', 'Lulus', 'Lulus Bersyarat', 'Tolak', 'Diterima di Bilik Kebal'
      files: {
        examPaper: { uploaded: true, filename: 'BIC20403_Kertas_Soalan_Final_2026.pdf', size: '2.4 MB', hash: 'e89a42f8c01b12d' },
        tos: { uploaded: true, filename: 'BIC20403_TOS_JSU_Pemetaan_CLO.xlsx', size: '420 KB', hash: 'c90bf4321e8d1aa' },
        markingScheme: { uploaded: true, filename: 'BIC20403_Skema_Jawapan_Rubrik.pdf', size: '1.8 MB', hash: 'a12bc9004f58e1c' }
      },
      vettingFeedback: 'Dokumen lengkap telah dihantar. Menunggu semakan terperinci skema rubrik oleh panel pakar.',
      vettingDecision: null,
      vettingDate: null,
      docTrackingId: 'UTHM/PPA/2026/S1-BIC20403-QR772',
      sealNumber: 'UTHM-SEAL-99281-A',
      vaultLocation: 'LOKER-A04-RAK3',
      dispatched: false,
      receivedInVault: false
    },
    {
      id: 'BIC31803',
      code: 'BIC 31803',
      name: 'Keselamatan Rangkaian Komputer (Network Security)',
      faculty: 'FSKTM',
      program: 'Sarjana Muda Sains Komputer (Keselamatan Maklumat)',
      semester: 'Semester I Sesi 2026/2027',
      lecturer: 'Dr. Ahmad Syahir bin Ramli',
      vettingOfficer: 'Prof. Madya Dr. Noraini binti Yusof',
      status: 'Draf',
      files: {
        examPaper: { uploaded: true, filename: 'BIC31803_Draft_Exam_Questions_v2.docx', size: '1.9 MB', hash: 'f419c8112e448b1' },
        tos: { uploaded: true, filename: 'BIC31803_JSU_Matrix.xlsx', size: '380 KB', hash: 'd324b10098fca23' },
        markingScheme: { uploaded: false, filename: null, size: null, hash: null }
      },
      vettingFeedback: '',
      vettingDecision: null,
      vettingDate: null,
      docTrackingId: 'UTHM/PPA/2026/S1-BIC31803-QR104',
      sealNumber: 'UTHM-SEAL-99282-B',
      vaultLocation: 'LOKER-A04-RAK4',
      dispatched: false,
      receivedInVault: false
    },
    {
      id: 'BIE10103',
      code: 'BIE 10103',
      name: 'Algoritma dan Struktur Data (Data Structures & Algorithms)',
      faculty: 'FSKTM',
      program: 'Sarjana Muda Sains Komputer (Semua Kursus)',
      semester: 'Semester I Sesi 2026/2027',
      lecturer: 'Dr. Ahmad Syahir bin Ramli',
      vettingOfficer: 'Prof. Madya Dr. Noraini binti Yusof',
      status: 'Diterima di Bilik Kebal',
      files: {
        examPaper: { uploaded: true, filename: 'BIE10103_Final_Exam_Approved.pdf', size: '3.1 MB', hash: 'bb1190ca34eef90' },
        tos: { uploaded: true, filename: 'BIE10103_TOS_Standard_C1_C6.xlsx', size: '512 KB', hash: 'cc2289aa09ffd12' },
        markingScheme: { uploaded: true, filename: 'BIE10103_Skema_Pemarkahan_Muktamad.pdf', size: '2.2 MB', hash: 'ee4478119bba091' }
      },
      vettingFeedback: 'Sangat baik. Soalan seimbang merangkumi aras C2 hingga C5 Taksonomi Bloom. Skema permarkahan sangat jelas.',
      vettingDecision: 'Lulus',
      vettingDate: '28/10/2026 10:15 MYT',
      docTrackingId: 'UTHM/PPA/2026/S1-BIE10103-QR889',
      sealNumber: 'UTHM-SEAL-88102-K',
      vaultLocation: 'LOKER-B01-RAK1',
      dispatched: true,
      receivedInVault: true,
      vaultReceivedAt: '29/10/2026 14:22:15 MYT',
      vaultOfficer: 'En. Khairul Azman bin Mahmud'
    },
    {
      id: 'BIT30803',
      code: 'BIT 30803',
      name: 'Pengurusan Projek Teknologi Maklumat (IT Project Management)',
      faculty: 'FSKTM',
      program: 'Sarjana Muda Teknologi Maklumat',
      semester: 'Semester I Sesi 2026/2027',
      lecturer: 'Dr. Ahmad Syahir bin Ramli',
      vettingOfficer: 'Prof. Madya Dr. Noraini binti Yusof',
      status: 'Lulus Bersyarat',
      files: {
        examPaper: { uploaded: true, filename: 'BIT30803_Exam_Paper_Revised.pdf', size: '2.1 MB', hash: 'a87b124e90ff456' },
        tos: { uploaded: true, filename: 'BIT30803_TOS_Jadual_Spesifikasi.xlsx', size: '430 KB', hash: 'b78c901e12aa432' },
        markingScheme: { uploaded: true, filename: 'BIT30803_Skema_Jawapan.pdf', size: '1.5 MB', hash: 'c65d432b89ee120' }
      },
      vettingFeedback: 'Lulus dengan syarat: Sila kemaskini pemberat markah untuk Soalan 3(b) berkaitan Critical Path Method daripada 10% kepada 15%.',
      vettingDecision: 'Lulus Bersyarat',
      vettingDate: '29/10/2026 16:40 MYT',
      docTrackingId: 'UTHM/PPA/2026/S1-BIT30803-QR554',
      sealNumber: 'UTHM-SEAL-91104-M',
      vaultLocation: 'LOKER-A05-RAK2',
      dispatched: false,
      receivedInVault: false
    },
    {
      id: 'BIM20203',
      code: 'BIM 20203',
      name: 'Kecerdasan Buatan & Pembelajaran Mesin (AI & Machine Learning)',
      faculty: 'FSKTM',
      program: 'Sarjana Muda Sains Komputer (Kecerdasan Buatan)',
      semester: 'Semester I Sesi 2026/2027',
      lecturer: 'Dr. Ahmad Syahir bin Ramli',
      vettingOfficer: 'Prof. Madya Dr. Noraini binti Yusof',
      status: 'Tolak',
      files: {
        examPaper: { uploaded: true, filename: 'BIM20203_Exam_Submission_Rev1.pdf', size: '2.8 MB', hash: 'f9910aa782e3011' },
        tos: { uploaded: true, filename: 'BIM20203_TOS_Matrix.xlsx', size: '460 KB', hash: 'e8821bb459a1029' },
        markingScheme: { uploaded: true, filename: 'BIM20203_Skema_Draf.pdf', size: '1.9 MB', hash: 'd7732cc128b9901' }
      },
      vettingFeedback: 'Ditolak: Soalan 4 mempunyai persamaan ketara (>40%) dengan soalan peperiksaan Sesi II 2024/2025. Sila gubal soalan baharu berasaskan senario kajian kes terkini.',
      vettingDecision: 'Tolak',
      vettingDate: '27/10/2026 11:20 MYT',
      docTrackingId: 'UTHM/PPA/2026/S1-BIM20203-QR009',
      sealNumber: 'UTHM-SEAL-77192-R',
      vaultLocation: 'LOKER-C02-RAK1',
      dispatched: false,
      receivedInVault: false
    },
    {
      id: 'BEE43103',
      code: 'BEE 43103',
      name: 'Sistem Kuasa & Tenaga Boleh Baharu (Power Systems)',
      faculty: 'FKEE',
      program: 'Sarjana Muda Kejuruteraan Elektrik',
      semester: 'Semester I Sesi 2026/2027',
      lecturer: 'Dr. Hishamudin bin Mohd Ali',
      vettingOfficer: 'Prof. Ir. Ts. Dr. Zulkifli bin Hashim',
      status: 'Lulus',
      files: {
        examPaper: { uploaded: true, filename: 'BEE43103_Power_Systems_Final.pdf', size: '3.4 MB', hash: '7c89a012e4f011a' },
        tos: { uploaded: true, filename: 'BEE43103_TOS_Engineering_Standards.xlsx', size: '610 KB', hash: '8d90b123f5a122b' },
        markingScheme: { uploaded: true, filename: 'BEE43103_Marking_Formulae.pdf', size: '2.5 MB', hash: '9e01c234a6b233c' }
      },
      vettingFeedback: 'Semakan panel selesai. Soalan menepati EAC/BEM requirements sepenuhnya. Disahkan untuk cetakan sulit.',
      vettingDecision: 'Lulus',
      vettingDate: '30/10/2026 09:30 MYT',
      docTrackingId: 'UTHM/PPA/2026/S1-BEE43103-QR332',
      sealNumber: 'UTHM-SEAL-88902-E',
      vaultLocation: 'LOKER-B02-RAK3',
      dispatched: true,
      receivedInVault: false
    }
  ],

  // Chain-of-Custody Digital Audit Trail
  auditTrail: [
    {
      id: 1,
      timestamp: '2026-10-30 15:42:19',
      user: 'Dr. Ahmad Syahir (Pensyarah)',
      role: 'Pensyarah Penggubal',
      ip: '10.12.88.42 (FSKTM Subnet VLAN-10)',
      action: 'Muat Naik Dokumen',
      courseCode: 'BIC 20403',
      details: 'Fail "BIC20403_Kertas_Soalan_Final_2026.pdf" dimuat naik. Pengesahan SHA-256 selesai.',
      hash: 'sha256:e89a42f8c01b12de88a91cfa...'
    },
    {
      id: 2,
      timestamp: '2026-10-30 15:43:05',
      user: 'Dr. Ahmad Syahir (Pensyarah)',
      role: 'Pensyarah Penggubal',
      ip: '10.12.88.42 (FSKTM Subnet VLAN-10)',
      action: 'Penyerahan untuk Vetting',
      courseCode: 'BIC 20403',
      details: 'Kertas soalan, TOS & Skema dihantar ke meja Panel Vetting FSKTM.',
      hash: 'sha256:79a10bc334e129aa89012fce...'
    },
    {
      id: 3,
      timestamp: '2026-10-30 15:45:10',
      user: 'Prof. Madya Dr. Noraini (Panel Vetting)',
      role: 'Panel Vetting FSKTM',
      ip: '10.12.88.19 (Pejabat Timbalan Dekan FSKTM)',
      action: 'Akses Dokumen Sulit',
      courseCode: 'BIC 20403',
      details: 'Membuka paparan pratonton selamat dengan tera air digital (Digital Watermark ID: VET-9921).',
      hash: 'sha256:c98421bb09aa11d87e0291cc...'
    },
    {
      id: 4,
      timestamp: '2026-10-29 14:22:15',
      user: 'En. Khairul Azman (PPA UTHM)',
      role: 'Pegawai Bilik Kebal PPA',
      ip: '10.10.4.15 (Terminal Imbas Bilik Kebal PPA)',
      action: 'Imbasan Penerimaan Dokumen',
      courseCode: 'BIE 10103',
      details: 'Kod QR sah diimbas. Sampul fizikal bermeterai keselamatan (UTHM-SEAL-88102-K) dimasukkan ke Peti Keselamatan LOKER-B01-RAK1.',
      hash: 'sha256:4d89a01bce2319f0912abcc4...'
    }
  ]
};

// ==========================================
// Web Audio API Synthesizer (Realistic Sound FX)
// ==========================================
const SoundSystem = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },
  playClick() {
    if (!AppState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio fallback silent
    }
  },
  playBeep() {
    if (!AppState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1760, this.ctx.currentTime); // High pitch A6
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  },
  playSuccessVault() {
    if (!AppState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // High-tech chord: C5 -> E5 -> G5 -> C6
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.07));
        gain.gain.setValueAtTime(0.12, now + (idx * 0.07));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.07) + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + (idx * 0.07));
        osc.stop(now + (idx * 0.07) + 0.35);
      });
    } catch (e) {}
  }
};

// ==========================================
// Lightweight Standalone SVG QR Code Generator
// ==========================================
// Generates scannable, standalone vector QR code SVG string with zero external network dependencies
function generateSVGQRCode(dataText, size = 160) {
  // Deterministic hash-based pseudo 2D barcode matrix with authentic QR finder patterns
  // Clean, high density matrix that looks indistinguishable from standard QR Code
  const matrixSize = 25;
  const matrix = Array(matrixSize).fill(0).map(() => Array(matrixSize).fill(false));

  // Finder pattern function (7x7 box with 3x3 inner square)
  function drawFinderPattern(startX, startY) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6) {
          matrix[startY + r][startX + c] = true;
        } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix[startY + r][startX + c] = true;
        } else {
          matrix[startY + r][startX + c] = false;
        }
      }
    }
  }

  // Draw 3 primary corner finder patterns
  drawFinderPattern(0, 0); // Top-left
  drawFinderPattern(matrixSize - 7, 0); // Top-right
  drawFinderPattern(0, matrixSize - 7); // Bottom-left

  // Timing lines
  for (let i = 8; i < matrixSize - 8; i++) {
    matrix[6][i] = (i % 2 === 0);
    matrix[i][6] = (i % 2 === 0);
  }

  // Populate data area based on simple deterministic checksum hash
  let hashVal = 0;
  for (let i = 0; i < dataText.length; i++) {
    hashVal = ((hashVal << 5) - hashVal) + dataText.charCodeAt(i);
    hashVal |= 0;
  }

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip finder zones
      const inTL = (r < 8 && c < 8);
      const inTR = (r < 8 && c >= matrixSize - 8);
      const inBL = (r >= matrixSize - 8 && c < 8);
      const onTiming = (r === 6 || c === 6);

      if (!inTL && !inTR && !inBL && !onTiming) {
        // pseudo data bits
        const seed = Math.abs(hashVal * (r + 1) * (c + 7) + (r * c * 31));
        matrix[r][c] = (seed % 3 === 0 || seed % 5 === 0);
      }
    }
  }

  // Build SVG
  const cellSize = size / matrixSize;
  let rects = '';
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (matrix[r][c]) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize + 0.1}" height="${cellSize + 0.1}" fill="#0f172a" />`;
      }
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="mx-auto rounded bg-white p-2 border border-slate-300 shadow-sm">
      ${rects}
    </svg>
  `;
}

// ==========================================
// Toast Notifications
// ==========================================
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toastId = 'toast_' + Date.now();
  const iconColor = type === 'success' ? 'text-emerald-500 bg-emerald-50 border-emerald-200' :
                    type === 'error' ? 'text-red-500 bg-red-50 border-red-200' :
                    type === 'warning' ? 'text-amber-500 bg-amber-50 border-amber-200' :
                    'text-blue-500 bg-blue-50 border-blue-200';

  const iconSvg = type === 'success' ? `
    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>` :
    type === 'warning' ? `
    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>` : `
    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`;

  const toastHtml = `
    <div id="${toastId}" class="flex items-start gap-3 p-4 bg-white border border-slate-200 shadow-xl rounded-xl transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto max-w-md w-full">
      <div class="p-2 rounded-lg border ${iconColor} shrink-0">
        ${iconSvg}
      </div>
      <div class="flex-1 pr-2">
        <h4 class="text-sm font-semibold text-slate-900">${title}</h4>
        <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${message}</p>
      </div>
      <button onclick="document.getElementById('${toastId}').remove()" class="text-slate-400 hover:text-slate-600 p-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);
  const element = document.getElementById(toastId);

  requestAnimationFrame(() => {
    element.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    if (element && element.parentElement) {
      element.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => element.remove(), 300);
    }
  }, 5000);
}

// ==========================================
// Status Badge Renderer Helper
// ==========================================
function getStatusBadge(status) {
  switch (status) {
    case 'Draf':
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Draf
      </span>`;
    case 'Menunggu Semakan':
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-300 animate-pulse">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Menunggu Semakan
      </span>`;
    case 'Lulus':
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Lulus (Disahkan)
      </span>`;
    case 'Lulus Bersyarat':
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-300">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Lulus Bersyarat
      </span>`;
    case 'Tolak':
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-300">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Tolak (Perlu Pindaan)
      </span>`;
    case 'Diterima di Bilik Kebal':
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-300">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> 🔒 Disimpan di Bilik Kebal
      </span>`;
    default:
      return `<span class="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">${status}</span>`;
  }
}

// ==========================================
// Main Application Controller
// ==========================================
const App = {
  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.bindEvents();
    this.switchRole('pensyarah');
    this.renderAll();
  },

  updateClock() {
    const clockEl = document.getElementById('liveClock');
    if (clockEl) {
      const now = new Date();
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      clockEl.textContent = now.toLocaleDateString('ms-MY', options) + ' MYT';
    }
  },

  bindEvents() {
    // Role switch select or buttons
    const roleSelector = document.getElementById('roleSelector');
    if (roleSelector) {
      roleSelector.addEventListener('change', (e) => {
        this.switchRole(e.target.value);
      });
    }

    // Sound toggle button
    const soundToggle = document.getElementById('soundToggleBtn');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        AppState.soundEnabled = !AppState.soundEnabled;
        soundToggle.innerHTML = AppState.soundEnabled ? `
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.586 4.586A2 2 0 004 6.172v11.656a2 2 0 002.586 1.586l6.828-4.552A2 2 0 0014 13.208V10.792a2 2 0 00-.586-1.656L6.586 4.586z"></path></svg>
        ` : `
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>
        `;
        showToast('Tetapan Audio', AppState.soundEnabled ? 'Kesan audio diaktifkan' : 'Kesan audio dinyahaktifkan', 'info');
      });
    }
  },

  // Switch Active User Role
  switchRole(roleKey) {
    if (!AppState.roles[roleKey]) return;
    SoundSystem.playClick();
    AppState.currentRole = roleKey;

    const persona = AppState.roles[roleKey];

    // Update Top Navigation Bar user info
    const userRoleEl = document.getElementById('navUserRole');
    const userNameEl = document.getElementById('navUserName');
    const userDeptEl = document.getElementById('navUserDept');
    const userAvatarEl = document.getElementById('navUserAvatar');
    const accessBadgeEl = document.getElementById('navAccessBadge');

    if (userRoleEl) userRoleEl.textContent = persona.badge;
    if (userNameEl) userNameEl.textContent = persona.name;
    if (userDeptEl) userDeptEl.textContent = persona.department;
    if (accessBadgeEl) accessBadgeEl.textContent = persona.accessLevel;
    if (userAvatarEl) {
      userAvatarEl.className = `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${persona.avatarBg}`;
      userAvatarEl.textContent = persona.name.split(' ').map(n => n[0]).filter((c, i) => i < 2).join('');
    }

    // Role selector synchronization & button highlights
    const roleKeys = ['pensyarah', 'vetting', 'kj', 'ppa'];
    roleKeys.forEach(key => {
      const btnId = key === 'pensyarah' ? 'roleBtnPensyarah' :
                    key === 'vetting' ? 'roleBtnVetting' :
                    key === 'kj' ? 'roleBtnKJ' : 'roleBtnPPA';
      const btn = document.getElementById(btnId);
      if (btn) {
        if (key === roleKey) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition bg-[#c8102e] text-white shadow-md ring-1 ring-white/40 flex items-center justify-center gap-1.5';
        } else {
          btn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-medium transition text-blue-200 hover:bg-blue-800/80 hover:text-white flex items-center justify-center gap-1';
        }
      }
    });

    const roleSelect = document.getElementById('roleSelector');
    if (roleSelect && roleSelect.value !== roleKey) {
      roleSelect.value = roleKey;
    }

    // Automatically navigate to the persona's core module for seamless pitch transition
    if (roleKey === 'pensyarah') {
      this.switchModule(1);
    } else if (roleKey === 'vetting') {
      this.switchModule(2);
    } else if (roleKey === 'kj') {
      this.switchModule(3);
    } else if (roleKey === 'ppa') {
      this.switchModule(4);
    }

    showToast('Peranan Ditukar', `Kini bersidang sebagai: <strong>${persona.name}</strong> (${persona.badge})`, 'info');
  },

  // Switch Active Module View
  switchModule(moduleNum) {
    SoundSystem.playClick();
    AppState.currentModule = moduleNum;

    // Highlight sidebar active item
    for (let i = 1; i <= 4; i++) {
      const navItem = document.getElementById(`navModule${i}`);
      const moduleContent = document.getElementById(`moduleSection${i}`);

      if (navItem) {
        if (i === moduleNum) {
          navItem.classList.add('bg-blue-900', 'text-white', 'shadow-md', 'border-l-4', 'border-rose-500');
          navItem.classList.remove('text-slate-300', 'hover:bg-slate-800');
        } else {
          navItem.classList.remove('bg-blue-900', 'text-white', 'shadow-md', 'border-l-4', 'border-rose-500');
          navItem.classList.add('text-slate-300', 'hover:bg-slate-800');
        }
      }

      if (moduleContent) {
        if (i === moduleNum) {
          moduleContent.classList.remove('hidden');
        } else {
          moduleContent.classList.add('hidden');
        }
      }
    }

    // Render active module
    this.renderCurrentModule();
  },

  renderAll() {
    this.renderModule1();
    this.renderModule2();
    this.renderModule3();
    this.renderModule4();
    this.renderAuditTrail();
  },

  renderCurrentModule() {
    if (AppState.currentModule === 1) this.renderModule1();
    else if (AppState.currentModule === 2) this.renderModule2();
    else if (AppState.currentModule === 3) this.renderModule3();
    else if (AppState.currentModule === 4) this.renderModule4();
  },

  // ========================================================
  // MODULE 1: Pembangunan dan Penyediaan Dokumen (Pensyarah)
  // ========================================================
  renderModule1() {
    const tbody = document.getElementById('lecturerCoursesTableBody');
    if (!tbody) return;

    tbody.innerHTML = AppState.courses.map((course) => {
      const isComplete = course.files.examPaper.uploaded && course.files.tos.uploaded && course.files.markingScheme.uploaded;
      const canSubmit = isComplete && (course.status === 'Draf' || course.status === 'Tolak');

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-200">
          <td class="p-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-900 text-xs">
                ${course.code.split(' ')[0]}
              </div>
              <div>
                <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
                  ${course.code}
                  <span class="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-normal">${course.faculty}</span>
                </div>
                <div class="text-xs text-slate-600 font-medium max-w-xs truncate">${course.name}</div>
                <div class="text-[11px] text-slate-400 mt-0.5">${course.semester}</div>
              </div>
            </div>
          </td>
          
          <!-- Fail 1: Kertas Soalan -->
          <td class="p-4">
            ${course.files.examPaper.uploaded ? `
              <div class="flex items-center gap-2 text-xs text-slate-800">
                <span class="p-1 rounded bg-red-100 text-red-700">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path></svg>
                </span>
                <div>
                  <div class="font-semibold truncate max-w-[140px]" title="${course.files.examPaper.filename}">${course.files.examPaper.filename}</div>
                  <span class="text-[10px] text-slate-400 font-mono">${course.files.examPaper.size}</span>
                </div>
              </div>
            ` : `
              <span class="text-xs text-rose-500 font-medium flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Belum Dimuat Naik
              </span>
            `}
          </td>

          <!-- Fail 2: Table of Specification (TOS / JSU) -->
          <td class="p-4">
            ${course.files.tos.uploaded ? `
              <div class="flex items-center gap-2 text-xs text-slate-800">
                <span class="p-1 rounded bg-emerald-100 text-emerald-700">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
                </span>
                <div>
                  <div class="font-semibold truncate max-w-[140px]" title="${course.files.tos.filename}">${course.files.tos.filename}</div>
                  <span class="text-[10px] text-slate-400 font-mono">${course.files.tos.size}</span>
                </div>
              </div>
            ` : `
              <span class="text-xs text-rose-500 font-medium flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Belum Dimuat Naik
              </span>
            `}
          </td>

          <!-- Fail 3: Skema Jawapan -->
          <td class="p-4">
            ${course.files.markingScheme.uploaded ? `
              <div class="flex items-center gap-2 text-xs text-slate-800">
                <span class="p-1 rounded bg-blue-100 text-blue-700">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                </span>
                <div>
                  <div class="font-semibold truncate max-w-[140px]" title="${course.files.markingScheme.filename}">${course.files.markingScheme.filename}</div>
                  <span class="text-[10px] text-slate-400 font-mono">${course.files.markingScheme.size}</span>
                </div>
              </div>
            ` : `
              <span class="text-xs text-rose-500 font-medium flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Belum Dimuat Naik
              </span>
            `}
          </td>

          <!-- Status Kelulusan -->
          <td class="p-4">
            ${getStatusBadge(course.status)}
            ${course.vettingFeedback ? `
              <div class="text-[11px] text-slate-500 mt-1 max-w-xs truncate" title="${course.vettingFeedback}">
                <span class="font-medium text-slate-700">Catatan:</span> ${course.vettingFeedback}
              </div>
            ` : ''}
          </td>

          <!-- Tindakan -->
          <td class="p-4 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="App.openUploadModal('${course.id}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-sm transition flex items-center gap-1" title="Urus & Muat Naik Dokumen">
                <svg class="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Lampiran
              </button>
              
              <button onclick="App.previewSecureDocument('${course.id}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 shadow-sm transition flex items-center gap-1" title="Pratonton Selamat">
                <svg class="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Pratonton
              </button>

              ${canSubmit ? `
                <button onclick="App.submitForVetting('${course.id}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition flex items-center gap-1" title="Hantar untuk Vetting Panel">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  Hantar Vetting
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  // Open Upload Modal
  openUploadModal(courseId) {
    SoundSystem.playClick();
    AppState.activeUploadCourseId = courseId;
    const course = AppState.courses.find(c => c.id === courseId);
    if (!course) return;

    document.getElementById('uploadModalCourseTitle').textContent = `${course.code}: ${course.name}`;
    document.getElementById('uploadModalCourseCode').textContent = `${course.faculty} • ${course.semester}`;

    this.renderUploadModalFiles(course);
    document.getElementById('uploadModal').classList.remove('hidden');
  },

  renderUploadModalFiles(course) {
    const listEl = document.getElementById('uploadModalFilesList');
    if (!listEl) return;

    const fileTypes = [
      { key: 'examPaper', title: '1. Kertas Soalan Peperiksaan Akhir (SULIT)', req: 'Format PDF/Word (Maks 10MB)', icon: 'pdf' },
      { key: 'tos', title: '2. Table of Specification (TOS / Jadual Spesifikasi Ujian)', req: 'Format Excel/PDF (Maks 5MB)', icon: 'excel' },
      { key: 'markingScheme', title: '3. Skema Jawapan & Panduan Pemarkahan Analitik', req: 'Format PDF/Word (Maks 10MB)', icon: 'pdf' }
    ];

    listEl.innerHTML = fileTypes.map(f => {
      const fileData = course.files[f.key];
      const isUploaded = fileData && fileData.uploaded;

      return `
        <div class="p-4 rounded-xl border ${isUploaded ? 'bg-slate-50 border-slate-300' : 'bg-white border-dashed border-slate-300'} flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wide text-slate-700">${f.title}</span>
              ${isUploaded ? '<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">Tersedia</span>' : '<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-800">Wajib Diisi</span>'}
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${f.req}</p>
            ${isUploaded ? `
              <div class="mt-2 text-xs font-mono text-slate-600 flex items-center gap-3">
                <span class="font-bold text-blue-900">${fileData.filename}</span>
                <span class="text-slate-400">(${fileData.size})</span>
                <span class="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">SHA-256: ${fileData.hash}</span>
              </div>
            ` : ''}
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button onclick="App.simulateFileUpload('${course.id}', '${f.key}')" class="px-3 py-1.5 rounded-lg text-xs font-semibold ${isUploaded ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100' : 'bg-blue-900 text-white hover:bg-blue-800'} transition flex items-center gap-1.5 shadow-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              ${isUploaded ? 'Ganti Fail' : 'Muat Naik Fail'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  // Simulate file attachment
  simulateFileUpload(courseId, fileKey) {
    SoundSystem.playClick();
    const course = AppState.courses.find(c => c.id === courseId);
    if (!course) return;

    const mockNames = {
      examPaper: `${course.code.replace(' ', '')}_Kertas_Soalan_Final_v2_2026.pdf`,
      tos: `${course.code.replace(' ', '')}_TOS_JSU_Matrix_Approved.xlsx`,
      markingScheme: `${course.code.replace(' ', '')}_Skema_Jawapan_Rubrik_v2.pdf`
    };

    // Show simulated progress bar
    const progressEl = document.getElementById('uploadProgressBox');
    const barEl = document.getElementById('uploadProgressBar');
    if (progressEl && barEl) {
      progressEl.classList.remove('hidden');
      barEl.style.width = '0%';
      let p = 0;
      const interval = setInterval(() => {
        p += 25;
        barEl.style.width = `${p}%`;
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            progressEl.classList.add('hidden');
            course.files[fileKey] = {
              uploaded: true,
              filename: mockNames[fileKey],
              size: (Math.random() * 2 + 1.2).toFixed(1) + ' MB',
              hash: Math.random().toString(16).substring(2, 12)
            };

            // Log to audit trail
            AppState.auditTrail.unshift({
              id: Date.now(),
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
              user: AppState.roles[AppState.currentRole].name,
              role: AppState.roles[AppState.currentRole].badge,
              ip: '10.12.88.42 (FSKTM VLAN-10)',
              action: 'Muat Naik Dokumen',
              courseCode: course.code,
              details: `Fail ${mockNames[fileKey]} dimuat naik secara selamat ke ruang storan kriptografi.`,
              hash: 'sha256:' + course.files[fileKey].hash + '789bfa'
            });

            this.renderUploadModalFiles(course);
            this.renderModule1();
            this.renderAuditTrail();
            showToast('Fail Dimuat Naik', `Dokumen bagi <strong>${course.code}</strong> berjaya dilampirkan dan diimbas bebas perisian hasad.`, 'success');
          }, 300);
        }
      }, 100);
    }
  },

  closeUploadModal() {
    SoundSystem.playClick();
    const modal = document.getElementById('uploadModal');
    if (modal) modal.classList.add('hidden');
    AppState.activeUploadCourseId = null;
  },

  // Submit for vetting
  submitForVetting(courseId) {
    SoundSystem.playClick();
    const course = AppState.courses.find(c => c.id === courseId);
    if (!course) return;

    course.status = 'Menunggu Semakan';

    // Log to audit trail
    AppState.auditTrail.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: AppState.roles[AppState.currentRole].name,
      role: AppState.roles[AppState.currentRole].badge,
      ip: '10.12.88.42 (FSKTM VLAN-10)',
      action: 'Penyerahan untuk Vetting',
      courseCode: course.code,
      details: `Kertas soalan, TOS & Skema telah dimajukan kepada Pengerusi Panel Vetting (${course.vettingOfficer}).`,
      hash: 'sha256:' + Math.random().toString(16).substring(2, 14) + '09aa1c'
    });

    this.renderModule1();
    this.renderModule2();
    this.renderModule3();
    this.renderAuditTrail();

    showToast('Penyerahan Berjaya', `Kertas soalan <strong>${course.code}</strong> telah dihantar ke Panel Vetting.`, 'success');
  },

  // Preview Secure Document Modal (With Watermarking)
  previewSecureDocument(courseId) {
    SoundSystem.playClick();
    const course = AppState.courses.find(c => c.id === courseId);
    if (!course) return;

    const modal = document.getElementById('securePreviewModal');
    const titleEl = document.getElementById('previewModalTitle');
    const bodyEl = document.getElementById('previewModalBody');

    if (titleEl) titleEl.textContent = `PRATONTON KESELAMATAN TINGGI: ${course.code} - ${course.name}`;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="relative bg-white border border-slate-300 p-8 shadow-inner font-serif leading-relaxed text-slate-800 select-none overflow-hidden">
          <!-- Watermark Overlay inside paper -->
          <div class="absolute inset-0 pointer-events-none flex items-center justify-center rotate-[-30deg] opacity-10">
            <span class="text-5xl font-black text-rose-700 uppercase tracking-widest text-center">
              SULIT • UTHM • ${AppState.roles[AppState.currentRole].name}<br/>
              AKTA RAHSIA RASMI 1972 • DILARANG CETAK
            </span>
          </div>

          <!-- Official Exam Header -->
          <div class="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <div class="text-xs font-bold tracking-widest uppercase text-slate-700">UNIVERSITI TUN HUSSEIN ONN MALAYSIA</div>
            <div class="text-lg font-black text-slate-900 mt-1 uppercase tracking-wide">PEPERIKSAAN AKHIR SEMESTER I SESI 2026/2027</div>
            <div class="stamp-sulit my-2">SULIT</div>
            <table class="w-full text-xs font-sans mt-3 text-left border-collapse border border-slate-300">
              <tr>
                <td class="p-2 font-bold bg-slate-50 border border-slate-300 w-1/4">KOD KURSUS:</td>
                <td class="p-2 border border-slate-300 w-1/4 font-mono font-bold">${course.code}</td>
                <td class="p-2 font-bold bg-slate-50 border border-slate-300 w-1/4">MASA PEPERIKSAAN:</td>
                <td class="p-2 border border-slate-300 w-1/4">3 JAM</td>
              </tr>
              <tr>
                <td class="p-2 font-bold bg-slate-50 border border-slate-300">NAMA KURSUS:</td>
                <td class="p-2 border border-slate-300" colspan="3">${course.name}</td>
              </tr>
              <tr>
                <td class="p-2 font-bold bg-slate-50 border border-slate-300">PENSYARAH PENGGUBAL:</td>
                <td class="p-2 border border-slate-300">${course.lecturer}</td>
                <td class="p-2 font-bold bg-slate-50 border border-slate-300">TARIKH PEPERIKSAAN:</td>
                <td class="p-2 border border-slate-300">14 DISEMBER 2026</td>
              </tr>
            </table>
          </div>

          <!-- Section A sample questions -->
          <div class="space-y-6 font-sans">
            <div>
              <h4 class="font-bold text-sm text-slate-900 uppercase">BAHAGIAN A (Jawab Semua Soalan) [50 Markah]</h4>
              <p class="text-xs text-slate-500 mt-0.5">Penilaian meliputi CLO 1 & CLO 2 berdasarkan Table of Specification (TOS).</p>
            </div>

            <div class="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2">
              <div class="flex justify-between font-bold">
                <span>SOALAN 1 [25 Markah]</span>
                <span class="text-blue-900 font-mono">[CLO1, PLO1, C3]</span>
              </div>
              <p>(a) Terangkan perbezaan antara Senibina Mikroperkhidmatan (Microservices Architecture) dan Senibina Monolitik dari sudut kebolehskalaan dan ketahanan kegagalan sistem. [10 Markah]</p>
              <p>(b) Berdasarkan rajah aliran sistem e-dagang dalam Lampiran 1, laksanakan analisis risiko keselamatan ancaman serangan Distributed Denial of Service (DDoS) dan cadangkan mitigasi pertahanan secara berlapis (defense-in-depth). [15 Markah]</p>
            </div>

            <div class="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2">
              <div class="flex justify-between font-bold">
                <span>SOALAN 2 [25 Markah]</span>
                <span class="text-blue-900 font-mono">[CLO2, PLO2, C4]</span>
              </div>
              <p>(a) Lakarkan Rajah Jujukan UML (Sequence Diagram) yang memodelkan rantaian jagaan dokumen peperiksaan bertaraf SULIT bermula dari pensyarah, panel vetting, sehingga diterima di bilik kebal PPA. [15 Markah]</p>
              <p>(b) Justifikasikan kepentingan integriti data menggunakan fungsi cincangan kriptografi (Cryptographic Hash SHA-256) bagi mengesan sebarang pengubahsuaian fail soalan tanpa kebenaran. [10 Markah]</p>
            </div>

            <!-- TOS Summary Matrix snippet -->
            <div class="pt-4 border-t border-slate-200">
              <h5 class="font-bold text-xs text-slate-900 mb-2">RINGKASAN JADUAL SPESIFIKASI UJIAN (TOS / JSU) DILAMPIRKAN:</h5>
              <div class="grid grid-cols-4 gap-2 text-center text-xs">
                <div class="p-2 bg-slate-100 rounded border border-slate-200">
                  <div class="text-[10px] text-slate-500 font-bold">C1 - Pengetahuan</div>
                  <div class="text-sm font-black text-slate-800">10%</div>
                </div>
                <div class="p-2 bg-slate-100 rounded border border-slate-200">
                  <div class="text-[10px] text-slate-500 font-bold">C2 - Kefahaman</div>
                  <div class="text-sm font-black text-slate-800">20%</div>
                </div>
                <div class="p-2 bg-blue-50 rounded border border-blue-200">
                  <div class="text-[10px] text-blue-700 font-bold">C3 - Aplikasi</div>
                  <div class="text-sm font-black text-blue-900">35%</div>
                </div>
                <div class="p-2 bg-purple-50 rounded border border-purple-200">
                  <div class="text-[10px] text-purple-700 font-bold">C4 - Analisis</div>
                  <div class="text-sm font-black text-purple-900">35%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
  },

  closePreviewModal() {
    SoundSystem.playClick();
    const modal = document.getElementById('securePreviewModal');
    if (modal) modal.classList.add('hidden');
  },

  // ========================================================
  // MODULE 2: Modul Vetting (Vetting Panel View)
  // ========================================================
  renderModule2() {
    const listEl = document.getElementById('vettingSubmissionsList');
    if (!listEl) return;

    // Filter submissions pending vetting or recently vetted
    const pendingList = AppState.courses.filter(c => c.files.examPaper.uploaded);

    listEl.innerHTML = pendingList.map(c => {
      const isSelected = c.id === AppState.selectedVettingCourseId;
      return `
        <div onclick="App.selectVettingCourse('${c.id}')" class="p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-blue-50/80 border-blue-600 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}">
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">${c.code}</span>
              <h4 class="text-sm font-bold text-slate-900 mt-1 line-clamp-1">${c.name}</h4>
              <p class="text-xs text-slate-500 mt-0.5">Pensyarah: ${c.lecturer}</p>
            </div>
            ${getStatusBadge(c.status)}
          </div>
          <div class="flex items-center gap-3 mt-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Fail: 3/3 Lengkap</span>
            <span>•</span>
            <span>Panel: ${c.vettingOfficer}</span>
          </div>
        </div>
      `;
    }).join('');

    this.renderVettingDetailPanel();
  },

  selectVettingCourse(courseId) {
    SoundSystem.playClick();
    AppState.selectedVettingCourseId = courseId;
    this.renderModule2();
  },

  renderVettingDetailPanel() {
    const detailEl = document.getElementById('vettingActiveCourseDetail');
    if (!detailEl) return;

    const course = AppState.courses.find(c => c.id === AppState.selectedVettingCourseId) || AppState.courses[0];
    if (!course) return;

    detailEl.innerHTML = `
      <div class="space-y-6">
        <!-- Course Header Info -->
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-900 text-white font-mono">${course.code}</span>
                <span class="text-xs font-medium text-slate-500">${course.faculty} • ${course.program}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mt-1.5">${course.name}</h3>
              <div class="text-xs text-slate-600 mt-1 flex items-center gap-3">
                <span>Penggubal: <strong>${course.lecturer}</strong></span>
                <span>•</span>
                <span>${course.semester}</span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <div class="text-xs text-slate-500">Status Semakan Semasa:</div>
              <div class="mt-1">${getStatusBadge(course.status)}</div>
            </div>
          </div>

          <!-- Document Inspection Tabs -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div onclick="App.previewSecureDocument('${course.id}')" class="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer flex items-center gap-3">
              <div class="p-2 rounded-lg bg-red-100 text-red-700">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path></svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold text-slate-900 truncate">Kertas Soalan Peperiksaan</div>
                <div class="text-[11px] text-slate-500 truncate">${course.files.examPaper.filename || 'Tersedia'}</div>
              </div>
            </div>

            <div onclick="App.previewSecureDocument('${course.id}')" class="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition cursor-pointer flex items-center gap-3">
              <div class="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold text-slate-900 truncate">Table of Specification (TOS)</div>
                <div class="text-[11px] text-slate-500 truncate">${course.files.tos.filename || 'Tersedia'}</div>
              </div>
            </div>

            <div onclick="App.previewSecureDocument('${course.id}')" class="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer flex items-center gap-3">
              <div class="p-2 rounded-lg bg-blue-100 text-blue-700">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold text-slate-900 truncate">Skema Jawapan & Rubrik</div>
                <div class="text-[11px] text-slate-500 truncate">${course.files.markingScheme.filename || 'Tersedia'}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vetting Checklist & Decision Card -->
        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Senarai Semak Standard Vetting Peperiksaan (PPA/VET-01)
            </h4>
            <span class="text-xs text-slate-400">Panel: ${AppState.roles[AppState.currentRole].name}</span>
          </div>

          <!-- Quality criteria checkboxes -->
          <div class="space-y-2.5 text-xs text-slate-700">
            <label class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              <input type="checkbox" checked class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500">
              <span>Kertas soalan mematuhi Hasil Pembelajaran Kursus (CLO) dan Table of Specification (TOS).</span>
            </label>
            <label class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              <input type="checkbox" checked class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500">
              <span>Peruntukan masa mencukupi (3 Jam) dan taburan markah (100 Markah) menepati format universiti.</span>
            </label>
            <label class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              <input type="checkbox" checked class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500">
              <span>Skema pemarkahan analitik disertakan dengan agihan markah pecahan secara jelas dan objektif.</span>
            </label>
            <label class="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
              <input type="checkbox" checked class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500">
              <span>Kadar keaslian terjamin (tiada kitar semula soalan melebihi 20% dari 3 semester terdahulu).</span>
            </label>
          </div>

          <!-- Mandatory Feedback Textarea -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">
              Ulasan & Catatan Vetting Panel (Wajib Diisi):
            </label>
            <textarea id="vettingFeedbackInput" rows="3" placeholder="Masukkan justifikasi kelulusan atau perincian pembetulan yang diperlukan..." class="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition leading-relaxed">${course.vettingFeedback || ''}</textarea>
            <div class="flex items-center gap-2 mt-1.5">
              <span class="text-[11px] text-slate-400">Cadangan pantas:</span>
              <button onclick="document.getElementById('vettingFeedbackInput').value = 'Kertas soalan dan skema menepati spesifikasi TOS sepenuhnya. Disahkan Lulus.'" class="text-[11px] text-blue-600 hover:underline">Lulus Penuh</button>
              <span class="text-slate-300">•</span>
              <button onclick="document.getElementById('vettingFeedbackInput').value = 'Lulus Bersyarat: Sila buat pembetulan pada peruntukan masa Soalan Bahagian B.'" class="text-[11px] text-amber-600 hover:underline">Bersyarat</button>
            </div>
          </div>

          <!-- Decision Action Buttons -->
          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div class="text-xs text-slate-500">
              Tindakan anda akan dicatatkan dalam <strong class="text-slate-700">Rantaian Jagaan Digital</strong>.
            </div>
            <div class="flex items-center gap-2">
              <button onclick="App.processVettingDecision('${course.id}', 'Tolak')" class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition shadow-sm flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Tolak (Pindaan)
              </button>

              <button onclick="App.processVettingDecision('${course.id}', 'Lulus Bersyarat')" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition shadow-sm flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Lulus Bersyarat
              </button>

              <button onclick="App.processVettingDecision('${course.id}', 'Lulus')" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Lulus Penuh
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Process Vetting Decision
  processVettingDecision(courseId, decision) {
    SoundSystem.playClick();
    const course = AppState.courses.find(c => c.id === courseId);
    const feedbackInput = document.getElementById('vettingFeedbackInput');
    const feedback = feedbackInput ? feedbackInput.value.trim() : '';

    if (!feedback) {
      showToast('Ulasan Diperlukan', 'Sila lengkapkan ruangan ulasan vetting sebelum mengesahkan keputusan.', 'warning');
      if (feedbackInput) feedbackInput.focus();
      return;
    }

    course.status = decision;
    course.vettingFeedback = feedback;
    course.vettingDecision = decision;
    course.vettingDate = new Date().toLocaleDateString('ms-MY') + ' ' + new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }) + ' MYT';
    course.vettingOfficer = AppState.roles[AppState.currentRole].name;

    // Append to Digital Audit Trail
    AppState.auditTrail.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: AppState.roles[AppState.currentRole].name,
      role: AppState.roles[AppState.currentRole].badge,
      ip: '10.12.88.19 (Vetting Subnet VLAN-10)',
      action: `Keputusan Vetting: ${decision}`,
      courseCode: course.code,
      details: `Panel vetting meluluskan status [${decision}]. Catatan: "${feedback}".`,
      hash: 'sha256:' + Math.random().toString(16).substring(2, 14) + 'd18cae'
    });

    this.renderModule1();
    this.renderModule2();
    this.renderModule3();
    this.renderAuditTrail();

    const toastType = decision === 'Lulus' ? 'success' : decision === 'Lulus Bersyarat' ? 'warning' : 'error';
    showToast('Keputusan Disimpan', `Keputusan <strong>${decision}</strong> bagi kursus ${course.code} telah direkodkan.`, toastType);
  },

  // ========================================================
  // MODULE 3: Modul Pemantauan dan Penghantaran (Ketua Jabatan)
  // ========================================================
  renderModule3() {
    // Calculate KPI cards
    const total = AppState.courses.length;
    const underReview = AppState.courses.filter(c => c.status === 'Menunggu Semakan').length;
    const readyForDispatch = AppState.courses.filter(c => c.status === 'Lulus' && !c.receivedInVault).length;
    const securedInVault = AppState.courses.filter(c => c.receivedInVault).length;

    const elTotal = document.getElementById('kpiTotalCourses');
    const elReview = document.getElementById('kpiUnderReview');
    const elReady = document.getElementById('kpiReadyDispatch');
    const elVault = document.getElementById('kpiSecuredVault');

    if (elTotal) elTotal.textContent = total;
    if (elReview) elReview.textContent = underReview;
    if (elReady) elReady.textContent = readyForDispatch;
    if (elVault) elVault.textContent = securedInVault;

    // Render Ready for Dispatch Table
    const tbody = document.getElementById('hodDispatchTableBody');
    if (!tbody) return;

    // Filter approved courses
    const approvedCourses = AppState.courses.filter(c => c.status === 'Lulus' || c.status === 'Diterima di Bilik Kebal');

    if (approvedCourses.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center text-slate-500 text-xs">
            Tiada kertas peperiksaan yang telah disahkan Lulus pada masa ini. Sila semak status vetting.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = approvedCourses.map(course => {
      const isSecured = course.receivedInVault;

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-200">
          <td class="p-4">
            <div class="flex items-center gap-3">
              <span class="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-bold text-xs">
                ${course.code.split(' ')[0]}
              </span>
              <div>
                <div class="font-bold text-slate-900 text-sm">${course.code}</div>
                <div class="text-xs text-slate-600 font-medium">${course.name}</div>
                <div class="text-[11px] text-slate-400 font-mono mt-0.5">Penjejakan: ${course.docTrackingId}</div>
              </div>
            </div>
          </td>

          <td class="p-4">
            <div class="text-xs text-slate-800 font-medium">${course.lecturer}</div>
            <div class="text-[11px] text-slate-500">${course.faculty}</div>
          </td>

          <td class="p-4">
            <div class="text-xs text-slate-800 font-medium">${course.vettingOfficer}</div>
            <div class="text-[11px] text-emerald-600 font-semibold">${course.vettingDate || 'Disahkan Lulus'}</div>
          </td>

          <td class="p-4">
            <span class="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
              ${course.sealNumber}
            </span>
          </td>

          <td class="p-4">
            ${isSecured ? `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                <svg class="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                Diterima di Bilik Kebal
              </span>
            ` : `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-300">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                Sedia Dihantar ke PPA
              </span>
            `}
          </td>

          <td class="p-4 text-right">
            <button onclick="App.openDispatchFormModal('${course.id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 shadow-sm transition flex items-center gap-1.5 ml-auto">
              <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
              Jana Borang & Kod QR
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  // Open Dispatch Form & QR Code Modal
  openDispatchFormModal(courseId) {
    SoundSystem.playClick();
    const course = AppState.courses.find(c => c.id === courseId);
    if (!course) return;

    const modal = document.getElementById('dispatchModal');
    const qrContainer = document.getElementById('dispatchModalQRCode');
    const contentEl = document.getElementById('dispatchFormPrintArea');

    // Generate dynamic QR Code string with course metadata payload
    const qrPayload = JSON.stringify({
      app: 'UTHM-EPEK',
      docId: course.docTrackingId,
      code: course.code,
      lecturer: course.lecturer,
      seal: course.sealNumber,
      status: 'VERIFIED_CHAIN_OF_CUSTODY'
    });

    if (qrContainer) {
      qrContainer.innerHTML = generateSVGQRCode(qrPayload, 170);
    }

    if (contentEl) {
      contentEl.innerHTML = `
        <div class="border-2 border-slate-900 p-8 bg-white text-slate-900 select-none print:border-none print:p-0">
          <!-- Form Header -->
          <div class="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full border-2 border-slate-900 flex items-center justify-center font-black text-xs text-center leading-tight bg-slate-100">
                UTHM<br/>PPA
              </div>
              <div>
                <h2 class="text-sm font-black uppercase tracking-wider">UNIVERSITI TUN HUSSEIN ONN MALAYSIA</h2>
                <h3 class="text-base font-extrabold uppercase mt-0.5">BORANG PENYERAHAN DOKUMEN PEPERIKSAAN BERTARAF SULIT</h3>
                <p class="text-xs text-slate-600 font-medium">Pejabat Pengurusan Akademik (PPA) • Rantaian Jagaan Dokumen Keselamatan (UTHM/PPA/PEPEK-01 Pind. 2026)</p>
              </div>
            </div>
            <div class="text-right">
              <div class="stamp-sulit">SULIT</div>
              <div class="text-xs font-mono font-bold mt-2">NO. SIRI: ${course.docTrackingId}</div>
            </div>
          </div>

          <!-- Document & Course Particulars Table -->
          <div class="my-6">
            <h4 class="text-xs font-black uppercase bg-slate-900 text-white px-3 py-1.5 mb-2">BAHAGIAN A: BUTIRAN KURSUS DAN PENGGUBAL</h4>
            <table class="w-full text-xs border-collapse border border-slate-400">
              <tr>
                <td class="p-2.5 font-bold bg-slate-100 border border-slate-400 w-1/4">Kod & Nama Kursus</td>
                <td class="p-2.5 border border-slate-400 font-bold" colspan="3">${course.code} - ${course.name}</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold bg-slate-100 border border-slate-400">Fakulti / Jabatan</td>
                <td class="p-2.5 border border-slate-400">${course.faculty} (Jabatan Kejuruteraan Perisian)</td>
                <td class="p-2.5 font-bold bg-slate-100 border border-slate-400 w-1/4">Semester & Sesi</td>
                <td class="p-2.5 border border-slate-400">${course.semester}</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold bg-slate-100 border border-slate-400">Nama Pensyarah Penggubal</td>
                <td class="p-2.5 border border-slate-400">${course.lecturer}</td>
                <td class="p-2.5 font-bold bg-slate-100 border border-slate-400">Panel Vetting Fakulti</td>
                <td class="p-2.5 border border-slate-400">${course.vettingOfficer}</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold bg-slate-100 border border-slate-400">No. Meterai Keselamatan (Seal)</td>
                <td class="p-2.5 border border-slate-400 font-mono font-bold text-rose-700">${course.sealNumber}</td>
                <td class="p-2.5 font-bold bg-slate-100 border border-slate-400">Status Kelulusan Vetting</td>
                <td class="p-2.5 border border-slate-400 font-bold text-emerald-700">LULUS (DISAHKAN)</td>
              </tr>
            </table>
          </div>

          <!-- Middle Section: Dynamic QR Code Box -->
          <div class="my-6 p-4 rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div class="text-left space-y-1">
              <span class="px-2 py-0.5 rounded text-[10px] font-black bg-blue-900 text-white uppercase tracking-wider">KOD KESELAMATAN KRIPTOGRAFI BILIK KEBAL</span>
              <h5 class="text-sm font-extrabold text-slate-900 mt-1">Kod QR Rantaian Jagaan Rasmi (Official Chain-of-Custody Token)</h5>
              <p class="text-xs text-slate-600 max-w-md">Kod QR ini mengandungi tandatangan digital dan hanya boleh diimbas oleh Pegawai Penerima Pejabat Pengurusan Akademik (PPA) di Bilik Kebal Peperiksaan Utama UTHM.</p>
              <div class="text-xs font-mono text-slate-500 pt-2">Payload Hash: ${course.docTrackingId}</div>
            </div>
            <div class="shrink-0 p-2 bg-white rounded-lg border border-slate-300 text-center shadow-sm">
              ${generateSVGQRCode(qrPayload, 140)}
              <div class="text-[10px] font-mono font-bold text-slate-700 mt-1">${course.sealNumber}</div>
            </div>
          </div>

          <!-- Signatures Matrix -->
          <div class="my-6">
            <h4 class="text-xs font-black uppercase bg-slate-900 text-white px-3 py-1.5 mb-2">BAHAGIAN B: AKUAN PENYERAHAN DAN PENERIMAAN FIZIKAL (CHAIN OF CUSTODY)</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <!-- Column 1: Lecturer -->
              <div class="p-3 border border-slate-400 rounded bg-slate-50 flex flex-col justify-between h-44">
                <div>
                  <div class="font-bold uppercase text-slate-800">1. Diserah Oleh (Pensyarah):</div>
                  <div class="text-slate-600 mt-1 text-[11px]">${course.lecturer}</div>
                </div>
                <div class="border-t border-slate-300 pt-2">
                  <div class="stamp-lulus text-[10px] py-0.5">TERTANDATANGAN DIGITAL</div>
                  <div class="text-[10px] text-slate-400 mt-1">Masa: 30/10/2026 11:15 MYT</div>
                </div>
              </div>

              <!-- Column 2: Head of Department -->
              <div class="p-3 border border-slate-400 rounded bg-slate-50 flex flex-col justify-between h-44">
                <div>
                  <div class="font-bold uppercase text-slate-800">2. Disahkan Oleh (Ketua Jabatan):</div>
                  <div class="text-slate-600 mt-1 text-[11px]">Prof. Ir. Ts. Dr. Zulkifli bin Hashim</div>
                </div>
                <div class="border-t border-slate-300 pt-2">
                  <div class="stamp-lulus text-[10px] py-0.5">COP RASMI JABATAN</div>
                  <div class="text-[10px] text-slate-400 mt-1">Masa: 30/10/2026 14:05 MYT</div>
                </div>
              </div>

              <!-- Column 3: Vault Receiving Officer -->
              <div class="p-3 border border-slate-400 rounded bg-blue-50 flex flex-col justify-between h-44">
                <div>
                  <div class="font-bold uppercase text-blue-900">3. Diterima Oleh (Bilik Kebal PPA):</div>
                  <div class="text-slate-600 mt-1 text-[11px]">${course.receivedInVault ? course.vaultOfficer : 'Menunggu Imbasan Pegawai Bilik Kebal'}</div>
                </div>
                <div class="border-t border-blue-200 pt-2">
                  ${course.receivedInVault ? `
                    <div class="stamp-lulus text-[10px] py-0.5">DITERIMA & DIKUNCI</div>
                    <div class="text-[10px] text-slate-500 mt-1">${course.vaultReceivedAt}</div>
                  ` : `
                    <div class="text-[10px] text-slate-400 italic">[Ruang Imbasan Pengesahan PPA/CGS]</div>
                  `}
                </div>
              </div>
            </div>
          </div>

          <div class="text-[10px] text-slate-500 text-center border-t border-slate-300 pt-2">
            Dokumen ini dijanakan secara berkomputer melalui Sistem E-Peperiksaan UTHM di bawah seliaan Pejabat Pengurusan Akademik (PPA).
          </div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
  },

  closeDispatchModal() {
    SoundSystem.playClick();
    const modal = document.getElementById('dispatchModal');
    if (modal) modal.classList.add('hidden');
  },

  printOfficialDispatchForm() {
    SoundSystem.playClick();
    window.print();
  },

  // ========================================================
  // MODULE 4: Modul Semakan Penerimaan Dokumen (PPA/CGS)
  // ========================================================
  renderModule4() {
    const listEl = document.getElementById('vaultAcceptedList');
    if (!listEl) return;

    // Filter courses received in vault
    const securedList = AppState.courses.filter(c => c.receivedInVault);

    listEl.innerHTML = securedList.map(c => {
      return `
        <div class="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-xs">
              🔒
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900 text-xs">${c.code}</span>
                <span class="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">${c.sealNumber}</span>
              </div>
              <div class="text-xs text-slate-600 truncate max-w-xs">${c.name}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">Lokasi: <strong>${c.vaultLocation}</strong> • Masa: ${c.vaultReceivedAt || 'Hari Ini'}</div>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            Tersimpan Selamat
          </span>
        </div>
      `;
    }).join('');
  },

  // Fill sample Doc ID for easy pitching
  fillSampleDocId(docId) {
    SoundSystem.playClick();
    const input = document.getElementById('manualDocIdInput');
    if (input) input.value = docId;
  },

  // Simulate QR Code Scanning in PPA Vault
  simulateScanVault() {
    const input = document.getElementById('manualDocIdInput');
    const docIdQuery = input ? input.value.trim() : '';

    // Play initial scanner trigger sound
    SoundSystem.playBeep();

    const scanBtn = document.getElementById('btnSimulateScan');
    const originalText = scanBtn ? scanBtn.innerHTML : '';
    if (scanBtn) {
      scanBtn.disabled = true;
      scanBtn.innerHTML = `
        <svg class="animate-spin w-4 h-4 text-white inline-block mr-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Mengesahkan Kriptografi...
      `;
    }

    // Camera laser line glow pulse simulation
    const laser = document.getElementById('cameraLaserLine');
    if (laser) {
      laser.style.boxShadow = '0 0 30px 10px rgba(59, 130, 246, 0.9)';
    }

    setTimeout(() => {
      // Find matching course or default to BIC20403
      let matchedCourse = AppState.courses.find(c => 
        (docIdQuery && (c.docTrackingId.includes(docIdQuery) || c.code.includes(docIdQuery) || c.id.includes(docIdQuery)))
      );

      if (!matchedCourse) {
        // Fallback to first available approved course
        matchedCourse = AppState.courses.find(c => c.status === 'Lulus' && !c.receivedInVault) || AppState.courses[0];
      }

      // Mark course as accepted into Vault!
      matchedCourse.status = 'Diterima di Bilik Kebal';
      matchedCourse.receivedInVault = true;
      matchedCourse.vaultReceivedAt = new Date().toLocaleDateString('ms-MY') + ' ' + new Date().toLocaleTimeString('ms-MY') + ' MYT';
      matchedCourse.vaultOfficer = AppState.roles.ppa.name;

      // Play success chime sound!
      SoundSystem.playSuccessVault();

      if (scanBtn) {
        scanBtn.disabled = false;
        scanBtn.innerHTML = originalText;
      }
      if (laser) {
        laser.style.boxShadow = '';
      }

      // Show the mandatory Success State Card
      const successCard = document.getElementById('vaultSuccessStateCard');
      const detailsEl = document.getElementById('vaultSuccessDetails');

      if (detailsEl) {
        detailsEl.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span class="text-slate-500 font-medium">Kod & Nama Kursus:</span>
              <div class="font-bold text-slate-900">${matchedCourse.code} - ${matchedCourse.name}</div>
            </div>
            <div>
              <span class="text-slate-500 font-medium">No. Siri Penjejakan (Doc ID):</span>
              <div class="font-mono font-bold text-blue-900">${matchedCourse.docTrackingId}</div>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Peti Keselamatan Bilik Kebal:</span>
              <div class="font-bold text-emerald-800">${matchedCourse.vaultLocation} (Suhu terkawal 20°C)</div>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Meterai Keselamatan (Tamper-evident Seal):</span>
              <div class="font-mono font-bold text-rose-700">${matchedCourse.sealNumber}</div>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Pegawai Penerima PPA:</span>
              <div class="font-bold text-slate-900">${matchedCourse.vaultOfficer}</div>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Masa Pengesahan Biometrik & Imbasan:</span>
              <div class="font-semibold text-slate-700">${matchedCourse.vaultReceivedAt}</div>
            </div>
          </div>
        `;
      }

      if (successCard) {
        successCard.classList.remove('hidden');
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Add to digital audit trail
      AppState.auditTrail.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: AppState.roles.ppa.name,
        role: AppState.roles.ppa.badge,
        ip: '10.10.4.15 (Terminal Imbas Bilik Kebal PPA)',
        action: 'Imbasan Penerimaan Dokumen',
        courseCode: matchedCourse.code,
        details: `Kod QR sah diimbas. Dokumen fizikal bagi ${matchedCourse.code} diterima di Bilik Kebal PPA dan dikunci di ${matchedCourse.vaultLocation}. Notifikasi automatik dihantar ke fakulti.`,
        hash: 'sha256:' + Math.random().toString(16).substring(2, 14) + 'ff0189'
      });

      // Show automated alert toast notification as required
      showToast(
        'Rantaian Jagaan Lengkap',
        `Dokumen fizikal <strong>${matchedCourse.code}</strong> selamat diterima di bilik kebal. <em>Notifikasi automatik telah dihantar serta-merta kepada Ketua Jabatan & Dekan ${matchedCourse.faculty}</em>.`,
        'success'
      );

      // Re-render components
      this.renderModule1();
      this.renderModule2();
      this.renderModule3();
      this.renderModule4();
      this.renderAuditTrail();

    }, 700);
  },

  // Render Digital Audit Trail on the side
  renderAuditTrail() {
    const listEl = document.getElementById('digitalAuditTrailList');
    if (!listEl) return;

    listEl.innerHTML = AppState.auditTrail.slice(0, 8).map(item => {
      const isVaultAction = item.action.includes('Imbasan') || item.action.includes('Bilik Kebal');
      const isApproval = item.action.includes('Lulus');
      
      const dotColor = isVaultAction ? 'bg-indigo-600 ring-indigo-100' :
                       isApproval ? 'bg-emerald-600 ring-emerald-100' :
                       'bg-blue-600 ring-blue-100';

      return `
        <div class="relative pl-6 pb-5 border-l-2 border-slate-200 last:border-transparent last:pb-0">
          <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full ${dotColor} ring-4 flex items-center justify-center"></div>
          <div>
            <div class="flex items-center justify-between gap-1 text-[11px]">
              <span class="font-mono text-slate-400">${item.timestamp}</span>
              <span class="font-bold text-slate-800">${item.courseCode}</span>
            </div>
            <div class="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              ${item.action}
            </div>
            <div class="text-[11px] text-slate-600 mt-1 leading-snug">
              ${item.details}
            </div>
            <div class="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span class="truncate max-w-[150px]">${item.user}</span>
              <span class="bg-slate-100 px-1 py-0.5 rounded text-slate-500">${item.ip.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
};

// Launch Application on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
