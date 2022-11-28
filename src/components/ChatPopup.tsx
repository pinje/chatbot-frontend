import { popupState } from "../models/popupState";
import "./ChatPopup.css";
import React, { useEffect, useState } from "react";

//import settings
import Settings from "./Settings";

// import redux components
import { Provider } from "react-redux";
import store from "../store";

// import chat component
import Chat from "./chat/Chat";

// import action
import { clearStore, createSession } from "./actions/watson";

// import axios
import axios from "axios";
import { RESET_STATE } from "./actions/types";

if (localStorage.session) {
  delete axios.defaults.headers.common["session_id"];
  axios.defaults.headers.common["session_id"] = localStorage.session;
} else {
  delete axios.defaults.headers.common["session_id"];
}

function ChatPopup(props: popupState) {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  useEffect(() => {
    // check if there's a session
    if (!localStorage.session) {
      // create
      createSession();
    }
  });

  return (
    <Provider store={store}>
      <div className="form-container">
        <div className="popup-header">
          <img className="bot-icon" src={require("../img/chat-profile.jpg")} />
          <button onClick={() => props.setIsOpen(false)}> X </button>

          <button
            onClick={() => {
              setOpenSettings(!openSettings);
            }}
          >
            <img className="setting-icon" src={require("../img/setting.png")} />
          </button>
          {openSettings && <Settings />}
          {/* this doesn't get called for some reason idk */}
          <button onClick={() => clearStore}>
            <img
              className="refresh-icon"
              src={require("../img/refresh.png")}
            ></img>
          </button>

          <div className="popup-header-box">
            <div className="popup-header-title">David</div>
            <div className="popup-header-description">Fontys Help-Desk</div>
          </div>
        </div>
        <div className="title">
          <Chat />
        </div>
      </div>
    </Provider>
  );
}

export default ChatPopup;
