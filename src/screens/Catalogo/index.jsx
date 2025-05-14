import { useState } from "react";
import { useProductos } from "@src/contexts/ProductContext.jsx";
import SearchBar from "@src/components/SearchBar.jsx";
import ProductCard from "@src/components/ProductCard.jsx";
import SortedBy from "./components/sorted-by";
import Carousel from "@src/components/Carousel.jsx";

import {
  ordenarPorPrecio,
  ordenarPorTitulo,
} from "../../utils/ordenarProductos";

import {
  filtrarPorNombre,
  filtrarDestacados,
} from "@src/utils/filtrarProductos.js";

export function Catalogo() {
  const { productos } = useProductos();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [type, setType] = useState("title");
  const [order, setOrder] = useState("asc");

  const handleTypeData = (data) => {
    setType(data);
  };

  const handleOrderData = (data) => {
    setOrder(data);
  };

  const handleBuscar = (termino) => {
    if (!termino) return setProductosFiltrados([]);
    setProductosFiltrados(filtrarPorNombre(productos, termino));
  };

  const destacados = filtrarDestacados(productos);
  const lista = productosFiltrados.length ? productosFiltrados : productos;

  let sortedLista = lista;

  if (type === "title") {
    sortedLista = ordenarPorTitulo(lista, order);
  } else if (type === "price") {
    sortedLista = ordenarPorPrecio(lista, order);
  }

  return (
    <div className="p-10 lg:p-12">
      {/* Grid principal */}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]  gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl text-black dark:text-white uppercase font-bold">
            Catálogo de productos
          </h1>
          <h2 className="text-gray-500 dark:text-white">
            ¡Explorá nuestro catálogo de productos!
          </h2>
        </div>
        <div className="flex flex-col items-end mb-5">
          <SearchBar buscar={handleBuscar} />
        </div>
      </div>

      <SortedBy
        type={type}
        order={order}
        onTypeSend={handleTypeData}
        onOrderSend={handleOrderData}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-5">
        {sortedLista.map((prod) => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>

      {destacados.length > 0 && (
        <Carousel title="Productos Destacados" items={destacados} />
      )}
    </div>
  );
}

export default Catalogo;
