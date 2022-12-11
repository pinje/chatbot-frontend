import {useState, useEffect, useContext} from "react";
import { connect, ReactReduxContext } from "react-redux";
import './Settings.css';
import {
    LANG_SUCCESS
  } from "./actions/types";

const ChangeLang = (e : React.ChangeEvent<HTMLSelectElement>) => (dispatch: any) => {
    e.preventDefault();
    dispatch({
        type: LANG_SUCCESS,
        payload: e.currentTarget.value,
    });
}

const Settings = ({
    lang,
    ChangeLang
  }: {
    lang: any,
    ChangeLang: any;
  }) => {
    return (
        <div className="settings-container">
          {lang === "english" && (
        <div className="setting-option">           
          Language          
          <img className='flags' src={require('../img/bflag.jpg')} />
          <select  name="cars" id="cars" onChange={(e) => {ChangeLang(e)}}>
              <option value="english"       
              >English
                
                </option>
              <option value="dutch">Dutch</option>              
          </select>          
        
           </div>   )} 
        {lang === "dutch" && (
        <div className="setting-option">           
          Taal          
          <img className='flags' src={require('../img/dflag.jpg')} />
          <select  name="cars" id="cars" onChange={(e) => {ChangeLang(e)}}>
              <option value="english"       
              >Engels
                
                </option>
              <option value="dutch" selected={true}>Nederlands</option>              
          </select>          
        
           </div>   )}       
             
        </div>
   
    )
}
const mapStateToProps = (state: { watson: {language: any } }) => ({
    lang: state.watson.language
  });
  
  export default connect(mapStateToProps, {
    ChangeLang
  })(Settings);