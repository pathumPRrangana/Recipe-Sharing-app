import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { seedMockData } from "./services/mockApi/mockData";

seedMockData();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</React.StrictMode>
  
);
