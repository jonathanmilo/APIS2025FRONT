import { useState } from "react";
import { Avatar, Box } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { useValidacion } from "@src/contexts/AuthContext";
import { useUsuario } from "@src/contexts/UserContext";
import FloatingFormDialog from "./components/FloatingForm";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { uploadImages } from "@src/utils/UploadImages";
import {
  updateFirstName,
  updateLastName,
  updateUsername,
  updateEmail,
  updatePassword,
  updateAddress,
  updateAvatar,
} from "@src/api/users";

export default function Configuracion() {
  const { user, dispatch } = useValidacion();
  const [open, setOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);
  const [avatarHover, setAvatarHover] = useState(false);
  const { actualizarUsuario } = useUsuario();

  if (!user) return null;

  const handleEdit = (fieldName, label, value) => {
    setEditingField(fieldName);

    // Caso especial para dirección
    if (fieldName === "address") {
      setFormData({
        street: user.address?.street || "",
        state: user.address?.state || "",
        country: user.address?.country || "",
      });
      setFields([
        { name: "street", label: "Calle", required: true },
        { name: "state", label: "Estado/Provincia", required: true },
        { name: "country", label: "País", required: true },
      ]);
    } else if (fieldName === "email") {
      // Caso especial para email con validación
      setFormData({ [fieldName]: value });
      setFields([
        {
          name: fieldName,
          label,
          required: true,
          helperText:
            "Introduce un email válido (ejemplo: usuario@dominio.com)",
          type: "email",
          pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
        },
      ]);
    } else {
      // Caso general para otros campos
      setFormData({ [fieldName]: value });
      setFields([{ name: fieldName, label, required: true }]);
    }

    setOpen(true);
  };

  const handleEditAvatar = () => {
    setEditingField("avatar");
    setFormData({ avatar: null });
    setFields([
      {
        name: "avatar",
        label: "Foto de Perfil",
        required: true,
        type: "file",
        helperText: "Formatos permitidos: JPG, PNG",
      },
    ]);
    setOpen(true);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSave = async () => {
    const userId = user.id;

    try {
      // Validación específica para el correo electrónico
      if (editingField === "email") {
        const emailValue = formData.email;
        if (!validateEmail(emailValue)) {
          alert("Por favor, introduce un email válido");
          return;
        }
      }

      let updatePayload = {};

      switch (editingField) {
        case "firstName":
          await updateFirstName(userId, formData.firstName);
          updatePayload = { firstName: formData.firstName };
          break;
        case "lastName":
          await updateLastName(userId, formData.lastName);
          updatePayload = { lastName: formData.lastName };
          break;
        case "username":
          await updateUsername(userId, formData.username);
          updatePayload = { username: formData.username };
          break;
        case "email":
          await updateEmail(userId, formData.email);
          updatePayload = { email: formData.email };
          break;
        case "password":
          await updatePassword(userId, formData.password);
          return alert("Contraseña actualizada correctamente.");
        case "avatar":
          const urls = await uploadImages(formData.avatar);
          const avatarUrl = urls[0];
          await updateAvatar(userId, avatarUrl);
          updatePayload = { avatar: avatarUrl };
          break;
        case "address":
          const newAddress = {
            street: formData.street,
            state: formData.state,
            country: formData.country,
          };
          await updateAddress(userId, newAddress);
          updatePayload = { address: newAddress };
          break;
        default:
          console.warn("Campo no reconocido:", editingField);
          return;
      }

      dispatch({ type: "UPDATE_USER", payload: updatePayload });
      await actualizarUsuario();

      alert(`Información actualizada correctamente.`);
      setOpen(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al actualizar la información.");
      setOpen(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black m-5 shadow-md p-6">
      <div className="flex items-center gap-6">
        <Box
          position="relative"
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          <Avatar
            src={user.avatar}
            alt={user?.firstName || "Usuario"}
            sx={{ width: 80, height: 80 }}
          />
          {avatarHover && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(0,0,0,0.5)"
              borderRadius="50%"
              onClick={handleEditAvatar}
              sx={{ cursor: "pointer" }}
            >
              <MdEdit size={30} color="white" />
            </Box>
          )}
        </Box>
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
            label: "Dirección",
            value: `${user.address?.street || ""}, ${
              user.address?.state || ""
            }, ${user.address?.country || ""}`,
            field: "address",
          },
          {
            label: "Contraseña",
            value: "•".repeat(8),
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
                onClick={() => handleEdit(field, label, value)}
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
        title={`Editar ${
          editingField === "address" ? "Dirección" : fields[0]?.label || ""
        }`}
        handleChange={(e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }}
      />
    </div>
  );
}
