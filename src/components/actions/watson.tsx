// import types
import {
    INPUT_SUCCESS, 
    INPUT_FAIL, 
    SESSION_SUCCESS,
    SESSION_FAIL,
    MESSAGE_SUCCESS,
    MESSAGE_FAIL } from "../actions/types";

// import axios
import axios from "axios"

// function that handles user messages
export const userMessage = (message: any) => async (dispatch:any) => {
    try {
        dispatch({ type: INPUT_SUCCESS, payload: message });
    } catch (err) {
        dispatch({type: INPUT_FAIL});
    }
};

// create a session - API call
export const createSession = () => async (dispatch:any) => {
    try {
        const res = await axios.get("http://localhost:8080/responses")
        dispatch({type:SESSION_SUCCESS, payload:res.data});
    } catch (err) {
        dispatch({type:SESSION_FAIL});
    }
}

// sends the message to the bot - API call
export const sendMessage = (message:any) => async (dispatch:any) => {
    try {
        const body = {question:message};
        const res = axios.post("http://localhost:8080/responses", body);
        dispatch({type:MESSAGE_SUCCESS, payload:(await res).data.output.generic[0].text});
    } catch (err) {
        dispatch({type:MESSAGE_FAIL});
    }
}