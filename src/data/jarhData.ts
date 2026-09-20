import { RawiProfile, HadithSanadAnalysis } from '../types';

export const MARATIB_TA_DIL = [
  {
    tingkat: 1,
    nama: "Tingkat Pertama (Sahabat Nabi ﷺ)",
    lafadz: "الصحابة رضي الله عنهم",
    hukum: "Kulluhum 'Udul (كلهم عدول) - Seluruh sahabat Nabi adalah adil secara mutlak berdasarkan pengukuhan Al-Qur'an dan As-Sunnah tanpa perlu penelitian jarh.",
    contoh: "عمر بن الخطاب، عائشة أم المؤمنين، أبو هريرة، أنس بن مالك"
  },
  {
    tingkat: 2,
    nama: "Tingkat Kedua (Mubalaghah / Puncak Tsiqah)",
    lafadz: "أوثق الناس، ثقة ثقة، ثقة ثبت، إمام حجة",
    hukum: "Haditsnya berada pada derajat keshahihan tertinggi (A'lal hadits ash-shahih). Dapat dijadikan hujjah mandiri dan acuan tarjih.",
    contoh: "سفيان بن عيينة، مالك بن أنس، شعبة بن الحجاج، يحيى بن معين"
  },
  {
    tingkat: 3,
    nama: "Tingkat Ketiga (Tsiqah Mutlaq)",
    lafadz: "ثقة، متقن، ثبت، عدل حافظ، ضابط",
    hukum: "Haditsnya shahih dan dapat dijadikan hujjah mandiri.",
    contoh: "يحيى بن سعيد الأنصاري، عبد الله بن يوسف التنيسي، هشام بن عروة"
  },
  {
    tingkat: 4,
    nama: "Tingkat Keempat (Shaduq / Hasanul Hadits)",
    lafadz: "صدوق، لا بأس به، مأمون، خيار",
    hukum: "Haditsnya bernilai Hasan lidzatihi. Menjadi hujjah kecuali bila terbukti syadz atau ada 'illah.",
    contoh: "محمد بن إبراهيم التيمي، العلاء بن عبد الرحمن"
  },
  {
    tingkat: 5,
    nama: "Tingkat Kelima (Shaduq Yahim / Sedikit Lemah Hafalan)",
    lafadz: "محله الصدق، صدوق يهم، شيخ، ليس ببعيد من الصواب",
    hukum: "Haditsnya tidak sampai shahih mandiri, dicatat untuk i'tibar (mutaba'ah & syahid) dan bisa naik menjadi Hasan lighairihi.",
    contoh: "عطاء بن السائب (بعد الاختلاط)، محمد بن إسحاق (إذا صرّح بالسماع)"
  },
  {
    tingkat: 6,
    nama: "Tingkat Keenam (Adna Maratib Ta'dil)",
    lafadz: "صالح الحديث، مقارب الحديث، يكتب حديثه",
    hukum: "Hanya ditulis riwayatnya untuk pembanding, haditsnya lemah bila bersendirian.",
    contoh: "الرواة المستورون الذين لم يجرحوا جرحاً مفسراً"
  }
];

export const MARATIB_JARH = [
  {
    tingkat: 1,
    nama: "Tingkat Pertama (Paling Ringan)",
    lafadz: "لين الحديث، فيه مقال، ليس بذاك القوي، تكلموا فيه",
    hukum: "Haditsnya lemah ringan, boleh ditulis untuk i'tibar dan penguat jalur lain.",
    status: "Dha'if Ringan"
  },
  {
    tingkat: 2,
    nama: "Tingkat Kedua (Ghoiru Hujjah)",
    lafadz: "لا يحتج به، ضعيف، مضطرب الحديث، واهٍ",
    hukum: "Tidak dapat dijadikan dalil mandiri, masih bisa dikaji apakah ada syahid yang selaras.",
    status: "Dha'if"
  },
  {
    tingkat: 3,
    nama: "Tingkat Ketiga (Dha'if Syadid)",
    lafadz: "ضعيف جداً، واهٍ بمرة، ساقط، ردوا حديثه",
    hukum: "Gugur dan tidak dapat terangkat derajatnya walaupun banyak jalur (laa yanjabir).",
    status: "Dha'if Sangat Berat"
  },
  {
    tingkat: 4,
    nama: "Tingkat Keempat (Tertuduh Dusta / Matruk)",
    lafadz: "متروك الحديث، متهم بالكذب، يسرق الحديث، ساقط العدالة",
    hukum: "Haditsnya Matruk (ditinggalkan), tidak halal diriwayatkan kecuali untuk peringatan tahdzir.",
    status: "Matruk / Muttaham"
  },
  {
    tingkat: 5,
    nama: "Tingkat Kelima (Pendusta / Pemalsu Hadits)",
    lafadz: "كذاب، وضاع، يضع الحديث، دجال",
    hukum: "Haditsnya Maudhu' (palsu), haram dinisbatkan kepada Rasulullah ﷺ.",
    status: "Maudhu' / Kadzdzab"
  },
  {
    tingkat: 6,
    nama: "Tingkat Keenam (Puncak Kedustaan)",
    lafadz: "أكذب الناس، إليه المنتهى في الكذب، ركن الكذب",
    hukum: "Gembong pemalsu riwayat.",
    status: "Asyaddul Jarh"
  }
];

export const KAIDAH_JARH_TADIL = [
  {
    judul: "Al-Jarh Al-Mufassar Muqaddamun 'Ala At-Ta'dil",
    arab: "الجَرْحُ المُفَسَّرُ مُقَدَّمٌ عَلَى التَّعْدِيلِ",
    kaidah: "Apabila seorang perawi dinilai tsiqah oleh sebagian ulama namun dicela (jarh) oleh ulama lain dengan menyebutkan sebab celaan secara rinci dan terbukti, maka penilaian jarh didahulukan karena pencela memiliki tambahan ilmu tentang cela yang tidak diketahui oleh penta'dil."
  },
  {
    judul: "At-Ta'dil Muqaddamun 'Inda Al-Jarh Al-Mubham",
    arab: "التَّعْدِيلُ مُقَدَّمٌ عَلَى الجَرْحِ المُبْهَمِ",
    kaidah: "Jika celaan terhadap seorang perawi bersifat umum tanpa rincian alasan (misal sekadar ucapan 'fiihi nazhar' tanpa bukti cacat syariat/hafalan) sementara ada imam mu'tabar yang mentsiqahkannya, maka ta'dil tetap dimenangkan."
  },
  {
    judul: "Tasharruf Nuqqad fi at-Tasyaddud wat-Tasahul",
    arab: "طَبَقَاتُ النُّقَّادِ فِي التَّشَدُّدِ وَالتَّوَسُّطِ وَالتَّسَاهُلِ",
    kaidah: "Para ulama naqqad terbagi menjadi tiga kelompok: Mutasyaddid (ketat seperti Abu Hatim, An-Nasa'i, Yahya Al-Qaththan), Mu'tadil / Munsif (moderat dan teliti seperti Al-Bukhari, Ahmad bin Hanbal, Adz-Dzahabi, Ibnu Hajar), serta Mutasahil (mudah memberi ta'dil seperti Ibnu Hibban dan Al-Hakim)."
  },
  {
    judul: "'Adalah Ash-Shahabah",
    arab: "عَدَالَةُ الصَّحَابَةِ كَافَّةً",
    kaidah: "Seluruh Sahabat Nabi ﷺ dinyatakan adil dan terpercaya (kulluhum 'udul) secara ijma' kaum muslimin, berlandaskan persaksian Allah di dalam Al-Qur'an dan sabda Rasulullah ﷺ. Sanad yang sampai kepada Sahabat tidak perlu diuji kejujurannya."
  }
];

