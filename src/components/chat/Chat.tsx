import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Chat.css";

// import action
import { userMessage, sendMessage, searchGoogle } from "../actions/watson";

const Chat = ({
  chat,
  userMessage,
  sendMessage,
  searchGoogle,
}: {
  chat: any;
  userMessage: any;
  sendMessage: any;
  searchGoogle: any;
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

  return (
    <div className="chat">
      {/* sorry about this being so ugly guys lol, I know you'll take care of it, thanks in advance - Tsvetislav */}
      <button onClick={handleSearchToggle}>Toggle Search</button>
      {/* Handle Messages */}
      <div className="history-box">
        <div className="intro-container">
          <p>Intro</p>
        </div>
        <div className="bot">Hi! How can I help you?</div>
        {chat.length === 0
          ? ""
          : chat.map((msg: any) => (
              <div className={msg.type}>{msg.message}</div>
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
          placeholder="Enter a question...">         
        </input>
        <button> Send         
          </button> 
       
        

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
})(Chat);
