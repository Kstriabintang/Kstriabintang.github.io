import type { en } from './en'

export const id: typeof en = {
  nav: {
    about: 'Tentang',
    howIWork: 'Cara Kerja',
    skills: 'Keahlian',
    experience: 'Pengalaman',
    projects: 'Proyek',
    certificates: 'Sertifikat',
    contact: 'Kontak',
    switchLang: 'English',
  },
  hero: {
    greeting: 'Halo, saya',
    name: 'Ksatria Bintang Samudra',
    typed: ['AI Engineer', 'Pembangun Otomasi', 'Arsitek Solusi'],
    tagline: 'AI Engineer · Pembangun Otomasi · Arsitek Solusi',
    body:
      'Saya membangun software production-grade lewat alur kerja engineering yang ditenagai AI. Memadukan prompt engineering yang fasih dengan pemahaman arsitektur end-to-end untuk membangun platform pembayaran terintegrasi, bot otomasi, dan tooling keamanan — dengan kecepatan tak biasa, tanpa mengorbankan ketelitian.',
    viewWork: 'Lihat Proyek',
    downloadCV: 'Unduh CV',
  },
  about: {
    sectionNumber: '02.',
    sectionTitle: 'Tentang Saya',
    paragraphs: [
      'Saya Ksatria — developer dari Pontianak, Indonesia 🇮🇩, yang menikmati momen ketika sebuah sistem akhirnya "klik": API yang rapi, celah keamanan yang akhirnya terbongkar, bot yang jalan jam 3 pagi sementara saya tidur nyenyak.',
      'Jalan saya agak unik. Mulai dari menganalisis data social media, lanjut ke pentesting di Upwork, lalu menetap sebagai admin Google Workspace untuk perusahaan multi-domain. Setiap perjalanan mengajarkan satu hal yang sekarang saya bawa ke setiap baris kode: hormati data, jangan anggap apa pun aman, otomatisasi semua yang tidak butuh manusia.',
      'Saya menulis kode dengan pola pikir security-first — bukan karena lagi tren, tapi karena saya pernah melihat akibatnya kalau keamanan jadi pemikiran belakangan. Entah saya sedang ngerjain aplikasi full-stack atau mengamankan infra orang lain, tujuan saya tetap sama: bikin sesuatu yang jalan sekarang, dan tidak diam-diam rusak nanti.',
    ],
    pillars: {
      bugHunter: {
        title: 'Bug Hunter',
        description: 'Riset keamanan web & celah kerentanan. Saya menemukan kelemahan sebelum attacker melakukannya.',
      },
      fullStack: {
        title: 'Full Stack',
        description: 'Frontend, Backend, API, dan Database. Pengembangan aplikasi end-to-end.',
      },
      botBuilder: {
        title: 'Bot Builder',
        description: 'Bot WhatsApp, Telegram & Discord. Script otomatisasi dan CLI tools.',
      },
    },
    quote: 'Hacker membobol sistem demi keuntungan. Dulu, ini soal rasa ingin tahu dan pencarian ilmu.',
    quoteAuthor: 'Kevin Mitnick',
    funFact: 'Fakta Seru: Saya merusak sistem agar lebih kuat',
  },
  howIWork: {
    sectionNumber: '03.',
    sectionTitle: 'Cara Saya Bekerja',
    paragraphs: [
      'Saya engineer AI-native. Setiap proyek dimulai dari spesifikasi yang jelas, lalu saya mengorkestrasi tooling AI modern — Claude, Cursor, v0, Lovable, custom prompt chain — untuk menerjemahkannya jadi kode production dengan kecepatan tinggi. Saya membaca setiap baris yang dihasilkan AI, memverifikasi arsitekturnya, dan bertanggung jawab atas setiap trade-off.',
      'Hasilnya: produk yang rilis dalam hitungan hari, bukan minggu, dengan standar kualitas setara development tradisional — karena saya berpikir dalam sistem, bukan sekadar fitur.',
    ],
    pillars: [
      {
        title: 'Berbasis Spesifikasi',
        body: 'Setiap pengembangan dimulai dari spesifikasi yang jelas: scope, batasan, kontrak, kriteria penerimaan. AI mewarisi spesifikasi itu, bukan terkaan.',
      },
      {
        title: 'Diorkestrasi AI',
        body: 'Claude, Cursor, v0, Lovable, custom prompt chain. Alat yang tepat untuk lapisan yang tepat — bukan satu palu mengejar semua paku.',
      },
      {
        title: 'Diverifikasi Manusia',
        body: 'Setiap keputusan arsitektur, setiap batas keamanan, setiap trade-off — saya yang bertanggung jawab. AI mempercepat; engineering-nya tetap milik saya.',
      },
    ],
  },
  skills: {
    sectionNumber: '04.',
    sectionTitle: 'Tech Stack',
    sectionSubtitle: 'Tools & teknologi yang saya gunakan',
    categories: {
      'AI & Workflow': 'AI & Alur Kerja',
      Languages: 'Bahasa',
      Frontend: 'Frontend',
      Backend: 'Backend',
      Data: 'Data',
      Security: 'Keamanan',
      Automation: 'Otomasi',
      Platforms: 'Platform',
    },
  },
  experience: {
    sectionNumber: '05.',
    sectionTitle: 'Pengalaman',
    sectionSubtitle: 'Perjalanan profesional saya',
    current: 'Saat ini',
    stats: {
      yearsRemote: 'Tahun Remote',
      projects: 'Proyek',
      uptime: 'Uptime',
      certificates: 'Sertifikat',
    },
  },
  projects: {
    sectionNumber: '06.',
    sectionTitle: 'Proyek Pilihan',
    sectionSubtitle: 'Pekerjaan production yang saya tangani end-to-end',
    viewOnGithub: 'Lihat di GitHub',
    viewAll: 'Lihat Semua Proyek di GitHub',
    items: {
      aktifinimei: {
        title: 'aktifinIMEI — Platform Aktivasi IMEI iPhone',
        description:
          'Layanan aktivasi IMEI iPhone production-grade untuk pasar Indonesia. Pipeline end-to-end dari pembayaran ke pemenuhan order, terintegrasi QRIS, pelacakan order otomatis, dan notifikasi pelanggan.',
      },
      portfolio: {
        title: 'Personal Portfolio Site',
        description:
          'Portfolio developer bilingual dengan animasi GSAP custom, command palette ⌘K, dan budget initial load 94 KB gzipped yang agresif.',
      },
      linkTracker: {
        title: 'Link Tracker — Utility Visitor Intelligence',
        description:
          'Utility self-hosted untuk membuat short link yang bisa dilacak dan menangkap metadata pengunjung — dibangun untuk atribusi marketing dan OSINT yang terotorisasi.',
      },
    },
  },
  certificates: {
    sectionNumber: '07.',
    sectionTitle: 'Sertifikat',
    sectionSubtitle: 'Sertifikasi profesional & kredensial',
    verified: 'Terverifikasi',
  },
  contact: {
    sectionNumber: '08.',
    sectionTitle: 'Mari Terhubung',
    sectionSubtitle: 'Yuk bangun sesuatu yang keren bersama',
    letsTalk: 'Mari Ngobrol',
    intro: 'Saya selalu terbuka untuk diskusi proyek baru, ide kreatif, atau kesempatan menjadi bagian dari visi Anda.',
    labels: {
      email: 'Email',
      whatsapp: 'WhatsApp',
      location: 'Lokasi',
    },
    locationValue: 'Pontianak, Kalimantan Barat, Indonesia 🇮🇩',
    hireMe: 'Rekrut Saya',
    downloadCV: 'Unduh CV',
    availability: 'Tersedia untuk proyek freelance',
  },
  footer: {
    tagline: 'AI Engineer · Pembangun Otomasi · Arsitek Solusi',
    rights: 'Seluruh hak cipta dilindungi.',
    quickLinks: 'Tautan Cepat',
    connect: 'Terhubung',
  },
}
