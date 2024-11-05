import { BookProvider } from "@/context/BookProvider";
import AppRouter from "@/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BookProvider>
      <AppRouter />
    </BookProvider>
  </StrictMode>
);
