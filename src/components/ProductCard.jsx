import { VscVerifiedFilled } from "react-icons/vsc";
import { Divider, Tooltip, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { calcularPrecio } from "@src/utils/calcularPrecio";
import { useUserData } from "@src/hooks/useUserData";
import { useUsuario } from "@src/contexts/UserContext";
import { useValidacion } from "@src/contexts/AuthContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { deleteProduct, updateProductStock } from "@src/api/products";
import FloatingFormDialog from "@src/screens/Configuracion/components/FloatingForm";

function ProductCard({ producto }) {
  const [open, setOpen] = useState(false);
  const { usuarios } = useUsuario();
  const { user } = useValidacion();
  const { usuario, loading, error } = useUserData(producto.userId, usuarios);
  const [formData, setFormData] = useState({ newStock: "" });
  const location = useLocation();

  const precioFinal = calcularPrecio(
    producto.price,
    producto.discountPercentage
  );

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      window.location.reload(); // TODO: resolver la vista inmediata despues de que se haya elimminado el producto sin forzar refresh (en componente configuracion o lista productos)
      alert(`Producto ${producto.title} eliminado correctamente`);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleUpdateStock = async () => {
    try {
      await updateProductStock(producto.id, Number(formData.newStock));
      window.location.reload();
      alert(
        `Producto ${producto.title} actualizado con nuevo stock: ${formData.newStock}`
      );
      setOpen(false);
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  };

  const openStockDialog = () => {
    setFormData({ newStock: producto.stock });
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-black shadow-md overflow-hidden max-w-sm w-full h-full hover:shadow-xl transition-theme">
        <Link
          to={`/catalogo/${producto.id}`}
          className="relative cursor-pointer"
        >
          <img
            src={producto.images[0].url}
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
                {user &&
                  user.id === producto.userId &&
                  location.pathname === "/mi-perfil" && (
                    <div className="flex gap-1">
                      <Tooltip title="Eliminar publicación" arrow>
                        <IconButton onClick={() => handleDelete(producto.id)}>
                          <RiDeleteBin6Line className="text-black dark:text-white" />
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
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="flex">
              <p className="text-xl font-bold text-black dark:text-white">
                ${producto.price}
              </p>
            </div>
          )}
        </div>
      </div>
      <FloatingFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleUpdateStock}
        formData={formData}
        setFormData={setFormData}
        title={`Editar stock de "${producto.title}"`}
        fields={[
          {
            name: "newStock",
            label: "Nuevo stock",
            type: "number",
            required: true,
          },
        ]}
      />
    </>
  );
}

export default ProductCard;