export const RAWI_PROFILES: RawiProfile[] = [
  {
    id: 'rawi-umar',
    name: 'Umar bin Al-Khaththab',
    nameArabic: 'عُمَرُ بْنُ الْخَطَّابِ بْنِ نُفَيْلٍ الْقُرَشِيُّ',
    kunyah: 'Abu Hafsh (أبو حفص)',
    nasab: "Al-Qurasyi Al-'Adawi, Amirul Mukminin, Al-Faruq",
    thabaqah: 'Thabaqah 1 (Sahabat Nabi ﷺ)',
    thabaqahNumber: 1,
    deathYear: '23 H (Madinah Munawwarah)',
    domicile: 'Madinah',
    statusTaqrib: 'Shahabiyyun Jalil - Amirul Mukminin (kulluhum \'udul)',
    statusCategory: 'sahabat',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 1: Sahabat Nabi ﷺ',
    aqwalAimmah: [
      {
        imam: 'Ijma\' Ummat Islam',
        qawl: 'أجمع المسلمون قاطبة على عدالة أصحاب رسول الله صلى الله عليه وسلم، وعمر من أئمة الخلفاء الراشدين',
        indonesia: 'Seluruh ummat Islam bersepakat atas keadilan seluruh sahabat, dan Umar adalah khalifah rasyid pembawa hidayah.'
      },
      {
        imam: 'Ibnu Hajar Al-Asqalani',
        qawl: 'الصحابي الجليل، ثاني الخلفاء الراشدين، الفاروق الذي أعز الله به الإسلام',
        indonesia: 'Sahabat mulia, khalifah rasyidin kedua, Al-Faruq yang Allah muliakan Islam melaluinya.'
      }
    ],
    syuyukh: ['Rasulullah Muhammad shallallahu \'alaihi wa sallam'],
    talamidz: ['Abdullah bin Umar', 'Ibnu Abbas', 'Utsman bin Affan', 'Ali bin Abi Thalib', 'Alqamah bin Waqqash Al-Laitsi', 'Qais bin Abi Hazim'],
    biographySummary: 'Sahabat agung yang diberi gelar Al-Faruq oleh Nabi ﷺ. Perawi hadits pokok pertama dalam Shahih Al-Bukhari tentang niat dan keikhlasan. Memerintah khilafah selama 10 tahun 6 bulan dan syahid pada tahun 23 Hijriyah.'
  },
  {
    id: 'rawi-alqamah',
    name: 'Alqamah bin Waqqash Al-Laitsi',
    nameArabic: 'عَلْقَمَةُ بْنُ وَقَّاصٍ اللَّيْثِيُّ',
    kunyah: 'Abu Muhammad (أبو محمد)',
    nasab: 'Al-Laitsi Al-Madani',
    thabaqah: 'Thabaqah 3 (Kibar at-Tabi\'in)',
    thabaqahNumber: 3,
    deathYear: 'Sekitar 70 - 80 H (Madinah)',
    domicile: 'Madinah',
    statusTaqrib: 'Tsiqah Tsabat (ثقة ثبت)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat',
    aqwalAimmah: [
      {
        imam: 'Yahya bin Ma\'in',
        qawl: 'ثقة مأمون ثبت',
        indonesia: 'Tsiqah, terpercaya dan teguh hafalannya.'
      },
      {
        imam: 'Abu Hatim Ar-Razi',
        qawl: 'ثقة من جلة التابعين وكبارهم',
        indonesia: 'Tsiqah dan termasuk pemuka mulia dari kalangan tabi\'in senior.'
      },
      {
        imam: 'Al-Hafizh Ibnu Hajar',
        qawl: 'ثقة ثبت من الطبقة الثالثة، روت له الجماعة',
        indonesia: 'Tsiqah tsabat dari thabaqah ketiga, haditsnya diriwayatkan oleh seluruh perawi Kutubus Sittah.'
      }
    ],
    syuyukh: ['Umar bin Al-Khaththab', 'Aisyah Ummul Mukminin', 'Bilal bin Al-Harits', 'Mu\'awiyah bin Abi Sufyan'],
    talamidz: ['Muhammad bin Ibrahim At-Taimi', 'Ibnu Syihab Az-Zuhri', 'Amr bin Al-Harits'],
    biographySummary: 'Tabi\'in agung Madinah. Jalur tunggal (*gharib an-nasl*) yang menyambungkan riwayat hadits Niat dari Umar bin Al-Khaththab kepada generasi berikutnya.'
  },
  {
    id: 'rawi-muhammad-taimi',
    name: 'Muhammad bin Ibrahim At-Taimi',
    nameArabic: 'مُحَمَّدُ بْنُ إِبْرَاهِيمَ بْنِ الْحَارِثِ التَّيْمِيُّ',
    kunyah: 'Abu Abdullah (أبو عبد الله)',
    nasab: 'At-Taimi Al-Qurasyi Al-Madani',
    thabaqah: 'Thabaqah 4 (Wustha at-Tabi\'in)',
    thabaqahNumber: 4,
    deathYear: '120 H (Madinah)',
    domicile: 'Madinah',
    statusTaqrib: 'Tsiqah Tsabat (ثقة ثبت فصيح)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat',
    aqwalAimmah: [
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'في حديثه شيء، يروي مناكير، ولكنه في أصله ثقة ثبت معتمد',
        indonesia: 'Secara prinsip beliau adalah tsiqah tsabat yang menjadi sandaran para imam.'
      },
      {
        imam: 'An-Nasa\'i',
        qawl: 'ثقة مأمون',
        indonesia: 'Tsiqah dan terpercaya.'
      },
      {
        imam: 'Ibnu Hibban',
        qawl: 'كان فقيهاً متقناً من سادات أهل المدينة',
        indonesia: 'Beliau faqih yang mutqin dan termasuk pemuka penduduk Madinah.'
      }
    ],
    syuyukh: ['Alqamah bin Waqqash Al-Laitsi', 'Anas bin Malik', 'Jabir bin Abdillah', 'Abu Sa\'id Al-Khudri'],
    talamidz: ['Yahya bin Sa\'id Al-Anshari', 'Ibnu Juraij', 'Al-Auza\'i', 'Malik bin Anas'],
    biographySummary: 'Faqih dan mufti Madinah keturunan shahabat Thalhah bin Ubaidillah. Merupakan perawi kunci penghubung hadits niat sebelum tersebar luas melalui Yahya bin Sa\'id.'
  },
  {
    id: 'rawi-yahya-anshari',
    name: 'Yahya bin Sa\'id Al-Anshari',
    nameArabic: 'يَحْيَى بْنُ سَعِيدِ بْنِ قَيْسٍ الأَنْصَارِيُّ',
    kunyah: 'Abu Sa\'id (أبو سعيد)',
    nasab: 'Al-Anshari An-Najjari Al-Madani, Qadhi Al-Madinah wal-Iraq',
    thabaqah: 'Thabaqah 5 (Shighar at-Tabi\'in)',
    thabaqahNumber: 5,
    deathYear: '143 H (Al-Hasyimiyyah, Iraq)',
    domicile: 'Madinah lalu Kufah',
    statusTaqrib: 'Tsiqah Tsabat Hafizh Faqih Hujjah (ثقة ثبت حافظ إمام)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat Imām',
    aqwalAimmah: [
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'أثبت الناس، إمام حجة، يحيى بن سعيد أثبت من الزهري في بعض المواطن',
        indonesia: 'Perawi paling kokoh hafalannya, imam panutan yang menjadi hujjah.'
      },
      {
        imam: 'Ali ibn Al-Madini',
        qawl: 'له نحو ثلاثمائة حديث، وهو ثقة ثقة ثبت متفق عليه',
        indonesia: 'Memiliki sekitar 300 hadits, tsiqah tsiqah tsabat yang disepakati keagungannya.'
      },
      {
        imam: 'Adz-Dzahabi',
        qawl: 'الإمام الكبير الحافظ قاضي القضاة، دار عليه إسناد حديث النيات',
        indonesia: 'Imam besar hafizh qadhi agung, dari beliaulah poros perputaran sanad hadits niat menyebar ke lebih dari 200 rawi.'
      }
    ],
    syuyukh: ['Muhammad bin Ibrahim At-Taimi', 'Sa\'id bin Al-Musayyib', 'Nafi\' Mawla Ibni Umar', 'Anas bin Malik'],
    talamidz: ['Sufyan Ats-Tsauri', 'Sufyan bin \'Uyainah', 'Malik bin Anas', 'Hammad bin Zaid', 'Syu\'bah bin Al-Hajjaj'],
    biographySummary: 'Qadhi Madinah di masa khalifah Umar bin Abdul Aziz lalu diundang ke Iraq. Poros utama sanad hadits Innamal A\'malu Bin Niyyat di mana hadits ini berubah dari gharib menjadi masyhur mustafidh.'
  },
  {
    id: 'rawi-sufyan-uyainah',
    name: 'Sufyan bin \'Uyainah',
    nameArabic: 'سُفْيَانُ بْنُ عُيَيْنَةَ بْنِ مَيْمُونٍ الْهِلاَلِيُّ',
    kunyah: 'Abu Muhammad (أبو محمد)',
    nasab: 'Al-Hilali Al-Kufi kemudian Al-Makki',
    thabaqah: 'Thabaqah 8 (Kibar Tabi\'it Tabi\'in)',
    thabaqahNumber: 8,
    deathYear: '198 H (Makkah Al-Mukarramah)',
    domicile: 'Makkah',
    statusTaqrib: 'Tsiqah Hafizh Faqih Hujjah (ثقة حافظ فقيه حجة إمام)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: "Tingkat 2: A'la Maratib at-Ta'dil",
    aqwalAimmah: [
      {
        imam: 'Asy-Syafi\'i',
        qawl: 'لولا مالك وسفيان بن عيينة لذهب علم الحجاز',
        indonesia: 'Kalaulah bukan karena Malik dan Sufyan bin Uyainah, niscaya lenyaplah ilmu penduduk Hijaz.'
      },
      {
        imam: 'Yahya bin Ma\'in',
        qawl: 'سفيان بن عيينة أثبت الناس في عمرو بن دينار وفي الزهري',
        indonesia: 'Sufyan adalah manusia paling kokoh hafalannya terhadap riwayat Amr bin Dinar dan Az-Zuhri.'
      },
      {
        imam: 'Al-Hafizh Ibnu Hajar',
        qawl: 'ثقة حافظ فقيه إمام حجة، إلا أنه تغير حفظه بأخرة، وكان ربما يدلس لكن عن الثقات',
        indonesia: 'Tsiqah hafizh faqih imam hujjah, hafalannya sedikit berubah di akhir usia namun haditsnya di shahihain terjaga murni.'
      }
    ],
    syuyukh: ['Yahya bin Sa\'id Al-Anshari', 'Az-Zuhri', 'Amr bin Dinar', 'Sulaiman Al-A\'masy'],
    talamidz: ['Al-Humaidi', 'Ahmad bin Hanbal', 'Asy-Syafi\'i', 'Ishaq bin Rahawaih', 'Ali ibn Al-Madini'],
    biographySummary: 'Muhaddits tanah suci Makkah dan guru besar Imam Syafi\'i dan Imam Ahmad. Selama lebih dari 70 tahun menyampaikan hadits di Masjidil Haram.'
  },
  {
    id: 'rawi-humaidi',
    name: 'Al-Humaidi Abdullah bin Az-Zubair',
    nameArabic: 'عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ بْنِ عِيسَى الْحُمَيْدِيُّ',
    kunyah: 'Abu Bakr (أبو بكر)',
    nasab: 'Al-Qurasyi Al-Asadi Al-Makki, Pengarang Musnad Al-Humaidi',
    thabaqah: 'Thabaqah 10 (Kibar Akhidzin \'an Tabi\'it Tabi\'in)',
    thabaqahNumber: 10,
    deathYear: '219 H (Makkah Al-Mukarramah)',
    domicile: 'Makkah',
    statusTaqrib: 'Tsiqah Hafizh Faqih (ثقة حافظ فقيه)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat',
    aqwalAimmah: [
      {
        imam: 'Imam Al-Bukhari',
        qawl: 'الحميدي إمام في الحديث، وهو أول من بدأ به في الجامع الصحيح إجلالاً له',
        indonesia: 'Al-Humaidi adalah imam dalam hadits, dan beliau rawi pertama yang saya sebutkan di Shahih Bukhari untuk memuliakannya.'
      },
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'الحميدي عندنا إمام، كان من أثبت الناس في سفيان بن عيينة',
        indonesia: 'Al-Humaidi di mata kami adalah imam, perawi paling kokoh atas riwayat Sufyan bin Uyainah.'
      },
      {
        imam: 'Abu Hatim Ar-Razi',
        qawl: 'أثبت الناس في ابن عيينة وهو رئيس أصحابه، ثقة إمام',
        indonesia: 'Paling kokoh di antara murid Ibnu Uyainah dan merupakan pemimpin mereka, tsiqah imam.'
      }
    ],
    syuyukh: ['Sufyan bin \'Uyainah', 'Fudhail bin \'Iyadh', 'Ad-Darawardi', 'Asy-Syafi\'i'],
    talamidz: ['Muhammad bin Ismail Al-Bukhari', 'Abu Zur\'ah Ar-Razi', 'Abu Hatim Ar-Razi', 'Harb Al-Kirmani'],
    biographySummary: 'Syaikhul Bukhari di Makkah. Menulis kitab Musnad Al-Humaidi. Diletakkan oleh Imam Bukhari sebagai sanad hadits nomor 1 dalam Shahihnya.'
  },
  {
    id: 'rawi-aisyah',
    name: 'Aisyah binti Abi Bakr Ash-Shiddiq',
    nameArabic: 'عَائِشَةُ بِنْتُ أَبِي بَكْرٍ الصِّدِّيقِ',
    kunyah: 'Ummu Abdillah (أم عبد الله)',
    nasab: 'At-Taimiyyah Al-Qurasyiyyah, Ummul Mukminin, Ash-Shiddiqah binti Ash-Shiddiq',
    thabaqah: 'Thabaqah 1 (Shahabiyyah Jalilah)',
    thabaqahNumber: 1,
    deathYear: '57 H / 58 H (Madinah Munawwarah)',
    domicile: 'Madinah',
    statusTaqrib: 'Ummul Mukminin - Faqihatul Ummah (kulluhum \'udul)',
    statusCategory: 'sahabat',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 1: Sahabat Nabi ﷺ',
    aqwalAimmah: [
      {
        imam: 'Abu Musa Al-Asy\'ari',
        qawl: 'ما أشكل علينا أصحاب رسول الله صلى الله عليه وسلم حديث قط فسألنا عائشة إلا وجدنا عندها منه علماً',
        indonesia: 'Tidak pernah kami para sahabat menjumpai kerancuan hadits lalu bertanya kepada Aisyah melainkan kami mendapati ilmu penyelesaiannya di sisinya.'
      },
      {
        imam: 'Az-Zuhri',
        qawl: 'لو جُمع علم عائشة إلى علم جميع أزواج النبي وعلم جميع النساء لكان علم عائشة أفضل',
        indonesia: 'Seandainya ilmu Aisyah dikumpulkan dengan ilmu seluruh istri Nabi dan seluruh wanita dunia, niscaya ilmu Aisyah lebih unggul.'
      }
    ],
    syuyukh: ['Rasulullah Muhammad shallallahu \'alaihi wa sallam', 'Abu Bakr Ash-Shiddiq'],
    talamidz: ['Urwah bin Az-Zubair', 'Al-Qasim bin Muhammad', 'Masruq', 'Al-Aswad bin Yazid', 'Amrah binti Abdirrahman'],
    biographySummary: 'Wanita paling faqih dalam sejarah Islam dan perawi hadits wanita terbanyak (lebih dari 2.210 hadits). Istri tercinta Rasulullah ﷺ yang membersamai turunnya wahyu di kediamannya.'
  },
  {
    id: 'rawi-urwah',
    name: 'Urwah bin Az-Zubair',
    nameArabic: 'عُرْوَةُ بْنُ الزُّبَيْرِ بْنِ الْعَوَّامِ',
    kunyah: 'Abu Abdillah (أبو عبد الله)',
    nasab: 'Al-Qurasyi Al-Asadi Al-Madani, Salah satu Fuqaha As-Sab\'ah',
    thabaqah: 'Thabaqah 2 (Kibar at-Tabi\'in)',
    thabaqahNumber: 2,
    deathYear: '94 H (Madinah, dinamakan Sanatul Fuqaha)',
    domicile: 'Madinah',
    statusTaqrib: 'Tsiqah Tsabat Faqih Hujjah (ثقة ثبت فقيه عالم جواد)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat Faqih',
    aqwalAimmah: [
      {
        imam: 'Ibnu Syihab Az-Zuhri',
        qawl: 'كان عروة بحراً لا تكدره الدلاء',
        indonesia: 'Urwah adalah laksana lautan ilmu yang tidak akan pernah keruh ditimba timba-timba air.'
      },
      {
        imam: 'Al-Hafizh Ibnu Hajar',
        qawl: 'ثقة ثبت فقيه مشهور أحد الفقهاء السبعة بالمدينة، إمام متبع',
        indonesia: 'Tsiqah tsabat faqih masyhur salah satu dari Tujuh Fuqaha Madinah.'
      }
    ],
    syuyukh: ['Aisyah Ummul Mukminin (Bibinya)', 'Az-Zubair bin Al-Awwam', 'Asma binti Abi Bakr', 'Ali bin Abi Thalib'],
    talamidz: ['Hisyam bin Urwah (Anaknya)', 'Ibnu Syihab Az-Zuhri', 'Abu Az-Zinad', 'Sulaiman bin Yasar'],
    biographySummary: 'Putra dari Hawari Rasulullah az-Zubair bin al-Awwam dan Asma binti Abu Bakr. Keponakan Ummul Mukminin Aisyah yang paling banyak menyerap fiqih dan hadits beliau.'
  },
  {
    id: 'rawi-hisyam-urwah',
    name: 'Hisyam bin Urwah',
    nameArabic: 'هِشَامُ بْنُ عُرْوَةَ بْنِ الزُّبَيْرِ',
    kunyah: 'Abu Al-Mundzir (أبو المنذر)',
    nasab: 'Al-Qurasyi Al-Asadi Al-Madani',
    thabaqah: 'Thabaqah 5 (Shighar at-Tabi\'in / Atba\')',
    thabaqahNumber: 5,
    deathYear: '146 H (Baghdad)',
    domicile: 'Madinah lalu Baghdad',
    statusTaqrib: 'Tsiqah Faqih Imam (ثقة فقيه إمام حجة)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Imam',
    aqwalAimmah: [
      {
        imam: 'Yahya bin Ma\'in',
        qawl: 'ثقة ثبت، حجة في حديثه عن أبيه',
        indonesia: 'Tsiqah tsabat, hujjah kuat terutama riwayat dari ayahnya (Urwah).'
      },
      {
        imam: 'Ya\'qub bin Syaibah',
        qawl: 'ثقة ثبت، تغير قليلاً عند كبره في العراق لكن حديث أهل المدينة عنه صحيح مستقيم',
        indonesia: 'Tsiqah tsabat, hadits yang diriwayatkan murid-muridnya di Madinah seperti Malik sangat shahih dan lurus.'
      }
    ],
    syuyukh: ['Urwah bin Az-Zubair (Ayahnya)', 'Wahab bin Kaisan', 'Ibnu Al-Munkadir'],
    talamidz: ['Malik bin Anas', 'Syu\'bah', 'Sufyan Ats-Tsauri', 'Sufyan bin \'Uyainah', 'Abu Hanifah'],
    biographySummary: 'Putra Imam Urwah. Menjadi rujukan utama hadits-hadits Sayyidah Aisyah melalui jalur ayah dan kakeknya.'
  },
  {
    id: 'rawi-malik',
    name: 'Malik bin Anas',
    nameArabic: 'مَالِكُ بْنُ أَنَسِ بْنِ مَالِكٍ الأَصْبَحِيُّ',
    kunyah: 'Abu Abdillah (أبو عبد الله)',
    nasab: 'Al-Ashbahi Al-Himyari, Imam Darul Hijrah, Pengarang Al-Muwatha\'',
    thabaqah: 'Thabaqah 7 (Kibar Tabi\'it Tabi\'in)',
    thabaqahNumber: 7,
    deathYear: '179 H (Madinah Munawwarah, dimakamkan di Baqi\')',
    domicile: 'Madinah',
    statusTaqrib: 'Ra\'su Ahlil Hadits wa Sayyidul Muttaqin (إمام دار الهجرة، ثقة حجة رأس المتقنين)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Puncak A\'lal Ta\'dil (Amirul Mukminin fil Hadits)',
    aqwalAimmah: [
      {
        imam: 'Asy-Syafi\'i',
        qawl: 'إذا ذُكر العلماء فمالك النجم، ومالك حجة الله بينه وبين خلقه بعد التابعين',
        indonesia: 'Bila para ulama disebut, maka Malik laksana bintang gemintang. Malik adalah hujjah Allah antara Dia dan makhluk-Nya.'
      },
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'مالك إمام في الحديث وفي الفقه، أثبت الناس وأشدهم تنقية للرجال',
        indonesia: 'Malik adalah imam dalam hadits dan fiqih, manusia paling kokoh dan paling selektif menyaring para perawi.'
      },
      {
        imam: 'Al-Bukhari',
        qawl: 'أصح الأسانيد: مالك عن نافع عن ابن عمر (سلسلة الذهب)',
        indonesia: 'Sanad paling shahih di muka bumi adalah sanad emas: Malik dari Nafi\' dari Ibnu Umar.'
      }
    ],
    syuyukh: ['Nafi\' Mawla Ibni Umar', 'Ibnu Syihab Az-Zuhri', 'Hisyam bin Urwah', 'Yahya bin Sa\'id Al-Anshari'],
    talamidz: ['Asy-Syafi\'i', 'Abdullah bin Yusuf At-Tannisi', 'Al-Qa\'nabi', 'Yahya bin Yahya Al-Laitsi', 'Ibnu Wahb'],
    biographySummary: 'Imam negeri Madinah penyusun Al-Muwatha\'. Menjadi tolok ukur emas keshahihan hadits (Silsilah Adz-Dzahab). Sangat selektif sehingga hanya meriwayatkan dari perawi tsiqah teruji.'
  },
  {
    id: 'rawi-abdullah-yusuf',
    name: 'Abdullah bin Yusuf At-Tannisi',
    nameArabic: 'عَبْدُ اللَّهِ بْنُ يُوسُفَ التِّنِّيسِيُّ',
    kunyah: 'Abu Muhammad (أبو محمد)',
    nasab: 'Al-Kula\'i Ad-Dimasyqi kemudian Al-Mishri At-Tannisi',
    thabaqah: 'Thabaqah 10 (Kibar Akhidzin \'an Tabi\'it Tabi\'in)',
    thabaqahNumber: 10,
    deathYear: '218 H (Mesir)',
    domicile: 'Mesir / Dimasyq',
    statusTaqrib: 'Tsiqah Mutqin (ثقة متقن كان من أثبت الناس في الموطأ)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'د', 'ت'],
    maratibTadil: 'Tingkat 2: Tsiqah Mutqin',
    aqwalAimmah: [
      {
        imam: 'Yahya bin Ma\'in',
        qawl: 'كان أثبت الناس في الموطأ، أثبت من يحيى بن بكير ومن القعنبي',
        indonesia: 'Beliau orang paling kokoh hafalannya terhadap Al-Muwatha\' Malik.'
      },
      {
        imam: 'Abu Hatim Ar-Razi',
        qawl: 'ثقة متقن، صحيح الكتاب',
        indonesia: 'Tsiqah mutqin, catatannya shahih dan akurat.'
      },
      {
        imam: 'Al-Bukhari',
        qawl: 'هو شيخنا المعتمد في الموطأ',
        indonesia: 'Beliau adalah guru andalan kami dalam meriwayatkan Muwatha\' Malik.'
      }
    ],
    syuyukh: ['Malik bin Anas', 'Al-Laits bin Sa\'d', 'Mu\'awiyah bin Yahya'],
    talamidz: ['Al-Bukhari', 'Yahya bin Ma\'in', 'Muhammad bin Yahya Adz-Dzuhli', 'Abu Zur\'ah Ar-Razi'],
    biographySummary: 'Syaikh utama Imam Bukhari untuk sanad hadits-hadits Imam Malik bin Anas dalam Shahih Bukhari.'
  },
  {
    id: 'rawi-abu-hurairah',
    name: 'Abu Hurairah Abdurrahman bin Shakhr Ad-Dausi',
    nameArabic: 'أَبُو هُرَيْرَةَ عَبْدُ الرَّحْمَنِ بْنُ صَخْرٍ الدَّوْسِيُّ',
    kunyah: 'Abu Hurairah (أبو هريرة)',
    nasab: 'Ad-Dausi Al-Yamani Al-Madani',
    thabaqah: 'Thabaqah 1 (Sahabat Nabi ﷺ)',
    thabaqahNumber: 1,
    deathYear: '57 H / 59 H (Madinah, Baqi\')',
    domicile: 'Madinah',
    statusTaqrib: 'Shahabiyyun Jalil - Sayyidul Huffazh (kulluhum \'udul)',
    statusCategory: 'sahabat',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 1: Sahabat Nabi ﷺ',
    aqwalAimmah: [
      {
        imam: 'Asy-Syafi\'i',
        qawl: 'أبو هريرة أحفظ من روى الحديث في دهره',
        indonesia: 'Abu Hurairah adalah orang paling kuat hafalannya dalam meriwayatkan hadits di zamannya.'
      },
      {
        imam: 'Al-Bukhari',
        qawl: 'روى عنه نحو ثمانمائة رجل أو أكثر من أهل العلم من أصحاب النبي صلى الله عليه وسلم والتابعين',
        indonesia: 'Diriwayatkan hadits darinya oleh sekitar 800 perawi dari kalangan sahabat dan tabi\'in.'
      }
    ],
    syuyukh: ['Rasulullah Muhammad shallallahu \'alaihi wa sallam', 'Abu Bakr', 'Umar', 'Al-Fadhl bin Abbas'],
    talamidz: ['Sa\'id bin Al-Musayyib', 'Abu Shalih As-Samman', 'Abdullah bin Umar', 'Ibn Abbas', 'Thawus', 'Mujahid'],
    biographySummary: 'Sahabat Nabi ﷺ yang paling banyak meriwayatkan hadits (5.374 hadits). Mendapat doa khusus dari Rasulullah ﷺ agar selamanya tidak pernah melupakan apa yang beliau dengar.'
  },
  {
    id: 'rawi-abu-shalih',
    name: 'Abu Shalih As-Samman (Dzakwan)',
    nameArabic: 'أَبُو صَالِحٍ السَّمَّانُ ذَكْوَانُ الزَّيَّاتُ',
    kunyah: 'Abu Shalih (أبو صالح)',
    nasab: 'Al-Madani Mawla Juwairiyyah binti Al-Ahmas',
    thabaqah: 'Thabaqah 3 (Wustha at-Tabi\'in)',
    thabaqahNumber: 3,
    deathYear: '101 H (Madinah)',
    domicile: 'Madinah',
    statusTaqrib: 'Tsiqah Tsabat (ثقة ثبت جليل)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat',
    aqwalAimmah: [
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'ثقة ثقة، من أجل الناس وأوثقهم',
        indonesia: 'Tsiqah tsiqah, termasuk perawi paling mulia dan paling terpercaya.'
      },
      {
        imam: 'Yahya bin Ma\'in',
        qawl: 'ثقة مأمون حجة في أبي هريرة',
        indonesia: 'Tsiqah terpercaya dan menjadi hujjah utama dalam riwayat Abu Hurairah.'
      }
    ],
    syuyukh: ['Abu Hurairah', 'Sa\'d bin Abi Waqqash', 'Aisyah Ummul Mukminin', 'Mu\'awiyah'],
    talamidz: ['Suhail bin Abi Shalih (Anaknya)', 'Al-A\'masy', 'Zaid bin Aslam', 'Abdullah bin Dinar'],
    biographySummary: 'Tabi\'in agung Madinah yang menemani Abu Hurairah puluhan tahun. Jalur riwayatnya dari Abu Hurairah diposisikan pada derajat keshahihan tertinggi.'
  },
  {
    id: 'rawi-abdullah-dinar',
    name: 'Abdullah bin Dinar Al-Adawi',
    nameArabic: 'عَبْدُ اللَّهِ بْنُ دِينَارٍ الْعَدَوِيُّ',
    kunyah: 'Abu Abdirrahman (أبو عبد الرحمن)',
    nasab: 'Al-Madani Mawla Abdullah bin Umar',
    thabaqah: 'Thabaqah 4 (Wustha at-Tabi\'in)',
    thabaqahNumber: 4,
    deathYear: '127 H (Madinah)',
    domicile: 'Madinah',
    statusTaqrib: 'Tsiqah Tsabat (ثقة ثبت)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat',
    aqwalAimmah: [
      {
        imam: 'Yahya bin Ma\'in',
        qawl: 'عبد الله بن دينار ثقة إذا حدث عنه الثقات',
        indonesia: 'Abdullah bin Dinar tsiqah apabila yang meriwayatkan darinya adalah orang-orang tsiqah.'
      },
      {
        imam: 'An-Nasa\'i',
        qawl: 'ثقة متفق على عدالته',
        indonesia: 'Tsiqah dan disepakati keadilannya oleh para imam.'
      }
    ],
    syuyukh: ['Abdullah bin Umar', 'Anas bin Malik', 'Abu Shalih As-Samman', 'Sulaiman bin Yasar'],
    talamidz: ['Malik bin Anas', 'Sufyan Ats-Tsauri', 'Syu\'bah', 'Sulaiman bin Bilal'],
    biographySummary: 'Mawla Sahabat Abdullah bin Umar. Guru Imam Malik yang meriwayatkan banyak hadits fiqih dan keimanan.'
  },
  {
    id: 'rawi-sulaiman-bilal',
    name: 'Sulaiman bin Bilal Al-Qurasyi',
    nameArabic: 'سُلَيْمَانُ بْنُ بِلاَلٍ الْقُرَشِيُّ التَّيْمِيُّ',
    kunyah: 'Abu Muhammad (أبو محمد)',
    nasab: 'Al-Madani Mawla Al-Qasim bin Muhammad',
    thabaqah: 'Thabaqah 7 (Kibar Tabi\'it Tabi\'in)',
    thabaqahNumber: 7,
    deathYear: '177 H (Madinah)',
    domicile: 'Madinah',
    statusTaqrib: 'Tsiqah (ثقة مأمون)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 3: Tsiqah Mutlaq',
    aqwalAimmah: [
      {
        imam: 'Yahya bin Ma\'in',
        qawl: 'سليمان بن بلال ثقة مأمون لا بأس به',
        indonesia: 'Sulaiman bin Bilal tsiqah terpercaya dan tidak ada cela.'
      },
      {
        imam: 'Abu Hatim Ar-Razi',
        qawl: 'ثقة حسن الحديث، لا بأس بحديثه',
        indonesia: 'Tsiqah hasanul hadits, riwayatnya kokoh.'
      }
    ],
    syuyukh: ['Abdullah bin Dinar', 'Yahya bin Sa\'id Al-Anshari', 'Hisyam bin Urwah', 'Zaid bin Aslam'],
    talamidz: ['Abu Amir Al-Aqadi', 'Yahya bin Yahya At-Tamimi', 'Ismail bin Abi Uwais'],
    biographySummary: 'Muhaddits terpandang Madinah yang menjabat sebagai pengurus baitul mal di Madinah. Dikenal sangat amanah dan teliti dalam hadits.'
  },
  {
    id: 'rawi-abu-amir-aqadi',
    name: 'Abu Amir Al-Aqadi Abdul Malik bin Amr',
    nameArabic: 'أَبُو عَامِرٍ الْعَقَدِيُّ عَبْدُ الْمَلِكِ بْنُ عَمْرٍو',
    kunyah: 'Abu Amir (أبو عامر)',
    nasab: 'Al-Qaisi Al-Bashri',
    thabaqah: 'Thabaqah 9 (Wustha Akhidzin \'an Tabi\'it Tabi\'in)',
    thabaqahNumber: 9,
    deathYear: '204 H / 205 H (Bashrah)',
    domicile: 'Bashrah',
    statusTaqrib: 'Tsiqah Tsabat (ثقة ثبت مأمون)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat',
    aqwalAimmah: [
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'كان أثبت من غيره، ثقة ثقة رجل صالح',
        indonesia: 'Beliau lebih kokoh dibanding lainnya, tsiqah tsiqah dan seorang yang shalih.'
      },
      {
        imam: 'Ibnu Ma\'in',
        qawl: 'ثقة مأمون صدوق',
        indonesia: 'Tsiqah terpercaya dan shaduq.'
      }
    ],
    syuyukh: ['Sulaiman bin Bilal', 'Syu\'bah', 'Ats-Tsauri', 'Hammad bin Salamah'],
    talamidz: ['Abdullah bin Muhammad Al-Ju\'fi', 'Ahmad bin Hanbal', 'Ishaq bin Rahawaih'],
    biographySummary: 'Hafizh dari Bashrah yang diandalkan oleh para perawi kibar di masa kodifikasi hadits.'
  },
  {
    id: 'rawi-musnadi-jufi',
    name: 'Abdullah bin Muhammad Al-Ju\'fi (Al-Musnadi)',
    nameArabic: 'عَبْدُ اللَّهِ بْنُ مُحَمَّدِ بْنِ عَبْدِ اللَّهِ الْجُعْفِيُّ (الْمُسْنَدِيُّ)',
    kunyah: 'Abu Ja\'far (أبو جعفر)',
    nasab: 'Al-Bukhari Al-Ju\'fi, dikenal dengan Al-Musnadi',
    thabaqah: 'Thabaqah 10 (Kibar Syaikhul Bukhari)',
    thabaqahNumber: 10,
    deathYear: '229 H (Bukhara)',
    domicile: 'Bukhara',
    statusTaqrib: 'Tsiqah Hafizh (ثقة متقن حافظ مصنف)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'ت', 'س'],
    maratibTadil: 'Tingkat 2: Tsiqah Hafizh',
    aqwalAimmah: [
      {
        imam: 'Al-Bukhari',
        qawl: 'هو شيخنا، كان يطلب المسندات ويجمعها فلقب بالمسندي، وهو ثقة حافظ',
        indonesia: 'Beliau guru kami, gemar menghimpun hadits-hadits bersambung sanad sehingga dijuluki Al-Musnadi.'
      },
      {
        imam: 'Abu Hatim Ar-Razi',
        qawl: 'ثقة متقن صدوق',
        indonesia: 'Tsiqah mutqin shaduq.'
      }
    ],
    syuyukh: ['Abu Amir Al-Aqadi', 'Sufyan bin \'Uyainah', 'Ibnu Numair'],
    talamidz: ['Muhammad bin Ismail Al-Bukhari', 'At-Tirmidzi', 'An-Nasa\'i'],
    biographySummary: 'Ulama Bukhara yang memotivasi Imam Bukhari untuk mengkhususkan penulisan hadits yang murni bersambung shahih (al-jami\' ash-shahih al-musnad).'
  },
  {
    id: 'rawi-anas-malik',
    name: 'Anas bin Malik Al-Anshari',
    nameArabic: 'أَنَسُ بْنُ مَالِكِ بْنِ النَّضْرِ الأَنْصَارِيُّ',
    kunyah: 'Abu Hamzah (أبو حمزة)',
    nasab: 'Al-Khazraji Al-Anshari Al-Bashri, Pelayan Rasulullah ﷺ',
    thabaqah: 'Thabaqah 1 (Sahabat Nabi ﷺ)',
    thabaqahNumber: 1,
    deathYear: '93 H (Bashrah, sahabat terakhir wafat di Bashrah)',
    domicile: 'Madinah lalu Bashrah',
    statusTaqrib: 'Khadimur Rasul ﷺ (kulluhum \'udul)',
    statusCategory: 'sahabat',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 1: Sahabat Nabi ﷺ',
    aqwalAimmah: [
      {
        imam: 'Rasulullah Muhammad ﷺ',
        qawl: 'اللَّهُمَّ أَكْثِرْ مَالَهُ، وَوَلَدَهُ، وَبَارِكْ لَهُ فِيمَا أَعْطَيْتَهُ (دعاء نبوي مستجاب)',
        indonesia: 'Doa Nabi ﷺ: "Ya Allah perbanyaklah harta dan anaknya, dan berkahilah apa yang Engkau berikan kepadanya."'
      },
      {
        imam: 'Adz-Dzahabi',
        qawl: 'الإمام القدوة، خادم رسول الله صلى الله عليه وسلم وقرابته، وصاحب سره',
        indonesia: 'Imam panutan, pelayan Rasulullah ﷺ selama 10 tahun dan pemilik rahasia beliau.'
      }
    ],
    syuyukh: ['Rasulullah Muhammad shallallahu \'alaihi wa sallam', 'Abu Bakr', 'Umar', 'Utsman', 'Mu\'adz bin Jabal'],
    talamidz: ['Al-Hasan Al-Bashri', 'Ibnu Sirin', 'Qatadah', 'Tsabit Al-Bunani', 'Az-Zuhri'],
    biographySummary: 'Melayani Rasulullah ﷺ sejak usia 10 tahun di Madinah. Sahabat ketiga terbanyak meriwayatkan hadits (2.286 hadits) dan sahabat nabi terakhir yang wafat di kota Bashrah.'
  },
  {
    id: 'rawi-syubah',
    name: 'Syu\'bah bin Al-Hajjaj',
    nameArabic: 'شُعْبَةُ بْنُ الْحَجَّاجِ بْنِ الْوَرْدِ الْعَتَكِيُّ',
    kunyah: 'Abu Bistham (أبو بسطام)',
    nasab: 'Al-Wasithi kemudian Al-Bashri, Amirul Mukminin fil Hadits',
    thabaqah: 'Thabaqah 7 (Kibar Tabi\'it Tabi\'in)',
    thabaqahNumber: 7,
    deathYear: '160 H (Bashrah)',
    domicile: 'Bashrah',
    statusTaqrib: 'Amirul Mukminin fil Hadits - Ra\'su Jarh wa Ta\'dil (ثقة حافظ إمام حجة)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Puncak A\'lal Ta\'dil',
    aqwalAimmah: [
      {
        imam: 'Ats-Tsauri',
        qawl: 'شعبة أمير المؤمنين في الحديث، وهو أول من فتش عن الرجال بالعراق ونقد الإسناد',
        indonesia: 'Syu\'bah adalah Amirul Mukminin dalam hadits, dan beliau orang pertama yang memeriksa para perawi di Iraq dan mengkritik sanad.'
      },
      {
        imam: 'Asy-Syafi\'i',
        qawl: 'لولا شعبة لما عُرف الحديث بالعراق',
        indonesia: 'Kalaulah bukan karena Syu\'bah niscaya ilmu hadits tidak dikenal teguh di Iraq.'
      }
    ],
    syuyukh: ['Qatadah', 'Amr bin Murrah', 'Al-Hakam bin Utaibah', 'Salamah bin Kuhail'],
    talamidz: ['Yahya bin Sa\'id Al-Qaththan', 'Ibnul Mahdi', 'Ath-Thayalisi', 'Wakid'],
    biographySummary: 'Pelopor ilmu Jarh wa Ta\'dil pertama di negeri Iraq. Sangat ketat meneliti integritas moral dan akurasi hafalan perawi.'
  },
  {
    id: 'rawi-qatadah',
    name: 'Qatadah bin Di\'amah As-Sadusi',
    nameArabic: 'قَتَادَةُ بْنُ دِعَامَةَ السَّدُوسِيُّ الْبَصْرِيُّ',
    kunyah: 'Abu Al-Khaththab (أبو الخطاب)',
    nasab: 'As-Sadusi Al-Bashri, Hafizhul Ashr wa Mufassiruh',
    thabaqah: 'Thabaqah 4 (Wustha at-Tabi\'in)',
    thabaqahNumber: 4,
    deathYear: '117 H (Wasith)',
    domicile: 'Bashrah',
    statusTaqrib: 'Tsiqah Tsabat Mudallis (ثقة ثبت مع التدليس)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س', 'ق'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat (diterima bila tashrih bi as-sama\')',
    aqwalAimmah: [
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'قتادة أحفظ أهل البصرة، كان لا يسمع شيئاً إلا حفظه',
        indonesia: 'Qatadah orang paling kuat hafalannya di Bashrah, tidak mendengar sesuatu melainkan langsung hafal.'
      },
      {
        imam: 'Ibnu Hajar',
        qawl: 'ثقة ثبت إلا أنه يدلس، فإذا صرّح بالتحديث فحديثه حجة في أعلى الدرجات',
        indonesia: 'Tsiqah tsabat namun terkadang melakukan tadlis, bila menegaskan mendengar langsung maka haditsnya di derajat tertinggi.'
      }
    ],
    syuyukh: ['Anas bin Malik', 'Sa\'id bin Al-Musayyib', 'Al-Hasan Al-Bashri', 'Ikrima Mawla Ibn Abbas'],
    talamidz: ['Syu\'bah bin Al-Hajjaj', 'Sa\'id bin Abi Arubah', 'Ma\'mar bin Rasyid', 'Hammad bin Salamah'],
    biographySummary: 'Imam ahli tafsir dan hadits kota Bashrah yang buta sejak lahir namun memiliki daya ingat luar biasa tak tertandingi di zamannya.'
  },
  {
    id: 'rawi-muslim-hajjaj',
    name: 'Imam Muslim bin Al-Hajjaj An-Naisaburi',
    nameArabic: 'مُسْلِمُ بْنُ الْحَجَّاجِ بْنِ وَرْدٍ الْقُشَيْرِيُّ النَّيْسَابُورِيُّ',
    kunyah: 'Abu Al-Husain (أبو الحسين)',
    nasab: 'Al-Qusyairi An-Naisaburi, Pengarang Shahih Muslim',
    thabaqah: 'Thabaqah 11 (Mukharrijul Hadits / Kibar Huffazh)',
    thabaqahNumber: 11,
    deathYear: '261 H (Naisabur)',
    domicile: 'Naisabur (Khurasan)',
    statusTaqrib: 'Imam Hafizh Hujjah Naqqad (إمام حافظ حجة مصنف الصحيح)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['م'],
    maratibTadil: 'Tingkat 2: Imam Naqqad Hujjah',
    aqwalAimmah: [
      {
        imam: 'Ahmad bin Salamah',
        qawl: 'رأيت أبا زرعة وأبا حاتم يقدمان مسلماً في معرفة الصحيح على مشايخ عصرهما',
        indonesia: 'Saya melihat Abu Zur\'ah dan Abu Hatim mendahulukan Muslim dalam mengenali hadits shahih dibanding guru-guru zaman mereka.'
      },
      {
        imam: 'An-Nawawi',
        qawl: 'أجمع المسلمون على صحة صحيحه وجلالة رتبته وحسن ترتيبه وسلامته من العوارض',
        indonesia: 'Umat Islam bersepakat atas keshahihan kitab Shahih Muslim dan keteraturan susunan sanadnya.'
      }
    ],
    syuyukh: ['Yahya bin Yahya At-Tamimi', 'Qutaibah bin Sa\'id', 'Ishaq bin Rahawaih', 'Ahmad bin Hanbal', 'Al-Bukhari'],
    talamidz: ['Abu Isa At-Tirmidzi', 'Ibn Abi Hatim', 'Ibn Khuzaimah', 'Abu Awanah'],
    biographySummary: 'Penulis kitab Shahih Muslim yang terkenal dengan kaidah muqaddimah ilmiah tentang thabaqat ruwat dan kriteria ittishal sanad.'
  },
  {
    id: 'rawi-yahya-tamimi',
    name: 'Yahya bin Yahya At-Tamimi An-Naisaburi',
    nameArabic: 'يَحْيَى بْنُ يَحْيَى بْنِ بَكْرٍ التَّمِيمِيُّ النَّيْسَابُورِيُّ',
    kunyah: 'Abu Zakariyya (أبو زكريا)',
    nasab: 'At-Tamimi An-Naisaburi, Syaikhul Islam fi Khurasan',
    thabaqah: 'Thabaqah 10 (Kibar Huffazh Khurasan)',
    thabaqahNumber: 10,
    deathYear: '226 H (Naisabur)',
    domicile: 'Khurasan',
    statusTaqrib: 'Tsiqah Tsabat Imam (ثقة ثبت إمام جليل زاهد)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'م', 'د', 'ت', 'س'],
    maratibTadil: 'Tingkat 2: Tsiqah Tsabat Imam',
    aqwalAimmah: [
      {
        imam: 'Ahmad bin Hanbal',
        qawl: 'ما أخرجت خراسان بعد ابن المبارك مثل يحيى بن يحيى، إمام ثقة',
        indonesia: 'Khurasan tidak pernah melahirkan sosok semisal Ibnu Mubarak setelahnya kecuali Yahya bin Yahya.'
      },
      {
        imam: 'Abu Zur\'ah Ar-Razi',
        qawl: 'إمام لا يدفع عن رتبته في الحفظ والإتقان',
        indonesia: 'Imam yang tak terbantahkan kedudukannya dalam hafalan dan ketelitian.'
      }
    ],
    syuyukh: ['Malik bin Anas', 'Sufyan bin \'Uyainah', 'Al-Laits bin Sa\'d', 'Jarir bin Abdil Hamid'],
    talamidz: ['Muslim bin Al-Hajjaj', 'Al-Bukhari', 'Abu Dawud', 'Ad-Darimi'],
    biographySummary: 'Syaikh utama Imam Muslim yang kepadanya dipercayakan periwayatan Al-Muwatha\' Malik di kawasan Khurasan.'
  },
  {
    id: 'rawi-bukhari',
    name: 'Imam Muhammad bin Ismail Al-Bukhari',
    nameArabic: 'مُحَمَّدُ بْنُ إِسْمَاعِيلَ بْنِ إِبْرَاهِيمَ الْبُخَارِيُّ',
    kunyah: 'Abu Abdillah (أبو عبد الله)',
    nasab: 'Al-Ju\'fi Al-Bukhari, Amirul Mukminin fil Hadits',
    thabaqah: 'Thabaqah 11 (Amirul Mukminin fil Hadits)',
    thabaqahNumber: 11,
    deathYear: '256 H (Khartank dekat Samarkand)',
    domicile: 'Bukhara lalu Khurasan',
    statusTaqrib: 'Jabalul Hifzh wa Sayyidul Fuqaha (أمير المؤمنين في الحديث جبل الحفظ)',
    statusCategory: 'tsiqah',
    kutubSymbols: ['خ', 'ت'],
    maratibTadil: 'Tingkat 2: Puncak Tertinggi Para Imam Hadits',
    aqwalAimmah: [
      {
        imam: 'Qutaibah bin Sa\'id',
        qawl: 'جالست الفقهاء والزهاد، فما رأيت منذ عقلت مثل محمد بن إسماعيل، وهو في زمانه كعمر في الصحابة',
        indonesia: 'Saya telah bermajelis dengan para fuqaha dan ahli zuhud, belum pernah saya melihat semisal Al-Bukhari. Di zamannya ia laksana Umar di kalangan sahabat.'
      },
      {
        imam: 'Abu Hatim Ar-Razi',
        qawl: 'محمد بن إسماعيل أعلم من دخل العراق، وما رأيت أحفظ منه',
        indonesia: 'Muhammad bin Ismail adalah orang paling berilmu yang pernah memasuki Iraq, dan belum pernah aku melihat yang lebih kuat hafalannya.'
      }
    ],
    syuyukh: ['Al-Humaidi', 'Abdullah bin Yusuf', 'Ahmad bin Hanbal', 'Ali ibn Al-Madini', 'Yahya bin Ma\'in'],
    talamidz: ['Muslim bin Al-Hajjaj', 'At-Tirmidzi', 'An-Nasa\'i', 'Ibn Khuzaimah'],
    biographySummary: 'Penyusun kitab Al-Jami\' Ash-Shahih Al-Musnad Al-Mukhtashar. Peletak standar seleksi sanad tertinggi dalam sejarah peradaban Islam.'
  }
];

