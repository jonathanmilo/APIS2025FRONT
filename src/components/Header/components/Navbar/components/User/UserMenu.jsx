import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { useValidacion } from "../../../../../../contexts/AuthContext";

export default function UserMenu({ usuario }) {
  const { logout } = useValidacion();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Opciones de usuario" arrow>
        <IconButton
          onClick={handleClick}
          size="small"
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
            sx: (theme) => ({
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
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
                left: 40,
                [theme.breakpoints.up("sm")]: {
                  left: "auto",
                  right: 20,
                },
              },
            }),
          },
        }}
      >
        <MenuItem component={Link} to="/mi-perfil">
          Mi Perfil
        </MenuItem>
        <MenuItem component={Link} to="/mis-compras">
          Compras
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/configuracion" onClick={handleClose}>
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
