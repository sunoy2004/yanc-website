import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";

// Ensure the app uses dark theme by default and does not follow the system theme.
if (typeof window !== "undefined") {
  // Add the class immediately to avoid a flash of light theme.
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <App />
  </ThemeProvider>
);