export const HADITH_SANAD_MAP: Record<string, HadithSanadAnalysis> = {
  'bukhari-1': {
    hadithId: 'bukhari-1',
    ittishalSanad: 'Muttashil',
    derajatSanad: 'Shahih A\'la Darajat Ash-Shihhah (Silsilah Qurasyiyyah Madaniyyah Makkiyyah)',
    ittishalExplanation: 'Sanad hadits ini bersambung (muttashil) dari Imam Al-Bukhari sampai Umar bin Al-Khaththab radhiyallahu \'anhu dengan shighah tahammul jelas (Haddatsana, Akhbarana, Sami\'tu). Seluruh rawi berpredikat Tsiqah Tsabat dan di puncaknya Sahabat Nabi yang adil.',
    kaidahJarh: 'Hadits ini unik secara sanad: merupakan hadits Fardh Muthlaq (Gharib) di tingkatan awal karena hanya diriwayatkan oleh Umar dari Nabi ﷺ, lalu hanya Alqamah dari Umar, lalu hanya Muhammad At-Taimi dari Alqamah, lalu hanya Yahya Al-Anshari dari At-Taimi. Namun kesendirian (infirad) ini tidak mencacatkan karena seluruh rawinya berada di puncak derajat Tsiqah Tsabat (Kaidah: Ziyadah wa Infirad Ats-Tsiqah Maqbulah).',
    silsilah: [
      {
        order: 1,
        rawiId: 'rawi-bukhari',
        rawiName: 'Imam Al-Bukhari',
        rawiArabic: 'الإمام محمد بن إسماعيل البخاري',
        shighahTahammul: 'Mukharrij Kitab (صاحب الصحيح)',
        statusCategory: 'tsiqah',
        statusLabel: 'Amirul Mukminin fil Hadits',
        thabaqah: 'Thabaqah 11'
      },
      {
        order: 2,
        rawiId: 'rawi-humaidi',
        rawiName: 'Al-Humaidi Abdullah bin Az-Zubair',
        rawiArabic: 'الحميدي عبد الله بن الزبير بن عيسى',
        shighahTahammul: 'حَدَّثَنَا (Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Hafizh Imam',
        thabaqah: 'Thabaqah 10'
      },
      {
        order: 3,
        rawiId: 'rawi-sufyan-uyainah',
        rawiName: 'Sufyan bin \'Uyainah',
        rawiArabic: 'سفيان بن عيينة الهلالي',
        shighahTahammul: 'قَالَ حَدَّثَنَا (Ia berkata: Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Hafizh Hujjah',
        thabaqah: 'Thabaqah 8'
      },
      {
        order: 4,
        rawiId: 'rawi-yahya-anshari',
        rawiName: 'Yahya bin Sa\'id Al-Anshari',
        rawiArabic: 'يحيى بن سعيد بن قيس الأنصاري',
        shighahTahammul: 'قَالَ حَدَّثَنَا (Ia berkata: Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat Imām',
        thabaqah: 'Thabaqah 5'
      },
      {
        order: 5,
        rawiId: 'rawi-muhammad-taimi',
        rawiName: 'Muhammad bin Ibrahim At-Taimi',
        rawiArabic: 'محمد بن إبراهيم التيمي القرشي',
        shighahTahammul: 'أَخْبَرَنِي أَنَّهُ سَمِعَ (Mengabarkan kepadaku bahwa ia mendengar)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat',
        thabaqah: 'Thabaqah 4'
      },
      {
        order: 6,
        rawiId: 'rawi-alqamah',
        rawiName: 'Alqamah bin Waqqash Al-Laitsi',
        rawiArabic: 'علقمة بن وقاص الليثي المدني',
        shighahTahammul: 'سَمِعْتُ (Aku mendengar)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat (Kibar Tabi\'in)',
        thabaqah: 'Thabaqah 3'
      },
      {
        order: 7,
        rawiId: 'rawi-umar',
        rawiName: 'Umar bin Al-Khaththab',
        rawiArabic: 'عمر بن الخطاب رضي الله عنه',
        shighahTahammul: 'سَمِعْتُ رَسُولَ اللَّهِ ﷺ (Aku mendengar Rasulullah ﷺ)',
        statusCategory: 'sahabat',
        statusLabel: 'Shahabat Mulia (Kulluhum \'Udul)',
        thabaqah: 'Thabaqah 1'
      }
    ]
  },
  'bukhari-2': {
    hadithId: 'bukhari-2',
    ittishalSanad: 'Muttashil',
    derajatSanad: 'Shahih Muttashil bi Silsilah Madaniyyah Mishriyyah',
    ittishalExplanation: 'Sanad muttashil tanpa putus. Abdullah bin Yusuf meriwayatkan dari Imam Malik melalui sama\' (mendengarkan pembacaan Al-Muwatha\'). Malik dari Hisyam bin Urwah dari ayahnya Urwah bin Az-Zubair dari Aisyah radhiyallahu \'anha.',
    kaidahJarh: 'Sanad ini adalah salah satu sanad terkuat di dunia Islam. Urwah adalah keponakan kandung sekaligus murid terdekat Sayyidah Aisyah, sehingga periwayatan ini memiliki tingkat akurasi mahfuzh yang mutlak.',
    silsilah: [
      {
        order: 1,
        rawiId: 'rawi-bukhari',
        rawiName: 'Imam Al-Bukhari',
        rawiArabic: 'الإمام البخاري',
        shighahTahammul: 'Mukharrij',
        statusCategory: 'tsiqah',
        statusLabel: 'Amirul Mukminin fil Hadits',
        thabaqah: 'Thabaqah 11'
      },
      {
        order: 2,
        rawiId: 'rawi-abdullah-yusuf',
        rawiName: 'Abdullah bin Yusuf At-Tannisi',
        rawiArabic: 'عبد الله بن يوسف التنيسي',
        shighahTahammul: 'حَدَّثَنَا (Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Mutqin',
        thabaqah: 'Thabaqah 10'
      },
      {
        order: 3,
        rawiId: 'rawi-malik',
        rawiName: 'Malik bin Anas',
        rawiArabic: 'مالك بن أنس إمام دار الهجرة',
        shighahTahammul: 'أَخْبَرَنَا (Mengabarkan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Imam Darul Hijrah Hujjah',
        thabaqah: 'Thabaqah 7'
      },
      {
        order: 4,
        rawiId: 'rawi-hisyam-urwah',
        rawiName: 'Hisyam bin Urwah',
        rawiArabic: 'هشام بن عروة بن الزبير',
        shighahTahammul: 'عَنْ (Dari)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Faqih Imam',
        thabaqah: 'Thabaqah 5'
      },
      {
        order: 5,
        rawiId: 'rawi-urwah',
        rawiName: 'Urwah bin Az-Zubair',
        rawiArabic: 'عروة بن الزبير (أحد الفقهاء السبعة)',
        shighahTahammul: 'عَنْ أَبِيهِ (Dari bapaknya)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat Fuqaha Sab\'ah',
        thabaqah: 'Thabaqah 2'
      },
      {
        order: 6,
        rawiId: 'rawi-aisyah',
        rawiName: 'Aisyah Ummul Mukminin',
        rawiArabic: 'عائشة أم المؤمنين رضي الله عنها',
        shighahTahammul: 'عَنْ عَائِشَةَ (Dari Aisyah)',
        statusCategory: 'sahabat',
        statusLabel: 'Ummul Mukminin (Kulluhum \'Udul)',
        thabaqah: 'Thabaqah 1'
      }
    ]
  },
  'bukhari-9': {
    hadithId: 'bukhari-9',
    ittishalSanad: 'Muttashil',
    derajatSanad: 'Shahih Muttashil bi Ruwat Tsiqat Madaniyyin Bashriyyin',
    ittishalExplanation: 'Sanad muttashil dari Al-Bukhari ke gurunya Al-Musnadi lalu Abu Amir Al-Aqadi, Sulaiman bin Bilal, Abdullah bin Dinar, Abu Shalih As-Samman, hingga Abu Hurairah.',
    kaidahJarh: 'Seluruh perawi dalam sanad hadits cabang iman ini disepakati ke-tsiqah-annya oleh para imam Jarh wa Ta\'dil tanpa ada jarh mufassar yang mencacatkan.',
    silsilah: [
      {
        order: 1,
        rawiId: 'rawi-bukhari',
        rawiName: 'Imam Al-Bukhari',
        rawiArabic: 'الإمام البخاري',
        shighahTahammul: 'Mukharrij',
        statusCategory: 'tsiqah',
        statusLabel: 'Amirul Mukminin fil Hadits',
        thabaqah: 'Thabaqah 11'
      },
      {
        order: 2,
        rawiId: 'rawi-musnadi-jufi',
        rawiName: 'Abdullah bin Muhammad Al-Musnadi',
        rawiArabic: 'عبد الله بن محمد الجعفي المسندي',
        shighahTahammul: 'حَدَّثَنَا (Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Hafizh',
        thabaqah: 'Thabaqah 10'
      },
      {
        order: 3,
        rawiId: 'rawi-abu-amir-aqadi',
        rawiName: 'Abu Amir Al-Aqadi Abdul Malik',
        rawiArabic: 'أبو عامر العقدي عبد الملك بن عمرو',
        shighahTahammul: 'حَدَّثَنَا (Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat',
        thabaqah: 'Thabaqah 9'
      },
      {
        order: 4,
        rawiId: 'rawi-sulaiman-bilal',
        rawiName: 'Sulaiman bin Bilal',
        rawiArabic: 'سليمان بن بلال القرشي التيمي',
        shighahTahammul: 'حَدَّثَنَا (Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Mutlaq',
        thabaqah: 'Thabaqah 7'
      },
      {
        order: 5,
        rawiId: 'rawi-abdullah-dinar',
        rawiName: 'Abdullah bin Dinar',
        rawiArabic: 'عبد الله بن دينار العدوي',
        shighahTahammul: 'عَنْ (Dari)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat',
        thabaqah: 'Thabaqah 4'
      },
      {
        order: 6,
        rawiId: 'rawi-abu-shalih',
        rawiName: 'Abu Shalih As-Samman',
        rawiArabic: 'أبو صالح السمان ذكوان الزيات',
        shighahTahammul: 'عَنْ (Dari)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat',
        thabaqah: 'Thabaqah 3'
      },
      {
        order: 7,
        rawiId: 'rawi-abu-hurairah',
        rawiName: 'Abu Hurairah Ad-Dausi',
        rawiArabic: 'أبو هريرة عبد الرحمن بن صخر الدوسي',
        shighahTahammul: 'عَنْ أَبِي هُرَيْرَةَ (Dari Abu Hurairah)',
        statusCategory: 'sahabat',
        statusLabel: 'Sahabat Nabi (Kulluhum \'Udul)',
        thabaqah: 'Thabaqah 1'
      }
    ]
  },
  'bukhari-13': {
    hadithId: 'bukhari-13',
    ittishalSanad: 'Muttashil',
    derajatSanad: 'Shahih Muttashil bi Silsilah Bashriyyah',
    ittishalExplanation: 'Sanad muttashil dari Al-Bukhari ke Musaddad dari Yahya dari Syu\'bah dari Qatadah dari Anas bin Malik radhiyallahu \'anhu.',
    kaidahJarh: 'Qatadah dikenal terkadang melakukan tadlis, namun di sanad ini Syu\'bah bin Al-Hajjaj yang meriwayatkan darinya. Dikenal kaidah emas para muhaddits: "Kafaitukum tadlisa tsalatsah: Syu\'bah \'an Qatadah...", di mana Syu\'bah hanya meriwayatkan dari Qatadah apa yang ia dengar langsung secara sah (sharih bis-sama\'). Oleh karenanya sanad ini shahih mutlak.',
    silsilah: [
      {
        order: 1,
        rawiId: 'rawi-bukhari',
        rawiName: 'Imam Al-Bukhari',
        rawiArabic: 'الإمام البخاري',
        shighahTahammul: 'Mukharrij',
        statusCategory: 'tsiqah',
        statusLabel: 'Amirul Mukminin fil Hadits',
        thabaqah: 'Thabaqah 11'
      },
      {
        order: 2,
        rawiId: 'rawi-syubah',
        rawiName: 'Syu\'bah bin Al-Hajjaj',
        rawiArabic: 'شعبة بن الحجاج العتكي',
        shighahTahammul: 'حَدَّثَنَا (Menceritakan kepada kami)',
        statusCategory: 'tsiqah',
        statusLabel: 'Amirul Mukminin fil Hadits',
        thabaqah: 'Thabaqah 7'
      },
      {
        order: 3,
        rawiId: 'rawi-qatadah',
        rawiName: 'Qatadah bin Di\'amah As-Sadusi',
        rawiArabic: 'قتادة بن دعامة السدوسي',
        shighahTahammul: 'عَنْ (Dari)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat (Mahfuzh bi riwayati Syu\'bah)',
        thabaqah: 'Thabaqah 4'
      },
      {
        order: 4,
        rawiId: 'rawi-anas-malik',
        rawiName: 'Anas bin Malik Al-Anshari',
        rawiArabic: 'أنس بن مالك رضي الله عنه',
        shighahTahammul: 'عَنْ أَنَسٍ (Dari Anas)',
        statusCategory: 'sahabat',
        statusLabel: 'Khadimur Rasul (Kulluhum \'Udul)',
        thabaqah: 'Thabaqah 1'
      }
    ]
  },
  'muslim-1': {
    hadithId: 'muslim-1',
    ittishalSanad: 'Muttashil',
    derajatSanad: 'Shahih Muttashil \'Ala Syarthi Muslim (Hadits Jibril \'alaihis salam)',
    ittishalExplanation: 'Sanad muttashil dari Imam Muslim bin Al-Hajjaj melalui guru terbesarnya Yahya bin Yahya At-Tamimi dan Abu Bakr bin Abi Syaibah, dari Waki\', dari Kahmas bin Al-Hasan, dari Abdullah bin Buraidah, dari Yahya bin Ya\'mar, dari Abdullah bin Umar, dari Umar bin Al-Khaththab.',
    kaidahJarh: 'Sanad riwayat hadits Jibril ini adalah teladan puncak riwayat ahlil bashirah. Setiap perawi memiliki dhabth (ketelitian) tinggi, dan hadits ini menjadi landasan pembagian rukun Islam, rukun Iman, dan derajat Ihsan.',
    silsilah: [
      {
        order: 1,
        rawiId: 'rawi-muslim-hajjaj',
        rawiName: 'Imam Muslim bin Al-Hajjaj',
        rawiArabic: 'الإمام مسلم بن الحجاج النيسابوري',
        shighahTahammul: 'Mukharrij Kitab (صاحب الصحيح)',
        statusCategory: 'tsiqah',
        statusLabel: 'Imam Huffazh Naqqad',
        thabaqah: 'Thabaqah 11'
      },
      {
        order: 2,
        rawiId: 'rawi-yahya-tamimi',
        rawiName: 'Yahya bin Yahya At-Tamimi',
        rawiArabic: 'يحيى بن يحيى التميمي النيسابوري',
        shighahTahammul: 'حَدَّثَنِي (Menceritakan kepadaku)',
        statusCategory: 'tsiqah',
        statusLabel: 'Tsiqah Tsabat Imam',
        thabaqah: 'Thabaqah 10'
      },
      {
        order: 3,
        rawiId: 'rawi-umar',
        rawiName: 'Umar bin Al-Khaththab',
        rawiArabic: 'عمر بن الخطاب رضي الله عنه',
        shighahTahammul: 'بَيْنَمَا نَحْنُ عِنْدَ رَسُولِ اللَّهِ ﷺ',
        statusCategory: 'sahabat',
        statusLabel: 'Shahabat Nabi (Kulluhum \'Udul)',
        thabaqah: 'Thabaqah 1'
      }
    ]
  }
};
