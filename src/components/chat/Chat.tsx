import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Chat.css";
import Category from "./Category";
import Questions from "./Questions";
import Question from "./Question";
import "./Switch.css";
import axiosInstance from "../../config/AxiosConfig";

// import action
import {
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion,
  askContact,
  fetchTopics,
  preventInput
} from "../actions/watson";

const Chat = (props: any) => {
  const {
    chat,
    lang,
    categories,
    userMessage,
    sendMessage,
    searchGoogle,
    askCategory,
    categoryList,
    askQuestion,
    askContact,
    fetchTopics,
    preventInput
  } = props;

  // handle user message
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // function that handles user submission
  const handleClick = (e: any) => {
    e.preventDefault();

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
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, props.toggleSearch]);

  useEffect(() => {
    fetchTopics();
  }, [])

  /*  When a category is chosen from the list,
      a message is sent as a user that asks the question (to personalize the experience),
      then the bot replies with Q&A of that topic */
  const clickCategory = (msg: any) => {
    userMessage("Let me see FAQs about " + msg.description);
    askCategory(msg);
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
  const clickQuestion = (question: any) => {
    return userMessage(question.questionText), askQuestion(question);
  };

  // Return button to see FAQ Category List
  const returnCategoryMenu = () => {
    categoryList();
  };


  const returnPrevios = (msg: any) => {
    // get question by id = parent id 
    console.log(msg);
    if (msg.message.topicId != null) {
      //get from stored      
      askCategory(categories[0].fetchedCategories.filter((cat: any) => {
        return cat.id == msg.message.topicId.id
      })[0]);
    }
    else {
      axiosInstance.get('/faq-questions/id', { params: { id: msg.message.parentId } }).then((res) => {
        console.log("res")
        console.log(res.data)
        askQuestion(res.data);
      }).catch((err) => { console.error(err) });

    }
  }
  // Check output on chat: link, FAQ category list, Specific category questions list, normal message
  function filterMessageType(msg: any) {
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
        console.log(msg.message)
        return (
          <div className="bot">
            <Questions category={msg} clickQuestion={clickQuestion} lang={lang} />
            <button
              className="goback-button"
              onClickCapture={returnCategoryMenu}
            >
              <img
                className="arrow-left"
                src={require("../../img/arrow-left.png")}
              />{" "}

            </button>
          </div>
        );

      case "question":
        console.log(msg)
        return (
          <div className="bot">
            <Question question={msg} lang={lang} clickQuestion={clickQuestion} />
            <button
              className="goback-button"
              onClickCapture={() => returnPrevios(msg)}
            >
              <img
                className="arrow-left"
                src={require("../../img/arrow-left.png")}
              />{" "}

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
                {lang == "english" && (<><b>Fontys Phone Number</b> <br />+31 8850 75277</>)}
                {lang == "dutch" && (<><b>Fontys Telefoonnummer</b> <br />+31 8850 75277</>)}
              </div>
              <br />
              <div className="contact-detail">
                <b>Email</b> <br />studyict@fontys.nl
              </div>
            </div>
          </>
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
          <img className="phonelogo" src={require("../../img/phone.png")} alt="" />
        </div>
        <button onClick={props.askFeedback} className="feeback-btn"> Rate our service </button>
      </div>

      {/* Handle Messages */}
      <div className="history-box">
        <div className="bot">Hi! How can I help you?</div>

        {/* Showing FAQ by categories*/}
        <div className="faq">
          <Category clickCategory={clickCategory} lang={lang} />
        </div>

        {/* Display Chat */}
        {chat.length === 0 ? "" : chat.map((msg: any) => (
          <div className={msg.type}>{filterMessageType(msg)}</div>
        ))}

        <div ref={messagesEndRef} className="chat-buffer" />
      </div>

      {/* Input Box */}
      <div>
        <form onSubmit={handleClick} className="input-box">
          <input
            autoComplete="off"
            id="chatBox"
            spellCheck="true"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Enter a question...">
          </input>

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
            <img className="phonelogo" src={require("../../img/phone.png")} alt="" />
          </div>
          <button onClick={props.askFeedback} className="feeback-btn"> Geef ons een rating </button>
        </div>

        {/* Dutch version */}
        <div className="history-box">


          <div className="bot">Hallo! Hoe kan ik je helpen?</div>

          {/* Showing FAQ by categories*/}
          <div className="faq">
            <Category clickCategory={clickCategory} lang={lang} />
          </div>

          {/* Display Chat */}

          {chat.length === 0 ? "" : chat.map((msg: any) => (
            <div className={msg.type}>{filterMessageType(msg)}</div>
          ))}

          <div ref={messagesEndRef} className="chat-buffer" />
        </div>

        {/* Input Box */}
        <div>
          <form onSubmit={handleClick} className="input-box">
            <input
              autoComplete="off"
              id="chatBox"
              spellCheck="true"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Vul een vraag in...">
            </input>

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

const mapStateToProps = (state: { watson: { messages: any, language: any, categories: any, question: any } }) => ({
  chat: state.watson.messages,
  lang: state.watson.language,
  categories: state.watson.categories,
  question: state.watson.question
});

export default connect(mapStateToProps, {
  userMessage,
  sendMessage,
  searchGoogle,
  askCategory,
  categoryList,
  askQuestion,
  askContact,
  fetchTopics,
  preventInput
})(Chat);
