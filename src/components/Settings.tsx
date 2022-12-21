import { useState, useEffect, useContext } from "react";
import { connect, ReactReduxContext } from "react-redux";
import './Settings.css';
import {
  LANG_SUCCESS
} from "./actions/types";
import { popupState } from "../models/popupState";

const ChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => (dispatch: any) => {
  e.preventDefault();
  dispatch({
    type: LANG_SUCCESS,
    payload: e.currentTarget.value,
  });
}


const Settings = (props: any) => {

  const { lang, ChangeLang } = props;
  return (
    <div className="settings-container">
      {lang === "english" && (
        <>
          <div className="setting-option">
            <img className='flags' src={require('../img/bflag.jpg')} />
            <select onChange={(e) => { ChangeLang(e) }}>
              <option value="english"
              >English
              </option>
              <option value="dutch">Dutch</option>
            </select>
          </div>
          <div className="setting-option">
            <div className="flex-container">
              {/* <div>
                <img className='search-icon' src={require('../img/bing1.webp')} />
              </div> */}
              <div>
                <div className="googletext" > Internal Search </div>
              </div>
              <div className="switch-container">
                <label className="switch">
                  <input onFocus={props.handleSearchToggle} type="checkbox" />
                  <span className="slider round" />
                  {props.toggleSearch == true
                    ? <div className="on">On</div>
                    : <div className="off">Off</div>
                  }
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      {lang === "dutch" && (
        <>
          <div className="setting-option">
            <img className='flags' src={require('../img/dflag.jpg')} />
            <select onChange={(e) => { ChangeLang(e) }}>
              <option value="english"
              >Engels
              </option>
              <option value="dutch" selected={true}>Nederlands</option>
            </select>
          </div>
          <div className="setting-option">
            <div className="flex-container">
              {/* <div>
                <img className='search-icon' src={require('../img/bing1.webp')} />
              </div> */}
              <div>
                <div className="googletext" > Internal Search </div>
              </div>
              <div className="switch-container">
                <label className="switch">
                  <input onFocus={props.handleSearchToggle} type="checkbox" />
                  <span className="slider round" />
                  {props.toggleSearch == true
                    ? <div className="on">Aan</div>
                    : <div className="off">Uit</div>
                  }
                </label>
              </div>
            </div>
          </div>
        </>)
      }

    </div >

  )
}
const mapStateToProps = (state: { watson: { language: any } }) => ({
  lang: state.watson.language
});

export default connect(mapStateToProps,
  { ChangeLang }
)(Settings);