import React from 'react'
import './header.css'
import logo from '/src/images/logo.png'
import link from '/src/images/link.png'
import appearance from '/src/images/appearance.png'
import analytics from '/src/images/analysis.png'
import speaker from '/src/images/speaker.png'
import upgrade from '/src/images/upgrade.png'
import share from '/src/images/share.png'
import profile from '/src/images/profile.jpg'
import { Link } from 'react-router-dom'
import { AiFillThunderbolt } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { PiShapesLight } from "react-icons/pi";


function Header() {
  return (
    <div>
        <nav>
            <ul className='links'>
                <li><img src={logo} alt="" /></li>
                <li><img src={link} alt="" /><Link to='/links'>Links</Link></li>
                <li><PiShapesLight style={{marginRight:'3px',height:'55px'}}/><Link to='/appearance'>Appearance</Link></li>
                <li><TbBrandGoogleAnalytics style={{marginRight:'3px'}} /><Link to='/analytics'>Analytics</Link></li>
                <li><button style={{marginLeft:'500px',display:'flex',alignItems:'center'}} className='upgrade-btn'><AiFillThunderbolt/>Upgrade</button></li>
                <li><button style={{display:'flex',alignItems:'center'}}className='share-btn'><CiShare2/>Share</button></li>
                <li><img style={{height:'50px',width:'50px',borderRadius:'30px',marginRight:'20px'}} src={profile} alt="" /></li>
            </ul>
        </nav>

      
    </div>
  )
}

export default Header

