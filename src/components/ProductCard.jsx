import React from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { calcularPrecio } from "../utils/calcularPrecio";
import { useUserData } from "../hooks/useUserData";
import { useCarrito } from "../contexts/CartContext";
import { Button } from "@mui/material";

function ProductCard({ producto }) {
  const { usuario, loading } = useUserData(producto.userId);
  const { agregarAlCarrito } = useCarrito();

  const precioFinal = calcularPrecio(
    producto.price,
    producto.discountPercentage
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    agregarAlCarrito(producto);
  };

  return (
    <Link
      to={`/catalogo/${producto._id}`}
      className="flex flex-col bg-white shadow-md overflow-hidden max-w-sm w-full h-full hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <img
          src={producto.images[0].url}
          alt="Product image"
          className="w-full h-50 object-cover"
        />
      </div>

      <Divider />

      <div className="flex flex-col justify-between flex-1 p-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="uppercase font-semibold text-gray-800 mb-1">
              {producto.title}
            </h2>
            <div className="flex gap-1 items-center">
              {loading ? (
                <p className="text-gray-400 text-sm italic">
                  Cargando usuario...
                </p>
              ) : (
                <>
                  <p className="text-gray-500 text-sm">
                    Por {usuario?.username}
                  </p>
                  <VscVerifiedFilled className="text-blue-500" />
                </>
              )}
            </div>
          </div>
          {producto.stock <= 0 && (
            <span className="text-xs text-red-500">Sin stock</span>
          )}
        </div>

        {producto.discountPercentage > 0 ? (
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-500 line-through">
              ${producto.price}
            </p>
            <div className="flex items-center xl:items-end gap-2">
              <p className="text-xl font-bold text-brand-black">
                ${precioFinal}
              </p>
              <div className="text-brand-main font-semibold">
                <p>{producto.discountPercentage}% OFF</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex">
            <p className="text-xl font-bold text-gray-800">${producto.price}</p>
          </div>
        )}
        
        <Button
          variant="contained"
          size="small"
          onClick={handleAddToCart}
          disabled={producto.stock <= 0}
          sx={{
          backgroundColor: 'oklch(70% 0.233 130.85)',
          color: '#fff',
          '&:hover': {
          backgroundColor: 'oklch(60% 0.233 130.85)',
          },
          marginTop: 2,
          alignSelf: 'flex-start'
          }}
        >
          {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
        </Button>

      </div>
    </Link>
  );
}

export default ProductCard;