import Barra_busqueda_productos from "./Barra_busqueda_productos";
function Header() {
    return (
        <>
            <header className="bg-dark text-white p-3 fixed-top w-100 container">
                <div className="row">
                    <div className="col"> TPO</div>
                    <div className="col"><Barra_busqueda_productos></Barra_busqueda_productos></div>
                    <div className="col">
                        <div className="container">
                            <ul class="nav justify-content-end pills">
                                <li class="nav-item">
                                    <button className="btn-sm"> mis publicaciones</button>
                                </li>
                                <li class="nav-item">
                                    <button className="btn-sm"> mis compras</button>
                                </li>
                                <li class="nav-item">
                                    <button className="btn-sm"> boton</button>
                                </li>
                                </ul>
                        </div>
                    </div>
                </div>
                    {/* Menú de enlaces (visible en desktop) */}
                    
               
            </header>
        </>
    );
}

export default Header;