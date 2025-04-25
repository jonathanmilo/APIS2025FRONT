import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUsuario } from "../../../../contexts/UserContext";
import { MdLogout } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

export default function UserMenu() {
  const { usuario } = useUsuario();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Opciones de usuario">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src={usuario?.avatar || ""}
            alt={usuario?.firstName || "Usuario"}
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 1px 4px rgba(0,0,0,0.16))",
              mt: 1,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem component={Link} to="/mi-perfil">
          Mi Perfil
        </MenuItem>
        <MenuItem component="a" href="#">
          Compras
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <SlSettings className="mr-1" />
          Configuración
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <MdLogout className="mr-1" />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
