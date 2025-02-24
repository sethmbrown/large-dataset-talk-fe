import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProblematicPage } from "./pages/problematic-page.tsx";
import { ImprovedPage } from "./pages/improved-page.tsx";
import { ExplanationPage } from "./pages/ExplanationPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ExplanationPage />} />
          <Route path="/problematic" element={<ProblematicPage />} />
          <Route path="/improved" element={<ImprovedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
