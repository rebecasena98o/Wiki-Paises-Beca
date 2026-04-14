import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

function AppRoutes() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;