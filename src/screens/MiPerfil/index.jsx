import { useNavigate } from "react-router-dom";
import { useValidacion } from "@src/contexts/AuthContext";
import { useProductos } from "@src/contexts/ProductContext";
import ListaProductos from "@src/components/ListaProductos";
import { Avatar, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

import {
  filtrarPorNombre,
  filtrarPorUsuario,
} from "@src/utils/filtrarProductos";
import SearchBar from "@src/components/SearchBar";

const MiPerfil = () => {
  const navigate = useNavigate();

  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const { user } = useValidacion();
  const { productos } = useProductos();

  const productosFiltradosPorUsuario = filtrarPorUsuario(productos, user.id);

  const handleBuscar = (termino) => {
    if (!termino) return setProductosFiltrados([]);
    setProductosFiltrados(
      filtrarPorNombre(productosFiltradosPorUsuario, termino)
    );
  };

  if (!user || !productos) return null;

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-5">
        <Avatar
          src={user.avatar}
          alt={user?.firstName || "User"}
          sx={{
            width: 80,
            height: 80,
          }}
        />

        <p className="text-black dark:text-white text-2xl">
          {user.firstName} {user.lastName}
        </p>

        <p className="text-gray-400">@{user.username}</p>
      </div>

      <section className="m-5 lg:m-5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 mb-5">
          <div className="flex gap-2 items-center justify-center lg:justify-start">
            <p className="text-black dark:text-white uppercase lg:text-xl">
              Mis publicaciones
            </p>
            <Tooltip title="Nueva publicación" arrow>
              <button
                onClick={() => navigate("/vender")}
                className="border-2 rounded-full border-primary lg:p-1 text-xl text-primary hover:bg-gray-100 dark:hover:bg-black cursor-pointer"
              >
                <FaPlus />
              </button>
            </Tooltip>
          </div>

          <SearchBar buscar={handleBuscar} />
        </div>

        <ListaProductos
          titulo={"Mis publicaciones"}
          productos={
            productosFiltrados.length
              ? productosFiltrados
              : productosFiltradosPorUsuario
          }
        />
      </section>
    </>
  );
};

export default MiPerfil;
