
function Producto({producto}){
return(
    <>

        <div className="card">
        <h6>{producto.nombre}</h6>
        <p>Precio: ${producto.precio}</p>
        <p>Categoría: {producto.categoria}</p>
        </div>
    </>
)

}export default Producto