import React, { createContext, useContext, useState, useEffect } from 'react';

const QuranContext = createContext();

// PUBLIC_INTERFACE
export const useQuran = () => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};

// PUBLIC_INTERFACE
export const QuranProvider = ({ children }) => {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [arabicScript, setArabicScript] = useState('uthmani'); // uthmani or indo-pak
  const [translation, setTranslation] = useState('tamil'); // tamil or sinhala
  const [verses, setVerses] = useState([]);
  const [surahInfo, setSurahInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Surah list with basic info
  const surahs = [
    { number: 1, name: 'Al-Fatihah', englishName: 'The Opening', verses: 7 },
    { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', verses: 286 },
    { number: 3, name: 'Ali-Imran', englishName: 'Family of Imran', verses: 200 },
    { number: 4, name: 'An-Nisa', englishName: 'The Women', verses: 176 },
    { number: 5, name: 'Al-Maidah', englishName: 'The Table Spread', verses: 120 },
    { number: 6, name: 'Al-Anam', englishName: 'The Cattle', verses: 165 },
    { number: 7, name: 'Al-Araf', englishName: 'The Heights', verses: 206 },
    { number: 8, name: 'Al-Anfal', englishName: 'The Spoils of War', verses: 75 },
    { number: 9, name: 'At-Tawbah', englishName: 'The Repentance', verses: 129 },
    { number: 10, name: 'Yunus', englishName: 'Jonah', verses: 109 },
    { number: 11, name: 'Hud', englishName: 'Hud', verses: 123 },
    { number: 12, name: 'Yusuf', englishName: 'Joseph', verses: 111 },
    { number: 13, name: 'Ar-Rad', englishName: 'The Thunder', verses: 43 },
    { number: 14, name: 'Ibrahim', englishName: 'Abraham', verses: 52 },
    { number: 15, name: 'Al-Hijr', englishName: 'The Rocky Tract', verses: 99 },
    // Add more surahs as needed...
  ];

  // Mock API function - replace with actual API calls
  const fetchVerses = async (surahNumber, startAyah = 1, endAyah = null) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const surah = surahs.find(s => s.number === surahNumber);
      if (!surah) {
        throw new Error('Surah not found');
      }
      
      setSurahInfo(surah);
      
      const versesToFetch = endAyah ? endAyah : surah.verses;
      const mockVerses = [];
      
      for (let i = startAyah; i <= Math.min(versesToFetch, surah.verses); i++) {
        // Mock verse data - replace with actual API response
        mockVerses.push({
          surah: surahNumber,
          ayah: i,
          arabic: getMockArabicText(surahNumber, i),
          translation: getMockTranslation(surahNumber, i, translation),
        });
      }
      
      setVerses(mockVerses);
    } catch (err) {
      setError(`Failed to load verses: ${err.message}`);
      console.error('Error fetching verses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock Arabic text generator
  const getMockArabicText = (surah, ayah) => {
    const mockTexts = [
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      'الرَّحْمَٰنِ الرَّحِيمِ',
      'مَالِكِ يَوْمِ الدِّينِ',
      'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
    ];
    
    if (surah === 1 && ayah <= 7) {
      return mockTexts[ayah - 1];
    }
    
    // Default mock text for other verses
    return `هَٰذَا مَثَالٌ لِلنَّصِّ الْعَرَبِيِّ لِلسُّورَةِ ${surah} الْآيَةِ ${ayah}`;
  };

  // Mock translation generator
  const getMockTranslation = (surah, ayah, lang) => {
    if (surah === 1) {
      const tamilTranslations = [
        'அல்லாஹ்வின் பெயரால் துவங்குகிறேன். அவன் மிகவும் அருளாளன், கருணாள்',
        'புகழனைத்தும் அல்லாஹ்வுக்கே, அவன் அகில உலகங்களின் இறைவன்',
        'மிகவும் அருளாளன், கருணாள்',
        'நியாய விசாரணை நாளின் மன்னன்',
        'உன்னையே வழிபடுகிறோம், உன்னிடமே உதவி கேட்கிறோம்',
        'எங்களை நேர்வழியில் நடத்துவாயாக',
        'நீ அருள்புரிந்தவர்களின் வழியில், கோபத்துக்கு உள்ளானவர்களின் வழியிலும் வழிகெட்டவர்களின் வழியிலும் அல்ல'
      ];
      
      const sinhalaTranslations = [
        'අසමසම කරුණාවන්ත දයාවන්ත අල්ලාහ්ගේ නාමයෙන්',
        'සර්ව ලෝකයේ පරමාධිපති වූ අල්ලාහ්ට සියලු ප්‍රශංසාව',
        'අසමසම කරුණාවන්ත දයාවන්ත',
        'විනිශ්චය දිනයේ අධිපති',
        'ඔබටම අපි නමදු කරමු, ඔබගෙන්ම සහාය ඉල්ලමු',
        'අපට සරල මාර්ගය පෙන්වන්න',
        'ඔබ ගුණානුග්‍රහය කළ අයගේ මාර්ගය, කෝපයට පත්වූවන්ගේ මාර්ගය නොවේ, නොමග ගිය අයගේ මාර්ගයද නොවේ'
      ];
      
      if (lang === 'tamil' && ayah <= 7) {
        return tamilTranslations[ayah - 1];
      } else if (lang === 'sinhala' && ayah <= 7) {
        return sinhalaTranslations[ayah - 1];
      }
    }
    
    // Default mock translation
    const langName = lang === 'tamil' ? 'தமிழ்' : 'සිංහල';
    return `${langName} மொழிபெயர்ப்பு - சூரா ${surah}, ஆயத் ${ayah}க்கான எடுத்துக்காட்டு மொழিபெயர்ப்பு`;
  };

  // Load initial verses
  useEffect(() => {
    fetchVerses(currentSurah);
  }, [currentSurah, translation]);

  const value = {
    currentSurah,
    currentAyah,
    arabicScript,
    translation,
    verses,
    surahInfo,
    loading,
    error,
    surahs,
    setCurrentSurah,
    setCurrentAyah,
    setArabicScript,
    setTranslation,
    fetchVerses,
  };

  return (
    <QuranContext.Provider value={value}>
      {children}
    </QuranContext.Provider>
  );
};
