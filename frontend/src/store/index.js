import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import imagesReducer from "./images";
import usersReducer from "./users";
import boardsReducer from "./boards";
import pinsReducer from "./pins";
import commentsReducer from "./comments";
import followsReducer from "./follows";



const rootReducer = combineReducers({ 
  session: sessionReducer,
  users: usersReducer,
  images: imagesReducer,
  boards: boardsReducer,
  pins: pinsReducer,
  comments: commentsReducer,
  following: followsReducer
 });

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
