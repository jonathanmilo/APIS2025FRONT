function Barra_busqueda_productos(){
    return(

        <>
            
             <div className="d-flex align-items-center search">
            {/* Input de búsqueda */}
            <input
                type="text"
                className="form-control me-2"
                placeholder="Buscar productos..."
                aria-label="Buscar productos"
            />
            {/* Botón de búsqueda con ícono de lupa */}
            <button className="btn " >
                <i className="bi bi-search"></i> {/* Ícono de lupa de Bootstrap Icons */}
            </button>
            </div> 
        </>
    )
}export default Barra_busqueda_productos