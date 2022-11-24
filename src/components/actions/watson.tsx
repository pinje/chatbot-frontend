// import types
import {
  INPUT_SUCCESS,
  INPUT_FAIL,
  SESSION_SUCCESS,
  SESSION_FAIL,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
  LINK_SUCCESS,
} from "../actions/types";

// import axios
import axiosInstance from "../../config/AxiosConfig";

// function that handles user messages
export const userMessage = (message: string) => async (dispatch: any) => {
  try {
    dispatch({ type: INPUT_SUCCESS, payload: message });
  } catch (err) {
    dispatch({ type: INPUT_FAIL });
  }
};

// create a session - API call
export const createSession = () => async (dispatch: any) => {
  try {
    const res = await axiosInstance.get("/responses");
    dispatch({ type: SESSION_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: SESSION_FAIL });
  }
};

// sends the message to the bot - API call
export const sendMessage = (message: string) => async (dispatch: any) => {
  try {
    const body = { question: message };
    const res = axiosInstance.post("/responses", body);
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: (await res).data.response,
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};

export const searchGoogle = (message: string) => async (dispatch: any) => {
  try {
    const res = await (await axiosInstance.get(`/search?q=${message}`)).data.links as Array<string>;
    if(res.length >0)
    {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: "Here are our top results for " + message + ":"
      });

    res.forEach((link: any) => {
      dispatch({
        type: LINK_SUCCESS,
        payload: link
      });
    });
  }
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};
