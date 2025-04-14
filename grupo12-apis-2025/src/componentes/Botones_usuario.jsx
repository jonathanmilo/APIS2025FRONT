function Botones_usuario(usuario){
    console.log(usuario.usuario)
    return(

        <>
            <ul className="nav justify-content-end pills botones_usuario">
                                <li className="nav-item"><p>{usuario.usuario.nombre}</p></li>
                                <li className="nav-item">
                                    <button className="btn-sm"> mis publicaciones</button>
                                </li>
                                <li class="nav-item">
                                    <button className="btn-sm"> mis compras</button>
                                </li>
                                <li class="nav-item">
                                    <button className="btn-sm"> boton</button>
                                </li>
                            </ul>
        </>
    )


} export default Botones_usuario