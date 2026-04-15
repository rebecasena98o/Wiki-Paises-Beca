import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

function AppRoutes({ toggleDarkMode, isDark }) { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home toggleDarkMode={toggleDarkMode} isDark={isDark} />} />
        <Route path="/country/:code" element={<Detail toggleDarkMode={toggleDarkMode} isDark={isDark} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;