import { popupState } from "../models/popupState";
import "./ChatPopup.css";
import React, { useEffect, useState } from "react";

//import settings
import Settings from "./Settings";

// import redux components
import { Provider, useDispatch } from "react-redux";
import store from "../store";

// import chat component
import Chat from "./chat/Chat";

// import action
import { clearStore, createSession } from "./actions/watson";

// import axios
import axios from "axios";
import FeedbackPopup from "./FeedbackPopup";
import { clear } from "console";

if (localStorage.session) {
  delete axios.defaults.headers.common["session_id"];
  axios.defaults.headers.common["session_id"] = localStorage.session;
} else {
  delete axios.defaults.headers.common["session_id"];
}

function ChatPopup(props: popupState) {   

   const [openSettings, setOpenSettings] = useState<boolean>(false);
   const [feedback, setFeedback] = useState<boolean>(false);

   const reloadClick = () =>  {
    store.dispatch(clearStore());
   }

   const askFeedback = () => {
    if (feedback == false) {
      setFeedback(true);
    } else {
      // close chat
      props.setIsOpen(false);
    }
   }

   useEffect(() => {
      // check if there's a session
      if (!localStorage.session) {
         // create
         createSession();
      }
   })

   return (
      <Provider store={store}>
      <div className='form-container'>
         <div className='popup-header'>  
         <img alt="xd" className='bot-icon' src={require('../img/chatbot-icon.png')} />          
            {/* <img className='bot-icon' src={require('../img/chat-profile.jpg')} /> */}
            <button onClick={() => askFeedback()}> X </button>
             
            <button onClick={() => {
                  setOpenSettings(!openSettings)
                  }}>
               <img alt="xd" className='setting-icon' src={require('../img/setting.png')}            
               
               />
            </button>

            <button onClickCapture={() => {reloadClick()}}>
               <img alt="xd" className='reload-icon' src={require('../img/reload.png')} />
            </button>
            {openSettings && <Settings/>}

          <div className="popup-header-box">
            <div className="popup-header-title">Fontys Buddy</div>
            <div className="popup-header-description">Help-Desk</div>
          </div>
        </div>
        <div className="title">
          {feedback ? <FeedbackPopup setIsOpen={setFeedback}/> : <Chat/>}
        </div>
      </div>
    </Provider>
  );
}

export default ChatPopup;
