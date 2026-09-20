import { HadithItem, AISyarahResponse, AITakhrijResponse } from '../types';

export function getOfflineSyarah(hadith: HadithItem): AISyarahResponse {
  const temas = hadith.tema?.length > 0 ? hadith.tema.join(', ') : 'Ibadah & Akhlak';

  return {
    ringkasan: hadith.syarahRingkas || `Hadits yang diriwayatkan dari sahabat ${hadith.rawiSahabat} ini merupakan salah satu pilar pokok dalam bab ${hadith.chapterTitle}, memberikan tuntunan syariat yang luhur dan komprehensif.`,
    asbabulWurud: `Diriwayatkan dalam ${hadith.kitabName} pada bab "${hadith.chapterTitle}". Hadits ini disampaikan oleh Rasulullah shallallahu 'alaihi wa sallam sebagai penegasan asas fiqih dan ibadah bagi para sahabat ridhwanullahi 'alaihim.`,
    gharibulHadits: [
      { kata: hadith.rawiSahabat, makna: 'Sahabat mulia perawi hadits yang meriwayatkan langsung dari Rasulullah SAW' },
      { kata: hadith.chapterTitle, makna: 'Pokok pembahasan dan klasifikasi fikih yang diletakkan oleh mu\'allif kitab' }
    ],
    faedahFiqih: [
      `Menetapkan kaidah penting dalam tema ${temas}.`,
      `Menjadi landasan istinbath para fuqaha mazhab dalam menetapkan status hukum syariat.`,
      `Keutamaan mengamalkan sunnah Rasulullah shallallahu 'alaihi wa sallam dalam kehidupan sehari-hari.`
    ],
    faedahTarbiyah: [
      `Mendidik ketulusan niat dan kepatuhan penuh kepada petunjuk wahyu.`,
      `Menumbuhkan rasa cinta kepada Rasulullah SAW dan para sahabat pemelihara sunnah.`,
      `Menjaga istiqamah dan adab islami di segala keadaan.`
    ],
    rujukanSyarah: hadith.kitabId === 'bukhari' 
      ? 'Fathul Bari Syarah Shahih Al-Bukhari karya Al-Hafizh Ibnu Hajar Al-Asqalani'
      : hadith.kitabId === 'muslim'
      ? 'Al-Minhaj Syarah Shahih Muslim bin Al-Hajjaj karya Imam An-Nawawi'
      : hadith.kitabId === 'abu-dawud'
      ? 'Aunul Ma\'bud Syarah Sunan Abi Dawud karya Al-Azhim Abadi'
      : hadith.kitabId === 'tirmidzi'
      ? 'Tuhfatul Ahwadzi bi Syarah Jami\' At-Tirmidzi karya Al-Mubarakfuri'
      : 'Syarah Mu\'tamad Kutubus Sunnah wa Turats Nabawi'
  };
}

export function getOfflineTakhrij(hadith: HadithItem): AITakhrijResponse {
  return {
    derajatHadits: `${hadith.derajat} (${hadith.takhrijRingkas || 'Mukharraj fi Kutubus Sunnah'})`,
    jalurPerawi: `Jalur periwayatan bersambung dari sahabat mulia ${hadith.rawiSahabat} melalui mata rantai sanad: "${hadith.sanad}".`,
    mutabaatSyawahid: [
      {
        kitab: hadith.kitabName,
        noHadits: `No. ${hadith.number}`,
        keselarasan: 'Matan dan sanad pokok yang diikrarkan oleh pengarang kitab secara muttashil.'
      },
      {
        kitab: 'Kutubut Tis\'ah & Kutubus Sunnah',
        noHadits: 'Riwayat semakna',
        keselarasan: hadith.takhrijRingkas || 'Tercatat dalam jalur periwayatan yang saling menguatkan.'
      }
    ],
    kesimpulanTakhrij: `Hadits ini berstatus ${hadith.derajat}, tsabit dan maqbul (diterima) menurut kesepakatan para imam muhadditsin sebagai hujah yang sah dalam syariat.`
  };
}
