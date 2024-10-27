import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./socket/SocketContext.tsx";
import { Buffer } from "buffer";
import process from "process";
import App from "./App.tsx";
import "./index.css";

window.Buffer = window.Buffer || Buffer;
window.process = window.process || process;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </BrowserRouter>
  </StrictMode>
);
