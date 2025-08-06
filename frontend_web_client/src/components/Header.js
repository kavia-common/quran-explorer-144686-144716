import React from 'react';
import { useQuran } from '../contexts/QuranContext';

// PUBLIC_INTERFACE
const Header = () => {
  const { currentSurah, setCurrentSurah, surahs } = useQuran();

  const handleSurahChange = (e) => {
    setCurrentSurah(parseInt(e.target.value));
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">Quran Explorer</h1>
        <select 
          className="surah-selector"
          value={currentSurah}
          onChange={handleSurahChange}
          aria-label="Select Surah"
        >
          {surahs.map((surah) => (
            <option key={surah.number} value={surah.number}>
              {surah.number}. {surah.name} ({surah.englishName})
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
