export interface ShiaVenue {
  id: string;
  name: string;
  arabicName: string;
  category: 'Mosque & Centre' | 'Imambargah & Azakhana' | 'Banquet & Community Hall';
  city: string;
  state: string;
  address: string;
  capacity: number;
  image: string;
  images?: string[];
  photosphereUrl?: string;
  photosphereTitle?: string;
  facilities: string[];
  recommendedFor: string[];
  suggestedDonation: string; // in INR ₹
  imamOrTrustee: string;
  contactPhone: string;
  description: string;
  hasNikahLicense: boolean;
  hasTabarrukKitchen: boolean;
  hasSeparateHalls: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  subscribersCount?: number;
  isSubscribed?: boolean;
}

export interface ShiaEventType {
  id: string;
  title: string;
  urduTitle: string;
  category: 'Majlis' | 'Mehfil' | 'Tatfeen / Funeral' | 'Marriage' | 'Matam' | 'Milad' | 'Religious Program' | 'Community Gathering' | 'Seminar' | 'Other';
  description: string;
  typicalDuration: string;
  recommendedServices: string[];
  icon: string;
}

export const SHIA_EVENT_TYPES: ShiaEventType[] = [
  {
    id: 'majlis',
    title: 'Majlis-e-Aza & Commemoration',
    urduTitle: 'مجلسِ عزا و مصائب',
    category: 'Majlis',
    description: 'Solemn congregational assembly featuring Soz-o-Salam, scholarly discourse from the Minbar, and Masaib of Karbala.',
    typicalDuration: '2 — 4 Hours',
    recommendedServices: ['Traditional Carved Wooden Minbar', 'High-Grade Sound System', 'Commercial Kitchen for Niaz/Tabarruk', 'Separate Ladies Enclosure'],
    icon: 'Flame'
  },
  {
    id: 'mehfil',
    title: 'Mehfil-e-Adab & Jashan',
    urduTitle: 'محفلِ جشن و نعت و منقبت',
    category: 'Mehfil',
    description: 'Poetic and spiritual gathering reciting Manqabat, Qasaid, and scholarly reflections celebrating the Holy Prophet (PBUH) and Ahlul Bayt (A.S.).',
    typicalDuration: '3 — 4 Hours',
    recommendedServices: ['Acoustic Sound & Chorus Microphones', 'Illumination & Banners', 'Tabarruk & Shirini Distribution'],
    icon: 'Sparkles'
  },
  {
    id: 'tatfeen',
    title: 'Tatfeen / Funeral & Soyem',
    urduTitle: 'تجہیز و تکفین و فاتحہ',
    category: 'Tatfeen / Funeral',
    description: 'Ghusl, Kafan, Namaz-e-Janaza, burial logistics, followed by Quran Khawani, Dua-e-Kumayl, and condolence majlis for the departed.',
    typicalDuration: '2 — 3 Hours',
    recommendedServices: ['Ghusl / Mortuary Facilities', 'Janaza Stretcher & Transport Access', 'Quran 30 Siparah Sets', 'Condolence Reception Counter'],
    icon: 'BookOpen'
  },
  {
    id: 'marriage',
    title: 'Marriage & Nikah Reception',
    urduTitle: 'عقدِ نکاح و ولیمہ',
    category: 'Marriage',
    description: 'Solemn Islamic marriage contract recitation by an authorized Shia Alim/Maulana, followed by Walima banquet and family celebration.',
    typicalDuration: '4 — 6 Hours',
    recommendedServices: ['Authorized Shia Alim for Nikah Khutbah', 'Stage Floral Decoration', 'Separate Gents/Ladies Partition Halls', 'Halal Banquet Catering'],
    icon: 'HeartHandshake'
  },
  {
    id: 'matam',
    title: 'Matamdari & Shab-bedari',
    urduTitle: 'شب بیداری و ماتمداری',
    category: 'Matam',
    description: 'Overnight sorrowful commemoration featuring Anjumans, Nauha recitations, and synchronized chest-beating mourning rituals.',
    typicalDuration: '4 — 8 Hours',
    recommendedServices: ['Anjuman Microphone Arrays', 'High-Capacity Hydration Stations', 'Medical First Aid Station', 'Rest Areas'],
    icon: 'Flame'
  },
  {
    id: 'milad',
    title: 'Milad-un-Nabi & Wiladat',
    urduTitle: 'میلاد النبی و ولادتِ معصومین',
    category: 'Milad',
    description: 'Auspicious celebrations of the birth anniversaries of the Holy Prophet Muhammad (S.A.W.) and the 12 Holy Imams (A.S.).',
    typicalDuration: '2 — 4 Hours',
    recommendedServices: ['Flower Garlands & Stage Décor', 'Sweets / Tabarruk Distribution', 'Youth Presentation Projection'],
    icon: 'Sparkles'
  },
  {
    id: 'religious_program',
    title: 'Religious Program & Dua Assembly',
    urduTitle: 'دعائے کمیل و توسل و زیارات',
    category: 'Religious Program',
    description: 'Congregational recitations of Dua-e-Kumayl (Thursday nights), Dua-e-Nudba (Friday mornings), and Ziyarat Ashura with collective reflection.',
    typicalDuration: '1 — 2.5 Hours',
    recommendedServices: ['Supplication Booklets & Digital Screen Relay', 'Prayer Rugs', 'Sound Amplification'],
    icon: 'BookOpen'
  },
  {
    id: 'community_gathering',
    title: 'Community Gathering & Feasts',
    urduTitle: 'اجتماع و دعوتِ عام',
    category: 'Community Gathering',
    description: 'Civic assemblies, Aqiqa banquets, blood donation camps, senior citizens welfare drives, and inter-generational youth meetings.',
    typicalDuration: '3 — 5 Hours',
    recommendedServices: ['Round Dining Tables & Seating', 'Catering Access', 'Public Address System'],
    icon: 'Users'
  },
  {
    id: 'seminar',
    title: 'Educational Seminar & Conference',
    urduTitle: 'تعلیمی سیمینار و ورکشاپ',
    category: 'Seminar',
    description: 'Academic symposiums on Shia theology, technology, career empowerment, biomedical ethics, and contemporary youth challenges.',
    typicalDuration: '2 — 5 Hours',
    recommendedServices: ['High-Definition Projector & AV Screen', 'Panel Discussion Stage Microphones', 'Delegate Folder Distribution'],
    icon: 'BookOpen'
  },
  {
    id: 'other',
    title: 'Special Program / Other',
    urduTitle: 'پروگرام خاص',
    category: 'Other',
    description: 'Custom community and spiritual bookings coordinated directly with venue trustees.',
    typicalDuration: 'Flexible',
    recommendedServices: ['Custom Venue Coordination'],
    icon: 'Calendar'
  }
];

