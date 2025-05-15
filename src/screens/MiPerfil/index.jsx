import { useNavigate } from "react-router-dom";
import { useValidacion } from "@src/contexts/AuthContext";
import { useProductos } from "@src/contexts/ProductContext";
import ListaProductos from "@src/components/ListaProductos";
import { Avatar, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect, useCallback } from "react";
import { fetchUserProducts } from "@src/api/products.js";

import { filtrarPorNombre } from "@src/utils/filtrarProductos";
import SearchBar from "@src/components/SearchBar";

const MiPerfil = () => {
  const navigate = useNavigate();

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productosUsuario, setProductosUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useValidacion();

  // Función para cargar/recargar productos del usuario
  const cargarProductosUsuario = useCallback(async () => {
    if (user && user.id) {
      setLoading(true);
      try {
        const response = await fetchUserProducts(user.id);
        setProductosUsuario(response.data);
        // Si hay productos filtrados, actualizar también esa lista
        if (productosFiltrados.length > 0) {
          setProductosFiltrados(
            filtrarPorNombre(
              response.data,
              document.querySelector('input[type="search"]')?.value || ""
            )
          );
        }
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError("No se pudieron cargar tus productos. Intenta nuevamente.");
        setLoading(false);
      }
    }
  }, [user, productosFiltrados.length]);

  // Cargar productos del usuario al montar el componente
  useEffect(() => {
    cargarProductosUsuario();
  }, [cargarProductosUsuario]);

  const handleRemoveProduct = (productId) => {
    // Actualizar la lista de productos del usuario
    setProductosUsuario((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    // Actualizar la lista de productos filtrados si es necesario
    if (productosFiltrados.length > 0) {
      setProductosFiltrados((prevFiltered) =>
        prevFiltered.filter((product) => product.id !== productId)
      );
    }
  };

  const handleBuscar = (termino) => {
    if (!termino) return setProductosFiltrados([]);
    setProductosFiltrados(filtrarPorNombre(productosUsuario, termino));
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

        <div className="flex items-center justify-center"><SearchBar buscar={handleBuscar} /></div>
      </div>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ListaProductos
          titulo={"Mis publicaciones"}
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
