// import types
import {
  INPUT_SUCCESS,
  INPUT_FAIL,
  SESSION_SUCCESS,
  SESSION_FAIL,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
  LINK_SUCCESS,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_SUCCESS,
  QUESTION_SUCCESS,
  RESET_STATE,
  CONTACT_SUCCESS,
  TOPIC_SUCCESS,
  TOPIC_QUESTIONS_SUCCESS,
  PREVENT_INPUT
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
    const res = (await (
      await axiosInstance.get(`/search?q=${message}`)
    ).data);

    if (res.links.length > 0) {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: "Here are our top results for " + message + ":",
      });

      res.links.forEach((link: any, index: any) => {
        const linkTitle = res.titles[index];
        const linkObject = {link, linkTitle};
        dispatch({
          type: LINK_SUCCESS,
          payload: linkObject,
        });
      });
    }
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};

export const categoryList = () => async (dispatch: any) => {
  try {
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: "category list selected",
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};

export const askCategory = (category: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: CATEGORY_SUCCESS,
      payload: category,
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};

export const askQuestion = (question: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: QUESTION_SUCCESS,
      payload: question,
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};

export const askContact = () => async (dispatch: any) => {
  try {
    dispatch({
      type: CONTACT_SUCCESS,
      payload: "asked for contact",
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};

export const clearStore = () => {
  return {
    type: RESET_STATE,
    payload: null
  };
}


export const storeConversation = (messages: any, rating: number) => () => {
  try {
    const body = { messages: messages, rating: rating };
    axiosInstance.post("/log", body).catch((err) => { console.log(err) })
  } catch (err) {
    console.log(err)
  }
};

// fetch topics

export const fetchTopics = () => async (dispatch: any) => {
  try {
    await axiosInstance.get('/faq-topics').then((res: any) => {
      res.data.topics.forEach((topic: any) => {
        axiosInstance.get('/faq-questions/topic',
          { params: { topicId: topic.id } })
          .then((res: any) => {
            topic.questions = res.data.questions;
          })
      })
      dispatch({
        type: TOPIC_SUCCESS,
        payload: res.data.topics,
      });
    })
  }
  catch (err) {
    console.error(err);
  }

}

// fetch primary questions with children

export const fetchQuestionsForTopic = (topicId: number) => async (dispatch: any) => {
  try {
    console.log(topicId)
    const body = {
      data: {
        topicId: topicId
      }
    }
    await axiosInstance.get('/faq-questions/topic',
      { params: { topicId: topicId } })
      .then((res: any) => {
        console.log(res.data.questions);
        dispatch({
          type: TOPIC_QUESTIONS_SUCCESS,
          payload: res.data.questions,
        });
      })
  }
  catch (err) {
    console.error(err);
  }
}

// function that handles not allowed input such as "/"
export const preventInput = (message: string) => async (dispatch: any) => {
  try {
    dispatch({ type: PREVENT_INPUT, payload: message });
  } catch (err) {
    dispatch({ type: INPUT_FAIL });
  }
};
