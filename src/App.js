import './App.css';
import bot_image from './img/bot.png'
import close_icon from './img/close.png'
import setting_icon from './img/setting.png'
import send_icon from './img/send.png'


function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="left">
              <div className="img">
                <img src={bot_image} alt=''/>
              </div>
              <div className="right">
                <div className="name">Fontys BOT</div>
                <div className="description">Nicest Fontys HelpDesk Service Employee</div>
              </div>
            </div>
            <div className="option">
              <div className="option-box">
                <div className="img_setting">
                  <img src={setting_icon} alt=''/>
                </div>
                <div className="img_close">
                  <img src={close_icon} alt=''/>
                </div>
              </div>
            </div>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                <div className="bot-message" id="message1"></div>
                <div className="human-message" id="message2"></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btm">
              <div className="input">
                <input type="text" id="input" placeholder="Enter a question" />
              </div>
              <div className="btn">
                <img src={send_icon} alt=''/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
