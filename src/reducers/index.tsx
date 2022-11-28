// import dependencies
import { combineReducers } from "redux";
import { RESET_STATE } from "../components/actions/types";

// import reducers
import watson from "./watson";

// export combined reducers
const appReducer = combineReducers({ watson });

export const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default appReducer;
