import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useValidacion } from "../../contexts/AuthContext";
import { useProductos } from "../../contexts/ProductContext";
import ListaProductos from "../../components/ListaProductos";
import { filtrarPorUsuario } from "../../utils/filtrarProductos";
import { Avatar, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

const MiPerfil = () => {
  const navigate = useNavigate();
  const { user } = useValidacion();
  const { productos } = useProductos();

  useEffect(() => {
    if (!user) {
      navigate("/ingresar");
    }
  }, [user, navigate]);

  if (!user || !productos) return null;

  const productosFiltrados = filtrarPorUsuario(productos, user.id);

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

        <p className="text-brand-black text-2xl">
          {user.firstName} {user.lastName}
        </p>

        <p className="text-gray-400">@{user.username}</p>
      </div>

      <section className="bg-white m-5 lg:m-5 shadow-md p-5">
        <div className="flex flex-row items-center lg:justify-start justify-center gap-3 mb-5">
          <p className="text-brand-black uppercase lg:text-xl">
            Mis publicaciones
          </p>
          <Tooltip title="Nueva publicación" arrow>
            <button
              onClick={() => navigate("/vender")}
              className="border-2 border-brand-main lg:p-1 text-xl text-brand-main hover:bg-gray-100 cursor-pointer"
            >
              <FaPlus />
            </button>
          </Tooltip>
        </div>

        <ListaProductos
          titulo={"Mis publicaciones"}
          productos={productosFiltrados}
        />
      </section>
    </>
  );
};

export default MiPerfil;
