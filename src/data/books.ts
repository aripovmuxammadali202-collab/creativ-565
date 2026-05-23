import { Book } from '../types';

export const INITIAL_BOOKS: Book[] = [
  // Najot Ta'lim Special & IT Books
  {
    id: 'it-frontend',
    title: 'Zamonaviy Frontend Sirlari (React & Tailwind)',
    author: 'Najot Ta\'lim Mentorlari',
    description: 'Najot Ta\'lim o\'quv markazining eng ilg\'or tajribalaridan kelib chiqqan holda yozilgan mukammal React dasturlash qo\'llanmasi.',
    info: 'Ushbu kitob yordamida siz eng murakkab foydalanuvchi interfeyslarini (UI) tezkor, chiroyli va qulay tarzda yaratishni o\'rganasiz. Kitobda haqiqiy loyihalar ustida ishlash bo\'yicha maslahatlar berilgan.',
    price: 85000,
    type: 'elektron',
    grade: 'it',
    rating: 4.9,
    pagesOrDuration: '280 sahifa',
    coverColor: 'from-emerald-600 to-teal-900',
    textColor: 'text-emerald-400',
    content: [
      "1-BOB: React-ga kirish va Loyihani tayyorlash. React - zamonaviy, komponentlarga asoslangan interaktiv veb-ilova yaratish kutubxonasidir.",
      "2-BOB: State va Huklar (Hooks). useState va useEffect reaktiv ishlashni ta'minlaydi. Hech qachon component tanasida state-ni to'g'ridan-to'g'ri o'zgartirmang.",
      "3-BOB: Najot Ta'limda real loyihalar yaratish. O'quvchilar darsda olgan nazariy bilimlarini amaliy jamoaviy ishlarda mustahkamlaydilar."
    ]
  },
  {
    id: 'it-mindset',
    title: 'Najot Koridori: Muqaddas Muvaffaqiyat',
    author: 'Temurbek Adhamov',
    description: 'Najot Ta\'lim o\'quv markazi asoschisi Temurbek Adhamovning shaxsiy rivojlanish, tadbirkorlik va yoshlarni to\'g\'ri yo\'naltirish va motivatsiyalash kitobi.',
    info: 'Yosh dasturchilar, dizaynerlar va menejerlar uchun yo\'l xaritasi. Muvaffaqiyatli IT-tadbirkorlikning sirlari va qiyinchiliklarni yengib o\'tish usullari ochiq-oydin yoritilgan.',
    price: 120000,
    type: 'audio',
    grade: 'it',
    rating: 5.0,
    pagesOrDuration: '3 soat 45 daqiqa',
    coverColor: 'from-purple-600 to-indigo-950',
    textColor: 'text-purple-400',
    content: [
      "KIRISH: Najot Ta'lim falsafasi va maqsadlarimiz. Har bir yosh zamonaviy hunarga ega bo'lishga munosibdir.",
      "1-TARKIB: Nima uchun IT sohasi rivojlanmoqda? O'zbekistonda IT-ekotizim yaratish sirlari.",
      "2-TARKIB: Intizom - iste'doddan muhimdir. Har kuni 1 foizga o'sish qoidasi bizni global maqsadlarga yetaklaydi."
    ],
    audioTracks: [
      { title: 'Najot Sari Kirish', duration: '12:05' },
      { title: 'Dasturchining Ichki Intizomi', duration: '45:10' },
      { title: 'Xatolar - Muvaffaqiyat Kalitidir', duration: '32:15' }
    ]
  },
  {
    id: 'it-smm',
    title: 'Raqamli Marketing va SMM Strategiyasi',
    author: 'Najot Ta\'lim SMM Mentorlari',
    description: 'Biznesingizni ijtimoiy tarmoqlarda reklamasiz yoki reklama bilan tez yuksalishiga yordam beradigan eng samarali SMM qo\'llanma.',
    info: 'Maqsadli auditoriya bilan ishlash, kontent-plan tuzish, target va brend imidjini shakllantirish bo\'yicha darslik.',
    price: 75000,
    type: 'elektron',
    grade: 'it',
    rating: 4.7,
    pagesOrDuration: '190 sahifa',
    coverColor: 'from-amber-500 to-orange-850',
    textColor: 'text-amber-400',
    content: [
      "1-BOB: Auditoriyani o'rganish. Siz sotayotgan mahsulot kimga kerakligini tushunish birinchi va asosiy qдамdir.",
      "2-BOB: Kontent turlari va Copywriting. Matn yozishda sarlavha va qiziqish uyg'otuvchi elementlarga e'tibor qarating.",
      "3-BOB: Algoritmlar bilan ishlash. Instagram va YouTube platformalaridagi trendlar."
    ]
  },
  
  // Grade 1-11 School Books
  {
    id: 'school-grade1',
    title: '1-Sinf: Savodxonlik va Alifbo Saboqlari',
    author: 'Xalq Ta\'limi Vazirligi',
    description: '1-sinf o\'quvchilari uchun savodxonlik, harflarni tanish va to\'g\'ri talaffuz sirlarini o\'ргаtuvchi darslik.',
    info: 'O\'quvchini dastlabki ilm eshigiga boshlovchi yo\'l. Chiroyli rasmlar va oson tushuntirishlar bilan boyitilgan.',
    price: 52000,
    type: 'elektron',
    grade: 1,
    rating: 4.8,
    pagesOrDuration: '96 sahifa',
    coverColor: 'from-blue-600 to-indigo-900',
    textColor: 'text-blue-300',
    content: [
      "1-Sinf 1-BOB: A, B, D harflarini o'rganamiz. Har bir harfga mos rasm va quvnoq she'rlar.",
      "1-Sinf 2-BOB: Oila va Maktabimiz. Ilk harflarni birlashtirib ilk so'zlarni tuzamiz."
    ]
  },
  {
    id: 'school-grade2',
    title: '2-Sinf: Atrofimizdagi Do\'stlik Rishtalari',
    author: 'Olima Yerejepova',
    description: '2-sinf o\'quvchilari uchun atrof-muhit, tabiatni asrash va ahil jamoa bo\'lib do\'stlashish kitobi.',
    info: 'Bola shaxsiyatini shakllantiruvchi, do\'stlik qadri, hayvonlarni sevish va tabiat sirlariga bag\'ishlangan badiiy darslik.',
    price: 54000,
    type: 'elektron',
    grade: 2,
    rating: 4.7,
    pagesOrDuration: '112 sahifa',
    coverColor: 'from-teal-600 to-cyan-900',
    textColor: 'text-teal-300',
    content: [
      "2-Sinf 1-BOB: Do'stlarim va men. Ahillikda kuch ko'p ekanligi haqida qiziqarli ertaklar.",
      "2-Sinf 2-BOB: Tabiatni asraylik. Gullar va qushlarning bizning tabiatimizdagi o'rni."
    ]
  },
  {
    id: 'school-grade3',
    title: '3-Sinf: Ona Tili va Chiroyli Yozish San\'ati',
    author: 'Ustoz Shukur Olimiy',
    description: '3-sinf o\'quvchilari uchun chiroyli husnixat, grammatika qoidalari va so\'z turkumlariga kirish.',
    info: 'Ona tilimizning nafosati, kelishik gaplar va so\'zlarning to\'g\'ri yozilishini jozibador darslik orqali o\'rganing.',
    price: 56000,
    type: 'elektron',
    grade: 3,
    rating: 4.8,
    pagesOrDuration: '148 sahifa',
    coverColor: 'from-emerald-600 to-blue-950',
    textColor: 'text-emerald-300',
    content: [
      "3-Sinf 1-BOB: Gap va so'z darslari. Gap turlari va so'roq belgilari qo'yilishi.",
      "3-Sinf 2-BOB: Ot va Sifat qo'shilishi. Narsalarning rangi va xarakterini ifodalash."
    ]
  },
  {
    id: 'school-grade4',
    title: '4-Sinf: Matematika va Mantiq Olami',
    author: 'Matematik Rasulov S.',
    description: '4-sinf o\'quvchilari uchun boshlang\'ich sinflar matematika darsligi - mantiqiy misollar va uch xonali sonlar.',
    info: 'Ushbu darslik mantiqiy fikrlashni, ko\'paytirish jadvallarini jadal hisoblashni va sodda geometrik shakllar yuzasini topishni tez o\'rgatadi.',
    price: 58000,
    type: 'elektron',
    grade: 4,
    rating: 4.9,
    pagesOrDuration: '160 sahifa',
    coverColor: 'from-amber-600 to-rose-950',
    textColor: 'text-amber-300',
    content: [
      "4-Sinf 1-BOB: Ko'paytirish va bo'lish amallarini mukammallashtiramiz.",
      "4-Sinf 2-BOB: Mantiqiy boshqotirmalar va jozibador geometrik shakllar chizish."
    ]
  },
  {
    id: 'school-grade5-math',
    title: '5-Sinf: Matematika - Sonlar Mo\'jizasi',
    author: 'Akademik Toshmuhamedov',
    description: '5-sinf o\'quvchilari uchun qiziqarli matematika masalalari va kasrlar olami darsligi.',
    info: 'Matematika - zehningizni o\'tkirlashtiruvchi fan. Kasrlar, natural sonlar ustida amallar, burchaklar va oddiy geometriya asoslari sodda usulda tushuntirilgan.',
    price: 59000,
    type: 'elektron',
    grade: 5,
    rating: 4.6,
    pagesOrDuration: '220 sahifa',
    coverColor: 'from-red-650 to-rose-950',
    textColor: 'text-red-450',
    content: [
      "5-Sinf 1-BOB: Natural sonlar va o'nli kasrlar ustida amallar bajaramiz.",
      "5-Sinf 2-BOB: Kasrlarni taqqoslash va oddiy amallarni soddalashtirish qoidalari."
    ]
  },
  {
    id: 'school-grade6',
    title: '6-Sinf: Tarix - Buyuk Ajdodlar Merosi',
    author: 'Professor Ergashev T.',
    description: '6-sinf o\'quvchilari uchun tarix fanidan darslik - qadimgi dunyo va O\'rta Osiyo madaniyati.',
    info: 'Buyuk allomalarimiz Mirzo Ulug\'bek, Al-Xorazmiy va Ibn Sino yashatgan buyuk kashfiyotlar davriga unutilmas qadimiy sayohat.',
    price: 61000,
    type: 'elektron',
    grade: 6,
    rating: 4.9,
    pagesOrDuration: '180 sahifa',
    coverColor: 'from-amber-600 to-zinc-950',
    textColor: 'text-amber-350',
    content: [
      "6-Sinf 1-BOB: Qadimgi Rim va Yunoniston imperiyalari shakllanishi.",
      "6-Sinf 2-BOB: O'rta Osiyoda ilm-fan yuksalishi. Al-Xorazmiy algoritmlari."
    ]
  },
  {
    id: 'school-grade7',
    title: '7-Sinf: Fizika - Tabiat Qonunlari',
    author: 'Olim Shodiyev K.',
    description: '7-sinf o\'quvchilari uchun fizika faniga ilk kirish darsligi - kuch, bosim va harakat turlari.',
    info: 'Tezlik nima? Nyutonning hayoti va havodagi bosim turlari qanday aniqlanilishini tushuntiruvchi darslik.',
    price: 64000,
    type: 'elektron',
    grade: 7,
    rating: 4.7,
    pagesOrDuration: '196 sahifa',
    coverColor: 'from-indigo-600 to-blue-950',
    textColor: 'text-indigo-300',
    content: [
      "7-Sinf 1-BOB: Mexanik harakat turlari va tezlikni hisoblash qoidalari.",
      "7-Sinf 2-BOB: Bosim kuchi va uning suyuqliklarda uzatilish (Paskal qonuni)."
    ]
  },
  {
    id: 'school-grade8',
    title: '8-Sinf: Kimyo - Elementlar Davriy Tizimi',
    author: 'Akademik Ismoilov A.',
    description: '8-sinf maktab o\'quvchilari uchun kimyo fani - Mendeleyev jadvali va reaksiyalar sirlari.',
    info: 'Moddalarning tuzilishi, atom molekulalarning uchrashishi hamda kundalik turmushda asqotadigan kimyoviy jarayonlarni bilib oling.',
    price: 67000,
    type: 'elektron',
    grade: 8,
    rating: 4.8,
    pagesOrDuration: '210 sahifa',
    coverColor: 'from-pink-650 to-purple-950',
    textColor: 'text-pink-305',
    content: [
      "8-Sinf 1-BOB: Kimyoning asosiy qonunlari. Atom-molekulyar ta'limot.",
      "8-Sinf 2-BOB: Mendeleyev davriy qonuni bilan amaliy darslar o'tkazish."
    ]
  },
  {
    id: 'school-grade9-physics',
    title: '9-Sinf: Fizika - Koinot va Energiyalar',
    author: 'Professor Karimov M.',
    description: '9-sinf o\'quvchilari uchun fizika qonuniyatlari, mexanika va yorug\'lik to\'lqinlari haqida chuqur bilim beruvchi darslik.',
    info: 'Koinot qanday ishlaydi? Tortishish kuchi, harakat qonunlari va optika fanining nazariy va laboratoriya ishlari darsligi.',
    price: 68050,
    type: 'audio',
    grade: 9,
    rating: 4.8,
    pagesOrDuration: '4 soat 10 daqiqa',
    coverColor: 'from-cyan-600 to-sky-950',
    textColor: 'text-cyan-400',
    content: [
      "9-Sinf 1-QISM: Nyutonning uchala qonuni haqida mukammal audio ma'lumotlar.",
      "9-Sinf 2-QISM: Kuch momenti va mexanik to'lqinlar.",
      "9-Sinf 3-QISM: Optika va ko'rish biologiyasi fizikasi."
    ],
    audioTracks: [
      { title: 'Nyuton Qonunlari Esbobi', duration: '30:20' },
      { title: 'Mexanika va To\'lqin harakati', duration: '45:15' }
    ]
  },
  {
    id: 'school-grade10',
    title: '10-Sinf: Geometriya - Fazoviy Jism Shakllari',
    author: 'Geometr Solihov H.',
    description: '10-sinf uchun stereometriya - fazoda nuqta, to\'g\'ri chiziq va tekisliklar munosabati darsligi.',
    info: '3D fazo tushunchasi. Prizmalar, piramidalar va ularning hajmini hisoblash formulalari rasm va isbotlari bilan.',
    price: 71000,
    type: 'elektron',
    grade: 10,
    rating: 4.9,
    pagesOrDuration: '205 sahifa',
    coverColor: 'from-lime-600 to-green-950',
    textColor: 'text-lime-400',
    content: [
      "10-Sinf 1-BOB: Stereometriya aksiomalari va fazoda tekisliklarning kesishmasligi.",
      "10-Sinf 2-BOB: Parallel va perpendikulyar to'g'ri chiziqlarning fazodagi o'rni."
    ]
  },
  {
    id: 'school-grade11-it',
    title: '11-Sinf: Informatika va Axborot Texnologiyalari',
    author: 'Oripov Muhammadali & IT Mentorlar',
    description: '11-sinf o\'quvchilari uchun algoritmlash, Python dasturlash tili va global tarmoqlar darsligi.',
    info: 'Maktab ta\'limining yakuniy bosqichida o\'quvchilarni zamonaviy raqamli kasblar (Frontend, Backend, SMM) bo\'yicha yo\'naltiruvchi maxsus darslik.',
    price: 79000,
    type: 'elektron',
    grade: 11,
    rating: 4.9,
    pagesOrDuration: '310 sahifa',
    coverColor: 'from-fuchsia-600 to-purple-950',
    textColor: 'text-fuchsia-400',
    content: [
      "11-Sinf 1-BOB: Python-da sodda dasturlar yaratish va algoritmlash.",
      "11-Sinf 2-BOB: Kelajak professional kasbini tanlash va Najot Ta'lim darsxonalari."
    ]
  }
];

