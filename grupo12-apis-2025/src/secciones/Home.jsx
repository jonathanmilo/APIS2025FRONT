import { useState } from "react";
import InicioSesion from "./InicioSesion";
import Header from "../componentes/Header";
import data from "../../public/Productos_datos.json";
import usuarios from "../../public/usuarios_datos.json";
import Producto from "../componentes/Producto.jsx";

function Home() {
    const [logeado, setLogeado] = useState(false);
    const [productos] = useState(data.productos || []); // Accede a la propiedad 'productos' del JSON
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    const actualizarValor = (nuevoValor) => {
        setLogeado(nuevoValor);
    };
    const [usuarioRegistrado, registrado] = useState({
        nombre: '',
        email: '',
        password: ''
      });

    const registrar =(usuario)=>{
        const usuarioExistente = usuarios.usuarios.filter(
            (u) => u.password === usuario.password && u.mail === usuario.mail 
          );
        console.log("en home")
        console.log(usuarioExistente)
        if (usuarioExistente){
        registrado(usuarioExistente[0])}
    }

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
            <Header onActualizarValor={actualizarValor} buscar={handleBuscar}  usuario={usuarioRegistrado}/>
            <p>TPO grupo 12</p>
            <p>Estado de login: {logeado.toString()}</p>
            
            {!logeado ? ( // Cambiado a !logeado para lógica correcta
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

                    <InicioSesion  registro={registrar}/>
                </>
            )}
        </>
    );
}

export default Home;