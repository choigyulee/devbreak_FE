import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalstyles.jsx";

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  // <React.StrictMode>
  <>
    <Global styles={globalStyles} />
    <App />
  </>
  // </React.StrictMode>
);
