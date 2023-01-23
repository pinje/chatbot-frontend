// import types
import {
  INPUT_SUCCESS,
  INPUT_FAIL,
  SESSION_SUCCESS,
  SESSION_FAIL,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
  TOGGLE_FAIL,
  TOGGLE_SUCCESS,
  LANG_SUCCESS,
  LINK_SUCCESS,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_SUCCESS,
  QUESTION_SUCCESS,
  RESET_STATE,
  CONTACT_SUCCESS,
  TOPIC_SUCCESS,
  TOPIC_QUESTIONS_SUCCESS,
} from "../components/actions/types";

// initial state
const initialState = {
  messages: [],
  toggleSearch: true,
  language: "english",
  categories: [],
  quesiton: ""
};

// switch statement - update state
export default (state = initialState, action: { type: any; payload: any }) => {
  const { type, payload } = action;
  let { messages }: any = state;
  let { categories }: any = state;
  let { question }: any = state;

  switch (type) {
    case INPUT_SUCCESS:
      messages = [...messages, { message: payload, type: "user" }];
      return {
        ...state,
        messages,
      };

    case INPUT_FAIL:
      return {
        ...state,
      };

    case SESSION_SUCCESS:
      localStorage.setItem("session", payload["session_id"]);
      return {
        ...state,
      };

    case SESSION_FAIL:
      return {
        ...state,
      };

    case MESSAGE_SUCCESS:
      messages = [...messages, { message: payload, type: "bot" }];
      return {
        ...state,
        messages,
      };

    case MESSAGE_FAIL:
      return {
        ...state,
      };

    case LINK_SUCCESS:
      messages = [...messages, { message: payload, type: "botLink" }];
      return {
        ...state,
        messages,
      };

    case LANG_SUCCESS:
      return {
        ...state,
        language: payload,
      };

    case CATEGORY_LIST_SUCCESS:
      messages = [...messages, { message: payload, type: "category-list" }];
      return {
        ...state,
        messages,
      };

    case CATEGORY_SUCCESS:
      messages = [...messages, { message: payload, type: "category" }];
      return {
        ...state,
        messages,
      };
    case RESET_STATE:
      return {
        ...state,
        messages: [],
      };

    case QUESTION_SUCCESS:
      messages = [...messages, { message: payload, type: "question" }];
      return {
        ...state,
        messages,
      };

    case CONTACT_SUCCESS:
      messages = [...messages, { message: payload, type: "contact" }];
      return {
        ...state,
        messages,
      };
    case TOPIC_SUCCESS:
      categories = [{ fetchedCategories: payload, type: "category" }];
      console.log(categories);
      return {
        ...state,
        categories,
      };
    case TOPIC_QUESTIONS_SUCCESS:
      question = [{ questionList: payload, type: "question" }];
      return {
        ...state,
        question,
      };
    default:
      return {
        ...state,
      };
  }
};
