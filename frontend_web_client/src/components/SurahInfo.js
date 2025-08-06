import React from 'react';
import { useQuran } from '../contexts/QuranContext';

// PUBLIC_INTERFACE
const SurahInfo = () => {
  const { surahInfo } = useQuran();

  if (!surahInfo) {
    return null;
  }

  return (
    <div className="surah-info">
      <h2 className="surah-name">
        {surahInfo.name} ({surahInfo.englishName})
      </h2>
      <div className="surah-details">
        Surah {surahInfo.number} • {surahInfo.verses} verses
      </div>
    </div>
  );
};

export default SurahInfo;
