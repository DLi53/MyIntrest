import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./components/Modal/modal";
import { Provider } from "react-redux";
import configureStore from "./store";
import csrfFetch from "./store/csrf";
import * as sessionActions from "./store/session";
import * as imageActions from "./store/images"

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.imageActions = imageActions
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("root")
  );
};


if (
  sessionStorage.getItem("currentUser") === 'null' ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {

  renderApplication();
}
