import { useNavigate } from "react-router-dom";
import { useValidacion } from "@src/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { fetchProductsByUserId } from "@src/api/products.js";
import { filtrarPorNombre } from "@src/utils/filtrarProductos";
import ListaProductos from "@src/components/ListaProductos";
import SearchBar from "@src/components/SearchBar";
import { Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

const MiPerfil = () => {
  const navigate = useNavigate();
  const { user } = useValidacion();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productosUsuario, setProductosUsuario] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBuscar = (termino) => {
    setTerminoBusqueda(termino);
    if (!termino || productosUsuario.length === 0) {
      setProductosFiltrados([]);
    } else {
      setProductosFiltrados(filtrarPorNombre(productosUsuario, termino));
    }
  };

  const cargarProductosUsuario = useCallback(async () => {
    if (user?.id) {
      setLoading(true);
      try {
        const response = await fetchProductsByUserId(user.id);
        setProductosUsuario(response.data);

        if (terminoBusqueda) {
          setProductosFiltrados(
            filtrarPorNombre(response.data, terminoBusqueda)
          );
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError("No se pudieron cargar tus productos. Intenta nuevamente.");
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    cargarProductosUsuario();
  }, [cargarProductosUsuario]);

  const handleRemoveProduct = (productId) => {
    setProductosUsuario((prev) => prev.filter((p) => p.id !== productId));
    if (productosFiltrados.length > 0) {
      setProductosFiltrados((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  if (!user) return null;

  return (
    <section className="m-5 lg:m-5 p-5 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-4 mb-5">
        <div className="flex gap-3 items-center justify-center sm:justify-start">
          <p className="text-2xl font-bold text-black dark:text-white uppercase">
            Mis publicaciones
          </p>
          <Tooltip title="Nueva publicación" arrow>
            <button
              onClick={() => navigate("/vender")}
              className="border-2 rounded-full border-primary p-1 text-xl text-primary hover:bg-gray-100 dark:hover:bg-black cursor-pointer"
            >
              <FaPlus />
            </button>
          </Tooltip>
        </div>

        <div className="flex items-center justify-center">
          <SearchBar buscar={handleBuscar} />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-black dark:text-white">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-red-500 dark:text-white">{error}</p>
      ) : (
        <ListaProductos
          titulo="Mis publicaciones"
          productos={
            productosFiltrados.length ? productosFiltrados : productosUsuario
          }
          onRemoveProduct={handleRemoveProduct}
          onUpdateStock={cargarProductosUsuario}
        />
      )}
    </section>
  );
};

export default MiPerfil;
