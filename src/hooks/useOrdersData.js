import { useEffect, useState } from "react";
import { useProductos } from "../contexts/ProductContext";
import { useUsuario } from "../contexts/UserContext";
import { fetchAllOrders } from "../api/orders";

export function useOrdersData() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productos } = useProductos();
  const { usuario } = useUsuario();

  const cargarOrdenes = async () => {
    setLoading(true);
    try {
      const res = await fetchAllOrders();
      const userOrders = usuario
        ? res.data.filter((order) => order.userId === usuario.id)
        : res.data;
      setOrders(userOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ordenesConDetalles = orders.map((order) => ({
    ...order,
    products: order.products.map((item) => {
      const producto = productos.find(
        (p) => String(p.id) === String(item.productId)
      );
      return {
        ...item,
        nombre: producto?.title || "Producto no encontrado",
        imagen: producto?.images?.[0]?.url || "imagen-no-disponible.jpg",
      };
    }),
  }));

  useEffect(() => {
    cargarOrdenes();
  }, [usuario]);

  return {
    orders: ordenesConDetalles,
    loading,
    error,
    recargar: cargarOrdenes,
  };
}
