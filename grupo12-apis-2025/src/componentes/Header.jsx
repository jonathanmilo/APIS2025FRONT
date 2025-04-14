import { useState } from "react";
import Barra_busqueda_productos from "./Barra_busqueda_productos";
import Botones_usuario from "./Botones_usuario.jsx";

function Header({ onActualizarValor ,buscar,usuario}) {
   
  
    const handleClick = () => {
        // Llamamos a la función del padre con el nuevo valor
        onActualizarValor('Nuevo valor desde Header');
      };
    return (
        <>
            <Botones_usuario usuario={usuario}/>
            <header className="bg-dark text-white p-3 fixed-top w-100 container">
                <div className="row">
                    <div className="col"> TPO</div>
                    <div className="col"><Barra_busqueda_productos buscar={buscar}/></div>
                    <div className="col">
                        <div className="container">
                        <button onClick={handleClick}>Iniciar sesión</button>
                        
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            
            </header>
        </>
    );
}

export default Header;