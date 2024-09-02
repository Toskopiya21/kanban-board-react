import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
// import App from "./App";
// import AppWithReducers from "./AppWithReducers";
import AppWithRedux from "./AppWithRedux";
import { Provider } from "react-redux";
// import reportWebVitals from './reportWebVitals';
import { store } from "./state/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <App /> */}
      {/* <AppWithReducers /> */}
      <AppWithRedux />
    </React.StrictMode>
  </Provider>
);

// reportWebVitals();
