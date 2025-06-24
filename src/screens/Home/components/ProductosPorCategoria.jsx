import { useState, useEffect } from "react";
import ListaProductos from "@src/components/ListaProductos";

function ProductosPorCategoria({ categorias, productos }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setCategoriaSeleccionada(categorias[0]);
    }
  }, [categorias]);

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.category === categoriaSeleccionada.name
      )
    : [];

  return (
    <section className="categorias">
      {/* Lista de Categorías */}
      <ul className="flex flex-row gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-black-mui dark:scrollbar-thumb-[#e4e4e4] scrollbar-track-white dark:scrollbar-track-[#313131]">
        {categorias.map((categoria) => {
          const activa = categoriaSeleccionada?.name === categoria.name;
          
          return (
            <li key={categoria.id} className="flex-shrink-0 shadow-md my-2">
              <button
                onClick={() => setCategoriaSeleccionada(categoria)}
                className={`min-w-[250px] max-w-max p-2 text-center transition duration-300 cursor-pointer
              ${
                activa
                  ? "bg-primary text-white dark:text-white"
                  : "bg-gray-50 hover:bg-gray-100 dark:bg-[color:var(--color-light-gray)] hover:dark:bg-[color:var(--color-gray)]"
              }`}
              >
                <h3
                  className={`font-bold uppercase text-lg ${
                    activa
                      ? "text-white dark:text-black"
                      : "text-black dark:text-white"
                  }`}
                >
                  {categoria.name}
                </h3>

                <div
                  className={`text-sm mt-1 whitespace-nowrap overflow-hidden text-ellipsis ${
                    activa
                      ? "text-white dark:text-black"
                      : "text-gray-600 dark:text-white"
                  }`}
                >
                  {categoria.subcategories?.map((sub) => sub.name).join(" • ")}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Productos filtrados */}
      {categoriaSeleccionada && (
        <div className="mt-5">
          <h2 className="md:text-xl font-bold text-black dark:text-white mb-4 uppercase">
            Productos en: {categoriaSeleccionada.name}
          </h2>

          <ListaProductos
            titulo={categoriaSeleccionada.name}
            productos={productosFiltrados}
            // onRemoveProduct={...} TODO: implementar para que despues de cada crud en products se actualice la nueva lista de componentes sin forzar refresh
            // onUpdateStock={...}
          />
        </div>
      )}
    </section>
  );
}

export default ProductosPorCategoria;
