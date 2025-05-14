import ProductCard from "./ProductCard";

function ListaProductos({ titulo, productos }) {
  if (!Array.isArray(productos)) return null;

  return (
    <>
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-white text-sm lg:text-xl text-center min-h-screen">
          No hay productos en "{titulo}"
        </p>
      )}
    </>
  );
}

export default ListaProductos;
