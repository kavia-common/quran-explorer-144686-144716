import React from 'react';
import { useQuran } from '../contexts/QuranContext';
import VerseCard from './VerseCard';
import SurahInfo from './SurahInfo';

// PUBLIC_INTERFACE
const ContentArea = () => {
  const { verses, loading, error, currentSurah, surahs } = useQuran();

  if (loading) {
    return (
      <div className="content-area">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p style={{ marginTop: '1rem' }}>Loading verses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-area">
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <SurahInfo />
      
      <div className="navigation-controls">
        <button 
          className="nav-button"
          onClick={() => window.location.reload()}
          aria-label="Refresh verses"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="verses-container">
        {verses.length > 0 ? (
          verses.map((verse) => (
            <VerseCard key={`${verse.surah}-${verse.ayah}`} verse={verse} />
          ))
        ) : (
          <div className="loading">
            <p>No verses found for this selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentArea;
