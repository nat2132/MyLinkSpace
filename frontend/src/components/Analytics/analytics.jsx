import React, { useState } from 'react';
import { themes } from '../../themes';
import { FaUnlock } from "react-icons/fa";

const Analytics = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [customColor, setCustomColor] = useState('#ffffff'); // Default color
  const [isGradient, setIsGradient] = useState(false); // Flag for gradient

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setCustomColor(theme.backgroundColor); // Set custom color to the theme's background color
  };

  const handleUpgradeClick = (backgroundName) => {
    alert(`Upgrading to ${backgroundName} background!`);
  };

  const handleColorChange = (event) => {
    setCustomColor(event.target.value);
  };

  const toggleGradient = () => {
    setIsGradient((prev) => !prev);
  };

  return (
    <div>
    <div style={{ display: 'flex', padding: '20px' }}>
      <div className='themes-container' style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        width: '900px',
        height: '730px',
        position: 'relative'
      }}>
        {themes.map((theme, index) => (
          <div key={theme.name} style={{ position: 'relative' }}>
            {index >= themes.length - 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpgradeClick(theme.name);
                }}
                style={{
                  padding: '4px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#FFD700',
                  color: '#000',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginLeft: '65px',
                  position: 'absolute',
                  zIndex: '2',
                  marginTop: '15px'
                }}
              >
                Upgrade <FaUnlock />
              </button>
            )}
            <div
              onClick={() => handleThemeChange(theme)}
              style={{
                background: theme.backgroundColor,
                color: theme.textColor,
                padding: '10px',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                border: selectedTheme.name === theme.name ? '2px solid #ffffff' : 'none',
              }}
              className="grid-item"
            >
              <h3 style={{ marginTop: '95px' }}>{theme.name}</h3>
            </div>
          </div>
        ))}
      </div>

        <h2>Preview</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '30px',
          background: isGradient 
            ? `linear-gradient(45deg, ${customColor}, #ffffff)` // Example gradient
            : customColor, 
          height: '400px',
          color: selectedTheme.textColor, // Use selected theme text color
        }}>
          <p>This is how the {selectedTheme.name} background looks</p>
        </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label>
            Choose Color: 
            <input 
              type="color" 
              value={customColor} 
              onChange={handleColorChange} 
              style={{ marginLeft: '10px' }}
            />
          </label>
          <div>
            <label>
              <input 
                type="checkbox" 
                checked={isGradient} 
                onChange={toggleGradient} 
              />
              Use Gradient
            </label>
          </div>
        </div>
    
    
    </div>
  );
};

export default Analytics;