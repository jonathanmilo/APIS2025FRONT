import { useState } from "react";
function Barra_busqueda_productos({ buscar }) {
    const [terminoBusqueda, setTerminoBusqueda] = useState("");

    const handleBusquedaChange = (e) => {
        const valor = e.target.value;
        setTerminoBusqueda(valor);
        buscar(valor); // Llama a la función padre con el término actualizado
    };

    return (
        <div className="d-flex align-items-center search">
            {/* Input de búsqueda */}
            <input
                type="text"
                className="form-control me-2"
                placeholder="Buscar productos..."
                aria-label="Buscar productos"
                value={terminoBusqueda}
                onChange={handleBusquedaChange}
            />

        </div>
    );
}

export default Barra_busqueda_productos;