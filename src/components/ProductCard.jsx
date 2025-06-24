import { VscVerifiedFilled } from "react-icons/vsc";
import { Divider, Tooltip, IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { calcularPrecio } from "@src/utils/calcularPrecio";
import { useUserData } from "@src/hooks/useUserData";
import { useUsuario } from "@src/contexts/UserContext";
import { useValidacion } from "@src/contexts/AuthContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useProductos } from "@src/contexts/ProductContext";
import { useState } from "react";

function ProductCard({ producto, onRemoveProduct, onUpdateStock }) {
 // const { usuarios } = useUsuario();
  const { eliminarProducto } = useProductos();
  const { user,loading } = useValidacion();
  //const { usuario, loading } = useUserData(producto.userId, usuarios);
  const location = useLocation();
  const navigate = useNavigate();
  const{isOwner, setIsOwner} = useState(false);
  const { openStockDialog } = useProductos();

  const precioFinal = calcularPrecio(
    producto.price,
    producto.discountPercentage
  );

  const handleDelete = async (id) => {
    try {
      const result = await eliminarProducto(id);
      if (result.success) {
        alert(`Producto ${producto.title} eliminado correctamente`);
        onRemoveProduct(id); // padre actualiza ui
      } else {
        alert("No se pudo eliminar el producto. Intenta nuevamente.");
      }
    } catch (error) {
      console.error(error.message);
      alert("Error al eliminar el producto. Inténtalo de nuevo.");
    }
  };

  const handleEditProduct = () => {
    navigate(`/editar-producto/${producto.id}`);
  };

  // Verificar si el usuario actual es el dueño del producto
  if(user){
  const isOwner = user && user.username === producto.username;
}
  // Verificar si estamos en una página de gestión de productos (mi-perfil o mis-productos)
  const isManagementPage = ["/mi-perfil", "/mis-productos"].includes(
    location.pathname
  );

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-black shadow-md overflow-hidden max-w-sm w-full h-full hover:shadow-xl transition-theme">
        <Link
          to={`/catalogo/${producto.id}`}
          className="relative cursor-pointer"
        >
         
          <img
            src={producto.images.find(img => img.cover)?.url}
            alt="Product image"
            className="w-full h-50 object-contain bg-white dark:bg-[#fff]"
          />

          {producto.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white dark:bg-[#fff] rounded-full flex items-center justify-center shadow-md">
                <span className="text-black text-sm font-bold text-center mb-1">
                  SIN
                  <br />
                  STOCK
                </span>
              </div>
            </div>
          )}
        </Link>

        <Divider />

        <div className="flex flex-col justify-between flex-1 p-2 dark:text-white">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="uppercase font-semibold text-black dark:text-white mb-1">
                {producto.title}
              </h2>
              <div className="flex gap-1 items-center">
                {loading ? (
                  <p className="text-gray-400 dark:text-white text-sm italic">
                    Cargando usuario...
                  </p>
                ) : (
                  <>
                    <p className="text-gray-500 dark:text-white text-sm">
                      Por {user?.username}
                    </p>
                    <VscVerifiedFilled className="text-blue-500" />
                  </>
                )}
              </div>
            </div>
          </div>

          {producto.discountPercentage > 0 ? (
            <div className="flex flex-col items-start">
              <p className="text-sm text-gray-500 dark:text-white line-through">
                ${producto.price}
              </p>
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex gap-2 items-center">
                  <p className="text-xl font-bold text-black dark:text-white">
                    ${precioFinal}
                  </p>
                  <div className="text-primary font-semibold">
                    <p>{producto.discountPercentage}% OFF</p>
                  </div>
                </div>
                {isOwner && isManagementPage && (
                  <div className="flex gap-2">
                    <Tooltip title="Editar producto" arrow>
                      <IconButton onClick={handleEditProduct}>
                        <FaPencilAlt className="text-black dark:text-white" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar publicación" arrow>
                      <IconButton onClick={() => handleDelete(producto.id)}>
                        <RiDeleteBin6Line className="text-black dark:text-white" />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <p className="text-xl font-bold text-black dark:text-white">
                ${producto.price}
              </p>
              {isOwner && isManagementPage && (
                <div className="flex gap-1">
                  <Tooltip title="Editar producto" arrow>
                    <IconButton onClick={handleEditProduct}>
                      <FaPencilAlt className="text-blue-500" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar stock" arrow>
                    <IconButton onClick={openStockDialog}>
                      <MdEdit
                        size={24}
                        className="text-black dark:text-white"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar publicación" arrow>
                    <IconButton onClick={() => handleDelete(producto.id)}>
                      <RiDeleteBin6Line className="text-red-500" />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
