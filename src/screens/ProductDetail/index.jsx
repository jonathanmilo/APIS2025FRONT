import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "@src/components/Carousel";
import { useCategorias } from "@src/contexts/CategoryContext";
import { useProductos } from "@src/contexts/ProductContext";
import GaleriaImagenes from "./components/GaleriaImagenes";
import { calcularPrecio } from "@src/utils/calcularPrecio";
import { Button } from "@mui/material";
import {
  filtrarRelacionados,
  obtenerNombresSubcategorias,
  obtenerNombreCategoria,
} from "@src/utils/filtrarProductos";

import { CartContext } from "@src/contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { productos } = useProductos();
  const { categorias } = useCategorias();

  const { cart, addToCart } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [quantity, setCantidad] = useState(1);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (productos.length > 0) {
      const prod = productos.find((p) => String(p.id) === id);
      if (prod) {
        setProducto(prod);
        setProductosRelacionados(filtrarRelacionados(productos, prod));

        const inCart = cart.some((item) => item.productId === prod.id);
        setAlreadyInCart(inCart);
      } else {
        setProducto(undefined);
      }
    }
  }, [productos, id, cart]);

  if (producto === undefined) {
    return (
      <div className="p-8 text-center text-red-500">Producto no encontrado</div>
    );
  }

  if (!producto) {
    return <div className="p-8 text-center">Cargando producto…</div>;
  }

  const manejarCantidad = (operacion) => {
    if (operacion === "incrementar") {
      if (quantity < producto.stock) {
        setCantidad((c) => c + 1);
      }
    } else if (operacion === "decrementar" && quantity > 1) {
      setCantidad((c) => c - 1);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (producto.stock < quantity) {
      alert(`No hay suficiente stock. Disponible: ${producto.stock}`);
      return;
    }

    addToCart(producto, quantity);
    setAlreadyInCart(true);
    alert(`${quantity} ${producto.title} agregado(s) al carrito`);
    setCantidad(1);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-block mb-4 text-brand-main hover:underline"
      >
        ← Volver atrás
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <GaleriaImagenes images={producto.images} />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-brand-black">
            {producto.title}
          </h1>
          <p className="text-grey-600 mb-4 text-brand-black">
            {producto.description}
          </p>

          {producto.discountPercentage > 0 && (
            <div className="text-xl text-gray-500 line-through">
              ${producto.price}
            </div>
          )}

          <div className="text-2xl font-semibold mb-4 text-brand-black">
            ${calcularPrecio(producto.price, producto.discountPercentage)}
          </div>

          {producto.discountPercentage > 0 && (
            <p className="mb-4 text-brand-main">
              Descuento: {producto.discountPercentage}%
            </p>
          )}

          <p className="mb-6 text-brand-black font-bold">
            Categoría:{" "}
            <span className="font-medium">
              {obtenerNombreCategoria(producto, categorias)}
            </span>
          </p>

          <p className="mb-6 text-brand-black font-bold">
            Sub-categorías:{" "}
            <span className="font-medium">
              {obtenerNombresSubcategorias(producto, categorias).join(", ")}
            </span>
          </p>

          <div className="flex items-center mb-4 gap-4">
            <div className="flex items-center">
              <Button
                variant="outlined"
                onClick={() => manejarCantidad("decrementar")}
                disabled={quantity <= 1}
                className="min-w-0"
              >
                -
              </Button>
              <span className="mx-4 text-xl text-brand-black">{quantity}</span>
              <Button
                variant="outlined"
                onClick={() => manejarCantidad("incrementar")}
                disabled={quantity >= producto.stock}
                className="min-w-0"
              >
                +
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              Stock disponible: {producto.stock}
            </span>
          </div>

          <Button
            variant="contained"
            color={alreadyInCart ? "success" : "primary"}
            size="large"
            onClick={handleAgregarAlCarrito}
            disabled={producto.stock <= 0 || alreadyInCart}
            className="w-full md:w-auto"
          >
            {alreadyInCart
              ? "✓ En el carrito"
              : producto.stock > 0
              ? "Agregar al carrito"
              : "Sin stock"}
          </Button>

          {alreadyInCart && (
            <div className="mt-2 text-green-600 text-sm">
              Este producto ya está en tu carrito
            </div>
          )}
        </div>
      </div>

      {productosRelacionados.length > 0 && (
        <section className="mt-6">
          <Carousel title="Productos similares" items={productosRelacionados} />
        </section>
      )}
    </div>
  );
}
