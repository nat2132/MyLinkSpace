
import React, { useState } from 'react';
import { themes } from '../../themes';
import { FaUnlock } from "react-icons/fa";

const Analytics = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handleUpgradeClick = (themeName) => {
    alert(`Upgrading to ${themeName} theme!`);
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div className='themes-container' style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        width: '900px',
        height:'730px',
        position:'relative'
      }}>
        {themes.map((theme, index) => (
            <div>
                                        {index >= themes.length - 3 && (
                                                            
                            
                                                            <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent theme selection when clicking the button
                  handleUpgradeClick(theme.name);
                }}
                style={{
                  padding: '4px 6px',
                  display:'flex',
                  alignItems:'center',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#FFD700',
                  color: '#000',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginLeft:'65px',
                  position:'absolute',
                  zIndex:'2',
                  marginTop:'15px'
                }}
              >
                Upgrade <FaUnlock/>
              </button>

              

                            

              
            )}
                          <div
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            style={{
              background: theme.backgroundColor,
              color: theme.textColor,
              position:'absolute',
              zIndex:'1',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              border: selectedTheme.name === theme.name ? '2px solid #ffffff' : 'none',
            }}
            className="grid-item"
          >

            <div style={{display:'flex',marginTop:'35px',gap:'10px',flexDirection:'column',alignItems:'center'}}>
            <div className='in'style={{marginTop:'60px',width:'150px',borderRadius:'50px',backgroundColor:'white',color:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white',color:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white',color:'white'}}>.</div>
            </div>
            <h3 style={{marginTop:'95px'}}>{theme.name}</h3>

          </div>
            </div>

        ))}
      </div>

      <div
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '30px',
          background: selectedTheme.backgroundColor,
          color: selectedTheme.textColor,
          marginLeft: '20px',
          flex: 1,
        }}
      >
        <h2>Preview</h2>
        <p>This is how the {selectedTheme.name} theme looks!</p>
      </div>
    </div>
  );
};

export default Analytics;