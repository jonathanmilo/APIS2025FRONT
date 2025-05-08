import React from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { calcularPrecio } from "../utils/calcularPrecio";
import { useUserData } from "../hooks/useUserData";
import { useUsuario } from "../contexts/UserContext";

function ProductCard({ producto }) {
  const { usuarios } = useUsuario();
  const { usuario, loading, error } = useUserData(producto.userId, usuarios);

  const precioFinal = calcularPrecio(
    producto.price,
    producto.discountPercentage
  );

  return (
    <Link
      to={`/catalogo/${producto.id}`}
      className="flex flex-col bg-white shadow-md overflow-hidden max-w-sm w-full h-full hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <img
          src={producto.images[0].url}
          alt="Product image"
          className="w-full h-50 object-cover"
        />

        {producto.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-brand-black text-sm font-bold text-center mb-1">
                SIN
                <br />
                STOCK
              </span>
            </div>
          </div>
        )}
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
      </div>
    </Link>
  );
}

export default ProductCard;
