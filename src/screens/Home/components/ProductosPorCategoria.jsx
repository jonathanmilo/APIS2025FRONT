import { useState, useEffect } from "react";
import ProductCard from "@src/components/ProductCard";

function ProductosPorCategoria({ categorias, productos }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setCategoriaSeleccionada(categorias[0]);
    }
  }, [categorias]);

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.categoryId === categoriaSeleccionada.id
      )
    : [];

  return (
    <section className="categorias">
      {/* Lista de Categorías */}
      <ul className="flex flex-row gap-3 overflow-x-auto my-2">
        {categorias.map((categoria) => {
          const activa = categoriaSeleccionada?.name === categoria.name;

          return (
            <li key={categoria.id} className="flex-shrink-0 shadow-lg">
              <button
                onClick={() => setCategoriaSeleccionada(categoria)}
                className={`min-w-[250px] max-w-max p-2 text-center transition duration-300 cursor-pointer
              ${
                activa
                  ? "bg-brand-main text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-brand-black"
              }`}
              >
                <h3
                  className={`font-bold uppercase text-lg ${
                    activa ? "text-white" : "text-brand-black"
                  }`}
                >
                  {categoria.name}
                </h3>

                <div
                  className={`text-sm mt-1 whitespace-nowrap overflow-hidden text-ellipsis ${
                    activa ? "text-white" : "text-gray-600"
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
        <div className="mx-5 mt-5 lg:mx-20 lg:mt-10">
          <h2 className="md:text-xl font-bold text-brand-black mb-4 uppercase">
            Productos en: {categoriaSeleccionada.name}
          </h2>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No hay productos en la categoría "{categoriaSeleccionada.name}".
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default ProductosPorCategoria;
