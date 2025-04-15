import { useContext } from "react";
import { usarContextoUsuario } from "../Context";

function Botones_usuario() {
  const usuario = usarContextoUsuario();
  return (
    <>
      <ul className="nav justify-content-end pills botones_usuario">
        <li className="nav-item">
          <p>{usuario.nombre}</p>
        </li>
        <li className="nav-item">
          <button className="btn-sm"> mis publicaciones</button>
        </li>
        <li className="nav-item">
          <button className="btn-sm"> mis compras</button>
        </li>
        <li className="nav-item">
          <button className="btn-sm"> boton</button>
        </li>
      </ul>
    </>
  );
}
export default Botones_usuario;
