import { useState } from "react";
import { Avatar } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { useValidacion } from "../../contexts/AuthContext";
import FloatingFormDialog from "./components/FloatingForm";
import { Divider, IconButton, Tooltip } from "@mui/material";

export default function Configuracion() {
  const { user } = useValidacion();
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

  const handleSave = () => {
    console.log(`Guardar ${editingField}:`, formData[editingField]);
    // logica db
    setOpen(false);
  };

  return (
    <div className="bg-white m-5 shadow-md p-6">
      <div className="flex items-center gap-6">
        <Avatar
          src={user.avatar}
          alt={user?.firstName || "Usuario"}
          sx={{ width: 80, height: 80 }}
        />
        <div>
          <p className="text-xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-600">{user.email}</p>
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
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-lg font-medium text-gray-800">{value}</p>
            </div>

            <Tooltip title="Editar" arrow>
              <IconButton
                onClick={() => handleEdit(field, label, user[field])}
                sx={{ width: "40px", height: "40px" }}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MdEdit size={24} />
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
