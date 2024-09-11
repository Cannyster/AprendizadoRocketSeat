import { App } from "../src/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { enableMSW } from "./api/mocks";

enableMSW().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
