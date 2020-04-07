import "./styles/main.sass";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import store from "./reducers";
import {Provider} from "react-redux";

import App from "./components/App";



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
