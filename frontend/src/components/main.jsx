import Navbar from './Navbar';
import './Main.css';
import Navbar2 from './Navbar2';
import Patient_tag from './Patient_tag';
import Report_pdf from './Report_pdf';
import { PDFViewer } from '@react-pdf/renderer';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import TouchDrawing from './Doctors_priscription';
import { useEffect, useState } from 'react';
import PopupButton from './Popup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from './Popup';

const Main = () => {
  const navigate=useNavigate();
  const [patient,setpatient]=useState(null)
  const [list,setlist]=useState([])
  const [display,setdisplay]=useState(0)
  const [Prescribe,setprescribe]=useState(false)
  const GetPatientList=()=>{
    axios.post("/en/getpatients")
      .then((response) => response.data)
      .then((data) => setlist(data))
      .catch((error) => {
        console.error("Error fetching patient list:", error);
      });
  }
  const back=() => {
    if(display===1){
      setdisplay(0);
    }
    else if (display===0){
      navigate('/')
    }
  }
  useEffect(()=>{
    GetPatientList();
  })
    return (
        <div className='Main_body'>

        
           
            <div>
              {
                display===0 ? <Navbar2 setdisplay={setdisplay}/> : <Navbar setdisplay={setdisplay}/>
              }
            </div>
            <div className='subnavbar'>
            <button id="back_button" onClick={back}>Back</button>
            {
              display!==0 && <button id='prescription' onClick={()=>setprescribe(!Prescribe)}>Prescribe</button>
            }
            
            </div>
            
            <div className='stage'>
              {
                display===0 ?
                <div>
                  {list.length!==0 && list.map((pat,index)=>(
                      <Patient_tag key={index} setdisplay={setdisplay} setpatient={setpatient} pat={pat}/>
                  ))}
                </div>
                :<Report_pdf patient={patient}/>
              }
              <Popup Prescribe={Prescribe} setprescribe={setprescribe}/>
            </div>
        </div>
    );
};

export default Main;
