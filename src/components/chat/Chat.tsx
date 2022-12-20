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
  askContact
} from "../actions/watson";

const Chat = ({
  chat,
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion,
  askContact,
}: {
  chat: any;
  userMessage: any;
  sendMessage: any;
  searchGoogle: any;
  askCategory: any;
  categoryList: any;
  askQuestion: any;
  askContact: any;
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
  };

  const sendContact = () => {
    console.log("this works");
    return (
      userMessage("Send me contact details of Fontys."),
      askContact()
    );
  }

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
            <Category clickCategory={clickCategory} />
          </div>
        );
      case "category":
        return (
          <div className="bot">
            <Questions category={msg.message} clickQuestion={clickQuestion} />
            <button
              className="goback-button"
              onClickCapture={returnCategoryMenu}
            >
              <img
                className="arrow-left"
                src={require("../../img/arrow-left.png")}
              />{" "}
              Return to FAQ List
            </button>
          </div>
        );
      case "question":
        return (
          <div className="bot">
            <Question question={msg.message} />
            <button
              className="goback-button"
              onClickCapture={returnCategoryMenu}
            >
              <img
                className="arrow-left"
                src={require("../../img/arrow-left.png")}
              />{" "}
              Return to FAQ List
            </button>
          </div>
        );
       case "contact":
        return (
          <div className="bot">
            <div className="contact-detail-title">FONTYS CONTACT DETAILS</div>
            <hr/>
            <div className="contact-detail">
              <b>Fontys Phone Number</b> <br/>+123456789
            </div>
            <br/>
            <div className="contact-detail">
              <b>Email</b> <br/>fontys@fhict.nl
            </div>
          </div>
        ) 
      default:
        return <div> {msg.message} </div>;
    }
  }

  return (
    <div className="chat">
      <div className="chat-header">
        {/* Contact button */}
        <div className="contact-button" onClickCapture={sendContact}>
          <img className="phonelogo" src={require("../../img/phone.png")} />
        </div>

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
        <div className="bot">
          <Category clickCategory={clickCategory} />
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
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { watson: { messages: any } }) => ({
  chat: state.watson.messages
});

export default connect(mapStateToProps, {
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion,
  askContact,
})(Chat);


