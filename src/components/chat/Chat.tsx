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
  askContact,
  storeConveration
} from "../actions/watson";

const Chat = (props: any) => {
  const {
    chat,
    lang,
    userMessage,
    sendMessage,
    searchGoogle,
    askCategory,
    categoryList,
    askQuestion,
    askContact,
  } = props;

  //Handle User Message
  const [message, setMessage] = useState("");
  // const [toggleSearch, setToggleSearch] = useState(false);
  // sets if thats the first question send to db - used to send catergory
  // const [firstDBQ, setFirstDBQ] = useState(true);

  // function that handles user submission
  const handleClick = (e: any) => {
    e.preventDefault();
    //check if its a category message
    if (props.toggleSearch == true && props.firstDBQ == true) {
      props.setFirstDBQ(false);
      if (message == "") {
        userMessage("No category");
        sendMessage("No category");
      }
      else {
        userMessage(message);
        sendMessage(message);
      }
    }
    else {
      if (message != "") {
        console.log(message);
        userMessage(message);
        props.toggleSearch ? sendMessage(message) : searchGoogle(message);
        setMessage("");
      }
    }
  };

  // const handleSearchToggle = (e: any) => {
  //   e.preventDefault();
  //   if (props.toggleSearch == true) {
  //     props.setFirstDBQ(true);
  //   }
  //   props.setToggleSearch(!props.toggleSearch);
  //   console.log(props.toggleSearch)
  // };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, props.toggleSearch]);

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

  const sendContact = () => {
    return (
      userMessage("Send me contact details of Fontys."),
      askContact()
    );
  }

  var input = document.getElementById("sendBtn");

  // Execute a function when the user presses a key on the keyboard
  input?.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document!.getElementById("myBtn")!.click();
    }
  });

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
    return domain.host;
  }

  // Check output on chat: link, FAQ category list, Specific category questions list, normal message
  function condition(msg: any) {
    switch (msg.type) {
      case "botLink":
        return <a target="_blank" href={msg.message}>{showLink(msg.message)}</a>;
      case "category-list":
        return (
          <div className="faq">
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
              {/* {lang == "english" && (<>Return to FAQ List</>)}
              {lang == "dutch" && (<>Terug naar veelgestelde vragen lijst</>)} */}
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
              {/* {lang == "english" && (<>Return to FAQ List</>)}
              {lang == "dutch" && (<>Terug naar veelgestelde vragen lijst</>)} */}
            </button>
          </div>
        );
      case "contact":
        return (
          <>
          <div className="bot">
            <div className="contact-detail-title">{lang == "english" && (<>FONTYS CONTACT DETAILS</>)}
            {lang == "dutch" && (<>FONTYS CONTACTGEGEVENS</>)}</div>
            <hr />
            <div className="contact-detail">
              {lang == "english" && (<><b>Fontys Phone Number</b> <br />+123456789</>)}
              {lang == "dutch" && (<><b>Fontys Telefoonnummer</b> <br />+123456789</>)}
            </div>
            <br />
            <div className="contact-detail">
              <b>Email</b> <br />fontys@fhict.nl
            </div>
          </div>
        </>
        )
      default:
        return <div> {msg.message} </div>;
    }
  }

  return (<>
    {lang == "english" && (<div className="chat">
      {/* implement toggle button.. */}
      <div className="chat-header">
        {/* Contact button */}
        <div className="contact-button" onClickCapture={sendContact}>
          <img className="phonelogo" src={require("../../img/phone.png")} />
        </div>
        <button onClick={props.askFeedback} className="feeback-btn"> Rate our service </button>
        {/* implement toggle button.. */}
        {/* <div className="flex-container">
          <div>
            <img className='search-icon' src={require('../../img/bing1.webp')} />
          </div>
          <div>
            <div className="googletext" > Bing Search </div>
          </div>
          <div className="switch-container">

            <label className="switch">
              <input onFocus={props.handleSearchToggle} type="checkbox" />
              <span className="slider round" />
              {props.toggleSearch === false
                ? <div className="off">Off</div>
                : <div className="on">On</div>}
            </label>
          </div> */}
        {/* <button className="onOffButton" onClick={handleSearchToggle}>
        {toggleSearch === false
            ? <div className="">Off</div>
            :<div>On</div> }        
          </button> */}
        {/* </div> */}
      </div>

      {/* Handle Messages */}
      <div className="history-box">

        <div className="intro-container">
          <div className="warning-container">
            <p>Please note, that this conversation will be stored</p>
          </div>
        </div>

        <div className="bot">Hi! How can I help you?</div>
        {/* <div className="bot">Please note, that this conversation will be stored.</div> */}
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
        {props.firstDBQ == true && props.toggleSearch == true
          ? <div className="bot">Enter keyword for question: </div>
          : ""
        }

        <div ref={messagesEndRef} className="chat-buffer" />
      </div>
      {/* Input Box */}
      <div>
        <form onSubmit={handleClick} className="input-box">

          {props.toggleSearch == true && props.firstDBQ == true
            ? <input
              id="chatBox"
              autoComplete="off"
              spellCheck="true"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Press search to skip.">
            </input>
            : <input
              autoComplete="off"
              id="chatBox"
              spellCheck="true"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Enter a question...">
            </input>
          }

          {props.toggleSearch == true
            ? <button id="sendBtn">Search</button>
            : <button id="sendBtn">Bing search</button>
          }

        </form>

      </div>
    </div>)
    }
    {
      lang == "dutch" && (<div className="chat">
        <div className="chat-header">
          {/* Contact button */}
          <div className="contact-button" onClickCapture={sendContact}>
            <img className="phonelogo" src={require("../../img/phone.png")} />
          </div>
          <button onClick={props.askFeedback} className="feeback-btn"> Geef ons een rating </button>

          {/* implement toggle button.. */}
        </div>
        {/* Dutch version */}

        <div className="history-box">
          <div className="intro-container">
            <div className="warning-container">
              <p>Dit gesprek wordt opgeslagen!</p>
            </div>
          </div>

          <div className="bot">Hallo! Hoe kan ik je helpen?</div>

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
          {props.firstDBQ == true && props.toggleSearch == true
            ? <div className="bot">Enter keyword for question: </div>
            : ""
          }
          <div ref={messagesEndRef} className="chat-buffer" />
        </div>
        {/* Input Box */}
        <div>
          <form onSubmit={handleClick} className="input-box">
          {props.toggleSearch == true && props.firstDBQ == true
            ? <input
              id="chatBox"
              autoComplete="off"
              spellCheck="true"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Press search to skip.">
            </input>
            : <input
              autoComplete="off"
              id="chatBox"
              spellCheck="true"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Vul een vraag in...">
            </input>
          }
            {props.toggleSearch == true
            ? <button id="sendBtn">Stuur</button>
            : <button id="sendBtn">Bing stuur</button>
          }'
          </form>
        </div>
      </div>)
    }
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
  askQuestion,
  askContact,
  storeConveration
})(Chat);


