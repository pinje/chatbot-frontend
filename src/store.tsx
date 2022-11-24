// import dependencies
import {configureStore} from "@reduxjs/toolkit";
// import {createStore, legacy_createStore, applyMiddleware} from "redux"; // OUTDATED DO NOT USE
import thunk from "redux-thunk";
import combineReducers from "./reducers";

// connect the application to redux devtools

// setup initial state
const initialState = {};

// import middleware
const middleware = [thunk];

// setup store

const store = configureStore({
    reducer: combineReducers,
    middleware: middleware,
    preloadedState: initialState
})

// export store
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch