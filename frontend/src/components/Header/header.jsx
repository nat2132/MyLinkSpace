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

function Header() {
  return (
    <div>
        <nav>
            <ul className='links'>
                <li><img src={logo} alt="" /></li>
                <li><img src={link} alt="" /><Link to='/links'>Links</Link></li>
                <li><img src={appearance} alt="" /><Link to='/appearance'>Appearance</Link></li>
                <li><img src={analytics} alt="" /><Link to='/analysis'>Analytics</Link></li>
                <li style={{marginLeft:'500px'}}><img src={speaker} alt="" /></li>
                <li><button className='upgrade-btn'><img src={upgrade} alt="" />Upgrade</button></li>
                <li><button className='share-btn'><img src={share} alt="" />Share</button></li>
                <li><img style={{height:'50px',width:'50px',borderRadius:'30px',marginRight:'20px'}} src={profile} alt="" /></li>
            </ul>
        </nav>

      
    </div>
  )
}

export default Header

