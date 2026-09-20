import { MujamRootEntry } from '../types';

/**
 * Data Indeks Al-Mu'jam Al-Mufahras li Alfazh Al-Hadits An-Nabawi
 * (المعجم المفهرس لألفاظ الحديث النبوي)
 * Disusun berdasarkan akar kata bahasa Arab (al-judzur) dan persebarannya di Kutubut Tis'ah
 * dengan lambang rumuz standar:
 * [خ] = Shahih Al-Bukhari
 * [م] = Shahih Muslim
 * [د] = Sunan Abi Dawud
 * [ت] = Jami' At-Tirmidzi
 * [ن] = Sunan An-Nasa'i
 * [هـ] = Sunan Ibnu Majah
 * [ط] = Muwatha' Malik
 * [حم] = Musnad Ahmad
 * [دي] = Sunan Ad-Darimi
 */
export const MUJAM_ROOTS_DATABASE: MujamRootEntry[] = [
  {
    id: 'root-nwy',
    root: 'ن و ي',
    rootArabic: 'نوى',
    transliteration: 'n-w-y',
    generalMeaning: 'Bermaksud, berkehendak kuat dalam hati, mengarahkan orientasi batin ke suatu tujuan.',
    totalOccurrences: 48,
    sharhMufahras: 'Kata "Niyyah" dan mustaqqat-nya merupakan kaidah poros hadits ahkam dan ushul. Tercatat di 9 kitab induk dengan penekanan pada ketetapan niat dalam ibadah dan amal hijrah.',
    derivatives: [
      { form: 'فعل ماضٍ (نَوَى)', arabic: 'نَوَى', transliteration: 'Nawā', meaning: 'Ia telah berniat / menghendaki', count: 18 },
      { form: 'فعل مضارع (يَنْوِي)', arabic: 'يَنْوِي', transliteration: 'Yanwī', meaning: 'Ia sedang / akan berniat', count: 7 },
      { form: 'اسم مفرد (نِيَّة)', arabic: 'نِيَّة', transliteration: 'Niyyah', meaning: 'Maksud tujuan / tekad hati', count: 11 },
      { form: 'جمع مؤنث (نِيَّات)', arabic: 'نِيَّات', transliteration: 'Niyyāt', meaning: 'Niat-niat yang beragam', count: 9 },
      { form: 'اسم مفعول (مَنْوِيّ)', arabic: 'مَنْوِيّ', transliteration: 'Manwiyy', meaning: 'Sesuatu yang diniatkan', count: 3 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب بدء الوحي (Permulaan Turunnya Wahyu)',
        hadithNumber: 1,
        lafadzForm: 'بِالنِّيَّاتِ / نَوَى',
        excerpt: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى...'
      },
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الإيمان - باب ما جاء أن الأعمال بالنية',
        hadithNumber: 54,
        lafadzForm: 'بِالنِّيَّةِ',
        excerpt: 'إِذَا أَنْفَقَ الرَّجُلُ عَلَى أَهْلِهِ يَحْتَسِبُهَا فَهُوَ لَهُ صَدَقَةٌ...'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الإمارة - باب قوله ﷺ: إنما الأعمال بالنية',
        hadithNumber: 1907,
        lafadzForm: 'بِالنِّيَّاتِ / نَوَى',
        excerpt: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّةِ وَإِنَّمَا لِامْرِئٍ مَا نَوَى...'
      },
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب الطلاق - باب فيما عني به الطلاق والنيات',
        hadithNumber: 2201,
        lafadzForm: 'وَالنِّيَّاتِ',
        excerpt: 'الأَعْمَالُ بِالنِّيَّةِ، وَلِكُلِّ امْرِئٍ مَا نَوَى...'
      },
      {
        symbol: 'ت',
        kitabId: 'tirmidzi',
        kitabName: "Jami' At-Tirmidzi",
        babName: 'كتاب فضائل الجهاد - باب من قاتل للدنيا',
        hadithNumber: 1647,
        lafadzForm: 'مَا نَوَى',
        excerpt: 'فَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا...'
      },
      {
        symbol: 'ن',
        kitabId: 'nasai',
        kitabName: "Sunan An-Nasa'i",
        babName: 'كتاب الطهارة - باب النية في الوضوء',
        hadithNumber: 75,
        lafadzForm: 'بِالنِّيَّةِ',
        excerpt: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّةِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى...'
      },
      {
        symbol: 'هـ',
        kitabId: 'ibnu-majah',
        kitabName: 'Sunan Ibnu Majah',
        babName: 'كتاب الزهد - باب النية',
        hadithNumber: 4227,
        lafadzForm: 'بِالنِّيَّةِ',
        excerpt: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّةِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى...'
      },
      {
        symbol: 'ط',
        kitabId: 'muwatha-malik',
        kitabName: "Muwatha' Malik",
        babName: 'كتاب الأقضية - باب القضاء باليمين مع الشاهد',
        hadithNumber: 1430,
        lafadzForm: 'نِيَّة',
        excerpt: 'لَيْسَ لِأَحَدٍ أَنْ يَمِينَ عَلَى نِيَّةِ صَاحِبِهِ...'
      },
      {
        symbol: 'حم',
        kitabId: 'musnad-ahmad',
        kitabName: 'Musnad Ahmad',
        babName: 'مسند عمر بن الخطاب رضي الله عنه',
        hadithNumber: 168,
        lafadzForm: 'بِالنِّيَّاتِ',
        excerpt: 'سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ...'
      },
      {
        symbol: 'دي',
        kitabId: 'sunan-darimi',
        kitabName: 'Sunan Ad-Darimi',
        babName: 'كتاب الرقاق - باب في النية',
        hadithNumber: 2780,
        lafadzForm: 'نَوَى',
        excerpt: 'وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى فَمَنْ كَانَتْ هِجْرَتُهُ...'
      }
    ]
  },
  {
    id: 'root-aml',
    root: 'ع م ل',
    rootArabic: 'عمل',
    transliteration: 'a-m-l',
    generalMeaning: 'Berbuat, beramal, mengerjakan pekerjaan lahiriyah atau batiniyah.',
    totalOccurrences: 382,
    sharhMufahras: 'Lafadz amal dan derivatnya merupakan salah satu lafadz dengan frekuensi tertinggi dalam Kutubut Tis\'ah, mengaitkan antara iman dan pembuktian perbuatan.',
    derivatives: [
      { form: 'فعل ماضٍ (عَمِلَ)', arabic: 'عَمِلَ', transliteration: "'Amila", meaning: 'Telah mengerjakan amal', count: 94 },
      { form: 'فعل مضارع (يَعْمَلُ)', arabic: 'يَعْمَلُ', transliteration: "Ya'malu", meaning: 'Sedang / senantiasa beramal', count: 68 },
      { form: 'مصدر مفرد (عَمَل)', arabic: 'عَمَل', transliteration: "'Amal", meaning: 'Perbuatan / amalan', count: 112 },
      { form: 'جمع تكسير (أَعْمَال)', arabic: 'أَعْمَال', transliteration: "A'māl", meaning: 'Amal-amal / segala perbuatan', count: 85 },
      { form: 'اسم فاعل (عَامِل)', arabic: 'عَامِل', transliteration: "'Āmil", meaning: 'Orang yang beramal / pekerja', count: 23 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب بدء الوحي',
        hadithNumber: 1,
        lafadzForm: 'الأَعْمَالُ',
        excerpt: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ...'
      },
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الرقاق - باب القصد والمداومة على العمل',
        hadithNumber: 6463,
        lafadzForm: 'أَحَبُّ الأَعْمَالِ',
        excerpt: 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ...'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الإيمان - باب بيان تفاضل الإسلام',
        hadithNumber: 85,
        lafadzForm: 'أَيُّ الْعَمَلِ أَفْضَلُ',
        excerpt: 'سُئِلَ النَّبِيُّ ﷺ: أَيُّ الْعَمَلِ أَفْضَلُ؟ قَالَ: إِيمَانٌ بِاللَّهِ...'
      },
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب الصلاة - باب وقت قيام الليل',
        hadithNumber: 1368,
        lafadzForm: 'عَمَلَهُ',
        excerpt: 'كَانَ عَمَلُهُ دِيمَةً...'
      },
      {
        symbol: 'ت',
        kitabId: 'tirmidzi',
        kitabName: "Jami' At-Tirmidzi",
        babName: 'كتاب الصلاة - باب ما جاء في فضل الصلاة لوقتها',
        hadithNumber: 173,
        lafadzForm: 'أَفْضَلُ الأَعْمَالِ',
        excerpt: 'الصَّلَاةُ فِي أَوَّلِ وَقْتِهَا...'
      },
      {
        symbol: 'حم',
        kitabId: 'musnad-ahmad',
        kitabName: 'Musnad Ahmad',
        babName: 'مسند عبد الله بن مسعود',
        hadithNumber: 3610,
        lafadzForm: 'عَمَلٍ',
        excerpt: 'مَا مِنْ عَمَلٍ يُقَرِّبُ إِلَى الْجَنَّةِ إِلَّا قَدْ أَمَرْتُكُمْ بِهِ...'
      }
    ]
  },
  {
    id: 'root-hjr',
    root: 'ه ج ر',
    rootArabic: 'هجر',
    transliteration: 'h-j-r',
    generalMeaning: 'Meninggalkan, berpindah dari negeri kufur ke negeri Islam, memutus keburukan.',
    totalOccurrences: 145,
    sharhMufahras: 'Dipergunakan dalam dua konteks pokok sunnah: hijrah fisik (perpindahan Makkah-Madinah) dan hijrah maknawi (meninggalkan apa yang dilarang Allah).',
    derivatives: [
      { form: 'فعل ماضٍ (هَاجَرَ)', arabic: 'هَاجَرَ', transliteration: 'Hājara', meaning: 'Telah berhijrah', count: 42 },
      { form: 'فعل مضارع (يُهَاجِرُ)', arabic: 'يُهَاجِرُ', transliteration: 'Yuhājiru', meaning: 'Sedang berhijrah', count: 21 },
      { form: 'مصدر (هِجْرَة)', arabic: 'هِجْرَة', transliteration: 'Hijrah', meaning: 'Perpindahan / pemutusan dosa', count: 48 },
      { form: 'اسم فاعل (مُهَاجِر)', arabic: 'مُهَاجِر', transliteration: 'Muhājir', meaning: 'Orang yang berhijrah', count: 34 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب بدء الوحي',
        hadithNumber: 1,
        lafadzForm: 'هِجْرَتُهُ / هَاجَرَ',
        excerpt: 'فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا... فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.'
      },
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الإيمان - باب المسلم من سلم المسلمون من لسانه ويده',
        hadithNumber: 10,
        lafadzForm: 'وَالْمُهَاجِرُ / هَجَرَ',
        excerpt: 'وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ.'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الإمارة - باب فضل الهجرة في سبيل الله',
        hadithNumber: 1864,
        lafadzForm: 'لَا هِجْرَةَ بَعْدَ الْفَتْحِ',
        excerpt: 'لَا هِجْرَةَ بَعْدَ الْفَتْحِ، وَلَكِنْ جِهَادٌ وَنِيَّةٌ...'
      },
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب الجهاد - باب في دوام الهجرة',
        hadithNumber: 2479,
        lafadzForm: 'لَا تَنْقَطِعُ الْهِجْرَةُ',
        excerpt: 'لَا تَنْقَطِعُ الْهِجْرَةُ حَتَّى تَنْقَطِعَ التَّوْبَةُ...'
      },
      {
        symbol: 'ن',
        kitabId: 'nasai',
        kitabName: "Sunan An-Nasa'i",
        babName: 'كتاب البيعة - البيعة على الهجرة',
        hadithNumber: 4165,
        lafadzForm: 'الْهِجْرَةَ',
        excerpt: 'أَتَيْتُ رَسُولَ اللَّهِ ﷺ أُبَايِعُهُ عَلَى الْهِجْرَةِ...'
      }
    ]
  },
  {
    id: 'root-alm',
    root: 'ع ل م',
    rootArabic: 'علم',
    transliteration: 'a-l-m',
    generalMeaning: 'Mengetahui kebenaran, memahami ilmu syariat, menghilangkan kebodohan.',
    totalOccurrences: 512,
    sharhMufahras: 'Merupakan bab ilmu (Kitab al-Ilm) dalam seluruh Kutubus Sittah. Imam Bukhari meletakkan bab "Al-Ilmu Qablal Qawli wal Amal" sebagai kaidah fundamental.',
    derivatives: [
      { form: 'فعل ماضٍ (عَلِمَ)', arabic: 'عَلِمَ', transliteration: "'Alima", meaning: 'Telah mengetahui', count: 120 },
      { form: 'فعل مضارع (يَعْلَمُ)', arabic: 'يَعْلَمُ', transliteration: "Ya'lamu", meaning: 'Mengetahui', count: 145 },
      { form: 'فعل مزيد (عَلَّمَ)', arabic: 'عَلَّمَ', transliteration: "'Allama", meaning: 'Mengajarkan', count: 58 },
      { form: 'مصدر (عِلْم)', arabic: 'عِلْم', transliteration: "'Ilm", meaning: 'Ilmu syariat / pengetahuan', count: 110 },
      { form: 'جمع (عُلَمَاء)', arabic: 'عُلَمَاء', transliteration: "'Ulamā'", meaning: 'Para ulama / pewaris Nabi', count: 32 },
      { form: 'اسم فاعل (عَالِم)', arabic: 'عَالِم', transliteration: "'Ālim", meaning: 'Orang yang berilmu', count: 47 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب العلم - باب فضل العلم',
        hadithNumber: 71,
        lafadzForm: 'يُفَقِّهْهُ فِي الدِّينِ / يَعْلَمُ',
        excerpt: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ، وَإِنَّمَا أَنَا قَاسِمٌ وَاللَّهُ يُعْطِي...'
      },
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب فضائل القرآن - باب خيركم من تعلم القرآن وعلمه',
        hadithNumber: 5027,
        lafadzForm: 'تَعَلَّمَ / عَلَّمَهُ',
        excerpt: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الذكر والدعاء - باب فضل الاجتماع على تلاوة القرآن',
        hadithNumber: 2699,
        lafadzForm: 'طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا',
        excerpt: 'وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ...'
      },
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب العلم - باب الحث على طلب العلم',
        hadithNumber: 3641,
        lafadzForm: 'الْعُلَمَاءَ وَرَثَةُ الأَنْبِيَاءِ',
        excerpt: 'وَإِنَّ الْعُلَمَاءَ وَرَثَةُ الأَنْبِيَاءِ، وَإِنَّ الأَنْبِيَاءَ لَمْ يُوَرِّثُوا دِينَارًا وَلَا دِرْهَمًا، وَإِنَّمَا وَرَّثُوا الْعِلْمَ...'
      },
      {
        symbol: 'ت',
        kitabId: 'tirmidzi',
        kitabName: "Jami' At-Tirmidzi",
        babName: 'كتاب العلم - باب فضل طلب العلم',
        hadithNumber: 2682,
        lafadzForm: 'فَضْلُ الْعَالِمِ',
        excerpt: 'فَضْلُ الْعَالِمِ عَلَى الْعَابِدِ كَفَضْلِي عَلَى أَدْنَاكُمْ...'
      },
      {
        symbol: 'هـ',
        kitabId: 'ibnu-majah',
        kitabName: 'Sunan Ibnu Majah',
        babName: 'المقدمة - باب فضل العلماء والحث على طلب العلم',
        hadithNumber: 224,
        lafadzForm: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ',
        excerpt: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ...'
      }
    ]
  },
  {
    id: 'root-slh',
    root: 'ص ل ح',
    rootArabic: 'صلح',
    transliteration: 's-l-h',
    generalMeaning: 'Baik, lurus, damai, terbebas dari kebobrokan, kesalehan jiwa dan masyarakat.',
    totalOccurrences: 188,
    sharhMufahras: 'Lafadz yang mencakup kesalehan hati, ishlah bainan nas (mendamaikan sengketa), serta gelar kaum shalihin.',
    derivatives: [
      { form: 'فعل ماضٍ (صَلَحَ)', arabic: 'صَلَحَ', transliteration: 'Shalaha', meaning: 'Telah menjadi baik', count: 35 },
      { form: 'فعل مزيد (أَصْلَحَ)', arabic: 'أَصْلَحَ', transliteration: 'Ashlaha', meaning: 'Memperbaiki / mendamaikan', count: 44 },
      { form: 'مصدر (صَلَاح)', arabic: 'صَلَاح', transliteration: 'Shalāh', meaning: 'Kebaikan / kelurusan', count: 28 },
      { form: 'اسم فاعل (صَالِح)', arabic: 'صَالِح', transliteration: 'Shālih', meaning: 'Orang yang saleh', count: 52 },
      { form: 'جمع (صَالِحُون / صُلَحَاء)', arabic: 'صَالِحُون', transliteration: 'Shālihūn', meaning: 'Orang-orang saleh', count: 29 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الإيمان - باب فضل من استبرأ لدينه',
        hadithNumber: 52,
        lafadzForm: 'صَلَحَتْ / صَلَحَ الْجَسَدُ',
        excerpt: 'أَلَا وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلَا وَهِيَ الْقَلْبُ.'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب المساقاة - باب أخذ الحلال وترك الشبهات',
        hadithNumber: 1599,
        lafadzForm: 'صَلَحَتْ / صَلَحَ',
        excerpt: 'إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ...'
      },
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب الأدب - باب في إصلاح ذات البين',
        hadithNumber: 4919,
        lafadzForm: 'إِصْلَاحُ ذَاتِ الْبَيْنِ',
        excerpt: 'أَلَا أُخْبِرُكُمْ بِأَفْضَلَ مِنْ دَرَجَةِ الصِّيَامِ وَالصَّلَاةِ وَالصَّدَقَةِ؟ قَالُوا: بَلَى. قَالَ: إِصْلَاحُ ذَاتِ الْبَيْنِ...'
      },
      {
        symbol: 'ت',
        kitabId: 'tirmidzi',
        kitabName: "Jami' At-Tirmidzi",
        babName: 'كتاب صفة القيامة - باب إصلاح ذات البين',
        hadithNumber: 2509,
        lafadzForm: 'إِصْلَاحُ ذَاتِ الْبَيْنِ',
        excerpt: 'فَإِنَّ فَسَادَ ذَاتِ الْبَيْنِ هِيَ الْحَالِقَةُ...'
      }
    ]
  },
  {
    id: 'root-hsn',
    root: 'ح س ن',
    rootArabic: 'حسن',
    transliteration: 'h-s-n',
    generalMeaning: 'Indah, elok, berbuat kebajikan secara sempurna, puncak ketundukan batin (Ihsan).',
    totalOccurrences: 295,
    sharhMufahras: 'Lafadz ihsan mencakup rukun ketiga dalam Hadits Jibril alaihis salam, serta tuntunan bersikap baik kepada seluruh makhluk.',
    derivatives: [
      { form: 'فعل ماضٍ (أَحْسَنَ)', arabic: 'أَحْسَنَ', transliteration: 'Ahsana', meaning: 'Telah berbuat kebajikan / memperbagus', count: 68 },
      { form: 'فعل مضارع (يُحْسِنُ)', arabic: 'يُحْسِنُ', transliteration: 'Yuhsinu', meaning: 'Berbuat baik secara sempurna', count: 32 },
      { form: 'مصدر (إِحْسَان)', arabic: 'إِحْسَان', transliteration: 'Ihsān', meaning: 'Kesempurnaan pengabdian kepada Allah', count: 45 },
      { form: 'صفة مشبهة (حَسَن)', arabic: 'حَسَن', transliteration: 'Hasan', meaning: 'Baik / elok', count: 98 },
      { form: 'اسم فاعل (مُحْسِن)', arabic: 'مُحْسِن', transliteration: 'Muhsin', meaning: 'Orang yang berbuat ihsan', count: 52 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الإيمان - باب سؤال جبريل النبي ﷺ عن الإيمان والإسلام والإحسان',
        hadithNumber: 50,
        lafadzForm: 'الإِحْسَانُ',
        excerpt: 'قَالَ: مَا الإِحْسَانُ؟ قَالَ: أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ.'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الصيد والذبائح - باب الأمر بإحسان الذبح',
        hadithNumber: 1955,
        lafadzForm: 'الإِحْسَانَ / فَأَحْسِنُوا',
        excerpt: 'إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ، فَإِذَا قَتَلْتُمْ فَأَحْسِنُوا الْقِتْلَةَ، وَإِذَا ذَبَحْتُمْ فَأَحْسِنُوا الذَّبْحَ...'
      },
      {
        symbol: 'ت',
        kitabId: 'tirmidzi',
        kitabName: "Jami' At-Tirmidzi",
        babName: 'كتاب البر والصلة - باب ما جاء في الإحسان والعفو',
        hadithNumber: 2007,
        lafadzForm: 'أَحْسَنَ النَّاسُ أَنْ تُحْسِنُوا',
        excerpt: 'لَا تَكُونُوا إِمَّعَةً، تَقُولُونَ: إِنْ أَحْسَنَ النَّاسُ أَحْسَنَّا... وَلَكِنْ وَطِّنُوا أَنْفُسَكُمْ إِنْ أَحْسَنَ النَّاسُ أَنْ تُحْسِنُوا...'
      },
      {
        symbol: 'ط',
        kitabId: 'muwatha-malik',
        kitabName: "Muwatha' Malik",
        babName: 'كتاب حسن الخلق',
        hadithNumber: 1614,
        lafadzForm: 'حُسْنَ الْخُلُقِ',
        excerpt: 'بُعِثْتُ لِأُتَمِّمَ حُسْنَ الأَخْلَاقِ.'
      }
    ]
  },
  {
    id: 'root-sdq',
    root: 'ص د ق',
    rootArabic: 'صدق',
    transliteration: 's-d-q',
    generalMeaning: 'Jujur, benar, membuktikan keimanan dengan sedekah, membenarkan wahyu.',
    totalOccurrences: 340,
    sharhMufahras: 'Lafadz ash-shidq (kejujuran) dan shadaqah (pembuktian iman dengan harta) saling bertaut dalam sunnah nabawiyah.',
    derivatives: [
      { form: 'فعل ماضٍ (صَدَقَ)', arabic: 'صَدَقَ', transliteration: 'Shadaqa', meaning: 'Telah berkata jujur / benar', count: 72 },
      { form: 'مصدر (صِدْق)', arabic: 'صِدْق', transliteration: 'Shidq', meaning: 'Kejujuran / kebenaran', count: 64 },
      { form: 'اسم (صَدَقَة)', arabic: 'صَدَقَة', transliteration: 'Shadaqah', meaning: 'Sedekah pembuktian iman', count: 125 },
      { form: 'اسم فاعل (صَادِق)', arabic: 'صَادِق', transliteration: 'Shādiq', meaning: 'Orang yang jujur', count: 48 },
      { form: 'صيغة مبالغة (صِدِّيق)', arabic: 'صِدِّيق', transliteration: 'Shiddīq', meaning: 'Sangat jujur dan membenarkan', count: 31 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الأدب - باب علامة الصدق والبر',
        hadithNumber: 6094,
        lafadzForm: 'الصِّدْقَ / يَصْدُقُ / صِدِّيقًا',
        excerpt: 'عَلَيْكُمْ بِالصِّدْقِ، فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ، وَمَا يَزَالُ الرَّجُلُ يَصْدُقُ وَيَتَحَرَّى الصِّدْقَ حَتَّى يُكْتَبَ عِنْدَ اللَّهِ صِدِّيقًا.'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب البر والصلة والآداب - باب قبح الكذب وحسن الصدق',
        hadithNumber: 2607,
        lafadzForm: 'الصِّدْقَ / صِدِّيقًا',
        excerpt: 'إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ...'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الطهارة - باب فضل الوضوء',
        hadithNumber: 223,
        lafadzForm: 'وَالصَّدَقَةُ بُرْهَانٌ',
        excerpt: 'وَالصَّلَاةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ...'
      },
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب الأدب - باب في التشديد في الكذب',
        hadithNumber: 4989,
        lafadzForm: 'الصِّدْقَ',
        excerpt: 'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ مَعَ الْبِرِّ وَهُمَا فِي الْجَنَّةِ...'
      }
    ]
  },
  {
    id: 'root-thr',
    root: 'ط ه ر',
    rootArabic: 'طهر',
    transliteration: 't-h-r',
    generalMeaning: 'Suci dari najis dan hadats, membersihkan lahiriah dan batiniah.',
    totalOccurrences: 215,
    sharhMufahras: 'Pintu gerbang seluruh kitab fiqih hadits (Kitabut Thaharah). Menjadi syarat mutlak sahnya shalat.',
    derivatives: [
      { form: 'فعل ماضٍ (طَهُرَ)', arabic: 'طَهُرَ', transliteration: 'Thahura', meaning: 'Telah menjadi suci', count: 38 },
      { form: 'مصدر (طُهْر / طَهَارَة)', arabic: 'طَهَارَة', transliteration: 'Thahārah', meaning: 'Kesucian / bersuci', count: 85 },
      { form: 'صيغة مبالغة (طَهُور)', arabic: 'طَهُور', transliteration: 'Thahūr', meaning: 'Sangat suci dan menyucikan', count: 42 },
      { form: 'اسم فاعل (مُتَطَهِّر)', arabic: 'مُتَطَهِّر', transliteration: 'Mutathahhir', meaning: 'Orang yang bersuci', count: 50 }
    ],
    occurrences: [
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الطهارة - باب فضل الوضوء',
        hadithNumber: 223,
        lafadzForm: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
        excerpt: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ...'
      },
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب الطهارة - باب الوضوء بماء البحر',
        hadithNumber: 83,
        lafadzForm: 'هُوَ الطَّهُورُ مَاؤُهُ',
        excerpt: 'سُئِلَ رَسُولُ اللَّهِ ﷺ عَنْ مَاءِ الْبَحْرِ فَقَالَ: هُوَ الطَّهُورُ مَاؤُهُ، الْحِلُّ مَيْتَتُهُ.'
      },
      {
        symbol: 'ت',
        kitabId: 'tirmidzi',
        kitabName: "Jami' At-Tirmidzi",
        babName: 'كتاب الطهارة - باب لا تقبل صلاة بغير طهور',
        hadithNumber: 1,
        lafadzForm: 'بِغَيْرِ طُهُورٍ',
        excerpt: 'لَا تُقْبَلُ صَلَاةٌ بِغَيْرِ طُهُورٍ، وَلَا صَدَقَةٌ مِنْ غُلُولٍ.'
      },
      {
        symbol: 'ط',
        kitabId: 'muwatha-malik',
        kitabName: "Muwatha' Malik",
        babName: 'كتاب الطهارة - باب الطهور للوضوء',
        hadithNumber: 42,
        lafadzForm: 'الطَّهُورُ',
        excerpt: 'هُوَ الطَّهُورُ مَاؤُهُ الْحِلُّ مَيْتَتُهُ...'
      }
    ]
  },
  {
    id: 'root-rhm',
    root: 'ر ح م',
    rootArabic: 'رحم',
    transliteration: 'r-h-m',
    generalMeaning: 'Kasih sayang, belas kasih kepada sesama, rahmat Allah yang melingkupi segala sesuatu.',
    totalOccurrences: 260,
    sharhMufahras: 'Lafadz hadits musalsal bil awwaliyyah (hadits pertama yang diajarkan guru hadits kepada muridnya: Ar-Rahimuna yarhamuhumur Rahman).',
    derivatives: [
      { form: 'فعل ماضٍ (رَحِمَ)', arabic: 'رَحِمَ', transliteration: 'Rahima', meaning: 'Telah merahmati / mengasihi', count: 70 },
      { form: 'فعل مضارع (يَرْحَمُ)', arabic: 'يَرْحَمُ', transliteration: 'Yarhamu', meaning: 'Mengasihi', count: 55 },
      { form: 'مصدر (رَحْمَة)', arabic: 'رَحْمَة', transliteration: 'Rahmah', meaning: 'Kasih sayang / rahmat', count: 82 },
      { form: 'اسم فاعل جمع (رَاحِمُون)', arabic: 'رَاحِمُون', transliteration: 'Rāhimūn', meaning: 'Orang-orang yang penyayang', count: 28 },
      { form: 'اسم ذات (رَحِم)', arabic: 'رَحِم', transliteration: 'Rahim', meaning: 'Tali kekerabatan / silaturahim', count: 25 }
    ],
    occurrences: [
      {
        symbol: 'د',
        kitabId: 'abu-dawud',
        kitabName: 'Sunan Abi Dawud',
        babName: 'كتاب الأدب - باب في الرحمة',
        hadithNumber: 4941,
        lafadzForm: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ',
        excerpt: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ...'
      },
      {
        symbol: 'ت',
        kitabId: 'tirmidzi',
        kitabName: "Jami' At-Tirmidzi",
        babName: 'كتاب البر والصلة - باب ما جاء في رحمة المسلمين',
        hadithNumber: 1924,
        lafadzForm: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ',
        excerpt: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ تَبَارَكَ وَتَعَالَى...'
      },
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الأدب - باب رحمة الولد وتقبيله ومعانقته',
        hadithNumber: 5997,
        lafadzForm: 'مَنْ لَا يَرْحَمُ لَا يُرْحَمُ',
        excerpt: 'مَنْ لَا يَرْحَمُ لَا يُرْحَمُ.'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الفضائل - باب رحمته ﷺ بالصبيان والعيال',
        hadithNumber: 2318,
        lafadzForm: 'مَنْ لَا يَرْحَمُ النَّاسَ',
        excerpt: 'مَنْ لَا يَرْحَمُ النَّاسَ لَا يَرْحَمْهُ اللَّهُ عَزَّ وَجَلَّ...'
      }
    ]
  },
  {
    id: 'root-sym',
    root: 'ص و م',
    rootArabic: 'صوم',
    transliteration: 's-w-m',
    generalMeaning: 'Menahan diri, berpuasa secara lahir dan batin mengharap ridha Allah semata.',
    totalOccurrences: 192,
    sharhMufahras: 'Termuat dalam bab puasa (Kitabus Shiyam / Ash-Shaum) di seluruh Kutubus Sittah dan Kutubut Tis\'ah.',
    derivatives: [
      { form: 'فعل ماضٍ (صَامَ)', arabic: 'صَامَ', transliteration: 'Shāma', meaning: 'Telah berpuasa', count: 62 },
      { form: 'فعل مضارع (يَصُومُ)', arabic: 'يَصُومُ', transliteration: 'Yashūmu', meaning: 'Sedang berpuasa', count: 48 },
      { form: 'مصدر (صَوْم / صِيَام)', arabic: 'صَوْم', transliteration: 'Shawm', meaning: 'Ibadah puasa', count: 54 },
      { form: 'اسم فاعل (صَائِم)', arabic: 'صَائِم', transliteration: 'Shā\'im', meaning: 'Orang yang berpuasa', count: 28 }
    ],
    occurrences: [
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الصوم - باب فضل الصوم',
        hadithNumber: 1894,
        lafadzForm: 'الصِّيَامُ جُنَّةٌ / الصَّائِمِ',
        excerpt: 'الصِّيَامُ جُنَّةٌ، فَلَا يَرْفُثْ وَلَا يَجْهَلْ... وَلَخَلُوفُ فَمِ الصَّائِمِ أَطْيَبُ عِنْدَ اللَّهِ مِنْ رِيحِ الْمِسْكِ...'
      },
      {
        symbol: 'م',
        kitabId: 'muslim',
        kitabName: 'Shahih Muslim',
        babName: 'كتاب الصيام - باب فضل الصيام في سبيل الله',
        hadithNumber: 1151,
        lafadzForm: 'مَنْ صَامَ يَوْمًا',
        excerpt: 'مَنْ صَامَ يَوْمًا فِي سَبِيلِ اللَّهِ، بَاعَدَ اللَّهُ وَجْهَهُ عَنِ النَّارِ سَبْعِينَ خَرِيفًا.'
      },
      {
        symbol: 'خ',
        kitabId: 'bukhari',
        kitabName: 'Shahih Al-Bukhari',
        babName: 'كتاب الصوم - باب من صام رمضان إيمانا واحتسابا',
        hadithNumber: 1901,
        lafadzForm: 'مَنْ صَامَ رَمَضَانَ',
        excerpt: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ.'
      }
    ]
  }
];

