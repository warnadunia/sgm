/**
 * Seed konten awal Studio Grafis Minggiran.
 * Jalankan: npm run db:seed
 * Aman diulang — seluruh isi tabel dibersihkan lebih dulu.
 */
import { db } from "./client";
import { artworks, microsites, posts, products } from "./schema";
import { ensureAdminUser } from "./ensure-admin";
import { createId } from "../lib/id";

const blocks = (b: unknown) => JSON.stringify(b);
const imgs = (a: string[]) => JSON.stringify(a);

async function main() {
  console.log("Membersihkan data lama…");
  await db.delete(posts);
  await db.delete(artworks);
  await db.delete(products);
  await db.delete(microsites);

  // ------------------------------------------------------------------ IDS
  const idResidensi = createId();
  const idWorkshop = createId();
  const idPrintParade = createId();
  const idPsgy = createId();

  // ------------------------------------------------------------- MICROSITE
  console.log("Mengisi microsite program & event…");
  await db.insert(microsites).values([
    {
      id: idResidensi,
      slug: "residensi",
      kind: "PROGRAM",
      title: "Residensi Grafis Minggiran",
      tagline: "Ruang tumbuh bagi perupa grafis untuk meneliti, berkarya, dan berjumpa publik.",
      description:
        "Program residensi 8–12 minggu di studio Minggiran untuk perupa grafis lintas teknik: cukil, etsa, sablon, hingga risograf. Berakhir dengan presentasi terbuka di ruang pamer SGM.",
      content:
        "Residensi Grafis Minggiran adalah program tahunan yang membuka pintu studio bagi perupa grafis dari seluruh Indonesia. Selama 8 hingga 12 minggu, perupa terpilih tinggal dan bekerja di Padukuhan Minggiran, memakai seluruh fasilitas studio, dan didampingi mentor perupa senior Yogyakarta.\n\nProgram ini percaya bahwa grafis bukan sekadar teknik mencetak, melainkan cara berpikir tentang ganda, edisi, dan perjumpaan dengan publik. Karena itu setiap periode residensi diakhiri dengan presentasi terbuka — bukan pameran yang kaku, melainkan ruang berbagi proses: plat, draf, gagal cetak, dan karya akhir dipajang berdampingan.\n\nSejak 2019, telah ada 14 perupa residen dari 9 kota. Sebagian karya mereka kini menjadi bagian dari arsip katalog SGM.",
      heroImage: "/images/seed/program-residensi.jpg",
      themeColor: "#FF6B35",
      status: "PUBLISHED",
      edition: "Angkatan ke-8 — 2027",
      location: "Studio Grafis Minggiran, Sleman, Yogyakarta",
      startDate: new Date("2027-02-01"),
      endDate: new Date("2027-04-26"),
      isLiveNow: false,
      isHeadline: true,
      headlineOrder: 2,
      ctaLabel: "Panduan Open Call",
      ctaUrl: "/blog/open-call-residensi-grafis-minggiran-2027",
      blocks: blocks([
        {
          type: "richtext",
          heading: "Yang Kami Tawarkan",
          body: "Akomodasi kamar di kompleks studio, akses penuh ke studio etsa, cukil, sablon, dan mesin riso, konsumsi bahan dasar, sesi kritik karya dwimingguan bersama mentor, serta ruang presentasi akhir yang terbuka untuk publik.",
        },
        {
          type: "info",
          heading: "Ringkasan Program",
          items: [
            { label: "Durasi", value: "8–12 minggu (Februari–April 2027)" },
            { label: "Kuota", value: "3 perupa terpilih + 1 perupa muda jalur beasiswa" },
            { label: "Fasilitas", value: "Kamar, studio bersama, bahan dasar, mentoring" },
            { label: "Kewajiban", value: "Presentasi terbuka + donasi 1 karya untuk arsip SGM" },
            { label: "Batas pendaftaran", value: "30 November 2026, 23.59 WIB" },
            { label: "Biaya pendaftaran", value: "Gratis" },
          ],
        },
        {
          type: "schedule",
          heading: "Alur Seleksi Angkatan ke-8",
          items: [
            { time: "1 Okt – 30 Nov 2026", title: "Pendaftaran portofolio dibuka", note: "Daring, lewat tautan resmi microsite ini" },
            { time: "Des 2026", title: "Kurasi tahap satu", note: "Seleksi berkas oleh tim kurator SGM" },
            { time: "Jan 2027", title: "Wawancara daring", note: "12 kandidat terpilih" },
            { time: "15 Jan 2027", title: "Pengumuman residen", note: "Diumumkan di microsite & kanal media sosial SGM" },
            { time: "Feb – Apr 2027", title: "Periode residensi", note: "Tinggal dan berkarya di Minggiran" },
          ],
        },
        {
          type: "richtext",
          heading: "Untuk Siapa?",
          body: "Perupa grafis Indonesia tanpa batas usia, dengan praktik berkarya minimal dua tahun. Kami terbuka pada perupa yang bekerja dengan teknik cetak konvensional maupun pendekatan grafis yang diperluas — zine, cetak digital, hingga instalasi cetak.",
        },
      ]),
      images: imgs(["/images/seed/program-residensi.jpg", "/images/seed/hero-studio.jpg"]),
    },
    {
      id: idWorkshop,
      slug: "workshop",
      kind: "PROGRAM",
      title: "Workshop & Kelas Studio",
      tagline: "Belajar cetak mencetak langsung dari meja kerja — dari sablon kaos sampai etsa plat tembaga.",
      description:
        "Kelas rutin bulanan terbuka untuk umum: Sablon Dasar, Cukil Kayu, Etsa, dan Risograf. Kelompok kecil maksimal 16 peserta, dibimbing perupa aktif SGM.",
      content:
        "Workshop SGM lahir dari keyakinan sederhana: teknik grafis paling enak dipelajari dengan tangan kotor tinta. Setiap bulan kami membuka empat kelas reguler di akhir pekan — Sablon Dasar, Cukil Kayu, Etsa, dan Risograf — masing-masing berlangsung dua hari penuh.\n\nKelas dirancang untuk pemula total maupun pegiat yang ingin memperdalam. Peserta pulang membawa karya, plat cetak milik sendiri, dan akses ke grup alumni tempat sesi cetak bersama rutin digelar.\n\nSelain kelas reguler, kami juga menerima workshop privat untuk komunitas, kampus, dan perusahaan dengan kurikulum yang disesuaikan.",
      heroImage: "/images/seed/program-workshop.jpg",
      themeColor: "#FFC532",
      status: "PUBLISHED",
      edition: "Kelas reguler 2026",
      location: "Studio Grafis Minggiran, Sleman, Yogyakarta",
      isLiveNow: false,
      isHeadline: false,
      headlineOrder: 0,
      ctaLabel: "Amankan Kursi",
      ctaUrl: "/blog/kelas-sablon-dasar-angkatan-12",
      blocks: blocks([
        {
          type: "lineup",
          heading: "Kelas Reguler",
          items: [
            { name: "Sablon Dasar", role: "2 hari — screen, fotoemulsi, cetak kaos & kertas" },
            { name: "Cukil Kayu", role: "2 hari — mata pisau, papan kayu, cetak edisi" },
            { name: "Etsa Intaglio", role: "2 hari — hard ground, aquatint, plat tembaga" },
            { name: "Risograf & Zine", role: "2 hari — separasi warna, overprint, lipat-jilid zine" },
          ],
        },
        {
          type: "info",
          heading: "Informasi Kelas",
          items: [
            { label: "Biaya", value: "Mulai Rp450.000 / kelas (termasuk bahan & makan siang)" },
            { label: "Jadwal", value: "Sabtu–Minggu, 09.00–16.00 WIB" },
            { label: "Kapasitas", value: "Maksimal 16 peserta / kelas" },
            { label: "Lokasi", value: "Studio Grafis Minggiran, Sardonoharjo, Sleman" },
            { label: "Pendaftaran", value: "Lewat tautan di microsite / WhatsApp studio" },
          ],
        },
        {
          type: "schedule",
          heading: "Jadwal Terdekat",
          items: [
            { time: "11–12 Okt 2026", title: "Sablon Dasar Angkatan 12", note: "Sisa 4 kursi" },
            { time: "18–19 Okt 2026", title: "Cukil Kayu Angkatan 9", note: "Pendaftaran dibuka" },
            { time: "25–26 Okt 2026", title: "Etsa Intaglio Angkatan 6", note: "Pendaftaran dibuka" },
            { time: "1–2 Nov 2026", title: "Risograf & Zine", note: "Segera" },
          ],
        },
      ]),
      images: imgs(["/images/seed/program-workshop.jpg"]),
    },
    {
      id: idPrintParade,
      slug: "print-parade",
      kind: "EVENT",
      title: "Print Parade",
      tagline: "Parade cetakan di jalanan kampung — festival yang membawa seni grafis keluar dari galeri.",
      description:
        "Event tahunan SGM setiap Februari: arak-arakan cetakan raksasa, pasar cetak, demo cetak langsung, dan panggung kolaborasi di sepanjang Jalan Minggiran.",
      content:
        "Print Parade dimulai 2021 dari pertanyaan iseng: bagaimana kalau cetakan tidak digantung diam di dinding, tetapi diajak jalan-jalan? Jawabannya adalah parade — perupa, warga kampung, dan siapa pun boleh ikut mengarak cetakan ukuran manusia menyusuri Jalan Minggiran.\n\nEmpat edisi berjalan, Print Parade tumbuh menjadi festival grafis jalanan: ada pasar cetak dengan 40+ lapak zine dan art print, demo cukil dan sablon terbuka, lapak cetak kaos bayar-sukarela, sampai panggung musik yang posternya dicetak langsung di tempat.\n\nEdisi ke-5 hadir Februari 2027 dengan tema besar “GANDA!” — merayakan sifat dasar grafis: satu plat, ribuan kemungkinan.",
      heroImage: "/images/seed/poster-print-parade.jpg",
      themeColor: "#FF4D6D",
      status: "PUBLISHED",
      edition: "Edisi #5 — “GANDA!” — 2027",
      location: "Sepanjang Jalan Minggiran & halaman studio",
      startDate: new Date("2027-02-13"),
      endDate: new Date("2027-02-21"),
      isLiveNow: false,
      isHeadline: false,
      headlineOrder: 0,
      ctaLabel: "Lihat Dokumentasi #4",
      ctaUrl: "/blog/print-parade-4-dokumentasi",
      blocks: blocks([
        {
          type: "richtext",
          heading: "Tentang Edisi #5",
          body: "“GANDA!” mengajak 60+ perupa dan kolektif mengeksplorasi ide penggandaan: cetak ulang arsip lama, kolaborasi plat bersama, dan modul cetak yang bisa dirakit siapa saja. Arak-arakan utama digelar 13 Februari 2027 pukul 15.30 WIB, dimulai dari gapura Minggiran.",
        },
        {
          type: "schedule",
          heading: "Rundown Edisi #5 (pra-rilis)",
          items: [
            { time: "13 Feb 2027", title: "Parade Pembuka & Pasar Cetak hari pertama", note: "15.30–22.00 WIB" },
            { time: "14 Feb 2027", title: "Demo Cukil Raksasa", note: "Papan 2×1 meter dicetak pakai mesin gilas" },
            { time: "18 Feb 2027", title: "Malam Zine & Panggung Kolaborasi", note: "20.00–selesai" },
            { time: "20 Feb 2027", title: "Lelang Amal Cetakan", note: "Hasil untuk beasiswa residensi" },
            { time: "21 Feb 2027", title: "Penutupan & Cuci Plat Bersama", note: "Ritual tahunan SGM" },
          ],
        },
        {
          type: "info",
          heading: "Informasi Pengunjung",
          items: [
            { label: "Tiket", value: "Gratis — cukup datang dan bawa kaos polos untuk dicetak" },
            { label: "Waktu", value: "13–21 Februari 2027" },
            { label: "Lokasi", value: "Jalan Minggiran, Sardonoharjo, Ngaglik, Sleman" },
            { label: "Parkir", value: "Kantong parkir di balai dusun & SD Minggiran" },
          ],
        },
      ]),
      images: imgs(["/images/seed/poster-print-parade.jpg", "/images/seed/art-riso.jpg"]),
    },
    {
      id: idPsgy,
      slug: "pekan-seni-grafis-yogyakarta",
      kind: "EVENT",
      title: "Pekan Seni Grafis Yogyakarta",
      tagline: "Sepuluh hari perayaan seni grafis se-Yogyakarta: pameran, lokakarya, forum, dan pasar cetak.",
      description:
        "PSGY #6 — 2–11 Oktober 2026. Pameran utama 120 karya dari 48 perupa, 9 lokakarya publik, forum kuratorial, dan pasar cetak di empat titik kota.",
      content:
        "Pekan Seni Grafis Yogyakarta (PSGY) adalah pekan raya seni grafis yang diinisiasi SGM bersama jejaring studio, kampus, dan galeri se-Yogyakarta. Edisi ke-6 mengangkat tema “Tinta di Atas Kota” — melihat kembali peran cetakan sebagai medium publik: dari poster pergerakan, baliho tukang, sampai stiker motor.\n\nPameran utama di halaman dan ruang dalam Studio Grafis Minggiran menampilkan 120 karya dari 48 perupa lintas generasi. Pada saat yang sama, sembilan lokakarya publik digelar di empat titik kota, forum kuratorial membedah arsip poster Yogya 1950–1990, dan pasar cetak menutup setiap malam dengan lapak-lapak kecil penuh cetakan terjangkau.\n\nSelama event berlangsung, seluruh informasi resmi — jadwal, peta venue, registrasi lokakarya — hanya diumumkan melalui microsite ini. Tandai halaman ini dan pantau terus.",
      heroImage: "/images/seed/poster-psgy.jpg",
      themeColor: "#2438D8",
      status: "PUBLISHED",
      edition: "Edisi #6 — “Tinta di Atas Kota” — 2026",
      location: "Studio Grafis Minggiran + 3 titik kota",
      startDate: new Date("2026-10-02"),
      endDate: new Date("2026-10-11"),
      isLiveNow: true,
      isHeadline: true,
      headlineOrder: 1,
      ctaLabel: "Registrasi Lokakarya",
      ctaUrl: "#program",
      blocks: blocks([
        {
          type: "richtext",
          heading: "Sedang Berlangsung",
          body: "PSGY #6 berlangsung 2 hingga 11 Oktober 2026. Pameran utama buka setiap hari pukul 10.00–21.00 WIB di Studio Grafis Minggiran dan tiga titik kota: Pojok Tirto, Gedung Eks-Percetakan Negara, dan Pasar Seni Gabusan. Seluruh informasi resmi event ini hanya diterbitkan lewat microsite ini — waspadai akun palsu yang mengatasnamakan panitia.",
        },
        {
          type: "schedule",
          heading: "Agenda Utama Pekan Ini",
          items: [
            { time: "4 Okt 2026 · 10.00", title: "Tur Kuratorial #1", note: "Pameran utama, kumpul di meja registrasi SGM" },
            { time: "4 Okt 2026 · 15.30", title: "Lokakarya: Cukil untuk Pemula", note: "Gabusan — registrasi ditutup H-1" },
            { time: "5 Okt 2026 · 16.00", title: "Forum: Poster Pergerakan Yogya 1950–1990", note: "Eks-Percetakan Negara, terbuka untuk umum" },
            { time: "6 Okt 2026 · 10.00", title: "Lokakarya: Separasi Risograf", note: "Studio SGM — kelas kecil 12 orang" },
            { time: "7 Okt 2026 · 19.00", title: "Pemutaran & Diskusi: Cetak dan Kota", note: "Pojok Tirto" },
            { time: "8 Okt 2026 · 10.00", title: "Tur Kuratorial #2 (ramah anak)", note: "Pameran utama SGM" },
            { time: "9–10 Okt 2026", title: "Pasar Cetak Akhir Pekan", note: "40 lapak di halaman SGM, 10.00–21.00" },
            { time: "11 Okt 2026 · 19.30", title: "Penutupan & Pengumuman Karya Terpilih", note: "Panggung halaman SGM" },
          ],
        },
        {
          type: "lineup",
          heading: "Sebagian Perupa & Kolektif Partisipan",
          items: [
            { name: "Sari Widyastuti", role: "Cukil — Yogyakarta" },
            { name: "Baskara Adi Putra", role: "Sablon — Yogyakarta" },
            { name: "Lestari Handayani", role: "Etsa — Solo" },
            { name: "Kolektif Gilas Bersama", role: "Cetak jalanan — Yogyakarta" },
            { name: "Ruang Riso 99", role: "Risograf & zine — Bandung" },
            { name: "Anindya Prameswari", role: "Litografi — Jakarta" },
            { name: "Serikat Kaos Kampung", role: "Sablon kaos — Minggiran" },
            { name: "Arsip Grafis Nusantara", role: "Presentasi arsip — Yogyakarta" },
          ],
        },
        {
          type: "info",
          heading: "Informasi Pengunjung",
          items: [
            { label: "Tiket pameran", value: "Gratis, registrasi di meja depan (kapasitas bergilir)" },
            { label: "Lokakarya", value: "Rp35.000–Rp85.000 — slot terbatas, registrasi daring di microsite ini" },
            { label: "Jam", value: "Setiap hari 10.00–21.00 WIB, 2–11 Oktober 2026" },
            { label: "Venue utama", value: "Studio Grafis Minggiran, Sardonoharjo, Ngaglik, Sleman" },
            { label: "Akses", value: "Shuttle gratis antar-venue tiap 45 menit dari halaman SGM" },
          ],
        },
        {
          type: "gallery",
          heading: "Cuplikan Karya yang Dipamerkan",
          images: ["/images/seed/art-cukil.jpg", "/images/seed/art-sablon.jpg", "/images/seed/art-etsa.jpg", "/images/seed/art-riso.jpg"],
        },
      ]),
      images: imgs(["/images/seed/poster-psgy.jpg", "/images/seed/art-cukil.jpg", "/images/seed/art-sablon.jpg"]),
    },
  ]);

  // -------------------------------------------------------------- ARTWORKS
  console.log("Mengisi arsip karya…");
  await db.insert(artworks).values([
    {
      slug: "ladang-kerbau-dan-merapi",
      title: "Ladang, Kerbau, dan Merapi",
      artist: "Sari Widyastuti",
      year: 2024,
      technique: "Cukil Kayu",
      medium: "Tinta hitam di kertas daluang",
      dimensions: "60 × 45 cm",
      edition: "Edisi 12/30",
      category: "Karya",
      description:
        "Dicukil dari satu papan kayu jati bekas pintu rumah, karya ini merekam lanskap agraris di kaki Merapi sekaligus ketegangan antara kerja, tanah, dan gunung yang tak pernah benar-benar diam.",
      images: imgs(["/images/seed/art-cukil.jpg"]),
      featured: true,
    },
    {
      slug: "nona-melati",
      title: "Nona Melati",
      artist: "Baskara Adi Putra",
      year: 2023,
      technique: "Sablon 3 Warna",
      medium: "Tinta plastisol di kertas concorde",
      dimensions: "70 × 50 cm",
      edition: "Edisi 8/25",
      category: "Karya",
      description:
        "Seri potret tiga warna dengan lapisan pink fluor yang disengajakan bergeser dua milimeter — meniru cara mata kita merekam wajah yang sedang bergerak.",
      images: imgs(["/images/seed/art-sablon.jpg"]),
      featured: true,
    },
    {
      slug: "atap-atap-kota",
      title: "Atap-atap Kota",
      artist: "Lestari Handayani",
      year: 2022,
      technique: "Etsa + Aquatint",
      medium: "Tinta sepia di kertas hahnemühle",
      dimensions: "50 × 35 cm",
      edition: "Edisi 4/20",
      category: "Karya",
      description:
        "Digarap dari sketsa atap ke atap selama tiga bulan, etsa ini memetakan Yogyakarta lama dari sudut yang jarang dilihat: langit-langit kota beserta menara, antena, dan gunung di kejauhan.",
      images: imgs(["/images/seed/art-etsa.jpg"]),
      featured: true,
    },
    {
      slug: "bayang-bayang-rimba",
      title: "Bayang-Bayang Rimba",
      artist: "Ruang Riso 99",
      year: 2025,
      technique: "Risograf 3 Warna",
      medium: "Tinta riso teal, oranye fluor, ungu di kertas samson",
      dimensions: "42 × 29,7 cm",
      edition: "Edisi 63/100",
      category: "Karya",
      description:
        "Komposisi bentuk geometris yang meminjam bahasa wayang kulit; tiga master riso ditumpuk dengan register longgar sehingga tiap cetakan dalam edisi ini sedikit berbeda satu sama lain.",
      images: imgs(["/images/seed/art-riso.jpg"]),
      featured: true,
    },
    {
      slug: "poster-print-parade-4",
      title: "Poster Resmi Print Parade #4",
      artist: "Kolektif SGM",
      year: 2026,
      technique: "Sablon 2 Warna",
      medium: "Tinta plastisol di kertas BC",
      dimensions: "A2 (59,4 × 42 cm)",
      edition: "Cetakan terbatas 150 lembar",
      category: "Poster",
      description:
        "Poster resmi Print Parade edisi ke-4, dicetak massal oleh relawan dalam satu malam panjang di studio. Sisa edisi masih tersedia di artshop.",
      images: imgs(["/images/seed/poster-print-parade.jpg"]),
      featured: false,
    },
    {
      slug: "poster-psgy-6-tinta-di-atas-kota",
      title: "Poster PSGY #6 “Tinta di Atas Kota”",
      artist: "Anindya Prameswari × Kolektif SGM",
      year: 2026,
      technique: "Sablon 2 Warna",
      medium: "Tinta biru kobalt & kuning di kertas krem",
      dimensions: "A2 (59,4 × 42 cm)",
      edition: "Cetakan terbatas 200 lembar",
      category: "Poster",
      description:
        "Identitas visual Pekan Seni Grafis Yogyakarta edisi ke-6: halftone alat-alat cetak bertemu pola kota. Dicetak dua warna dengan overprint kasar yang disengajakan.",
      images: imgs(["/images/seed/poster-psgy.jpg"]),
      featured: false,
    },
  ]);

  // -------------------------------------------------------------- PRODUCTS
  console.log("Mengisi artshop…");
  await db.insert(products).values([
    {
      slug: "kaos-cukil-gunung-matahari",
      name: "Kaos Cukil “Gunung & Matahari”",
      description:
        "Kaos katun 24s warna ecru dengan sablon hitam satu warna dari desain cukil asli SGM. Dicetak manual di studio — bukan DTG — sehingga tintanya tebal dan awet dicuci. Jahitan rantai, regular fit.\n\nGambar kedua menunjukkan karya cukil sumber desain ini.",
      price: 155000,
      comparePrice: null,
      stock: 24,
      category: "Apparel",
      images: imgs(["/images/seed/prod-kaos-1.jpg", "/images/seed/art-cukil.jpg"]),
      isFeatured: true,
      isAvailable: true,
    },
    {
      slug: "art-print-ladang-kerbau-merapi",
      name: "Art Print “Ladang, Kerbau, dan Merapi” (A2)",
      description:
        "Reproduksi cetak tinggi karya cukil Sari Widyastuti, dicetak dengan tinta pigmen arsip di kertas fine art 260 gsm. Setiap lembar dibubuhi nomor edisi dan cap basah studio.\n\nEdisi terbatas — tidak akan dicetak ulang setelah habis.",
      price: 450000,
      comparePrice: null,
      stock: 7,
      category: "Art Print",
      images: imgs(["/images/seed/art-cukil.jpg", "/images/seed/hero-studio.jpg"]),
      isFeatured: true,
      isAvailable: true,
    },
    {
      slug: "art-print-nona-melati",
      name: "Art Print “Nona Melati” (A2)",
      description:
        "Sablon 3 warna karya Baskara Adi Putra dari seri potret 2023. Karena proses cetak manual dengan register longgar, tiap lembar memiliki pergeseran warna unik — silakan lihat foto proses pencetakan di gambar kedua.",
      price: 475000,
      comparePrice: 550000,
      stock: 9,
      category: "Art Print",
      images: imgs(["/images/seed/art-sablon.jpg", "/images/seed/program-workshop.jpg"]),
      isFeatured: true,
      isAvailable: true,
    },
    {
      slug: "totebag-riso-burung-matahari",
      name: "Totebag Riso “Burung Matahari”",
      description:
        "Totebag kanvas 12oz dengan motif hasil eksperimen risograf SGM — dicetak sablon pink fluor satu warna di dua sisi. Ukuran 38 × 42 cm, muat laptop 14 inci dan satu tumpuk zine.",
      price: 125000,
      comparePrice: null,
      stock: 30,
      category: "Merchandise",
      images: imgs(["/images/seed/art-riso.jpg", "/images/seed/poster-print-parade.jpg"]),
      isFeatured: true,
      isAvailable: true,
    },
    {
      slug: "zine-minggiran-vol-3",
      name: "Zine MINGGIRAN Vol. 3",
      description:
        "Terbitan dwi-tahunan studio: 48 halaman berisi cuplikan proses residensi 2024–2026, komik cukil, dan poster lipat bonus di halaman tengah. Dicetak riso 3 warna, dijilid staples tangan, tiruan 300 eksemplar.",
      price: 65000,
      comparePrice: null,
      stock: 42,
      category: "Zine",
      images: imgs(["/images/seed/art-etsa.jpg", "/images/seed/art-riso.jpg"]),
      isFeatured: false,
      isAvailable: true,
    },
    {
      slug: "poster-resmi-psgy-6",
      name: "Poster Resmi PSGY #6 (A2)",
      description:
        "Poster resmi Pekan Seni Grafis Yogyakarta edisi ke-6, sablon 2 warna karya Anindya Prameswari × Kolektif SGM. Dikirim digulung dalam tabung karton. Sebagian hasil penjualan menopang dana penyelenggaraan PSGY tahun depan.",
      price: 85000,
      comparePrice: null,
      stock: 57,
      category: "Art Print",
      images: imgs(["/images/seed/poster-psgy.jpg", "/images/seed/hero-studio.jpg"]),
      isFeatured: false,
      isAvailable: true,
    },
  ]);

  // ----------------------------------------------------------------- POSTS
  console.log("Mengisi blog…");
  await db.insert(posts).values([
    {
      slug: "psgy-6-resmi-dibuka",
      title: "Pekan Seni Grafis Yogyakarta #6 Resmi Dibuka",
      excerpt:
        "Sepuluh hari ke depan, Yogyakarta jadi panggung seni grafis: 120 karya, 48 perupa, 9 lokakarya, 4 titik kota. Semua info resmi hanya lewat microsite PSGY.",
      content:
        "Pekan Seni Grafis Yogyakarta edisi ke-6 resmi dibuka pada Jumat, 2 Oktober 2026 di halaman Studio Grafis Minggiran. Dengan tema “Tinta di Atas Kota”, edisi ini mempertemukan 48 perupa lintas generasi dan 120 karya di empat titik venue.\n\nBerbeda dari tahun-tahun sebelumnya, seluruh informasi resmi — jadwal lokakarya, pembagian slot tur kuratorial, sampai peta shuttle antar-venue — tahun ini hanya diterbitkan lewat microsite PSGY. Langkah ini kami ambil untuk merapikan arus informasi dan memangkas penyebaran jadwal simpang siur.\n\nSampai jumpa di antara tumpukan cetakan!",
      coverImage: "/images/seed/poster-psgy.jpg",
      category: "Kabar Event",
      micrositeId: idPsgy,
      published: true,
      publishedAt: new Date("2026-10-02T10:00:00+07:00"),
    },
    {
      slug: "open-call-residensi-grafis-minggiran-2027",
      title: "Open Call: Residensi Grafis Minggiran Angkatan ke-8 (2027)",
      excerpt:
        "Pendaftaran residensi 8–12 minggu di Minggiran resmi dibuka hingga 30 November 2026. Tiga kuota reguler + satu jalur beasiswa untuk perupa muda.",
      content:
        "Kabar baik untuk para perupa grafis: open call Residensi Grafis Minggiran Angkatan ke-8 resmi dibuka hari ini. Periode residensi akan berlangsung Februari hingga April 2027, dengan tiga kuota reguler dan satu kuota beasiswa khusus perupa muda di bawah 25 tahun.\n\nSeperti tahun-tahun sebelumnya, residen mendapatkan kamar di kompleks studio, akses penuh ke fasilitas etsa-cukil-sablon-riso, serta sesi kritik dwimingguan bersama mentor. Kewajibannya sederhana: presentasi terbuka di akhir periode dan donasi satu karya untuk arsip SGM.\n\nDetail lengkap persyaratan dan alur seleksi bisa dibaca di microsite Residensi. Portofolio diterima paling lambat 30 November 2026 pukul 23.59 WIB.",
      coverImage: "/images/seed/program-residensi.jpg",
      category: "Kabar Program",
      micrositeId: idResidensi,
      published: true,
      publishedAt: new Date("2026-09-28T09:00:00+07:00"),
    },
    {
      slug: "print-parade-4-dokumentasi",
      title: "Melihat Lagi Print Parade #4: Catatan dan Dokumentasi",
      excerpt:
        "Februari lalu, 900-an orang turun ke Jalan Minggiran mengarak cetakan seukuran manusia. Berikut catatan kecil dan tautan arsip dokumentasinya.",
      content:
      "Print Parade #4 pada 14–22 Februari 2026 menjadi edisi teramai sejauh ini: 900-an peserta ikut arak-arakan pembuka, pasar cetak diisi 44 lapak, dan mesin gilas mencetak papan cukil 2×1 meter di depan mata pengunjung yang duduk lesehan.\n\nSebagian hasil dokumentasi kini masuk arsip katalog situs ini, dan poster resmi edisi #4 masih tersisa beberapa lembar di artshop.\n\nSimpan tanggalnya: Print Parade #5 — “GANDA!” — kembali turun ke jalan pada 13–21 Februari 2027. Microsite Print Parade akan menjadi satu-satunya kanal info resmi saat event berlangsung.",
      coverImage: "/images/seed/poster-print-parade.jpg",
      category: "Kabar Event",
      micrositeId: idPrintParade,
      published: true,
      publishedAt: new Date("2026-02-25T15:00:00+07:00"),
    },
    {
      slug: "kelas-sablon-dasar-angkatan-12",
      title: "Kelas Sablon Dasar Angkatan 12 Segera Dibuka, Kuota 16 Kursi",
      excerpt:
        "Akhir pekan 11–12 Oktober, studio kembali menggelar kelas sablon dua hari untuk pemula. Biaya Rp450.000 sudah termasuk semua bahan.",
      content:
        "Kelas Sablon Dasar Angkatan 12 akan digelar pada Sabtu–Minggu, 11–12 Oktober 2026, pukul 09.00–16.00 WIB di Studio Grafis Minggiran. Peserta akan belajar dari nol: coating screen dengan fotoemulsi, ekspos desain, afdruk, sampai cetak satu warna di kaos dan kertas.\n\nBiaya Rp450.000 per peserta sudah termasuk seluruh bahan, satu kaos polos, makan siang, dan akses seumur hidup ke grup alumni tempat sesi cetak bersama rutin digelar tiap bulan.\n\nKuota hanya 16 kursi dan biasanya habis dalam hitungan hari. Pendaftaran lewat microsite Workshop atau WhatsApp studio.",
      coverImage: "/images/seed/program-workshop.jpg",
      category: "Kabar Program",
      micrositeId: idWorkshop,
      published: true,
      publishedAt: new Date("2026-09-20T11:00:00+07:00"),
    },
    {
      slug: "digitalisasi-arsip-cetakan-2019-2026",
      title: "Merawat Arsip: Digitalisasi Koleksi Cetakan 2019–2026",
      excerpt:
        "Delapan tahun cetakan dari studio, residensi, dan event SGM sedang kami pindai dan susun jadi katalog daring. Halaman Arsip di situs ini adalah pintunya.",
      content:
        "Sejak studio berdiri pada 2018, ratusan cetakan lahir dari meja-meja kerja Minggiran: karya residen, poster event, zine kolaborasi, sampai cetakan uji yang gagal sekalipun. Tahun ini kami mulai memindai dan mendigitalisasi seluruh koleksi tersebut.\n\nHalaman Arsip & Katalog di situs ini adalah pintu masuknya. Katalog bisa disaring menurut tahun dan teknik — cukil kayu, sablon, etsa, litografi, sampai risograf — dan setiap entri dilengkapi data edisi, medium, dan catatan perupa.\n\nProses digitalisasi masih berjalan. Kalau kamu pernah ikut program SGM dan merasa ada karyamu yang belum terdata, silakan hubungi kami — arsip ini milik bersama.",
      coverImage: "/images/seed/art-etsa.jpg",
      category: "Umum",
      micrositeId: null,
      published: true,
      publishedAt: new Date("2026-09-10T08:30:00+07:00"),
    },
  ]);

  console.log("Memastikan akun admin…");
  await ensureAdminUser();

  console.log("✓ Seed selesai!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed gagal:", err);
  process.exit(1);
});
