import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Flowbite
import "flowbite";
import "flowbite-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
