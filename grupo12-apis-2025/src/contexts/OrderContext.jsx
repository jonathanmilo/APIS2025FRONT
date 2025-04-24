import { createContext, useContext, useEffect, useState } from "react";
import { fetchOrders } from "../api/api";
import { useProductos } from "./ProductContext";
import { useUsuario } from "./UserContext";

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productos } = useProductos();
  const { usuario } = useUsuario();

  const cargarOrdenes = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();

      const userOrders = usuario
        ? data.filter((order) => order.userId === usuario._id)
        : data;

      setOrders(userOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getOrdenesConDetalles = () => {
    return orders.map((order) => ({
      ...order,
      products: order.products.map((item) => {
        const producto = productos.find((p) => String(p._id) === String(item.productId));
        return {
          ...item,
          nombre: producto?.title || "Producto no encontrado",
          imagen: producto?.images?.[0]?.url || "imagen-no-disponible.jpg",
        };
      }),
    }));
  };

  useEffect(() => {
    cargarOrdenes();
  }, [usuario]);

  return (
    <OrderContext.Provider
      value={{
        orders: getOrdenesConDetalles(),
        loading,
        error,
        recargar: cargarOrdenes,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
