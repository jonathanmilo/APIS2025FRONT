import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./screens/Home";
import Catalogo from "./screens/Catalogo";
import ProductDetail from "./screens/ProductDetail";
import Ingresar from "./screens/Ingresar";
import MiPerfil from "./screens/MiPerfil";
import Carrito from "./screens/Carrito";
import Layout from "./layouts/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Vender from "./screens/Vender";

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
          <Route path="/mi-perfil" element={<MiPerfil />} />
          <Route path="/vender" element={<Vender />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
