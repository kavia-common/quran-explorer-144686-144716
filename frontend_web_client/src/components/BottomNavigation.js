import React from 'react';
import { useQuran } from '../contexts/QuranContext';

// PUBLIC_INTERFACE
const BottomNavigation = ({ onThemeToggle, currentTheme }) => {
  const { arabicScript, setArabicScript, translation, setTranslation } = useQuran();

  const handleScriptChange = (e) => {
    setArabicScript(e.target.value);
  };

  const handleTranslationChange = (e) => {
    setTranslation(e.target.value);
  };

  return (
    <nav className="bottom-navigation">
      <div className="bottom-nav-content">
        <div className="settings-group">
          <label className="settings-label">Arabic Script</label>
          <select 
            className="settings-select"
            value={arabicScript}
            onChange={handleScriptChange}
            aria-label="Select Arabic Script"
          >
            <option value="uthmani">Uthmani</option>
            <option value="indo-pak">Indo-Pak</option>
          </select>
        </div>

        <div className="settings-group">
          <label className="settings-label">Translation</label>
          <select 
            className="settings-select"
            value={translation}
            onChange={handleTranslationChange}
            aria-label="Select Translation Language"
          >
            <option value="tamil">Tamil</option>
            <option value="sinhala">Sinhala</option>
          </select>
        </div>

        <div className="settings-group">
          <label className="settings-label">Theme</label>
          <button 
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
          >
            {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
