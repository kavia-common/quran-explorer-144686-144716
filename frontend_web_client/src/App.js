import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import BottomNavigation from './components/BottomNavigation';
import { QuranProvider } from './contexts/QuranContext';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState(() => {
    // Check system preference for auto theme
    const savedTheme = localStorage.getItem('quran-theme');
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quran-theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('quran-theme-manual')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('quran-theme-manual', 'true');
  };

  return (
    <QuranProvider>
      <div className="App" data-theme={theme}>
        <Header />
        <ContentArea />
        <BottomNavigation onThemeToggle={toggleTheme} currentTheme={theme} />
      </div>
    </QuranProvider>
  );
}

export default App;
