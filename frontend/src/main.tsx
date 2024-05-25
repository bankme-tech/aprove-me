import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/index.tsx";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);

