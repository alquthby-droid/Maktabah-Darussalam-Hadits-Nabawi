import { KitabInfo, HadithItem } from '../types';

export const KITAB_LIST: KitabInfo[] = [
  {
    id: 'bukhari',
    name: 'Shahih Al-Bukhari',
    arabicName: 'صحيح البخاري',
    author: 'Imam Abu Abdillah Muhammad bin Ismail Al-Bukhari',
    authorDeath: '256 H',
    category: 'Kutubus Sittah',
    totalHadith: 7563,
    description: 'Kitab hadits paling shahih setelah Al-Qur\'an Al-Karim, disusun dengan ketelitian sanad dan syarat tsiqah yang sangat ketat oleh Imam Al-Bukhari.',
    coverColor: 'from-amber-900 to-amber-700',
    chapters: [
      { id: 1, title: 'Permulaan Turunnya Wahyu', arabicTitle: 'كتاب بدء الوحي', hadithRange: '1 - 7' },
      { id: 2, title: 'Kitab Keimanan', arabicTitle: 'كتاب الإيمان', hadithRange: '8 - 58' },
      { id: 3, title: 'Kitab Ilmu', arabicTitle: 'كتاب العلم', hadithRange: '59 - 134' },
      { id: 4, title: 'Kitab Wudhu & Thaharah', arabicTitle: 'كتاب الوضوء', hadithRange: '135 - 247' },
      { id: 5, title: 'Kitab Shalat', arabicTitle: 'كتاب الصلاة', hadithRange: '349 - 520' },
      { id: 6, title: 'Kitab Adab & Kebaikan', arabicTitle: 'كتاب الأدب', hadithRange: '5970 - 6226' }
    ]
  },
  {
    id: 'muslim',
    name: 'Shahih Muslim',
    arabicName: 'صحيح مسلم',
    author: 'Imam Abu Al-Husain Muslim bin Al-Hajjaj An-Naisaburi',
    authorDeath: '261 H',
    category: 'Kutubus Sittah',
    totalHadith: 7500,
    description: 'Kitab hadits shahih dengan sistematika pengelompokan sanad dan matan yang sangat rapi tanpa mengulang-ulang bab terpisah.',
    coverColor: 'from-emerald-950 to-emerald-800',
    chapters: [
      { id: 1, title: 'Kitab Keimanan', arabicTitle: 'كتاب الإيمان', hadithRange: '1 - 222' },
      { id: 2, title: 'Kitab Thaharah (Bersuci)', arabicTitle: 'كتاب الطهارة', hadithRange: '223 - 292' },
      { id: 3, title: 'Kitab Shalat', arabicTitle: 'كتاب الصلاة', hadithRange: '397 - 684' },
      { id: 4, title: 'Kitab Kebaikan, Silaturahim & Adab', arabicTitle: 'كتاب البر والصلة والآداب', hadithRange: '2548 - 2642' }
    ]
  },
  {
    id: 'abu-dawud',
    name: 'Sunan Abi Dawud',
    arabicName: 'سنن أبي داود',
    author: 'Imam Abu Dawud Sulaiman bin Al-Asy\'ats As-Sijistani',
    authorDeath: '275 H',
    category: 'Kutubus Sittah',
    totalHadith: 5274,
    description: 'Rujukan primer hadits-hadits hukum fiqih (Ahaditsul Ahkam) yang menjadi pegangan para fuqaha madzhab.',
    coverColor: 'from-stone-900 to-amber-900',
    chapters: [
      { id: 1, title: 'Kitab Bersuci (Thaharah)', arabicTitle: 'كتاب الطهارة', hadithRange: '1 - 390' },
      { id: 2, title: 'Kitab Shalat', arabicTitle: 'كتاب الصلاة', hadithRange: '391 - 1160' },
      { id: 3, title: 'Kitab Zakat', arabicTitle: 'كتاب الزكاة', hadithRange: '1556 - 1700' },
      { id: 4, title: 'Kitab Adab', arabicTitle: 'كتاب الأدب', hadithRange: '4773 - 5274' }
    ]
  },
  {
    id: 'tirmidzi',
    name: "Jami' At-Tirmidzi",
    arabicName: 'جامع الترمذي',
    author: 'Imam Abu Isa Muhammad bin Isa At-Tirmidzi',
    authorDeath: '279 H',
    category: 'Kutubus Sittah',
    totalHadith: 3956,
    description: 'Istimewa dengan keterangan derajat hadits (Shahih, Hasan, Gharib) dan ulasan ikhtilaf pandangan para sahabat dan tabi\'in.',
    coverColor: 'from-teal-950 to-teal-800',
    chapters: [
      { id: 1, title: 'Kitab Thaharah', arabicTitle: 'أبواب الطهارة', hadithRange: '1 - 148' },
      { id: 2, title: 'Kitab Shalat', arabicTitle: 'أبواب الصلاة', hadithRange: '149 - 451' },
      { id: 3, title: 'Kitab Kebaikan dan Silaturahim', arabicTitle: 'أبواب البر والصلة', hadithRange: '1897 - 2040' },
      { id: 4, title: 'Kitab Sifat Hari Kiamat & Zuhud', arabicTitle: 'أبواب صفة القيامة والزهد', hadithRange: '2405 - 2522' }
    ]
  },
  {
    id: 'nasai',
    name: "Sunan An-Nasa'i",
    arabicName: 'سنن النسائي (المجتبى)',
    author: 'Imam Ahmad bin Syu\'aib An-Nasa\'i',
    authorDeath: '303 H',
    category: 'Kutubus Sittah',
    totalHadith: 5758,
    description: 'Memiliki derajat keshahihan tertinggi di bawah Shahih Bukhari dan Muslim menurut banyak pakar hadits Maghrib.',
    coverColor: 'from-slate-900 to-emerald-900',
    chapters: [
      { id: 1, title: 'Kitab Thaharah', arabicTitle: 'كتاب الطهارة', hadithRange: '1 - 347' },
      { id: 2, title: 'Kitab Shalat', arabicTitle: 'كتاب الصلاة', hadithRange: '448 - 890' },
      { id: 3, title: 'Kitab Puasa', arabicTitle: 'كتاب الصيام', hadithRange: '2090 - 2434' }
    ]
  },
  {
    id: 'ibn-majah',
    name: 'Sunan Ibnu Majah',
    arabicName: 'سنن ابن ماجه',
    author: 'Imam Abu Abdillah Muhammad bin Yazid Ibnu Majah Al-Qazwini',
    authorDeath: '273 H',
    category: 'Kutubus Sittah',
    totalHadith: 4341,
    description: 'Kitab keenam dari Kutubus Sittah, terkenal dengan sistematika bab yang ringkas dan hadits-hadits zawaid yang unik.',
    coverColor: 'from-amber-950 to-stone-800',
    chapters: [
      { id: 1, title: 'Muqaddimah Sunan', arabicTitle: 'المقدمة', hadithRange: '1 - 266' },
      { id: 2, title: 'Kitab Bersuci & Sunnah-sunnahnya', arabicTitle: 'كتاب الطهارة وسننها', hadithRange: '267 - 666' },
      { id: 3, title: 'Kitab Zuhud', arabicTitle: 'كتاب الزهد', hadithRange: '4100 - 4341' }
    ]
  },
  {
    id: 'arbain-nawawi',
    name: "Al-Arba'in An-Nawawiyyah",
    arabicName: 'الأربعون النووية',
    author: 'Imam Abu Zakariyya Yahya bin Syaraf An-Nawawi',
    authorDeath: '676 H',
    category: 'Kitab Populer & Fiqih Hadits',
    totalHadith: 42,
    description: 'Himpunan 42 hadits inti poros syariat Islam yang mencakup pondasi aqidah, hukum, muamalah, dan akhlak.',
    coverColor: 'from-emerald-900 to-teal-700',
    chapters: [
      { id: 1, title: 'Hadits 1 - 10: Pokok Syariat & Niat', arabicTitle: 'الأحاديث ١ - ١٠', hadithRange: '1 - 10' },
      { id: 2, title: 'Hadits 11 - 20: Wara, Halal-Haram & Malu', arabicTitle: 'الأحاديث ١١ - ٢٠', hadithRange: '11 - 20' },
      { id: 3, title: 'Hadits 21 - 30: Istiqamah & Amal Shalih', arabicTitle: 'الأحاديث ٢١ - ٣٠', hadithRange: '21 - 30' },
      { id: 4, title: 'Hadits 31 - 42: Zuhud, Ukhuwah & Taubat', arabicTitle: 'الأحاديث ٣١ - ٤٢', hadithRange: '31 - 42' }
    ]
  },
  {
    id: 'riyadhus-shalihin',
    name: 'Riyadhus Shalihin',
    arabicName: 'رياض الصالحين',
    author: 'Imam Abu Zakariyya Yahya bin Syaraf An-Nawawi',
    authorDeath: '676 H',
    category: 'Kitab Populer & Fiqih Hadits',
    totalHadith: 1896,
    description: 'Taman orang-orang shalih; panduan akhlak, ibadah batin, dan adab keseharian muslim berdasarkan hadits-hadits shahih.',
    coverColor: 'from-emerald-800 to-green-700',
    chapters: [
      { id: 1, title: 'Bab Ikhlas dan Niat', arabicTitle: 'باب الإخلاص وإحضار النية', hadithRange: '1 - 12' },
      { id: 2, title: 'Bab Taubat', arabicTitle: 'باب التوبة', hadithRange: '13 - 24' },
      { id: 3, title: 'Bab Sabar', arabicTitle: 'باب الصبر', hadithRange: '25 - 53' },
      { id: 4, title: 'Bab Kejujuran (Ash-Shidq)', arabicTitle: 'باب الصدق', hadithRange: '54 - 60' }
    ]
  },
  {
    id: 'bulughul-maram',
    name: 'Bulughul Maram',
    arabicName: 'بلوغ المرام من أدلة الأحكام',
    author: 'Al-Hafizh Ibnu Hajar Al-Asqalani',
    authorDeath: '852 H',
    category: 'Kitab Populer & Fiqih Hadits',
    totalHadith: 1596,
    description: 'Kitab rujukan dalil hadits hukum fiqih terlengkap dengan takhrij ringkas dan penimbangan derajat oleh Al-Hafizh Ibnu Hajar.',
    coverColor: 'from-amber-800 to-yellow-900',
    chapters: [
      { id: 1, title: 'Kitab Thaharah (Bersuci)', arabicTitle: 'كتاب الطهارة', hadithRange: '1 - 130' },
      { id: 2, title: 'Kitab Shalat', arabicTitle: 'كتاب الصلاة', hadithRange: '131 - 500' },
      { id: 3, title: 'Kitab Jenazah', arabicTitle: 'كتاب الجنائز', hadithRange: '501 - 590' }
    ]
  },
  {
    id: 'muwatha-malik',
    name: "Muwatha' Malik",
    arabicName: 'موطأ الإمام مالك',
    author: 'Imam Malik bin Anas Al-Ashbahi (Imam Daril Hijrah)',
    authorDeath: '179 H',
    category: "Kutubut Tis'ah",
    totalHadith: 1850,
    description: 'Kitab hadits dan atsar fuqaha Madinah paling awal yang tersusun rapi, dipuji Imam Syafi\'i sebagai kitab paling shahih di masanya.',
    coverColor: 'from-stone-950 to-amber-950',
    chapters: [
      { id: 1, title: 'Kitab Waktu-waktu Shalat', arabicTitle: 'كتاب وقوت الصلاة', hadithRange: '1 - 35' },
      { id: 2, title: 'Kitab Thaharah', arabicTitle: 'كتاب الطهارة', hadithRange: '36 - 120' },
      { id: 3, title: 'Kitab Shalat Berjamaah', arabicTitle: 'كتاب صلاة الجماعة', hadithRange: '121 - 200' }
    ]
  }
];

