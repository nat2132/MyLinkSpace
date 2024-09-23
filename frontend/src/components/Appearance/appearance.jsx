import React, { useState } from 'react'
import Header from '../Header/header'
import profile from '/src/images/profile.jpg'
import './appearance.css'
import { IoAdd } from "react-icons/io5";
import mobile from '/src/images/mobile.png'
import { FaUnlock } from "react-icons/fa";
import { themes } from '../../themes';



function appearance() {
    const [selectedTheme, setSelectedTheme] = useState(themes[0]);
    const [customColor, setCustomColor] = useState('#ffffff'); // Default color
    const [isGradient, setIsGradient] = useState(false); // Flag for gradient
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [selectedFont, setSelectedFont] = useState('Arial'); // Default font
    const [fontColor, setFontColor] = useState('#000000'); // Default color
  


    const styles = [
        { name: 'Square', borderRadius: '0px', backgroundColor: 'black' },
        { name: 'small Rounded ', borderRadius: '10px', backgroundColor: 'black' },
        { name: ' Medium Rounded', borderRadius: '30px', backgroundColor: 'black' },
        { name: 'Square', borderRadius: '0px', backgroundColor: 'white' },
        { name: 'Small Rounded', borderRadius: '10px', backgroundColor: 'white' },
        { name: 'Medium Rounded', borderRadius: '30px', backgroundColor: 'white' },
        { name: 'Square', borderRadius: '0px', backgroundColor: '#3D444B' },
        { name: 'Small Rounded', borderRadius: '10px', backgroundColor: '#4A5458' },
        { name: 'Medium Rounded', borderRadius: '30px', backgroundColor: '#5D666B' },
      ];

      const handleFontChange = (event) => {
        setSelectedFont(event.target.value); // Update the selected font
      };
    
      const handleFontColorChange = (event) => {
        setFontColor(event.target.value); // Update the font color
      };

      const handleStyleChange = (style) => {
        // Prevent adding the same style multiple times
        if (!selectedStyles.some(s => s.name === style.name)) {
          setSelectedStyles([...selectedStyles, style]);
        }
      };

    const handleThemeChange = (theme) => {
      setSelectedTheme(theme);
    };
  
    const handleUpgradeClick = (themeName) => {
      alert(`Upgrading to ${themeName} theme!`);
    };
    const handleColorChange = (event) => {
        setCustomColor(event.target.value);
      };
    
    const toggleGradient = () => {
        setIsGradient((prev) => !prev);
      };


  return (
    <div>
        <Header/>
        <div style={{padding:'10px',borderRadius:'20px',backgroundColor:'#FFE2E5',marginLeft:'10px',marginTop:'80px'}}>To publish your profile please verify your account by clicking the link we’ve sent to your email (rajarshibashyas08@gmail.com).<span style={{color:'red'}}>Resend Verification Link</span></div>
        <div className='profile-container'>
            <div className='profile'>
            <img style={{height:'70px',width:'70px',borderRadius:'50px'}} src={profile} alt="" />
            <div className='btn'>
                <button style={{marginBottom:'5px',backgroundColor:'#8129D9',color:'white',padding:'7px',borderRadius:'30px',width:'500px'}}>Pick An Image</button><br />
                <button style={{border:'1px,solid',color:'grey',padding:'7px',borderRadius:'30px',width:'500px'}}>Remove</button>

            </div>
            </div>
            <div>
                <input style={{width:'650px',padding:'10px',borderRadius:'20px',background:'#F6F7F5',marginTop:'10px'}} type="text" placeholder='profile title' /><br />
                <input style={{width:'650px',padding:'10px',borderRadius:'20px',height:'100px',background:'#F6F7F5',marginTop:'10px',marginBottom:'20px'}} type="text" placeholder='Bio' />
                <hr />
            </div>
            <div>
                <button style={{display:'flex',alignItems:'center', color:'#8129D9'}}><IoAdd/>Add Social Icons</button>
            </div>

        </div>
        <h2 style={{marginTop:'30px',marginLeft:'60px',fontWeight:'bolder',fontSize:'25px'}}>Themes</h2>

            
    <div style={{ display: 'flex', padding: '20px' }}>
      <div className='themes-container' style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        width: '900px',
        height:'730px',
        position:'relative',
        backgroundColor:'white',
        padding:'20px',
        marginLeft:'30px',
        borderRadius:'30px'

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
    background: isGradient 
      ? `linear-gradient(45deg, ${customColor}, #ffffff)` // Example gradient
      : selectedTheme.backgroundColor, // Use selected theme's background color
    height: '400px',
    color: selectedTheme.textColor,
    fontFamily:{selectedFont},
    marginLeft: '20px',
    flex: 1,
    marginLeft: '1050px',
    marginTop: '-510px',
    position: 'fixed',
    height: '500px',
    width: '300px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
  }}
  
>
{
            selectedStyles.map((style, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  marginTop:'100px',
                  borderRadius: style.borderRadius,
                  backgroundColor: style.backgroundColor,
                  color: 'white',
                  textAlign: 'center',
                  marginBottom: '5px', // Space between stacked styles
                }}
              >
                {style.name}
              </div>
            ))
          }
</div>
    </div>


        <div style={{marginLeft:'60px',marginTop:'30px'}}>
        <h2 style={{fontWeight:'bolder',fontSize:'25px'}}>Custom appearance</h2>
        <p>Completely customize your Linktree profile. Change your background with colors,<br /> gradients and images. Choose a button style, change the typeface and more.</p>
        <h2 style={{marginTop:'30px',fontWeight:'bolder',fontSize:'25px'}}>Backgrounds </h2><br/>

        </div>
        <div className='background'>
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
        <h2 style={{marginTop:'30px',fontWeight:'bolder',fontSize:'25px',marginLeft:'45px'}}>Buttons </h2><br/>
        <div className='buttons'>
        <div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(3, 1fr)', // Three columns
  gap: '20px', // Space between items
  marginTop: '10px'
}}>
  {styles.map((style, index) => (
    <div
      key={index}
      onClick={() => handleStyleChange(style)}
      style={{
        backgroundColor: style.backgroundColor,
        border: 'none',
        display: 'flex', // Use flex for inner content
   marginLeft:'60px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        padding: '10px',
        width:'200px',
        height:'50px',
        borderRadius: style.borderRadius,
        transition: '0.3s',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      }}
    >
      <h2 style={{ color: 'white' }}>{style.name}</h2>
    </div>
  ))}
</div>


       </div>

        <h2 style={{marginTop:'40px',fontWeight:'bolder',fontSize:'25px',marginLeft:'45px'}}>Fonts </h2><br/>
        <div className='fonts' style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
      <h2 style={{ color: 'black' }}>Font</h2>
      
      <select 
        style={{ border: '2px grey solid', borderRadius: '20px', padding: '10px', width: '600px' }} 
        id="fontSelect" 
        onChange={handleFontChange}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        <h2>Font Color</h2>
        <input 
          style={{ border: 'none', borderRadius: '30px', width: '50px', height: '50px' }} 
          type="color" 
          onChange={handleFontColorChange} 
        />
      </div>
            



        </div>

        <div className='mylinkspacelogo'>
            <h2>Hide the MyLinkSpace</h2>
            <button style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100px',borderRadius:'50px',backgroundColor:'black',gap:'2px',marginTop:'-35px',marginLeft:'40px',color:'white',marginTop:''}}>Upgrade<FaUnlock/></button>



        </div>





      
    </div>
  )
}

export default appearance
