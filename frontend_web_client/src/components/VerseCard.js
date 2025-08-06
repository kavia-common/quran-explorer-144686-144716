import React from 'react';

// PUBLIC_INTERFACE
const VerseCard = ({ verse }) => {
  return (
    <div className="verse-container">
      <div className="verse-number">
        {verse.ayah}
      </div>
      
      <div className="verse-arabic">
        {verse.arabic}
      </div>
      
      <div className="verse-translation">
        {verse.translation}
      </div>
    </div>
  );
};

export default VerseCard;
