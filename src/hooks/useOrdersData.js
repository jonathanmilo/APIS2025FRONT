import { useEffect, useState } from "react";
import { useProductos } from "@src/contexts/ProductContext";
import { useUsuario } from "@src/contexts/UserContext";
import { fetchAllOrders } from "@src/api/orders";

export function useOrdersData() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productos } = useProductos();
  const { usuario } = useUsuario();

  const cargarOrdenes = async () => {
    setLoading(true);
    console.log("usuario:",usuario)
    try {

      const response = await fetch(`http://localhost:8080/carts/user/${user.user_Id}`, {
      
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+user.token, // Asegúrate de que el token esté en el contexto de usuario          
          userId: usuario ? usuario.id : null, // Enviar el ID del usuario si está disponible
        },
        
      });




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
