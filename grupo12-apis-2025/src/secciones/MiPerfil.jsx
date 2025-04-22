import React, { useState, useEffect } from 'react';
import Header from "../componentes/Header"; 
import Footer from "../componentes/Footer";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// usuarios_datos.json
const jsonFilePath = 'usuarios_datos.json'; 

const MiPerfil = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editDireccion, setEditDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Cargar datos del usuario desde el archivo JSON (simulando una API)
  useEffect(() => {
  Promise.all([
    fetch('/usuarios_datos.json').then(res => res.json()),
    fetch('/Productos_datos.json').then(res => res.json())
  ])
    .then(([usuariosData, productosData]) => {
      if (usuariosData?.usuarios?.length > 0) {
        const usuario = usuariosData.usuarios[4]; // Usuario ejemplo MI PERFIL
        const productos = productosData.productos;

        // Relacionar los productos_comprados con sus nombres
        const comprasConNombre = usuario.productos_comprados.map(id => {
          const producto = productos.find(p => p.id_producto === id);
          return producto ? producto.nombre : `Producto con ID ${id}`;
        });

        // Guardar el usuario y sus compras con nombres
        setUserInfo({ ...usuario, compras: comprasConNombre });
      } else {
        navigate('/login');
      }
    })
    .catch((error) => {
      console.error('Error al cargar datos:', error);
      navigate('/login');
    });
}, [navigate]);


  const handleProfileUpdate = () => {
    alert('Información actualizada (simulada)');
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert('Contraseña cambiada (simulada)');
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  // Condición para evitar errores al intentar acceder a propiedades de un valor undefined
  if (!userInfo) return null;

  return (
    <>
    <Header/>

    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: 4,
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" mb={3} color="text.primary">
        Mi Perfil
      </Typography>

      {/* INFORMACIÓN DEL USUARIO */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Información del Usuario
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Avatar src={userInfo.avatarUrl} sx={{ width: 64, height: 64 }} />
          <Box>
            <Typography variant="body1">
              <strong>Nombre:</strong> {userInfo.nombre} {userInfo.apellido}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {userInfo.email}
            </Typography>
            {/*Falta agregar un campo dirección para los usuarios en el db.json*/}
            <Typography variant="body1">
              <strong>Dirección:</strong> {userInfo.direccion || 'Dirección no disponible'}
            </Typography>
          </Box>
        </Box>

        
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Últimas Compras:
        </Typography>
        <List dense>
          {userInfo.compras && userInfo.compras.length > 0 ? (
            userInfo.compras.map((item, index) => (
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
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Editar Información
        </Typography>
        <TextField
          label="Email"
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
            backgroundColor: 'oklch(76.8% 0.233 130.85)',
            color: '#fff',
            '&:hover': { backgroundColor: 'oklch(70% 0.233 130.85)' },
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
            backgroundColor: 'oklch(76.8% 0.233 130.85)',
            color: '#fff',
            '&:hover': { backgroundColor: 'oklch(70% 0.233 130.85)' },
          }}
          onClick={handlePasswordChange}
        >
          Cambiar Contraseña
        </Button>
      </Paper>
    </Box>

    <Footer/>
    </>
  );
};

export default MiPerfil;
