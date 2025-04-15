import { useState, useContext } from "react";
import Barra_busqueda_productos from "./Barra_busqueda_productos";
import Botones_usuario from "./Botones_usuario.jsx";
import { usarContextoUsuario } from "../Context.jsx";

function Header({ onActualizarValor ,buscar}) {
   
    const usuario= usarContextoUsuario()
    console.log(usuario)

    const handleClick = () => {
        // Llamamos a la función del padre con el nuevo valor
        onActualizarValor('Nuevo valor desde Header');
      };
    return (
        <>

            <header className="bg-dark text-white p-3 fixed-top w-100 container">
                <div className="row">
                    
                    <div className="col"> TPO</div>
                    <div className="col"><Barra_busqueda_productos buscar={buscar}/></div>
                   {usuario ? (<>
                            <Botones_usuario />
                            
                   </>):(
                    <>
                        <div className="col">
                        <div className="container">
                        <button onClick={handleClick}>Iniciar sesión</button>
                        
                        </div>
                        <div>
                        </div>
                    </div>

                    </>)
                   
                }
                   
                   
                </div>
            
            </header>
        </>
    );
}

export default Header;