import React from "react";
import ReactDOM from "react-dom/client";

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
