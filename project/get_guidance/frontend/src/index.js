import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import customTheme from "./utils/theme";
import { ChakraProvider } from "@chakra-ui/react";
import TimeAgo from "javascript-time-ago";
import store from "./app/store";
import en from "javascript-time-ago/locale/en.json";
import { Provider } from "react-redux";
TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={customTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
