import { Providers } from "contexts/Providers";
import React from "react";
import ReactDOM from "react-dom/client";
import "./global/input.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