export const HADITH_DATABASE: HadithItem[] = [
  // Shahih Bukhari
  {
    id: 'bukhari-1',
    kitabId: 'bukhari',
    kitabName: 'Shahih Al-Bukhari',
    number: 1,
    chapterId: 1,
    chapterTitle: 'Permulaan Turunnya Wahyu',
    chapterArabic: 'كتاب بدء الوحي',
    arab: 'عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ».',
    terjemah: 'Dari Amirul Mukminin, Abu Hafsh Umar bin Al-Khaththab radhiyallahu \'anhu, ia berkata: Aku mendengar Rasulullah shallallahu \'alaihi wa sallam bersabda: "Sesungguhnya setiap amalan bergantung pada niatnya, dan setiap orang akan mendapatkan sesuai dengan apa yang ia niatkan. Maka barangsiapa yang hijrahnya karena (mencari kenikmatan) dunia yang ingin diraihnya, atau karena wanita yang ingin dinikahinya, maka hijrahnya itu kepada apa yang ia tuju."',
    sanad: 'Al-Humaidi Abdullah bin Az-Zubair menceritakan kepada kami, ia berkata: Sufyan menceritakan kepada kami, ia berkata: Yahya bin Sa\'id Al-Anshari menceritakan kepada kami, ia berkata: Muhammad bin Ibrahim At-Taimi mengabarkan kepadaku bahwa ia mendengar Alqamah bin Waqqash Al-Laitsi berkata: Aku mendengar Umar bin Al-Khaththab di atas mimbar.',
    rawiSahabat: 'Umar bin Al-Khaththab رضي الله عنه',
    derajat: "Muttafaqun 'Alaih",
    takhrijRingkas: 'HR. Bukhari no. 1, Muslim no. 1907, Abu Dawud no. 2201, Tirmidzi no. 1647, An-Nasa\'i no. 75, Ibnu Majah no. 4227.',
    syarahRingkas: 'Al-Imam Asy-Syafi\'i dan Imam Ahmad mengatakan bahwa hadits ini adalah sepertiga dari ilmu agama. Niat adalah pembeda antara kebiasaan mubah dengan ibadah, serta tolok ukur keikhlasan di hadapan Allah Ta\'ala.',
    tema: ['Niat', 'Ikhlas', 'Hijrah', 'Fondasi Amal']
  },
  {
    id: 'bukhari-2',
    kitabId: 'bukhari',
    kitabName: 'Shahih Al-Bukhari',
    number: 2,
    chapterId: 1,
    chapterTitle: 'Permulaan Turunnya Wahyu',
    chapterArabic: 'كتاب بدء الوحي',
    arab: 'عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ رَضِيَ اللَّهُ عَنْهَا، أَنَّ الْحَارِثَ بْنَ هِشَامٍ رَضِيَ اللَّهُ عَنْهُ سَأَلَ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ، كَيْفَ يَأْتِيكَ الْوَحْيُ؟ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ، وَهُوَ أَشَدُّهُ عَلَيَّ، فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ، وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلاً فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ».',
    terjemah: 'Dari Aisyah Ummul Mukminin radhiyallahu \'anha, bahwa Al-Harits bin Hisyam radhiyallahu \'anhu bertanya kepada Rasulullah shallallahu \'alaihi wa sallam: "Wahai Rasulullah, bagaimanakah wahyu itu datang kepadamu?" Rasulullah shallallahu \'alaihi wa sallam menjawab: "Terkadang wahyu itu datang kepadaku bagaikan gemerincing lonceng, dan itulah yang paling berat bagiku. Lalu ia terhenti sementara aku telah memahami apa yang disampaikannya. Dan terkadang malaikat menjelma sebagai seorang laki-laki lalu berbicara kepadaku, maka aku pun memahami apa yang ia katakan."',
    sanad: 'Abdullah bin Yusuf menceritakan kepada kami, ia berkata: Malik mengabarkan kepada kami dari Hisyam bin Urwah dari bapaknya dari Aisyah radhiyallahu \'anha.',
    rawiSahabat: 'Aisyah Ummul Mukminin رضي الله عنها',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Bukhari no. 2, Muslim no. 2333, Tirmidzi no. 3634, Ahmad no. 24867.',
    syarahRingkas: 'Al-Hafizh Ibnu Hajar menjelaskan dalam Fathul Bari bahwa suara seperti gemerincing lonceng adalah suara kepakan sayap malaikat atau kedahsyatan kalam Allah yang sangat berat dirasakan oleh fisik Nabi shallallahu \'alaihi wa sallam.',
    tema: ['Wahyu', 'Kenabian', 'Malaikat Jibril']
  },
  {
    id: 'bukhari-9',
    kitabId: 'bukhari',
    kitabName: 'Shahih Al-Bukhari',
    number: 9,
    chapterId: 2,
    chapterTitle: 'Kitab Keimanan',
    chapterArabic: 'كتاب الإيمان',
    arab: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «الإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ».',
    terjemah: 'Dari Abu Hurairah radhiyallahu \'anhu, dari Nabi shallallahu \'alaihi wa sallam, beliau bersabda: "Iman itu ada enam puluh lebih cabang, dan rasa malu adalah salah satu cabang dari keimanan."',
    sanad: 'Abdullah bin Muhammad Al-Ju\'fi menceritakan kepada kami, Abu Amir Al-Aqadi menceritakan kepada kami, Sulaiman bin Bilal menceritakan kepada kami dari Abdullah bin Dinar dari Abu Shalih dari Abu Hurairah.',
    rawiSahabat: 'Abu Hurairah رضي الله عنه',
    derajat: "Muttafaqun 'Alaih",
    takhrijRingkas: 'HR. Bukhari no. 9, Muslim no. 35, Abu Dawud no. 4676, At-Tirmidzi no. 2614, An-Nasa\'i no. 5005.',
    syarahRingkas: 'Rasa malu (Al-Haya\') yang dimaksud adalah perangai terpuji yang mendorong seseorang untuk meninggalkan perkara tercela dan mencegah kelalaian dalam menunaikan hak Allah maupun hak sesama manusia.',
    tema: ['Iman', 'Cabang Keimanan', 'Sifat Malu', 'Akhlak']
  },
  {
    id: 'bukhari-13',
    kitabId: 'bukhari',
    kitabName: 'Shahih Al-Bukhari',
    number: 13,
    chapterId: 2,
    chapterTitle: 'Kitab Keimanan',
    chapterArabic: 'كتاب الإيمان',
    arab: 'عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ، عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ».',
    terjemah: 'Dari Anas radhiyallahu \'anhu, dari Nabi shallallahu \'alaihi wa sallam, beliau bersabda: "Tidaklah beriman salah seorang di antara kalian sampai ia mencintai bagi saudaranya apa yang ia cintai untuk dirinya sendiri."',
    sanad: 'Musaddad menceritakan kepada kami, Yahya menceritakan kepada kami dari Syu\'bah dari Qatadah dari Anas.',
    rawiSahabat: 'Anas bin Malik رضي الله عنه',
    derajat: "Muttafaqun 'Alaih",
    takhrijRingkas: 'HR. Bukhari no. 13, Muslim no. 45, An-Nasa\'i no. 5016, Ibnu Majah no. 66.',
    syarahRingkas: 'Maksud "tidaklah beriman" adalah tidak sempurna imannya. Ini menuntut seorang mukmin untuk membersihkan hatinya dari hasad dan dengki, serta menginginkan kebaikan akhirat dan dunia bagi saudara seimannya.',
    tema: ['Ukhuwah', 'Kesempurnaan Iman', 'Kasih Sayang']
  },
  {
    id: 'bukhari-67',
    kitabId: 'bukhari',
    kitabName: 'Shahih Al-Bukhari',
    number: 67,
    chapterId: 3,
    chapterTitle: 'Kitab Ilmu',
    chapterArabic: 'كتاب العلم',
    arab: 'عَنْ مُعَاوِيَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ، وَإِنَّمَا أَنَا قَاسِمٌ وَاللَّهُ يُعْطِي، وَلَنْ تَزَالَ هَذِهِ الأُمَّةُ قَائِمَةً عَلَى أَمْرِ اللَّهِ لاَ يَضُرُّهُمْ مَنْ خَالَفَهُمْ حَتَّى يَأْتِيَ أَمْرُ اللَّهِ».',
    terjemah: 'Dari Mu\'awiyah radhiyallahu \'anhu, ia berkata: Aku mendengar Nabi shallallahu \'alaihi wa sallam bersabda: "Barangsiapa yang Allah kehendaki kebaikan baginya, niscaya Allah akan pahamkan ia dalam urusan agamanya. Dan sesungguhnya aku hanyalah pembagi sementara Allah-lah yang memberi. Dan senantiasa umat ini akan tegak di atas perintah Allah, tidak membahayakan mereka orang yang menyelisihi mereka hingga datang ketetapan Allah."',
    sanad: 'Sa\'id bin Ufair menceritakan kepada kami, Ibnu Wahb menceritakan kepada kami dari Yunus dari Ibnu Syihab dari Humaid bin Abdirrahman dari Mu\'awiyah.',
    rawiSahabat: 'Mu\'awiyah bin Abi Sufyan رضي الله عنه',
    derajat: "Muttafaqun 'Alaih",
    takhrijRingkas: 'HR. Bukhari no. 71, Muslim no. 1037, Tirmidzi no. 2645, Ibnu Majah no. 220.',
    syarahRingkas: 'Al-Fiqh fid Diin mencakup pemahaman aqidah, syariat, dan batin agama. Siapa yang tidak memiliki perhatian untuk memahami agamanya, maka itu adalah tanda berpaling dari kebaikan Allah.',
    tema: ['Keutamaan Ilmu', 'Faham Agama', 'Thalabul Ilmi']
  },
  {
    id: 'bukhari-6011',
    kitabId: 'bukhari',
    kitabName: 'Shahih Al-Bukhari',
    number: 6011,
    chapterId: 6,
    chapterTitle: 'Kitab Adab & Kebaikan',
    chapterArabic: 'كتاب الأدب',
    arab: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، أَنَّ رَجُلاً قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: أَوْصِنِي. قَالَ: «لاَ تَغْضَبْ». فَرَدَّدَ مِرَارًا، قَالَ: «لاَ تَغْضَبْ».',
    terjemah: 'Dari Abu Hurairah radhiyallahu \'anhu, bahwa seorang laki-laki berkata kepada Nabi shallallahu \'alaihi wa sallam: "Berilah aku wasiat." Beliau bersabda: "Janganlah engkau marah." Lelaki itu mengulangi permintaannya beberapa kali, dan beliau tetap bersabda: "Janganlah engkau marah."',
    sanad: 'Yahya bin Yusuf mengabarkan kepada kami, Abu Bakar mengabarkan kepada kami dari Abu Hashin dari Abu Shalih dari Abu Hurairah.',
    rawiSahabat: 'Abu Hurairah رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Bukhari no. 6116, Tirmidzi no. 2020, Ahmad no. 8696.',
    syarahRingkas: 'Imam Ibnu Hajar menukil bahwa menahan marah mencakup menjauhi sebab-sebab kemarahan dan melatih diri menahan gejolak hawa nafsu saat amarah berkobar.',
    tema: ['Menahan Marah', 'Wasiat Nabi', 'Akhlak Mulia']
  },

  // Shahih Muslim
  {
    id: 'muslim-1',
    kitabId: 'muslim',
    kitabName: 'Shahih Muslim',
    number: 1,
    chapterId: 1,
    chapterTitle: 'Kitab Keimanan (Hadits Jibril)',
    chapterArabic: 'كتاب الإيمان',
    arab: 'عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: بَيْنَمَا نَحْنُ عِنْدَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ، شَدِيدُ سَوَادِ الشَّعَرِ، لاَ يُرَى عَلَيْهِ أَثَرُ السَّفَرِ، وَلاَ يَعْرِفُهُ مِنَّا أَحَدٌ، حَتَّى جَلَسَ إِلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَأَسْنَدَ رُكْبَتَيْهِ إِلَى رُكْبَتَيْهِ وَوَضَعَ كَفَّيْهِ عَلَى فَخِذَيْهِ، وَقَالَ: يَا مُحَمَّدُ أَخْبِرْنِي عَنِ الإِسْلاَمِ... فَقَالَ: «الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً»... قَالَ: فَأَخْبِرْنِي عَنِ الإِيمَانِ، قَالَ: «أَنْ تُؤْمِنَ بِاللَّهِ، وَمَلاَئِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ»... قَالَ: فَأَخْبِرْنِي عَنِ الإِحْسَانِ، قَالَ: «أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ»... ثُمَّ قَالَ النَّبِيُّ ﷺ: «هَذَا جِبْرِيلُ أَتَاكُمْ يُعَلِّمُكُمْ دِينَكُمْ».',
    terjemah: 'Dari Umar bin Al-Khaththab radhiyallahu \'anhu, ia berkata: "Ketika kami sedang duduk bersama Rasulullah shallallahu \'alaihi wa sallam pada suatu hari, tiba-tiba muncul seorang laki-laki yang pakaiannya sangat putih dan rambutnya sangat hitam pekat, tidak tampak padanya bekas perjalanan jauh dan tak seorang pun di antara kami yang mengenalnya. Hingga ia duduk di hadapan Nabi shallallahu \'alaihi wa sallam, lalu merapatkan kedua lututnya ke lutut beliau dan meletakkan kedua telapak tangannya di atas paha beliau, seraya berkata: Wahai Muhammad, kabarkan kepadaku tentang Islam... Beliau menjawab: \'Islam adalah engkau bersaksi bahwa tiada ilah yang berhak disembah selain Allah dan bahwa Muhammad adalah utusan Allah, menegakkan shalat, menunaikan zakat, berpuasa Ramadhan, dan menunaikan haji ke Baitullah jika engkau mampu...\' Lelaki itu bertanya lagi: Kabarkan kepadaku tentang Iman... Beliau menjawab: \'Engkau beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan beriman kepada takdir yang baik maupun yang buruk...\' Ia bertanya lagi: Kabarkan kepadaku tentang Ihsan... Beliau bersabda: \'Engkau beribadah kepada Allah seakan-akan engkau melihat-Nya, dan jika engkau tidak dapat melihat-Nya, maka sesungguhnya Dia melihatmu...\' Kemudian Nabi shallallahu \'alaihi wa sallam bersabda: \'Itu adalah Jibril yang datang kepada kalian untuk mengajarkan urusan agama kalian.\'"',
    sanad: 'Abu Khaitsamah Zuhair bin Harb menceritakan kepada kami, Waki\' menceritakan kepada kami dari Kahmas dari Abdullah bin Buraidah dari Yahya bin Ya\'mar dari Abdullah bin Umar dari bapaknya Umar bin Al-Khaththab.',
    rawiSahabat: 'Umar bin Al-Khaththab رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Muslim no. 8, Abu Dawud no. 4695, Tirmidzi no. 2610, An-Nasa\'i no. 4990, Ibnu Majah no. 63.',
    syarahRingkas: 'Hadits ini dijuluki "Ummus Sunnah" (Induk Sunnah) sebagaimana surat Al-Fatihah dijuluki Ummul Qur\'an, karena memuat seluruh tingkatan agama: Islam (syariat lahiriyah), Iman (keyakinan batiniah), dan Ihsan (kesadaran muraqabah tingkat tertinggi).',
    tema: ['Rukun Islam', 'Rukun Iman', 'Ihsan', 'Hadits Jibril', 'Pondasi Agama']
  },
  {
    id: 'muslim-223',
    kitabId: 'muslim',
    kitabName: 'Shahih Muslim',
    number: 223,
    chapterId: 2,
    chapterTitle: 'Kitab Thaharah (Bersuci)',
    chapterArabic: 'كتاب الطهارة',
    arab: 'عَنْ أَبِي مَالِكٍ الأَشْعَرِيِّ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ - أَوْ تَمْلأُ - مَا بَيْنَ السَّمَاوَاتِ وَالأَرْضِ، وَالصَّلاَةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ، كُلُّ النَّاسِ يَغْدُو فَبَائِعٌ نَفْسَهُ فَمُعْتِقُهَا أَوْ مُوبِقُهَا».',
    terjemah: 'Dari Abu Malik Al-Asy\'ari radhiyallahu \'anhu, ia berkata: Rasulullah shallallahu \'alaihi wa sallam bersabda: "Bersuci itu adalah separuh dari keimanan, dan ucapan \'Alhamdulillah\' memenuhi timbangan (amal), dan \'Subhanallah walhamdulillah\' keduanya memenuhi apa yang ada di antara langit dan bumi. Shalat adalah cahaya, sedekah adalah bukti (keimanan), kesabaran adalah pelita yang membakar, dan Al-Qur\'an adalah pembela bagimu atau penuntut atasmu. Setiap manusia berpagi hari lalu menjual dirinya; ada yang memerdekakannya (dari neraka) atau ada pula yang membinasakannya."',
    sanad: 'Ishaq bin Manshur menceritakan kepada kami, Habban bin Hilal menceritakan kepada kami, Aban menceritakan kepada kami, Yahya menceritakan kepada kami bahwa Zaid menceritakan kepadanya dari Abu Sallam dari Abu Malik Al-Asy\'ari.',
    rawiSahabat: 'Abu Malik Al-Asy\'ari رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Muslim no. 223, Tirmidzi no. 3517, An-Nasa\'i no. 2437, Ibnu Majah no. 280.',
    syarahRingkas: 'Imam An-Nawawi menjelaskan bahwa bersuci (thaharah) adalah separuh iman karena keimanan mensucikan batin dari syirik dan maksiat, sedangkan wudhu dan bersuci mensucikan lahiriyah dari hadats dan najis.',
    tema: ['Thaharah', 'Dzikir', 'Shalat', 'Sedekah', 'Sabar', 'Al-Qur\'an']
  },

  // Arbain An-Nawawi
  {
    id: 'arbain-2',
    kitabId: 'arbain-nawawi',
    kitabName: "Al-Arba'in An-Nawawiyyah",
    number: 2,
    chapterId: 1,
    chapterTitle: 'Hadits 1 - 10: Pokok Syariat & Niat',
    chapterArabic: 'الأحاديث ١ - ١٠',
    arab: 'عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ أَيْضًا قَالَ: بَيْنَمَا نَحْنُ جُلُوسٌ عِنْدَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوَادِ الشَّعَرِ...',
    terjemah: 'Hadits Jibril: Penjelasan mendasar mengenai rukun Islam, rukun Iman, tingkatan Ihsan, serta tanda-tanda hari kiamat (keluarnya budak melahirkan tuannya, dan penggembala domba berlomba meninggikan bangunan).',
    sanad: 'Diriwayatkan oleh Imam Muslim dalam Shahih-nya.',
    rawiSahabat: 'Umar bin Al-Khaththab رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Muslim no. 8.',
    syarahRingkas: 'Pelajaran agung tentang adab penuntut ilmu di hadapan guru, kebersihan pakaian, dan keterpaduan antara amal lahir dan batin.',
    tema: ['Islam', 'Iman', 'Ihsan', 'Tanda Kiamat']
  },
  {
    id: 'arbain-3',
    kitabId: 'arbain-nawawi',
    kitabName: "Al-Arba'in An-Nawawiyyah",
    number: 3,
    chapterId: 1,
    chapterTitle: 'Hadits 1 - 10: Pokok Syariat & Niat',
    chapterArabic: 'الأحاديث ١ - ١٠',
    arab: 'عَنْ أَبِي عَبْدِ الرَّحْمَنِ عَبْدِ اللَّهِ بْنِ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُمَا قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ».',
    terjemah: 'Dari Abu Abdirrahman Abdullah bin Umar bin Al-Khaththab radhiyallahu \'anhuma, ia berkata: Aku mendengar Rasulullah shallallahu \'alaihi wa sallam bersabda: "Islam dibangun di atas lima perkara: persaksian bahwa tiada ilah yang berhak disembah selain Allah dan bahwa Muhammad adalah utusan Allah, menegakkan shalat, menunaikan zakat, berhaji ke Baitullah, dan berpuasa Ramadhan."',
    sanad: 'Diriwayatkan oleh Al-Bukhari dan Muslim.',
    rawiSahabat: 'Abdullah bin Umar رضي الله عنهما',
    derajat: "Muttafaqun 'Alaih",
    takhrijRingkas: 'HR. Bukhari no. 8, Muslim no. 16.',
    syarahRingkas: 'Islam diumpamakan sebagai bangunan kubah kokoh yang ditopang lima pilar penyangga utama. Tanpa tiang-tiang tersebut, sebuah bangunan akan roboh.',
    tema: ['Rukun Islam', 'Syahadat', 'Shalat', 'Zakat', 'Puasa', 'Haji']
  },
  {
    id: 'arbain-5',
    kitabId: 'arbain-nawawi',
    kitabName: "Al-Arba'in An-Nawawiyyah",
    number: 5,
    chapterId: 1,
    chapterTitle: 'Hadits 1 - 10: Pokok Syariat & Niat',
    chapterArabic: 'الأحاديث ١ - ١٠',
    arab: 'عَنْ أُمِّ الْمُؤْمِنِينَ أُمِّ عَبْدِ اللَّهِ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا قَالَتْ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ فِيهِ فَهُوَ رَدٌّ». وَفِي رِوَايَةٍ لِمُسْلِمٍ: «مَنْ عَمِلَ عَمَلاً لَيْسَ عَلَيْهِ أَمْرُنَا فَهُوَ رَدٌّ».',
    terjemah: 'Dari Ummul Mukminin Ummu Abdillah Aisyah radhiyallahu \'anha, ia berkata: Rasulullah shallallahu \'alaihi wa sallam bersabda: "Barangsiapa mengada-adakan dalam urusan (agama) kami ini sesuatu yang bukan darinya, maka amalan itu tertolak." Dalam riwayat Muslim: "Barangsiapa mengerjakan suatu amalan yang tidak ada perintahnya dari kami, maka ia tertolak."',
    sanad: 'Diriwayatkan oleh Al-Bukhari dan Muslim.',
    rawiSahabat: 'Aisyah Ummul Mukminin رضي الله عنها',
    derajat: "Muttafaqun 'Alaih",
    takhrijRingkas: 'HR. Bukhari no. 2697, Muslim no. 1718.',
    syarahRingkas: 'Hadits ini adalah timbangan amal dari sisi lahiriyah (mengikuti petunjuk Nabi), sebagaimana hadits \'Innamal a\'malu bin niyyat\' adalah timbangan amal dari sisi batin (keikhlasan). Syarat diterimanya amal ada dua: ikhlas dan ittiba\'.',
    tema: ['Ittiba', 'Sunnah', 'Larangan Bid\'ah', 'Syarat Sah Amal']
  },
  {
    id: 'arbain-6',
    kitabId: 'arbain-nawawi',
    kitabName: "Al-Arba'in An-Nawawiyyah",
    number: 6,
    chapterId: 1,
    chapterTitle: 'Hadits 1 - 10: Pokok Syariat & Niat',
    chapterArabic: 'الأحاديث ١ - ١٠',
    arab: 'عَنْ أَبِي عَبْدِ اللَّهِ النُّعْمَانِ بْنِ بَشِيرٍ رَضِيَ اللَّهُ عَنْهُمَا قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «إِنَّ الْحَلاَلَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ، وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ لاَ يَعْلَمُهُنَّ كَثِيرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الشُّبُهَاتِ اسْتَبْرَأَ لِدِينِهِ وَعِرْضِهِ، وَمَنْ وَقَعَ فِي الشُّبُهَاتِ وَقَعَ فِي الْحَرَامِ، كَالرَّاعِي يَرْعَى حَوْلَ الْحِمَى يُوشِكُ أَنْ يَرْتَعَ فِيهِ، أَلاَ وَإِنَّ لِكُلِّ مَلِكٍ حِمًى، أَلاَ وَإِنَّ حِمَى اللَّهِ مَحَارِمُهُ، أَلاَ وَإِنَّ فِي الْجَسَدِ مُضْغَةً إِذَا صَلَحَتْ صَلَحَ الْجَسَدُ كُلُّهُ، وَإِذَا فَسَدَتْ فَسَدَ الْجَسَدُ كُلُّهُ، أَلاَ وَهِيَ الْقَلْبُ».',
    terjemah: 'Dari Abu Abdillah An-Nu\'man bin Basyir radhiyallahu \'anhuma, ia berkata: Aku mendengar Rasulullah shallallahu \'alaihi wa sallam bersabda: "Sesungguhnya yang halal itu jelas dan yang haram itu jelas, dan di antara keduanya ada perkara-perkara syubhat (samar) yang tidak diketahui oleh kebanyakan manusia. Maka barangsiapa menjaga diri dari perkara syubhat, berarti ia telah menyelamatkan agama dan kehormatannya. Dan barangsiapa terjerumus dalam syubhat, ia akan terjerumus ke dalam yang haram, laksana penggembala yang menggembala di sekitar pagar larangan, hampir-hampir ternaknya merumput di dalamnya. Ketahuilah, sesungguhnya setiap raja memiliki pagar larangan, dan pagar larangan Allah adalah apa yang Dia haramkan. Ketahuilah, sesungguhnya di dalam tubuh ada segumpal daging; jika ia baik maka baiklah seluruh tubuh itu, dan jika ia rusak maka rusaklah seluruh tubuh itu. Ketahuilah, segumpal daging itu adalah hati."',
    sanad: 'Diriwayatkan oleh Al-Bukhari dan Muslim.',
    rawiSahabat: 'An-Nu\'man bin Basyir رضي الله عنهما',
    derajat: "Muttafaqun 'Alaih",
    takhrijRingkas: 'HR. Bukhari no. 52, Muslim no. 1599.',
    syarahRingkas: 'Fondasi sikap wara\' dan ketakwaan. Kunci keselamatan perbuatan anggota tubuh terletak pada kesucian dan lurusnya niat serta keimanan dalam kalbu.',
    tema: ['Halal Haram', 'Syubhat', 'Wara', 'Kesucian Hati']
  },
  {
    id: 'arbain-7',
    kitabId: 'arbain-nawawi',
    kitabName: "Al-Arba'in An-Nawawiyyah",
    number: 7,
    chapterId: 1,
    chapterTitle: 'Hadits 1 - 10: Pokok Syariat & Niat',
    chapterArabic: 'الأحاديث ١ - ١٠',
    arab: 'عَنْ أَبِي رُقَيَّةَ تَمِيمِ بْنِ أَوْسٍ الدَّارِيِّ رَضِيَ اللَّهُ عَنْهُ، أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «الدِّينُ النَّصِيحَةُ». قُلْنَا: لِمَنْ؟ قَالَ: «لِلَّهِ، وَلِكِتَابِهِ، وَلِرَسُولِهِ، وَلأَئِمَّةِ الْمُسْلِمِينَ، وَعَامَّتِهِمْ».',
    terjemah: 'Dari Abu Ruqayyah Tamim bin Aus Ad-Dari radhiyallahu \'anhu, bahwa Nabi shallallahu \'alaihi wa sallam bersabda: "Agama adalah nasihat." Kami bertanya: "Untuk siapa?" Beliau menjawab: "Untuk Allah, kitab-Nya, rasul-Nya, para pemimpin kaum muslimin, dan segenap kaum muslimin pada umumnya."',
    sanad: 'Diriwayatkan oleh Imam Muslim.',
    rawiSahabat: 'Tamim Ad-Dari رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Muslim no. 55, Abu Dawud no. 4944, An-Nasa\'i no. 4197.',
    syarahRingkas: 'Kata "nasihat" dalam bahasa Arab maknanya adalah menghendaki kebaikan secara tulus murni bagi pihak yang dinasihati. Nasihat untuk Allah adalah dengan mentauhidkan-Nya dan tidak menyekutukan-Nya.',
    tema: ['Nasihat', 'Pondasi Agama', 'Tulus Ikhlas', 'Ukhuwah']
  },

  // Sunan Abi Dawud
  {
    id: 'abudawud-4776',
    kitabId: 'abu-dawud',
    kitabName: 'Sunan Abi Dawud',
    number: 4776,
    chapterId: 4,
    chapterTitle: 'Kitab Adab',
    chapterArabic: 'كتاب الأدب',
    arab: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «مَنْ سُئِلَ عَنْ عِلْمٍ فَكَتَمَهُ، أَلْجَمَهُ اللَّهُ بِلِجَامٍ مِنْ نَارٍ يَوْمَ الْقِيَامَةِ».',
    terjemah: 'Dari Abu Hurairah radhiyallahu \'anhu, ia berkata: Rasulullah shallallahu \'alaihi wa sallam bersabda: "Barangsiapa ditanya tentang suatu ilmu yang ia ketahui lalu ia menyembunyikannya, niscaya Allah akan mengalungkan kendali (tali kekang) dari api neraka pada mulutnya pada hari kiamat."',
    sanad: 'Musaddad menceritakan kepada kami, Yahya menceritakan kepada kami dari Ali bin Al-Mubarak dari Karima binti Al-Miqdam dari Abu Hurairah.',
    rawiSahabat: 'Abu Hurairah رضي الله عنه',
    derajat: 'Hasan Shahih',
    takhrijRingkas: 'HR. Abu Dawud no. 3658, Tirmidzi no. 2649, Ibnu Majah no. 261, disahihkan Al-Albani.',
    syarahRingkas: 'Peringatan keras bagi siapa saja yang enggan menyampaikan ilmu syar\'i yang dibutuhkan oleh umat saat diminta, atau menyembunyikan kebenaran demi keuntungan duniawi.',
    tema: ['Amanah Ilmu', 'Bahaya Menyembunyikan Kebenaran', 'Hari Kiamat']
  },

  // Jami' At-Tirmidzi
  {
    id: 'tirmidzi-1987',
    kitabId: 'tirmidzi',
    kitabName: "Jami' At-Tirmidzi",
    number: 1987,
    chapterId: 3,
    chapterTitle: 'Kitab Kebaikan dan Silaturahim',
    chapterArabic: 'أبواب البر والصلة',
    arab: 'عَنْ أَبِي ذَرٍّ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ لِيَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «لاَ تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا، وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ». وَفِي لَفْظِ التِّرْمِذِيِّ: «تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ».',
    terjemah: 'Dari Abu Dzar radhiyallahu \'anhu, ia berkata: Rasulullah shallallahu \'alaihi wa sallam bersabda: "Janganlah sekali-kali engkau meremehkan kebaikan sekecil apa pun, walau hanya sekadar engkau menemui saudaramu dengan wajah yang berseri-seri." Dalam lafadz At-Tirmidzi: "Senyummu di hadapan saudaramu adalah sedekah bagimu."',
    sanad: 'Mahmud bin Ghailan menceritakan kepada kami, Abu Dawud mengabarkan kepada kami dari Syu\'bah dari Al-A\'masy dari Abu Shalih dari Abu Hurairah/Abu Dzar.',
    rawiSahabat: 'Abu Dzar Al-Ghifari رضي الله عنه',
    derajat: 'Hasan Shahih',
    takhrijRingkas: 'HR. Tirmidzi no. 1956, Muslim no. 2626.',
    syarahRingkas: 'Menampakkan keceriaan dan keramahan kepada sesama muslim menggembirakan hati mereka dan mempererat tali ukhuwah islamiyyah, bernilai pahala sedekah di sisi Allah Ta\'ala.',
    tema: ['Senyum', 'Sedekah', 'Akhlak Manis', 'Ukhuwah']
  },

  // Sunan An-Nasa'i
  {
    id: 'nasai-1',
    kitabId: 'nasai',
    kitabName: "Sunan An-Nasa'i",
    number: 1,
    chapterId: 1,
    chapterTitle: 'Kitab Thaharah',
    chapterArabic: 'كتاب الطهارة',
    arab: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، أَنَّ رَجُلاً سَأَلَ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ: يَا رَسُولَ اللَّهِ، إِنَّا نَرْكَبُ الْبَحْرَ وَنَحْمِلُ مَعَنَا الْقَلِيلَ مِنَ الْمَاءِ، فَإِنْ تَوَضَّأْنَا بِهِ عَطِشْنَا، أَفَنَتَوَضَّأُ بِمَاءِ الْبَحْرِ؟ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «هُوَ الطَّهُورُ مَاؤُهُ، الْحِلُّ مَيْتَتُهُ».',
    terjemah: 'Dari Abu Hurairah radhiyallahu \'anhu, bahwa seorang sahabat bertanya kepada Rasulullah shallallahu \'alaihi wa sallam: "Wahai Rasulullah, kami berlayar mengarungi lautan dan kami hanya membawa sedikit air tawar. Jika kami berwudhu dengannya, kami akan kehausan. Bolehkah kami berwudhu dengan air laut?" Maka Rasulullah shallallahu \'alaihi wa sallam bersabda: "Laut itu suci airnya dan halal bangkainya."',
    sanad: 'Qutaibah menceritakan kepada kami dari Malik dari Shafwan bin Sulaim dari Sa\'id bin Salamah dari Al-Mughirah bin Abi Burdah dari Abu Hurairah.',
    rawiSahabat: 'Abu Hurairah رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. An-Nasa\'i no. 59, Abu Dawud no. 83, Tirmidzi no. 69, Ibnu Majah no. 386.',
    syarahRingkas: 'Kaidah agung dalam fiqih thaharah dan makanan: air laut suci lagi menyucikan hadats serta najis, dan hewan laut yang mati tanpa disembelih halal dimakan.',
    tema: ['Air Laut', 'Thaharah', 'Makanan Halal', 'Hewan Laut']
  },

  // Sunan Ibnu Majah
  {
    id: 'ibnmajah-224',
    kitabId: 'ibn-majah',
    kitabName: 'Sunan Ibnu Majah',
    number: 224,
    chapterId: 1,
    chapterTitle: 'Muqaddimah Sunan (Fadhilah Menuntut Ilmu)',
    chapterArabic: 'المقدمة',
    arab: 'عَنْ أَنَسِ بْنِ مَالِكٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ، وَوَاضِعُ الْعِلْمِ عِنْدَ غَيْرِ أَهْلِهِ كَمُقَلِّدِ الْخَنَازِيرِ الْجَوْهَرَ وَاللُّؤْلُؤَ وَالذَّهَبَ».',
    terjemah: 'Dari Anas bin Malik radhiyallahu \'anhu, ia berkata: Rasulullah shallallahu \'alaihi wa sallam bersabda: "Menuntut ilmu adalah kewajiban bagi setiap muslim, dan orang yang meletakkan ilmu pada yang bukan ahlinya laksana orang yang mengalungkan mutiara, permata, dan emas pada babi."',
    sanad: 'Hisyam bin Ammar menceritakan kepada kami, Hafsh bin Sulaiman menceritakan kepada kami, Katsir bin Syinzhir menceritakan kepada kami dari Muhammad bin Sirin dari Anas bin Malik.',
    rawiSahabat: 'Anas bin Malik رضي الله عنه',
    derajat: 'Hasan',
    takhrijRingkas: 'HR. Ibnu Majah no. 224, dishahihkan jalur lafadz pertamanya oleh Al-Mizzi dan Al-Albani.',
    syarahRingkas: 'Ilmu yang wajib dipelajari \'fardhu \'ain\' oleh setiap muslim adalah ilmu tauhid dasar, tata cara shalat, bersuci, puasa, dan kewajiban syariat yang langsung dibebankan kepadanya.',
    tema: ['Kewajiban Menuntut Ilmu', 'Fardhu Ain', 'Keutamaan Penuntut Ilmu']
  },

  // Riyadhus Shalihin
  {
    id: 'riyadhus-14',
    kitabId: 'riyadhus-shalihin',
    kitabName: 'Riyadhus Shalihin',
    number: 14,
    chapterId: 2,
    chapterTitle: 'Bab Taubat',
    chapterArabic: 'باب التوبة',
    arab: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «وَاللَّهِ إِنِّي لأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً».',
    terjemah: 'Dari Abu Hurairah radhiyallahu \'anhu, ia berkata: Aku mendengar Rasulullah shallallahu \'alaihi wa sallam bersabda: "Demi Allah, sesungguhnya aku benar-benar memohon ampun kepada Allah dan bertaubat kepada-Nya dalam sehari lebih dari tujuh puluh kali."',
    sanad: 'Diriwayatkan oleh Imam Al-Bukhari dalam Shahih-nya.',
    rawiSahabat: 'Abu Hurairah رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Bukhari no. 6307, Tirmidzi no. 3259.',
    syarahRingkas: 'Nabi shallallahu \'alaihi wa sallam yang telah diampuni dosanya yang lalu dan yang akan datang senantiasa beristighfar setiap hari, sebagai bentuk rasa syukur dan pengajaran bagi umatnya.',
    tema: ['Taubat', 'Istighfar', 'Keteladanan Rasul']
  },

  // Bulughul Maram
  {
    id: 'bulugh-1',
    kitabId: 'bulughul-maram',
    kitabName: 'Bulughul Maram',
    number: 1,
    chapterId: 1,
    chapterTitle: 'Kitab Thaharah (Bab Air)',
    chapterArabic: 'كتاب الطهارة',
    arab: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فِي الْبَحْرِ: «هُوَ الطَّهُورُ مَاؤُهُ، الْحِلُّ مَيْتَتُهُ».',
    terjemah: 'Dari Abu Hurairah radhiyallahu \'anhu, ia berkata: Rasulullah shallallahu \'alaihi wa sallam bersabda tentang laut: "Ia adalah suci airnya lagi halal bangkainya."',
    sanad: 'Dikeluarkan oleh empat imam ahli sunan (Abu Dawud, Tirmidzi, Nasa\'i, Ibnu Majah) dan Ibnu Abi Syaibah, serta disahihkan oleh Ibnu Khuzaimah dan Tirmidzi.',
    rawiSahabat: 'Abu Hurairah رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'HR. Empat Imam Ahli Hadits dan Ibnu Khuzaimah no. 111.',
    syarahRingkas: 'Al-Hafizh Ibnu Hajar menempatkan hadits ini sebagai hadits pembuka Kitab Thaharah karena menunjukkan kesucian air mutlak yang berubah karena garam laut.',
    tema: ['Air Thahur', 'Laut', 'Halal Haram']
  },

  // Muwatha' Malik
  {
    id: 'muwatha-1',
    kitabId: 'muwatha-malik',
    kitabName: "Muwatha' Malik",
    number: 1,
    chapterId: 1,
    chapterTitle: 'Kitab Waktu-waktu Shalat',
    chapterArabic: 'كتاب وقوت الصلاة',
    arab: 'عَنْ مَالِكٍ، عَنِ ابْنِ شِهَابٍ، أَنَّ عُمَرَ بْنَ عَبْدِ الْعَزِيزِ أَخَّرَ الصَّلاَةَ يَوْمًا، فَدَخَلَ عَلَيْهِ عُرْوَةُ بْنُ الزُّبَيْرِ فَأَخْبَرَهُ أَنَّ الْمُغِيرَةَ بْنَ شُعْبَةَ أَخَّرَ الصَّلاَةَ يَوْمًا وَهُوَ بِالْكُوفَةِ، فَدَخَلَ عَلَيْهِ أَبُو مَسْعُودٍ الأَنْصَارِيُّ فَقَالَ: مَا هَذَا يَا مُغِيرَةُ؟! أَلَيْسَ قَدْ عَلِمْتَ أَنَّ جِبْرِيلَ نَزَلَ فَصَلَّى فَصَلَّى رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ صَلَّى فَصَلَّى رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ... ثُمَّ قَالَ: «بِهَذَا أُمِرْتُ».',
    terjemah: 'Dari Malik dari Ibnu Syihab bahwa Umar bin Abdul Aziz mengakhirkan shalat pada suatu hari, maka masuklah Urwah bin Az-Zubair mengabarkan kepadanya bahwa Al-Mughirah bin Syu\'bah pernah mengakhirkan shalat di Kufah, lalu Abu Mas\'ud Al-Anshari menegurnya seraya mengingatkan bahwa malaikat Jibril pernah turun mengajarkan waktu-waktu shalat kepada Rasulullah shallallahu \'alaihi wa sallam.',
    sanad: 'Riwayat Yahya bin Yahya Al-Laitsi dari Imam Malik bin Anas.',
    rawiSahabat: 'Abu Mas\'ud Al-Badri Al-Anshari رضي الله عنه',
    derajat: 'Shahih',
    takhrijRingkas: 'Muwatha\' Malik no. 1, Bukhari no. 521, Muslim no. 610.',
    syarahRingkas: 'Kedudukan waktu shalat sebagai syarat sah dan rukun shalat yang diajarkan langsung oleh Jibril \'alaihissalam.',
    tema: ['Waktu Shalat', 'Sunnah Rasul', 'Jibril']
  }
];
