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
  storeConversation,
  preventInput
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
    preventInput
  } = props;

  // handle user message
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
 
  // function that handles user submission
  const handleClick = (e: any) => {
    e.preventDefault();
    //check if its a category message
    if (props.toggleSearch === true && props.firstDBQ === true) {
      props.setFirstDBQ(false);
      if (message === "") {
        userMessage("No category");
        sendMessage("No category");
      }
      else {
        userMessage(message);
        sendMessage(message);
      }
    }
    else {
      if (message !== "") {
        // prevent "/" input
        if (message.includes("/")) {
          preventInput("\"/\" input not allowed. Try to rewrite your question.");
        } else {
          userMessage(message);
          props.toggleSearch ? sendMessage(message) : searchGoogle(message);
          setMessage("");
        }
      }
    }
  };

  // smooth scrolling
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

  // fontys staff contact button
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

  // Check output on chat: link, FAQ category list, Specific category questions list, normal message
  function condition(msg: any) {
    switch (msg.type) {
      case "botLink":
        return <a target="_blank" href={msg.message}>{msg.title}</a>;

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
            <button className="goback-button" onClickCapture={returnCategoryMenu}>
              <img className="arrow-left" src={require("../../img/arrow-left.png")} alt="" />
            </button>
          </div>
        );

      case "question":
        return (
          <div className="bot">
            <Question question={msg.message} lang={lang} />
            <button className="goback-button" onClickCapture={returnCategoryMenu}>
              <img className="arrow-left" src={require("../../img/arrow-left.png")} alt="" />
            </button>
          </div>
        );

      case "contact":
        return (
          <div className="bot">
            <div className="contact-detail-title">{lang === "english" && (<>FONTYS CONTACT DETAILS</>)}
            {lang === "dutch" && (<>FONTYS CONTACTGEGEVENS</>)}</div>
            <hr />
            <div className="contact-detail">
              {lang === "english" && (<><b>Fontys Phone Number</b> <br />+123456789</>)}
              {lang === "dutch" && (<><b>Fontys Telefoonnummer</b> <br />+123456789</>)}
            </div>
            <br />
            <div className="contact-detail">
              <b>Email</b> <br />fontys@fhict.nl
            </div>
          </div>
        )

      default:
        return <div> {msg.message} </div>;
    }
  }

  return (<>
    {lang === "english" && (<div className="chat">
      {/* Implement toggle button */}
      <div className="chat-header">
        {/* Contact button */}
        <div className="contact-button" onClickCapture={sendContact}>
          <img className="phonelogo" src={require("../../img/phone.png")} alt=""/>
        </div>
        <button onClick={props.askFeedback} className="feeback-btn"> Rate our service </button>
      </div>

      {/* Handle Messages */}
      <div className="history-box">

        <div className="intro-container">
          <div className="warning-container">
            <p>Please note, that this conversation will be stored</p>
          </div>
        </div>

        <div className="bot">Hi! How can I help you?</div>

        {/* Showing FAQ by categories*/}
        <div className="faq">
          <Category clickCategory={clickCategory} lang={lang} />
        </div>

        {/* Display Chat */}
        {chat.length === 0 ? "" : chat.map((msg: any) => (
          <div className={msg.type}>{condition(msg)}</div>
        ))}
        
        {props.firstDBQ === true && props.toggleSearch === true
          ? <div className="bot">Enter keyword for question: </div>
          : ""
        }

        <div ref={messagesEndRef} className="chat-buffer" />
      </div>

      {/* Input Box */}
      <div>
        <form onSubmit={handleClick} className="input-box">

          {props.toggleSearch === true && props.firstDBQ === true
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

          {props.toggleSearch === true
            ? <button id="sendBtn">Search</button>
            : <button id="sendBtn">Bing search</button>
          }

        </form>
      </div>
    </div>)
    }
    {
      lang === "dutch" && (<div className="chat">
        {/* Implement toggle button.. */}
        <div className="chat-header">
          {/* Contact button */}
          <div className="contact-button" onClickCapture={sendContact}>
            <img className="phonelogo" src={require("../../img/phone.png")} alt=""/>
          </div>
          <button onClick={props.askFeedback} className="feeback-btn"> Geef ons een rating </button>
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
          {chat.length === 0 ? "" : chat.map((msg: any) => (
            <div className={msg.type}>{condition(msg)}</div>
          ))}

          {props.firstDBQ === true && props.toggleSearch === true
            ? <div className="bot">Enter keyword for question: </div>
            : ""
          }

          <div ref={messagesEndRef} className="chat-buffer" />
        </div>

        {/* Input Box */}
        <div>
          <form onSubmit={handleClick} className="input-box">
            {props.toggleSearch === true && props.firstDBQ === true
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
            
            {props.toggleSearch === true
              ? <button id="sendBtn">Stuur</button>
              : <button id="sendBtn">Stuur Bing</button>
            }
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
  storeConversation,
  preventInput
})(Chat);