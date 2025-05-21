// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";  // Update path to use ./app/App.tsx
import "@/app/globals.css";   // Import global styles from the 'app' folder

const root = ReactDOM.createRoot(document.getElementById("app")!);

root.render(<App />);
