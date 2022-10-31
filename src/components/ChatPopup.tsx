import { popupState } from '../models/popupState';
import './ChatPopup.css';
import {useEffect} from 'react';

// import redux components 
import {Provider} from "react-redux";
import store from "../store"

// import chat component
import Chat from "./chat/Chat"

// import action
import {createSession} from "./actions/watson"

// import axios
import axios from "axios"

if (localStorage.session) {
   delete axios.defaults.headers.common["session_id"]
   axios.defaults.headers.common["session_id"] = localStorage.session;
} else {
   delete axios.defaults.headers.common["session_id"]
}

function ChatPopup(props: popupState) {

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
            <img className='bot-icon' src={require('../img/fi12.jpg')} />
            <button onClick={() => props.setIsOpen(false)}> X </button>
            <button><img className='setting-icon' src={require('../img/setting.png')} /></button>
            <div className='popup-header-box'>
               <div className='popup-header-title'>Fontys BOT</div>
               <div className='popup-header-description'>Fontys Help-Desk</div>
            </div>
         </div>
         <div className='title'>
            <Chat/>
         </div>
      </div>
      </Provider>
   )
}

export default ChatPopup;