import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contexts/UserContext";
import { useOrdersData } from "../../hooks/useOrdersData";
import { useProductos } from "../../contexts/ProductContext";

import {
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const MiPerfil = () => {
  const navigate = useNavigate();
  const { usuario } = useUsuario();
  const { orders } = useOrdersData();
  const { productos } = useProductos();

  const comprasUsuario = orders?.filter(
    (order) => order.userId === usuario?._id
  );

  const [editEmail, setEditEmail] = useState("");
  const [editDireccion, setEditDireccion] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!usuario) {
      navigate("/ingresar");
    } else {
      setEditEmail(usuario.email || "");
      setEditDireccion(usuario.direccion || "");
    }
  }, [usuario, navigate]);

  const handleProfileUpdate = () => {
    alert("Información actualizada (simulada)");
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert("Contraseña cambiada (simulada)");
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  if (!usuario) return null;

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Typography variant="h4" mb={3} color="text.primary">
        Mi Perfil
      </Typography>

      {/* INFORMACIÓN DEL USUARIO */}
      <Paper
        elevation={3}
        sx={{ padding: 3, borderRadius: 2, marginBottom: 4 }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Información del Usuario
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Avatar
            src={usuario.avatar}
            alt={usuario?.firstName || "User"}
            sx={{
              width: 64,
              height: 64,
              marginRight: 2,
              cursor: "pointer",
            }}
          />
          <Box>
            <Typography variant="body1">
              <strong>Nombre:</strong> {usuario.firstName} {usuario.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {usuario.email}
            </Typography>
            <Typography variant="body1">
              <strong>Dirección:</strong> {usuario.address.street}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Últimas Compras:
        </Typography>
        <List dense>
          {comprasUsuario && comprasUsuario.length > 0 ? (
            comprasUsuario.map((compra) => (
              <ListItem key={compra._id} alignItems="flex-start">
                <ListItemText
                  primary={`Compra #${compra._id} - ${new Date(
                    compra.createdAt
                  ).toLocaleDateString()}`}
                  secondary={
                    <Typography component="div">
                      <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                        {compra.products.map((p, i) => {
                          const producto = productos.find(
                            (prod) => String(prod._id) === String(p.productId)
                          );
                          return (
                            <li
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                              }}
                            >
                              <img
                                src={
                                  producto?.images?.[0]?.url ||
                                  "imagen-no-disponible.jpg"
                                }
                                alt={producto?.title || "Producto"}
                                style={{
                                  width: 40,
                                  height: 40,
                                  objectFit: "cover",
                                  marginRight: "0.5rem",
                                  borderRadius: 4,
                                }}
                              />
                              <span>
                                {producto
                                  ? producto.title
                                  : "Producto desconocido"}{" "}
                                — x{p.quantity} (${p.unit_price} c/u)
                              </span>
                            </li>
                          );
                        })}
                        <li style={{ marginTop: "0.5rem" }}>
                          <strong>Total: ${compra.subtotal}</strong>
                        </li>
                      </ul>
                    </Typography>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">No hay compras registradas.</Typography>
          )}
        </List>
      </Paper>

      {/* EDITAR INFORMACIÓN */}
      <Paper
        elevation={3}
        sx={{ padding: 3, borderRadius: 2, marginBottom: 4 }}
      >
        <Typography variant="h6" gutterBottom>
          Editar Información
        </Typography>
        <TextField
          label="Correo Electrónico"
          fullWidth
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Dirección"
          fullWidth
          value={editDireccion}
          onChange={(e) => setEditDireccion(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "oklch(76.8% 0.233 130.85)",
            color: "#fff",
            "&:hover": { backgroundColor: "oklch(70% 0.233 130.85)" },
          }}
          onClick={handleProfileUpdate}
        >
          Actualizar Perfil
        </Button>
      </Paper>

      {/* CAMBIAR CONTRASEÑA */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Cambiar Contraseña
        </Typography>
        <TextField
          label="Contraseña Actual"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Nueva Contraseña"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Confirmar Nueva Contraseña"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "oklch(76.8% 0.233 130.85)",
            color: "#fff",
            "&:hover": { backgroundColor: "oklch(70% 0.233 130.85)" },
          }}
          onClick={handlePasswordChange}
        >
          Cambiar Contraseña
        </Button>
      </Paper>
    </Box>
  );
};

export default MiPerfil;
