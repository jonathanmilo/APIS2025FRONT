import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contexts/UserContext";

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

  const [editEmail, setEditEmail] = useState("");
  const [editDireccion, setEditDireccion] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
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
            src={usuario.avatarUrl}
            sx={{ width: 64, height: 64, marginRight: 2 }}
          />
          <Box>
            <Typography variant="body1">
              <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {usuario.email}
            </Typography>
            <Typography variant="body1">
              <strong>Dirección:</strong> {usuario.direccion}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Últimas Compras:
        </Typography>
        <List dense>
          {usuario.compras && usuario.compras.length > 0 ? (
            usuario.compras.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
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
