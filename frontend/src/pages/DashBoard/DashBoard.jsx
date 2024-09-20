import React from 'react'
import './dashboard.css'
import Header from '../../components/Header/header'
import data from '/src/data/labels.json'
import {Chart, defaults as ChartJS, defaults} from 'chart.js/auto'
import {Bar,Doughnut,Line} from 'react-chartjs-2'
import frame from '/src/images/Frame.png'
import { CiCircleRemove } from "react-icons/ci";
import header from'/src/images/header.png'
import { GoPencil } from "react-icons/go";
import { BsTiktok } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { GoShare } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";


function DashBoard() {


  return (
    <div>
                <Header/>
                
    <div style={{marginTop:'80px'}}className='statistics-container'>
        <div className='bar-chart'>
          <Line
          data={{
            labels:data.map((data)=>data.label),
            datasets:[
              {
                label:"totalClicks",
                data:data.map((data)=>data.totalClicks),
                backgroundColor: '#39E09B',
                borderColor:'#39E09B'
              },
              {
                label:"visitCounts",
                data:data.map((data)=>data.visitCounts),
                backgroundColor: '#0BAFFF',
                borderColor:'#0BAFFF'
              },
              {
                label:"totalViews",
                data:data.map((data)=>data.totalViews),
                backgroundColor: '#FFC213',
                borderColor:'#FFC213'
              }
            ]
          }}
          options={{
            plugins:{
              title:{
                display: true,
                color: 'black',
                text: "Analytics",
                font: {
                  size: 35 // Increase title font size
                }
        
              },
              legend: {
                labels: {
                  color: 'black',
                  font: {
                    size: 15 // Increase title font size
                  }
           // Change legend label color
                }
              }

            },
            scales: {
              x: {
                ticks: {
                  color: 'black' // Change x-axis label color
                }
              },
              y: {
                ticks: {
                  color: 'black' // Change y-axis label color
                }
              }
            },
            
          }}

/>



        </div>
        <div>
            <img src={frame} alt="" />

        </div>
      
    </div>
    <div className='add-link'>
        <div className='enter-url'>
        <h2>Enter URL</h2>
        <CiCircleRemove />
        </div>

        <div className='inputs'>
        <input style={{width:'400px',padding:'5px',borderRadius:'3px',backgroundColor:'#F6F7F5'}}type="text" placeholder='URL'/>
        <button className='add-btn'>Add</button></div>
        <hr />

        

    </div>
    <div className='insert-link'>
        <div className=''>
            <button className='header-btn'><img src={header} alt="" />Header</button>
        </div>
        <div className='insert-container'>
            <div className='title'>
                <input type="text" placeholder='Title'/>
                <span className='icon-1'><GoPencil /></span>

            </div>
            <div className='url'>
                <input type="link" placeholder='url'/>
                <span className='icon-2'><GoPencil /></span>

            </div>
            <div className='icons'>
                <div style={{color:'GrayText'}}className='icons-1'><BsTiktok /><CiImageOn /><RiCalendarScheduleLine /><CiStar /><CiLock /></div>
                <div style={{color:'GrayText'}} className='icons-2'><GoShare/><MdOutlineDeleteOutline/></div>
            


            </div>

        </div>

    </div>



    </div>
  );
}

export default DashBoard