export const INITIAL_REVIEWS = [
  { id: 'rev-1', userName: 'Asadbek Shofayziyev', userAvatar: '👦', rating: 5, text: "Najot Ta'limning ushbu kitobi menga akademiyada frontend dunyosiga tez kirib borishimga katta yordam berdi! Tavsiya qilaman!", date: '2026-05-20' },
  { id: 'rev-2', userName: 'Madina Umarova', userAvatar: '👧', rating: 4, text: "Audio darsliklarni eshitish juda qulay ekan, yo'lda ketayotib eshitsa bo'ladi, xuddi podkast kabi.", date: '2026-05-22' },
  { id: 'rev-3', userName: 'Temur Toshpolatov', userAvatar: '👨', rating: 5, text: "Narxlari mutlaqo munosib, o'yinlar orqali tanga to'plab kitoblarni tekinga ham sotib olsa bo'lishi o'ta ajoyib g'oya!", date: '2026-05-23' }
];

export const MOCK_CHATS = [
  { id: 'chat-1', senderName: 'Dostonbek D.', senderRole: 'mentor', senderAvatar: '👨‍🏫', message: "Assalomu alaykum bo'lajak Najot Ta'lim o'quvchilari va kitobxonlar!", time: '13:45' },
  { id: 'chat-2', senderName: 'Muhammadli O.', senderRole: 'admin', senderAvatar: '👑', message: "Vaalaykum assalom! Saytimizning yangi o'yinlar va virtual koins balans tizimi to'liq ishladi!", time: '13:50', isMe: false },
  { id: 'chat-3', senderName: 'Jasur IT', senderRole: 'student', senderAvatar: '💻', message: "Ajoyib! Men arqon tortish o'yinida g'olib bo'ldim va unvonga ega bo'ldim!", time: '14:02' }
];
