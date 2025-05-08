import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoutes from "./screens/utils/ProtectedRoutes";

import Home from "./screens/Home";
import Catalogo from "./screens/Catalogo";
import ProductDetail from "./screens/ProductDetail";
import Ingresar from "./screens/Ingresar";
import MiPerfil from "./screens/MiPerfil";
import Carrito from "./screens/Carrito";
import Vender from "./screens/Vender";
import Configuracion from "./screens/Configuracion";
import Compras from "./screens/Compras";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:id" element={<ProductDetail />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/carrito" element={<Carrito />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/mis-compras" element={<Compras />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/vender" element={<Vender />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
