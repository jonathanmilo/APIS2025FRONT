import { useState } from "react";
import { Avatar } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { useValidacion } from "@src/contexts/AuthContext";
import FloatingFormDialog from "./components/FloatingForm";
import { Divider, IconButton, Tooltip } from "@mui/material";
import {
  updateFirstName,
  updateLastName,
  updateUsername,
  updateEmail, // TODO: validar si el nuevo email tiene los caracteres correspondientes
  updatePassword,
  updateAddress, // TODO: adaptar floatingForm para que reciba los 3 campos de address y agregarlo al switch
  updateAvatar, // TODO: agregar boton para editar el avatar y llamar a la funcion
} from "@src/api/users";

export default function Configuracion() {
  const { user, dispatch } = useValidacion();
  const [open, setOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);

  if (!user) return null;

  const handleEdit = (fieldName, label, value) => {
    setEditingField(fieldName);
    setFormData({ [fieldName]: value });
    setFields([{ name: fieldName, label }]);
    setOpen(true);
  };

  const handleSave = async () => {
    const value = formData[editingField];
    const userId = user.id;

    try {
      let updatePayload = {};

      switch (editingField) {
        case "firstName":
          await updateFirstName(userId, value);
          updatePayload = { firstName: value };
          break;
        case "lastName":
          await updateLastName(userId, value);
          updatePayload = { lastName: value };
          break;
        case "username":
          await updateUsername(userId, value);
          updatePayload = { username: value };
          break;
        case "email":
          await updateEmail(userId, value);
          updatePayload = { email: value };
          break;
        case "password":
          await updatePassword(userId, value);
          return alert("Contraseña actualizada correctamente.");

        case "address.street":
        case "address.state":
        case "address.country": {
          alert("Falta implementar.");
          throw new Error("Actualización de dirección no implementada");
        }

        default:
          console.warn("Campo no reconocido:", editingField);
          return;
      }

      dispatch({ type: "UPDATE_USER", payload: updatePayload });

      alert(`Campo ${editingField} actualizado correctamente.`);
      setOpen(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al actualizar el campo.");
      setOpen(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black m-5 shadow-md p-6">
      <div className="flex items-center gap-6">
        <Avatar
          src={user.avatar}
          alt={user?.firstName || "Usuario"}
          sx={{ width: 80, height: 80 }}
        />
        <div>
          <p className="text-xl font-semibold text-black dark:text-white">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-600 dark:text-white">{user.email}</p>
        </div>
      </div>

      <Divider sx={{ my: 3 }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { label: "Nombre", value: user.firstName, field: "firstName" },
          { label: "Apellido", value: user.lastName, field: "lastName" },
          { label: "Usuario", value: user.username, field: "username" },
          { label: "Email", value: user.email, field: "email" },
          {
            label: "Calle",
            value: user.address?.street,
            field: "address.street",
          },
          {
            label: "Estado",
            value: user.address?.state,
            field: "address.state",
          },
          {
            label: "País",
            value: user.address?.country,
            field: "address.country",
          },
          {
            label: "Contraseña",
            value: "•".repeat(user.password?.length || 8),
            field: "password",
          },
        ].map(({ label, value, field }) => (
          <div
            key={field}
            className="flex justify-between items-center border-b border-gray-300 dark:border-white pb-2"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-white">{label}</p>
              <p className="text-lg font-medium text-black dark:text-white">
                {value}
              </p>
            </div>

            <Tooltip title="Editar" arrow>
              <IconButton
                onClick={() => handleEdit(field, label, user[field])}
                sx={{ width: "40px", height: "40px" }}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MdEdit size={24} className="text-gray-600 dark:text-white" />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>

      <FloatingFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        fields={fields}
        title={`Editar ${fields[0]?.label || ""}`}
        handleChange={(e) => {
          const { name, value } = e.target;
          if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
              ...formData,
              [parent]: {
                ...(formData[parent] || {}),
                [child]: value,
              },
            });
          } else {
            setFormData({ ...formData, [name]: value });
          }
        }}
      />
    </div>
  );
}
