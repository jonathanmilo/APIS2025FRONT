import { useValidacion } from "@src/contexts/AuthContext";
import { fetchOrdersByUserId } from "@src/api/orders";
import { useState, useEffect } from "react";

export default function Compras() {
  const { user } = useValidacion();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchOrdersByUserId(user.id)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.id]);

  return (
    <div className="min-h-screen p-6 lg:m-5">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-6 uppercase">
        Últimas Compras
      </h1>

      {orders && orders.length > 0 ? (
        orders.map((compra) => (
          <div key={compra.id} className="bg-white dark:bg-black shadow-md p-4 mb-6">
            <div className="text-black dark:text-white font-semibold mb-2">
              Compra #{compra.id} —{" "}
              {new Date(compra.createdAt).toLocaleDateString()}
            </div>

            <div className="space-y-4">
              {compra.products.map((p, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-gray-50 dark:bg-[color:var(--color-gray)] p-3 border-1 border-gray-200 dark:border-[color:var(--color-light-gray)]"
                  >
                    <img
                      src={
                        p.image ||
                        "/imagen-no-disponible.jpg"
                      }
                      alt={p.title || "Producto"}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="text-black dark:text-white">
                      <p className="font-medium">
                        {p.title || "Producto desconocido"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-white">
                        x{p.quantity} — ${p.unitPrice} c/u
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="text-right font-bold text-black dark:text-white mt-2">
                Total: ${compra.subtotal}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-white">No hay compras registradas.</p>
      )}
    </div>
  );
}
