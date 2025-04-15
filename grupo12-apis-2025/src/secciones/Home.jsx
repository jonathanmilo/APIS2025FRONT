import React ,{ useState } from "react";
import InicioSesion from "./InicioSesion";
import Header from "../componentes/Header";
import data from "../../public/Productos_datos.json";
import { usarContextoUsuario } from "../Context.jsx";

import Producto from "../componentes/Producto.jsx";

export function Home() {
    const usuario =usarContextoUsuario()
    const [logeado, setLogeado] = useState(false);
    
    const [productos] = useState(data.productos || []); // Accede a la propiedad 'productos' del JSON
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    const actualizarValor = (nuevoValor) => {
        setLogeado(nuevoValor);
    };
    // valida si el usuario del formulario Inicio, coincide con algún usuario del archivo JSON    
  

    const handleBuscar = (termino) => {
        if (!termino) {
            setProductosFiltrados([]);
            return;
        }
        
        const filtrados = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(termino.toLowerCase())
        );
        setProductosFiltrados(filtrados); // Pasa los productos filtrados, no el término
    };

    // Determina qué productos mostrar (filtrados o todos)
    const productosAMostrar = productosFiltrados.length > 0 ? productosFiltrados : productos;

    return (
        <>
                   
                <Header onActualizarValor={actualizarValor} buscar={handleBuscar}  />

                <p>TPO grupo 12</p>
            
            {!logeado || usuario ? ( // Cambiado a !logeado para lógica correcta
                <>

                    {productosAMostrar.map((prod) => (
                        
                        <Producto 
                            key={prod.id_producto}
                            producto={prod}
                        />
                    ))}

                    
                </>
            ) : (
                <>
                    <InicioSesion/>
                </>
            )}

        </>
    );
}
export default Home