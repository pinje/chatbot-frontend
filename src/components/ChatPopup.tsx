import { popupState } from '../models/popupState';
import './ChatPopup.css';

function ChatPopup(props: popupState) {

   return (
      <div className='form-container'>
         <div className='popup-header'>
            <img className='bot-icon' src={require('../img/fi12.jpg')} />
            <button onClick={() => props.setIsOpen(false)}> X </button>
            <button><img className='setting-icon' src={require('../img/setting.png')} /></button>
            <p className='popup-header-title' >Fontys BOT</p><br />
            <p className='popup-header-description'>Fontys Help-Desk </p><br />
         </div>
         <div className='title'>
            <img className='popup-back-image' src={require('../img/fi12.jpg')} />
            <p className='popup-backgroud-text'>Fontys Chatbot</p>
         </div>
         <div className='popup-footer'>
            <input type="text" placeholder="Enter a question"></input>
            <img className='send-icon' src={require('../img/sendicon.png')} />

         </div>
      </div>
   )
}

export default ChatPopup;