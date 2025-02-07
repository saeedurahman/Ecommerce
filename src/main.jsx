import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { AppProvider } from "./lib/store/context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter basename="/Ecommerce">
        <Toaster richColors position="bottom-left" />
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
