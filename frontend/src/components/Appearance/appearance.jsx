import React, { useState } from 'react'
import Header from '../Header/header'
import profile from '/src/images/profile.jpg'
import './appearance.css'
import { IoAdd } from "react-icons/io5";
import mobile from '/src/images/mobile.png'
import { FaUnlock } from "react-icons/fa";



function appearance() {
    const[color,setColor]=useState("")
    function handleChange(e){
        setColor(e.target.value)
    }
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
        <div>
            <img style={{marginTop:'-360px',marginLeft:'1000px'}} src={mobile} alt="" />
        </div>
        <h2 style={{marginLeft:'60px',fontWeight:'bolder',fontSize:'25px'}}>Themes</h2>

        <div className='themes-container'>
        <div style={{    backgroundColor: '#39E09B', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
            <div className='in'style={{display:'block',marginTop:'100px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>lightgreen</div>
        </div>
        <div style={{backgroundColor:'rgb(227, 5, 239)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
            <div className='in'style={{marginTop:'100px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>pink</div>
        </div>
        <div style={{backgroundColor:'rgb(125, 124, 124)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
            <div className='in'style={{display:'block',marginTop:'100px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>grey</div>
        </div>
        <div style={{backgroundColor:'rgb(7, 187, 232)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
            <div className='in'style={{display:'block',marginTop:'100px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>lightblue</div>
        </div>
        
        <div style={{background:'linear-gradient(#cbc9c9, #7ab3f5, #FFC300)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
        <button style={{display:'flex',justifyContent:'center',alignItems:'center',width:'150px',borderRadius:'50px',backgroundColor:'black',gap:'2px',marginTop:'10px'}}>Upgrade<FaUnlock/></button>
            <div className='in'style={{display:'block',marginTop:'55px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>breeze orange</div>
        </div>
        <div style={{background:'linear-gradient(135deg, #FF5733, #33FF57, #3357FF)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
        <button style={{display:'flex',justifyContent:'center',alignItems:'center',width:'150px',borderRadius:'50px',backgroundColor:'black',gap:'2px',marginTop:'10px'}}>Upgrade<FaUnlock/></button>
            <div className='in'style={{display:'block',marginTop:'55px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>rainbow</div>
        </div>
        <div style={{background: 'linear-gradient(135deg, #ffffff, #f80637, #FFC300)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
        <button style={{display:'flex',justifyContent:'center',alignItems:'center',width:'150px',borderRadius:'50px',backgroundColor:'black',gap:'2px',marginTop:'10px'}}>Upgrade<FaUnlock/></button>
            <div className='in'style={{display:'block',marginTop:'55px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>spicy</div>
        </div>
        <div style={{backgroundColor:'rgb(14, 11, 51)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">

            <div className='in'style={{display:'block',marginTop:'100px',width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{width:'150px',borderRadius:'50px',backgroundColor:'white'}}>.</div>
            <div style={{marginTop:'60px'}}>night</div>
        </div>



        </div>
        <div style={{marginLeft:'60px',marginTop:'30px'}}>
        <h2 style={{fontWeight:'bolder',fontSize:'25px'}}>Custom appearance</h2>
        <p>Completely customize your Linktree profile. Change your background with colors,<br /> gradients and images. Choose a button style, change the typeface and more.</p>
        <h2 style={{marginTop:'30px',fontWeight:'bolder',fontSize:'25px'}}>Backgrounds </h2><br/>

        </div>
        <div className='background'>
        <div style={{    backgroundColor: 'rgb(75, 73, 73)', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
            <div style={{marginTop:'265px'}}>grey</div>
        </div>
        <div style={{    backgroundColor: '#3D444B', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
            <div style={{marginTop:'265px'}}>vintage</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,rgb(63, 62, 62),rgb(247, 243, 243))',   backgroundColor: 'rgba(147, 143, 143, 0.995)', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item">
        <button style={{display:'flex',justifyContent:'center',alignItems:'center',width:'150px',borderRadius:'50px',backgroundColor:'black',gap:'2px',marginTop:'10px'}}>Upgrade<FaUnlock/></button>
            <div style={{marginTop:'220px'}}>blured grey</div>
        </div>
        <div style={{marginTop:'350px',marginLeft:'-700px'}}>
            <h2>Color</h2>
            <input style={{border:'none',borderRadius:'30px',width:'50px',height:'50px'}}type="color" placeholder='color' value={color} onChange={handleChange} />
        </div>


        </div>
        <h2 style={{marginTop:'30px',fontWeight:'bolder',fontSize:'25px',marginLeft:'45px'}}>Buttons </h2><br/>
        <div className='buttons'>
        <div style={{marginTop:'30px', marginLeft:'80px',   backgroundColor: '#3D444B', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
            <h2 style={{color:'black',marginTop:'-40px',marginLeft:'-160px'}}>Fill</h2>
        </div>


            <div style={{ marginTop:'30px',   borderRadius:'10px', marginLeft:'80px',     backgroundColor: '#3D444B', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
        </div>

        <div style={{marginTop:'30px', borderRadius:'30px',marginLeft:'80px',     backgroundColor: '#3D444B', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
        </div>

        <div style={{marginTop:'50px', marginLeft:'80px',   backgroundColor: '',border:'2px solid black',      display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
            <h2 style={{color:'black',marginTop:'-40px',marginLeft:'-130px'}}>Outline</h2>
        </div>


            <div style={{ marginTop:'50px',   borderRadius:'10px', marginLeft:'80px',border:'2px solid black',     backgroundColor: '', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
        </div>

        <div style={{marginTop:'50px', borderRadius:'30px',marginLeft:'80px', border:'2px solid black',         backgroundColor: '', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
        </div>

        <div style={{marginTop:'50px', marginLeft:'80px',   backgroundColor: '',border: '4px inset #000',     display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
            <h2 style={{color:'black',marginTop:'-40px',marginLeft:'-130px'}}>Special</h2>
            <button style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100px',borderRadius:'50px',backgroundColor:'black',gap:'2px',marginTop:'-35px',marginLeft:'40px'}}>Upgrade<FaUnlock/></button>
        </div>


            <div style={{ marginTop:'50px',   borderRadius:'10px', marginLeft:'80px',border:'4px inset #000',     backgroundColor: '', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
        </div>

        <div style={{marginTop:'50px', borderRadius:'30px',marginLeft:'80px', border:'4px inset black',         backgroundColor: '', display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',position:'relative'}}class="grid-item1">
        </div>




        <div style={{marginTop:'50px',marginLeft:'80px'}}>
            <h2>button Color</h2>
            <input style={{border:'none',borderRadius:'30px',width:'50px',height:'50px'}}type="color" placeholder='color' value={color} onChange={handleChange} />
        </div>









        </div>

        <h2 style={{marginTop:'40px',fontWeight:'bolder',fontSize:'25px',marginLeft:'45px'}}>Fonts </h2><br/>
        <div className='fonts' style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <h2 style={{color:'black',marginTop:'',marginLeft:''}}>Font</h2>
            
            <select style={{border:'2px grey solid',borderRadius:'20px',padding:'10px',width:'600px'}} id="fontSelect">
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
        </select>
        <div style={{marginTop:'20px',marginLeft:''}}>
            <h2>Font Color</h2>
            <input style={{border:'none',borderRadius:'30px',width:'50px',height:'50px'}}type="color" placeholder='color' value={color} onChange={handleChange} />
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
