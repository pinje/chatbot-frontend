import './App.css';
import image from './img/bot.png'

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="img">
              <img src={image} alt=''/>
            </div>
            <div className="right">
              <div className="name">Fontys BOT</div>
              <div className="description">Nicest Fontys HelpDesk Service Employee</div>
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
                  <button>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
