import { useState } from "react";
import { connect } from "react-redux";
import "./Chat.css";

// import action
import { userMessage, sendMessage } from "../actions/watson";

const Chat = ({
  chat,
  userMessage,
  sendMessage,
}: {
  chat: any;
  userMessage: any;
  sendMessage: any;
}) => {
  //Handle User Message
  const [message, setMessage] = useState("");

  // function that handles user submission
  const handleClick = async (e: { keyCode: any; which: any }) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      console.log(message);
      userMessage(message);
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat">
      {/* Handle Messages */}
      <div className="history-box">
        {chat.length === 0
          ? ""
          : chat.map((msg: any) => (
              <div className={msg.type}>{msg.message}</div>
            ))}
      </div>
      {/* Input Box */}
      <div className="input-box">
        <input
          id="chatBox"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleClick}
          value={message}
          placeholder="Enter a question..."
        ></input>
        <img className="send-icon" src={require("../../img/sendicon.png")} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: { watson: { messages: any } }) => ({
  chat: state.watson.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);
