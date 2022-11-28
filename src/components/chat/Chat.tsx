import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Chat.css";
import Category from "./Category";
import Questions from "./Questions";
import Question from "./Question";

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
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion,
}: {
  chat: any;
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

  // Check output on chat: link, FAQ category list, Specific category questions list, normal message
  function condition(msg: any) {
    switch (msg.type) {
      case "botLink":
        return <a href={msg.message}>{msg.message}</a>;
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
      default:
        return <div> {msg.message} </div>;
    }
  }

  return (
    <div className="chat">
      <button className="google-button" onClick={handleSearchToggle}>
        {toggleSearch === false ? (
          <div>Google search</div>
        ) : (
          <div>Bot search</div>
        )}
      </button>
      {/* Handle Messages */}
      <div className="history-box">
        <div className="intro-container">
          <p>Intro</p>
        </div>
        <div className="bot">Hi! How can I help you?</div>

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
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Enter a question..."
          ></input>
          <button> Send </button>
          {/* <img className="send-icon" src={require("../../img/sendicon.png")} /> */}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { watson: { messages: any } }) => ({
  chat: state.watson.messages,
});

export default connect(mapStateToProps, {
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion,
})(Chat);
