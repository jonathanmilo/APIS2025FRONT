import { useState } from "react";
import InicioSesion from "./InicioSesion";
import Header from "../componentes/Header";
import data from "../../public/Productos_datos.json";

function Home() {
    const [logeado, setLogeado] = useState(false);
    const [productos] = useState(data.productos || []); // Accede a la propiedad 'productos' del JSON
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    const actualizarValor = (nuevoValor) => {
        setLogeado(nuevoValor);
    };

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
            <Header onActualizarValor={actualizarValor} buscar={handleBuscar} />
            <p>TPO grupo 12</p>
            <p>Estado de login: {logeado.toString()}</p>
            
            {!logeado ? ( // Cambiado a !logeado para lógica correcta
                <>

                    {productosAMostrar.map((prod) => (
                        <div key={prod.id_producto || prod.id}> {/* Usa id_producto o id según tu JSON */}
                            <h3>{prod.nombre}</h3>
                            <p>Precio: ${prod.precio}</p>
                            <p>Categoría: {prod.categoria}</p>
                            <p>Vendedor: {prod.id_vendedor}</p>
                        </div>
                    ))}

                    
                </>
            ) : (
                <>

                    <InicioSesion />
                </>
            )}
        </>
    );
}

export default Home;