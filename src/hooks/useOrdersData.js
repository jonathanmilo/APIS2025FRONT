import { useEffect, useState } from "react";
import { useProductos } from "@src/contexts/ProductContext";
import { useValidacion } from "../contexts/AuthContext";

export function useOrdersData() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productos } = useProductos();
  const { user, token } = useValidacion();

  const cargarOrdenes = async () => {
    setLoading(true);
    console.log("usuario en useOrdersData:", user);
    try {
      const response = await fetch(
        `http://localhost:8080/carts/user/${user.user_Id}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrders(data.filter(order => order.userId === user.user_Id));
      } else if (response.status === 404) {
        console.warn(`No hay órdenes`);
        setOrders([]); // opcional, limpiar si no hay
      } else {
        console.error(`Error inesperado al obtener órdenes. Código: ${response.status}`);
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const ordenesConDetalles = orders.map(order => ({
    ...order,
    products: order.products.map(item => {
      const producto = productos.find(
        p => String(p.id) === String(item.productId)
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
  }, [user]);

  return {
    orders: ordenesConDetalles,
    loading,
    error,
    recargar: cargarOrdenes,
  };
}
