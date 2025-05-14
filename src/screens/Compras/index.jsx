import { useValidacion } from "@src/contexts/AuthContext";
import { useOrdersData } from "@src/hooks/useOrdersData";
import { useProductos } from "@src/contexts/ProductContext";

export default function Compras() {
  const { user } = useValidacion();
  const { orders } = useOrdersData();
  const { productos } = useProductos();

  const comprasUsuario = orders
    ?.filter((order) => order.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen p-6 lg:m-5">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-6 uppercase">
        Últimas Compras
      </h1>

      {comprasUsuario && comprasUsuario.length > 0 ? (
        comprasUsuario.map((compra) => (
          <div key={compra.id} className="bg-white dark:bg-black shadow-md p-4 mb-6">
            <div className="text-black dark:text-white font-semibold mb-2">
              Compra #{compra.id} —{" "}
              {new Date(compra.createdAt).toLocaleDateString()}
            </div>

            <div className="space-y-4">
              {compra.products.map((p, i) => {
                const producto = productos.find(
                  (prod) => String(prod.id) === String(p.productId)
                );

                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-gray-50 dark:bg-[color:var(--color-gray)] p-3 border-1 border-gray-200 dark:border-[color:var(--color-light-gray)]"
                  >
                    <img
                      src={
                        producto?.images?.[0]?.url ||
                        "/imagen-no-disponible.jpg"
                      }
                      alt={producto?.title || "Producto"}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="text-black dark:text-white">
                      <p className="font-medium">
                        {producto ? producto.title : "Producto desconocido"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-white">
                        x{p.quantity} — ${p.unit_price} c/u
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
