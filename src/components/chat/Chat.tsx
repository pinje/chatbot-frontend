import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Chat.css";
import Category from "./Category";
import Questions from "./Questions";
import Question from "./Question";
import "./Switch.css";

// import action
import {
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion,
} from "../actions/watson";

const Chat = ({
  chat,
  lang,
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion
}: {
  chat: any;
  lang: any;
  userMessage: any;
  sendMessage: any;
  searchGoogle: any;
  askCategory: any;
  categoryList: any;
  askQuestion: any;
}) => {
  //Handle User Message
  const [message, setMessage] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  // function that handles user submission
  const handleClick = (e: any) => {
    e.preventDefault();
    console.log(message);
    userMessage(message);
    toggleSearch ? searchGoogle(message) : sendMessage(message);
    setMessage("");
  };

  const handleSearchToggle = (e: any) => {
    e.preventDefault();
    setToggleSearch(!toggleSearch);
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  /*  When a category is chosen from the list,
      a message is sent as a user that asks the question (to personalize the experience),
      then the bot replies with Q&A of that topic */
  const clickCategory = (category: string) => {
    switch (lang) {
      case ("english"):
        switch (category) {
          case "password":
            return (
              userMessage("Let me see FAQs about password resets."),
              askCategory(category)
            );
          case "office":
            return (
              userMessage("Let me see FAQs about Office 365."),
              askCategory(category)
            );
          case "equipment":
            return (
              userMessage("Let me see FAQs about Fontys equipment."),
              askCategory(category)
            );
          case "wifi":
            return (
              userMessage("Let me see FAQs about wifi."), askCategory(category)
            );
          case "media":
            return (
              userMessage("Let me see FAQs about audio and video."),
              askCategory(category)
            );
          default:
            return null;
        }
      case ("dutch"):
        switch (category) {
          case "password":
            return (
              userMessage("Laat me de veelgestelde vragen over het resetten van mijn wachtwoord zien."),
              askCategory(category)
            );
          case "office":
            return (
              userMessage("Laat me de veelgestelde vragen over Office 365 zien."),
              askCategory(category)
            );
          case "equipment":
            return (
              userMessage("Laat me de veelgestelde vragen over Fontys spullen zien."),
              askCategory(category)
            );
          case "wifi":
            return (
              userMessage("Laat me de veelgestelde vragen over wifi zien."), askCategory(category)
            );
          case "media":
            return (
              userMessage("Laat me de veelgestelde vragen over audio en video zien."),
              askCategory(category)
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };

  // good shit shuhei - Tsvetislav
  // (category already chosen) user clicks on a question, the question is sent as a user (to personalize the experience),
  // then the bot replies with the answer
  const clickQuestion = (question: string) => {
    return userMessage(question), askQuestion(question);
  };

  // Return button to see FAQ Category List
  const returnCategoryMenu = () => {
    categoryList();
  };

  const showLink = (url: string) => {
    let domain = (new URL(url));
    return domain.hostname;
  }

  // Check output on chat: link, FAQ category list, Specific category questions list, normal message
  function condition(msg: any) {
    switch (msg.type) {
      case "botLink":
        return <a target="_blank" href={msg.message}>{showLink(msg.message)}</a>;
      case "category-list":
        return (
          <div className="bot">
            <Category clickCategory={clickCategory} lang={lang} />
          </div>
        );
      case "category":
        return (
          <div className="bot">
            <Questions category={msg.message} clickQuestion={clickQuestion} lang={lang} />
            <button
              className="goback-button"
              onClickCapture={returnCategoryMenu}
            >
              <img
                className="arrow-left"
                src={require("../../img/arrow-left.png")}
              />{" "}
              {lang == "english" && (<>Return to FAQ List</>)}
              {lang == "dutch" && (<>Terug naar veelgestelde vragen lijst</>)}
            </button>
          </div>
        );
      case "question":
        return (
          <div className="bot">
            <Question question={msg.message} lang={lang} />
            <button
              className="goback-button"
              onClickCapture={returnCategoryMenu}
            >
              <img
                className="arrow-left"
                src={require("../../img/arrow-left.png")}
              />{" "}
              {lang == "english" && (<>Return to FAQ List</>)}
              {lang == "dutch" && (<>Terug naar veelgestelde vragen lijst</>)}
            </button>
          </div>
        );
      default:
        return <div> {msg.message} </div>;
    }
  }

  return (<>
    {lang == "english" && (<div className="chat">
      {/* implement toggle button.. */}
      <div className="flex-container">
        <div>
          <img className='search-icon' src={require('../../img/bing1.webp')} />
        </div>
        <div><div className="googletext" >

          Bing Search </div>

        </div>
        <div className="switch-container">

          <label className="switch">

            <input onFocus={handleSearchToggle} type="checkbox" />
            <span className="slider round" />
            {toggleSearch === false
              ? <div className="off">Off</div>
              : <div className="on">On</div>}
          </label>
        </div>
        {/* <button className="onOffButton" onClick={handleSearchToggle}>
      {toggleSearch === false
          ? <div className="">Off</div>
          :<div>On</div> }        
        </button> */}
      </div>

      {/* sorry about this being so ugly guys lol, I know you'll take care of it, thanks in advance - Tsvetislav */}

      {/* Handle Messages */}
      {/* <div className="history-box"> */}
      <div className="history-box">
        <div className="intro-container">
          <p>Intro</p>
        </div>
        <div className="bot">Hi! How can I help you?</div>
        <div className="bot">Please note, that this converaiton will be stored.</div>
        {/* Showing FAQ by categories*/}
        <div className="faq">
          <Category clickCategory={clickCategory} lang={lang} />
        </div>

        {/* Display Chat */}
        {chat.length === 0
          ? ""
          : chat.map((msg: any) => (
            <div className={msg.type}>{condition(msg)}</div>
          ))}

        <div ref={messagesEndRef} className="chat-buffer" />

      </div>
      {/* Input Box */}
      <div>
        <form onSubmit={handleClick} className="input-box">
          <input
            id="chatBox"
            spellCheck="true"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Enter a question...">
          </input>
          <button> Send </button>
          <button className="feeback-btn"> Rate our service </button>
        </form>      
        
      </div>      
    </div>)}
    {lang == "dutch" && (<div className="chat">
      {/* Dutch version */}
      <div className="flex-container">
        <div> <p className="googletext" >Zoek met Google</p> </div>
        <div className="switch-container">

          <label className="switch">

            <input onFocus={handleSearchToggle} type="checkbox" />
            <span className="slider round" />
            {toggleSearch === false
              ? <div className="off">Uit</div>
              : <div className="on">Aan</div>}
          </label>
        </div>
      </div>
      <div className="history-box">
        <div className="intro-container">
          <p>Intro</p>
        </div>
        <div className="bot">Hallo! Hoe kan ik je helpen?</div>

        {/* Showing FAQ by categories*/}
        <div className="bot">
          <Category clickCategory={clickCategory} lang={lang} />
        </div>

        {/* Display Chat */}
        {chat.length === 0
          ? ""
          : chat.map((msg: any) => (
            <div className={msg.type}>{condition(msg)}</div>
          ))}
        <div ref={messagesEndRef} className="chat-buffer" />
      </div>
      {/* Input Box */}
      <div>
        <form onSubmit={handleClick} className="input-box">
          <input
            id="chatBox"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Vul een vraag in...">
          </input>
          <button> Stuur </button>
        </form>
      </div>
    </div>)}
  </>);
};

const mapStateToProps = (state: { watson: { messages: any, language: any } }) => ({
  chat: state.watson.messages,
  lang: state.watson.language
});

export default connect(mapStateToProps, {
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion
})(Chat);


