import {useState, useEffect} from "react";
import './Settings.css';

function Settings() {
    return (
        <div className="settings-container">
           <div className="setting-option">           
          Language          
          <select  name="cars" id="cars">
              <option value="English"       
              >English
                <img className='flags' src={require('../img/bflag.jpg')} />
                </option>
              <option value="dutch">Dutch</option>              
          </select>          
        
           </div>           
             
        </div>
   
    )
}
export default Settings;