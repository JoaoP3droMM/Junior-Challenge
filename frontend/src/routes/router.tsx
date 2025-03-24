import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota raiz para a tela de boas-vindas */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes