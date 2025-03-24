import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome.tsx"
import RingCarousel from '../components/RingCarrossel/RingCarousel.tsx'
import CreateRing from '../pages/Create/CreateRing'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota raiz para a tela de boas-vindas */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/aneis" element={<RingCarousel />} />
        <Route path='/create' element={<CreateRing />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes