import './App.css';

import './components/ChatPopup.css';
import ChatPopup from './components/ChatPopup';
import {useState} from 'react';


function App() {
  const [openModal, setOpenModal] = useState(false);
  return (

    <div className='App'>
    <h1>Fontys ChatBOT.</h1>
   
    <img className='shortcut-bot-icon' alt='bot-icon' src={require('./img/chaIcon2.png')}
    
    onClick={() => {
      setOpenModal(true);
      }}
    />  

{openModal && <ChatPopup closeModal={setOpenModal}/>}

</div>      
  );
}

export default App;
