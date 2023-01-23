import { connect } from "react-redux";
import './Settings.css';
import {
  LANG_SUCCESS
} from "./actions/types";

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
            <img className='flags' src={require('../img/bflag.jpg')} alt=""/>
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
                <div className="googletext" > Search Bing </div>
              </div>
              <div className="switch-container">
                <label className="switch">
                  <input onFocus={props.handleSearchToggle} checked={!props.toggleSearch} type="checkbox"  />
                  <span className="slider round" />
                  {props.toggleSearch === true
                    ? <div className="off">Off</div>
                    : <div className="on">On</div>
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
            <img className='flags' src={require('../img/dflag.jpg')}  alt=""/>
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
                <div className="googletext" > Zoek met Bing </div>
              </div>
              <div className="switch-container">
                <label className="switch">
                  <input onFocus={props.handleSearchToggle} checked={!props.toggleSearch} type="checkbox" />
                  <span className="slider round" />
                  {props.toggleSearch === true
                    ? <div className="off">Uit</div>
                    : <div className="on">Aan</div>
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