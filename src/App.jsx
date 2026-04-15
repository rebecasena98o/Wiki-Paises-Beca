import RoutesApp from "./routes/RoutesApp";
import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <RoutesApp toggleDarkMode={toggleDarkMode} isDark={darkMode} />
  );
}

export default App;