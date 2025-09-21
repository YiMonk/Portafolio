import React, { useState } from "react";
import { Home } from "./app/Home";
import "./styles/global.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        (darkMode
          ? "dark bg-gradient-to-t to-slate-900 from-20% via-slate-800 via-60% from-slate-700 to-90%"
          : "bg-gradient-to-t to-slate-100 from-20% via-slate-300 via-60% from-slate-400 to-90%") +
        " min-h-screen transition-colors duration-300"
      }
    >
      <Home setDarkMode={setDarkMode} darkMode={darkMode} />
    </div>
  );
}

export default App;