/**
 * Pustaka analisis leksikal hadits-hadits pokok
 * Memetakan setiap kata kunci dalam matan hadits ke data Mu'jam Al-Mufahras
 */
export const HADITH_LEXICAL_ANALYSIS: Record<string, Array<{
  word: string;
  normalized: string;
  rootId: string;
  rootStr: string;
  wazan: string;
  makna: string;
}>> = {
  'bukhari-1': [
    { word: 'الأَعْمَالُ', normalized: 'الاعمال', rootId: 'root-aml', rootStr: 'ع م ل', wazan: 'أَفْعَال (جمع قلة)', makna: 'Segala perbuatan lahir maupun batin yang dikerjakan mukallaf' },
    { word: 'بِالنِّيَّاتِ', normalized: 'بالنيات', rootId: 'root-nwy', rootStr: 'ن و ي', wazan: 'فِعْلَات (جمع مؤنث سالم)', makna: 'Dengan kehendak hati yang mengarahkan perbuatan' },
    { word: 'امْرِئٍ', normalized: 'امرئ', rootId: 'root-mra', rootStr: 'م ر أ', wazan: 'فِعْل', makna: 'Setiap individu / manusia mukallaf' },
    { word: 'نَوَى', normalized: 'نوى', rootId: 'root-nwy', rootStr: 'ن و ي', wazan: 'فَعَلَ (فعل ماض معتل)', makna: 'Ia telah memaksudkan dan mengazamkan dalam kalbunya' },
    { word: 'هِجْرَتُهُ', normalized: 'هجرته', rootId: 'root-hjr', rootStr: 'ه ج ر', wazan: 'فِعْلَة', makna: 'Perpindahannya meninggalkan kampung halaman demi tujuan tertentu' },
    { word: 'دُنْيَا', normalized: 'دنيا', rootId: 'root-dnw', rootStr: 'د ن و', wazan: 'فُعْلَى (مؤنث أدنى)', makna: 'Kehidupan duniawi yang fana dan dekat' },
    { word: 'امْرَأَةٍ', normalized: 'امراة', rootId: 'root-mra', rootStr: 'م ر أ', wazan: 'فَعْلَة', makna: 'Wanita yang hendak dinikahi' },
    { word: 'يَنْكِحُهَا', normalized: 'ينكحها', rootId: 'root-nkh', rootStr: 'ن ك ح', wazan: 'يَفْعِلُهَا', makna: 'Melangsungkan akad pernikahan dengannya' }
  ],
  'bukhari-50': [
    { word: 'الإِيمَانُ', normalized: 'الايمان', rootId: 'root-amn', rootStr: 'أ م ن', wazan: 'إِفْعَال', makna: 'Pembenaran hati yang melahirkan ketundukan lahir batin' },
    { word: 'الإِسْلَامُ', normalized: 'الاسلام', rootId: 'root-slm', rootStr: 'س ل م', wazan: 'إِفْعَال', makna: 'Ketundukan dan kepatuhan syariat lahiriah' },
    { word: 'الإِحْسَانُ', normalized: 'الاحسان', rootId: 'root-hsn', rootStr: 'ح س ن', wazan: 'إِفْعَال', makna: 'Puncak ibadah seakan-akan melihat Allah Subhanahu wa Ta\'ala' },
    { word: 'تَعْبُدَ', normalized: 'تعبد', rootId: 'root-abd', rootStr: 'ع ب د', wazan: 'تَفْعُلَ', makna: 'Menyembah dan beribadah dengan penuh penghambaan' },
    { word: 'تَرَاهُ', normalized: 'تراه', rootId: 'root-rya', rootStr: 'ر أ ي', wazan: 'تَفْعَاهُ', makna: 'Melihat-Nya secara kasat mata / keyakinan musyahadah' },
    { word: 'يَرَاكَ', normalized: 'يراك', rootId: 'root-rya', rootStr: 'ر أ ي', wazan: 'يَفْعَاكَ', makna: 'Dia Maha Melihat dan Mengawasi seluruh gerak-gerikmu (Muraqabah)' }
  ],
  'bukhari-52': [
    { word: 'الْحَلَالُ', normalized: 'الحلال', rootId: 'root-hll', rootStr: 'ح ل ل', wazan: 'فَعَال', makna: 'Perkara yang diizinkan syariat tanpa adanya dosa' },
    { word: 'الْحَرَامُ', normalized: 'الحرام', rootId: 'root-hrm', rootStr: 'ح ر م', wazan: 'فَعَال', makna: 'Perkara yang dilarang tegas oleh syariat' },
    { word: 'مُشْتَبِهَاتٌ', normalized: 'مشتبهات', rootId: 'root-sbh', rootStr: 'ش ب ه', wazan: 'مُفْتَعَلَات', makna: 'Perkara samar antara halal dan haram bagi orang awam' },
    { word: 'مُضْغَةً', normalized: 'مضغة', rootId: 'root-mdg', rootStr: 'م ض غ', wazan: 'فُعْلَة', makna: 'Segumpal daging sekecil suapan di dalam tubuh' },
    { word: 'صَلَحَتْ', normalized: 'صلحت', rootId: 'root-slh', rootStr: 'ص ل ح', wazan: 'فَعَلَتْ', makna: 'Menjadi baik dan lurus fitrahnya' },
    { word: 'الْقَلْبُ', normalized: 'القلب', rootId: 'root-qlb', rootStr: 'ق ل ب', wazan: 'فَعْل', makna: 'Hati sanubari yang menjadi pusat niat dan kesadaran' }
  ]
};
