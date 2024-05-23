import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/scss/global.scss";

import {
  App,
  ArticlesProvider,
  CurrentIndexProvider,
  WindowWidthProvider,
} from "./app";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <WindowWidthProvider>
      <ArticlesProvider>
        <CurrentIndexProvider>
          <App />
        </CurrentIndexProvider>
      </ArticlesProvider>
    </WindowWidthProvider>
  </StrictMode>
);
