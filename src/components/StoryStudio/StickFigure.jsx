import React from 'react';

const StickFigure = ({ theme, emotion = 'happy' }) => {
  // Themes: default, space, knight, wizard, robot
  const isSpace = theme === 'space';
  const isKnight = theme === 'knight';
  const isWizard = theme === 'wizard';
  const isRobot = theme === 'robot';

  return (
    <svg width="200" height="250" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="100" cy="60" r="30" fill="none" stroke="black" strokeWidth="3" />
      
      {/* Eyes */}
      <circle cx="90" cy="55" r="3" fill="black" />
      <circle cx="110" cy="55" r="3" fill="black" />
      
      {/* Mouth */}
      {emotion === 'happy' && (
        <path d="M 85 70 Q 100 85 115 70" fill="none" stroke="black" strokeWidth="2" />
      )}
      {emotion === 'surprised' && (
        <circle cx="100" cy="75" r="5" fill="none" stroke="black" strokeWidth="2" />
      )}

      {/* Body */}
      <line x1="100" y1="90" x2="100" y2="170" stroke="black" strokeWidth="3" />
      
      {/* Arms */}
      <line x1="100" y1="110" x2="60" y2="140" stroke="black" strokeWidth="3" />
      <line x1="100" y1="110" x2="140" y2="140" stroke="black" strokeWidth="3" />
      
      {/* Legs */}
      <line x1="100" y1="170" x2="70" y2="220" stroke="black" strokeWidth="3" />
      <line x1="100" y1="170" x2="130" y2="220" stroke="black" strokeWidth="3" />

      {/* Theme Accessories */}
      {isSpace && (
        <>
          <circle cx="100" cy="60" r="40" fill="rgba(0, 255, 255, 0.2)" stroke="cyan" strokeWidth="1" />
          <rect x="135" y="110" width="15" height="40" fill="gray" />
        </>
      )}

      {isKnight && (
        <>
          <path d="M 70 30 L 130 30 L 100 10 Z" fill="gray" stroke="black" />
          <line x1="140" y1="140" x2="160" y2="90" stroke="silver" strokeWidth="5" />
        </>
      )}

      {isWizard && (
        <>
          <path d="M 60 40 L 140 40 L 100 0 Z" fill="purple" stroke="black" />
          <circle cx="160" cy="90" r="8" fill="yellow" className="wizard-sparkle" />
          <line x1="140" y1="140" x2="160" y2="90" stroke="brown" strokeWidth="4" />
        </>
      )}

      {isRobot && (
        <>
          <rect x="75" y="35" width="50" height="50" fill="none" stroke="black" strokeWidth="3" />
          <line x1="100" y1="35" x2="100" y2="15" stroke="red" strokeWidth="2" />
          <circle cx="100" cy="15" r="3" fill="red" />
        </>
      )}
    </svg>
  );
};

export default StickFigure;