export const SHIA_VENUES: ShiaVenue[] = [
  {
    id: 'venue-bada-imambara-lucknow',
    name: 'Bada Imambara & Asfi Mosque Complex',
    arabicName: 'بڑا امام باڑہ و جامع مسجد آصفی',
    category: 'Mosque & Centre',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    address: 'Machchhi Bhavan, Husainabad, Lucknow, Uttar Pradesh 226003',
    capacity: 2500,
    image: '/src/assets/images/bada_imambara_lucknow_1791105419028.jpg',
    images: [
      '/src/assets/images/bada_imambara_lucknow_1791105419028.jpg',
      '/src/assets/images/heritage_canopy_1791103694047.jpg',
      '/src/assets/images/majlis_assembly_1791103671432.jpg',
      '/src/assets/images/community_hall_1791103097676.jpg'
    ],
    photosphereUrl: '/src/assets/images/bada_imambara_lucknow_1791105419028.jpg',
    photosphereTitle: 'Bada Imambara Central Vault & Asfi Mosque 360° Panorama',
    facilities: [
      'Historic Asfi Central Congregational Mosque',
      'Massive Vaulted Central Assembly Hall (No pillars)',
      'Spacious Grand Courtyard for Large Gatherings',
      'Traditional Minbar & Acoustic Sound Amplification',
      'Dedicated Tabarruk & Niaz Cauldron (Deg) Kitchen Area'
    ],
    recommendedFor: ['Majlis-e-Aza', 'Mehfil-e-Jashan', 'Eid-e-Ghadeer Assembly', 'Khatam-e-Quran'],
    suggestedDonation: '₹15,000 — ₹45,000 per session',
    imamOrTrustee: 'Hussainabad Allied Trust & Resident Maulana',
    contactPhone: '+91 522 225 6100',
    description: 'Built in 1784 by Nawab Asaf-ud-Daula, the iconic Bada Imambara is India\'s foremost Shia monument, featuring the grand Asfi Mosque, unparalleled arched architecture, and expansive grounds for monumental community gatherings.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true,
    coordinates: { lat: 26.8695, lng: 80.9126 },
    subscribersCount: 420,
    isSubscribed: false
  },
  {
    id: 'venue-chhota-imambara-lucknow',
    name: 'Chhota Imambara (Husainabad Imambara)',
    arabicName: 'چھوٹا امام باڑہ (حسین آباد)',
    category: 'Imambargah & Azakhana',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    address: 'Husainabad, Daulatganj, Lucknow, Uttar Pradesh 226003',
    capacity: 1200,
    image: '/src/assets/images/chhota_imambara_lucknow_1791105435047.jpg',
    images: [
      '/src/assets/images/chhota_imambara_lucknow_1791105435047.jpg',
      '/src/assets/images/heritage_canopy_1791103694047.jpg',
      '/src/assets/images/nikah_banquet_hall_1791105166840.jpg'
    ],
    photosphereUrl: '/src/assets/images/chhota_imambara_lucknow_1791105435047.jpg',
    photosphereTitle: 'Chhota Imambara Hall of Chandeliers 360° Tour',
    facilities: [
      'Historic Hall of Chandeliers (Zarih & Azakhana)',
      'Reflecting Pool & Illuminated Courtyard Gardens',
      'Ornate Gold Dome & Arabic Calligraphic Paneling',
      'Separate Enclosures for Gents & Ladies',
      'Tabarruk Distribution Counters'
    ],
    recommendedFor: ['Nikah & Shadi', 'Mehfil-e-Jashan', 'Majlis-e-Aza', 'Milad Commemoration'],
    suggestedDonation: '₹12,000 — ₹35,000 per session',
    imamOrTrustee: 'Maulana Yasoob Abbas / Husainabad Trust',
    contactPhone: '+91 522 225 8420',
    description: 'Built by Nawab Muhammad Ali Shah in 1838, the Chhota Imambara is famous for its breathtaking Belgian chandeliers, golden dome, and ornate calligraphy. A premier venue for dignified Nikah ceremonies and sacred Mehfils.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true,
    coordinates: { lat: 26.8741, lng: 80.9047 },
    subscribersCount: 295,
    isSubscribed: true
  },
  {
    id: 'venue-mughal-masjid-mumbai',
    name: 'Mughal Masjid (Masjid-e-Irani)',
    arabicName: 'مسجد مغل (مسجد ایرانی) ممبئی',
    category: 'Mosque & Centre',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Imamwada Road, Bhendi Bazaar / Dongri, Mumbai, Maharashtra 400009',
    capacity: 1000,
    image: '/src/assets/images/mughal_masjid_mumbai_1791105448700.jpg',
    images: [
      '/src/assets/images/mughal_masjid_mumbai_1791105448700.jpg',
      '/src/assets/images/shia_mosque_exterior_1791105150363.jpg',
      '/src/assets/images/majlis_assembly_1791103671432.jpg'
    ],
    photosphereUrl: '/src/assets/images/mughal_masjid_mumbai_1791105448700.jpg',
    photosphereTitle: 'Mughal Masjid Persian Courtyard & Mosaic Hall 360° Photosphere',
    facilities: [
      'Authentic Blue & Turquoise Persian Mosaic Tilework',
      'Spacious Open-Air Marble Courtyard with Fountain',
      'Authorized Shia Nikah Registration & Certificate Office',
      'Dual-Level Carpeted Prayer & Assembly Halls',
      'Sound Relay System & Dedicated Minbar'
    ],
    recommendedFor: ['Nikah & Shadi', 'Majlis-e-Aza', 'Dua-e-Kumayl & Khatam', 'Mehfil-e-Jashan'],
    suggestedDonation: '₹10,000 — ₹30,000 per session',
    imamOrTrustee: 'Haji Mohammad Husain Shirazi Trust & Maulana Faiyaz',
    contactPhone: '+91 22 2372 9400',
    description: 'Built in 1860, this historic Iranian mosque in South Mumbai is celebrated for its breathtaking Persian tilework and vibrant spiritual life. The foremost center in Mumbai for Nikah ceremonies, Friday prayers, and central Majalis.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true,
    coordinates: { lat: 18.9568, lng: 72.8344 },
    subscribersCount: 680,
    isSubscribed: false
  },
  {
    id: 'venue-noor-baug-mumbai',
    name: 'Noor Baug Shia Community Banquet Hall',
    arabicName: 'قاعة نور باغ للمناسبات ممبئی',
    category: 'Banquet & Community Hall',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Noor Baug, Babula Tank Cross Lane, Dongri, Mumbai, Maharashtra 400009',
    capacity: 850,
    image: '/src/assets/images/noor_baug_mumbai_1791105498823.jpg',
    images: [
      '/src/assets/images/noor_baug_mumbai_1791105498823.jpg',
      '/src/assets/images/nikah_banquet_hall_1791105166840.jpg',
      '/src/assets/images/community_hall_1791103097676.jpg'
    ],
    photosphereUrl: '/src/assets/images/nikah_banquet_hall_1791105166840.jpg',
    photosphereTitle: 'Noor Baug Grand Reception & Banquet Pavilion 360° Photosphere',
    facilities: [
      'Air-Conditioned Grand Banquet Hall with Stage',
      'Dedicated Partition Screens for Gents and Ladies Dining',
      'Fully Equipped Commercial Halal Kitchen for Biryani Degs',
      'Bridal Dressing Suite & Groom Green Room',
      'Audio-Visual System & Projection Screens'
    ],
    recommendedFor: ['Nikah & Shadi Reception', 'Walima Feast', 'Aqiqa Celebration', 'Family Banquet'],
    suggestedDonation: '₹25,000 — ₹65,000 per session',
    imamOrTrustee: 'Noor Baug Charitable Trust Management',
    contactPhone: '+91 22 2371 4588',
    description: 'The premier community wedding and banquet reception venue for the Mumbai Shia community, located in Dongri. Purpose-built for grand Shadi celebrations, Walima feasts, and family gatherings with complete privacy partitions.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true,
    coordinates: { lat: 18.9612, lng: 72.8362 },
    subscribersCount: 512,
    isSubscribed: true
  },
  {
    id: 'venue-masjid-askari-bangalore',
    name: 'Masjid-e-Askari & Shia Jama Masjid',
    arabicName: 'مسجد عسکری و جامع مسجد اہل تشیع بنگلور',
    category: 'Mosque & Centre',
    city: 'Bangalore',
    state: 'Karnataka',
    address: 'Hosur Road, Johnson Market, Richmond Town, Bengaluru, Karnataka 560025',
    capacity: 1100,
    image: '/src/assets/images/masjid_askari_bangalore_1791105466414.jpg',
    images: [
      '/src/assets/images/masjid_askari_bangalore_1791105466414.jpg',
      '/src/assets/images/shia_mosque_exterior_1791105150363.jpg',
      '/src/assets/images/majlis_assembly_1791103671432.jpg'
    ],
    photosphereUrl: '/src/assets/images/masjid_askari_bangalore_1791105466414.jpg',
    photosphereTitle: 'Masjid-e-Askari Central Prayer Sanctuary 360° Photosphere',
    facilities: [
      'Central Congregational Prayer Hall',
      'Dedicated Ladies Enclosure with Audio Relay',
      'Wudu Ablution Fountains with Clean Water Supply',
      'Community Library with Shia Scholarly Works',
      'Ample Two-Wheeler & Car Parking on Premises'
    ],
    recommendedFor: ['Friday Congregational Prayers', 'Majlis-e-Aza', 'Mehfil-e-Jashan', 'Youth Seminary'],
    suggestedDonation: '₹8,000 — ₹25,000 per session',
    imamOrTrustee: 'Anjuman-e-Imamia Bangalore Trust',
    contactPhone: '+91 80 2221 4455',
    description: 'The central Shia landmark in Bangalore, located near Johnson Market. Known for active youth education circles, vibrant Ayyam-e-Aza commemorations, and compassionate welfare initiatives.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true,
    coordinates: { lat: 12.9615, lng: 77.6067 },
    subscribersCount: 340,
    isSubscribed: false
  },
  {
    id: 'venue-ashurkhana-hyderabad',
    name: 'Badshahi Ashurkhana & Bibi ka Alawa',
    arabicName: 'بادشاہی عاشور خانہ و بی بی کا الاوہ حیدرآباد',
    category: 'Imambargah & Azakhana',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Near Madina Circle, Pathergatti / Dabeerpura, Old City, Hyderabad, Telangana 500002',
    capacity: 1500,
    image: '/src/assets/images/ashurkhana_hyderabad_1791105483280.jpg',
    images: [
      '/src/assets/images/ashurkhana_hyderabad_1791105483280.jpg',
      '/src/assets/images/heritage_canopy_1791103694047.jpg',
      '/src/assets/images/community_hall_1791103097676.jpg'
    ],
    photosphereUrl: '/src/assets/images/ashurkhana_hyderabad_1791105483280.jpg',
    photosphereTitle: 'Badshahi Ashurkhana Qutb Shahi Sanctuary 360° Photosphere',
    facilities: [
      'Historic 16th-Century Qutb Shahi Enamelled Tile Sanctuary',
      'Massive Open & Covered Ashurkhana Courtyards',
      'Traditional Alam & Zarih Mubarak Shrine Enclosure',
      'Dedicated Cauldron (Deg) Kitchen for Haleem & Niaz',
      'Historic Wooden Minbars & Relay Audio'
    ],
    recommendedFor: ['Majlis-e-Aza', 'Bibi ka Alawa Juloos Assembly', 'Khatam-e-Quran', 'Mehfil-e-Jashan'],
    suggestedDonation: '₹10,000 — ₹28,000 per session',
    imamOrTrustee: 'Mutawalli Mir Abbas Ali Moosvi / Wakf Management',
    contactPhone: '+91 40 2452 7890',
    description: 'Constructed by Sultan Muhammad Quli Qutb Shah in 1594, Badshahi Ashurkhana and nearby Bibi ka Alawa in Dabeerpura are world-renowned Shia heritage centers, featuring radiant Persian mosaic tiles, historic minbars, and centuries-old spiritual traditions.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true,
    coordinates: { lat: 17.3687, lng: 78.4739 },
    subscribersCount: 890,
    isSubscribed: true
  }
];
