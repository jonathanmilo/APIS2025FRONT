import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel.jsx";
import HomeCarousel from "../components/HomeCarousel.jsx";

export function Home() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [productosConDescuento, setProductosConDescuento] = useState([]);

  // Fetch para obtener los productos
  useEffect(() => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setProductosDestacados(data.filter((producto) => producto.destacado));
        setProductosConDescuento(
          data.filter((producto) => producto.descuento > 0)
        ); // Filtrar productos con descuento
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });
  }, []);

  const handleBuscar = (termino) => {
    if (!termino) {
      setProductosFiltrados([]);
      return;
    }

    const filtrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  };

  const productosAMostrar =
    productosFiltrados.length > 0 ? productosFiltrados : productos;

  return (
    <>
      {/* Sección principal con título y bienvenida */}
      <HomeCarousel></HomeCarousel>

      {/* Carrousel de productos destacados */}
      {productosDestacados.length > 0 && (
        <section className="productos-destacados -mt-32 z-10 relative lg:mx-20">
          <Carousel title="Productos Destacados" items={productosDestacados} />
        </section>
      )}

      <section className="categorias py-15">
        <h2 className="text-xl font-bold mb-2 uppercase text-center text-gray-800">
          Categorías Populares
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100 py-2">
          <div className="categoria-card bg-white p-3 text-center rounded-lg shadow-lg">
            <h3 className="font-bold uppercase text-brand-black">
              Electrónica
            </h3>
            <p className="text-gray-500">Laptops, Teléfonos, Accesorios</p>
          </div>
          <div className="categoria-card bg-white p-3 text-center rounded-lg shadow-lg">
            <h3 className="font-bold uppercase text-brand-black">Ropa</h3>
            <p className="text-gray-500">Camisas, Pantalones, Accesorios</p>
          </div>
          <div className="categoria-card bg-white p-3 text-center rounded-lg shadow-lg">
            <h3 className="font-bold uppercase text-brand-black">Hogar</h3>
            <p className="text-gray-500">Muebles, Decoración, Utensilios</p>
          </div>
          <div className="categoria-card bg-white p-3 text-center rounded-lg shadow-lg">
            <h3 className="font-bold uppercase text-brand-black">Deportes</h3>
            <p className="text-gray-500">Fútbol, Tenis, Equipos</p>
          </div>
        </div>
      </section>

      {/* Carrousel de productos con descuento */}
      {productosConDescuento.length > 0 && (
        <section className="productos-descuento mt-8">
          <Carousel
            title="Productos con Descuento"
            items={productosConDescuento}
          />
        </section>
      )}
    </>
  );
}

export default Home;
