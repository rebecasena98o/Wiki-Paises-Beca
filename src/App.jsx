import RoutesApp from "./routes/RoutesApp";
import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <RoutesApp toggleDarkMode={toggleDarkMode} isDark={darkMode} />
  );
}

export default App;