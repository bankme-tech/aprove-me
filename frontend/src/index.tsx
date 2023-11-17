import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ResetStyle from "./styles/ResetStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ResetStyle />
    <App />
  </React.StrictMode>
);